import numpy as np
import torch
from transformers import AutoModelForSeq2SeqLM, AutoTokenizer

from .perplexity_calculator import PerplexityCalculator


def compute_perplexity(
    eval_pred,
    model: AutoModelForSeq2SeqLM,
    tokenizer: AutoTokenizer,
    device: str,
    **kwargs,
):
    MAX_LENGTH_INPUT = kwargs.get("MAX_LENGTH_INPUT", 512)
    MAX_LENGTH_OUTPUT = kwargs.get("MAX_LENGTH_OUTPUT", 256)

    perplexity_calculator = PerplexityCalculator(
        model=model,
        tokenizer=tokenizer,
        loss_fct=torch.nn.CrossEntropyLoss(reduction="none"),
        device=device,
        max_length_encoder=MAX_LENGTH_INPUT,
        max_length_decoder=MAX_LENGTH_OUTPUT,
    )

    inputs_list, labels_list = eval_pred
    perplexity = perplexity_calculator.get_perplexity(inputs_list, labels_list)

    return np.mean(perplexity)
