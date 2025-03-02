from math import exp
from typing import List, Union

import torch
from tqdm import tqdm


class PerplexityCalculator:
    def __init__(self, model, tokenizer, loss_fct, device, **kwargs):
        self.model = model
        self.tokenizer = tokenizer
        self.loss_fct = loss_fct
        self.device = device

        self.max_length_encoder = kwargs.get("max_length_encoder", None)
        self.max_length_decoder = kwargs.get("max_length_decoder", None)
        self.pad_token_initialized = kwargs.get("pad_token_initialized", False)
        self.device_map = kwargs.get("device_map", None)

    def get_perplexity(
        self,
        input_texts: Union[str, List[str]],
        output_texts: Union[str, List[str]],
        batch_size: int = None,
    ):
        """Compute the perplexity on decoder of the seq2seq model.

        :param input_texts: A string or list of input texts for the encoder.
        :param output_texts: A string or list of output texts for the decoder.
        :param batch_size: Batch size
        :return: A value or list of perplexity.
        """
        assert type(input_texts) is type(output_texts), f"{
            type(input_texts)} != {type(output_texts)}"

        # batch preparation
        single_input = isinstance(input_texts, str)
        input_texts = [input_texts] if single_input else input_texts
        output_texts = [output_texts] if single_input else output_texts
        assert len(input_texts) == len(output_texts), f"{
            len(input_texts)} != {len(output_texts)}"
        batch_size = len(output_texts) if batch_size is None else batch_size
        batch_id = list(range(0, len(input_texts), batch_size)) + [
            len(output_texts)
        ]
        batch_id = list(zip(batch_id[:-1], batch_id[1:]))

        loss_list = []
        with torch.no_grad():
            for s, e in tqdm(batch_id):
                # input feature
                if self.max_length_encoder is not None:
                    model_inputs = self.tokenizer(
                        input_texts[s:e],
                        return_tensors="pt",
                        padding="max_length",
                        truncation=True,
                        max_length=self.max_length_encoder,
                    )
                else:
                    model_inputs = self.tokenizer(
                        input_texts[s:e],
                        return_tensors="pt",
                        padding=True,
                        truncation=True,
                    )

                if self.max_length_decoder is not None:
                    output_encode = self.tokenizer(
                        text_target=output_texts[s:e],
                        return_tensors="pt",
                        padding="max_length",
                        truncation=True,
                        max_length=self.max_length_decoder,
                    )
                else:
                    output_encode = self.tokenizer(
                        text_target=output_texts[s:e],
                        return_tensors="pt",
                        padding=True,
                        truncation=True,
                    )

                # shift the label sequence for causal inference
                label = output_encode["input_ids"]
                label[label == self.tokenizer.pad_token_id] = (
                    self.tokenizer.pad_token_id
                )

                # Forward pass through the model
                if self.device_map is None:
                    model_inputs["labels"] = label.to(self.device)
                    output = self.model(
                        **{
                            k: v.to(self.device)
                            for k, v in model_inputs.items()
                        }
                    )
                else:
                    model_inputs["labels"] = label
                    output = self.model(
                        **{k: v.cuda() for k, v in model_inputs.items()}
                    )
                    model_inputs["labels"] = label.to(self.device)

                # model run & loss conversion into likelihood
                logits = output["logits"]
                if self.pad_token_initialized:
                    logits = logits[:, :, :-1]
                valid_length = (
                    model_inputs["labels"] != self.tokenizer.pad_token_id
                ).sum(dim=-1)
                loss = self.loss_fct(
                    logits.view(-1, self.model.config.vocab_size),
                    model_inputs["labels"].view(-1),
                )
                loss = loss.view(len(logits), -1)
                loss = torch.sum(loss, -1) / valid_length
                loss_list += loss.cpu().tolist()

        max_loss = (
            709  # exp(709) is close to the maximum float value in Python
        )
        perplexity = [exp(min(i, max_loss)) for i in loss_list]
        return perplexity[0] if len(perplexity) == 1 else perplexity
