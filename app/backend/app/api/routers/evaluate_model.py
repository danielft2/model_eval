from io import BytesIO
from typing import Tuple

import pandas as pd
import torch
from datasets import Dataset
from fastapi import APIRouter
from pandas import DataFrame
from sqlalchemy import select
from sqlalchemy.orm import Session
from transformers import (
    AutoModelForSeq2SeqLM,
    AutoTokenizer,
)

from app.api.deps import CurrentUserDep, SessionDep
from app.api.errors.evaluate_model import (
    DonwloadModelHugginfaceError,
    FileTestNotFoundError,
    ModelEvaluationError,
    ModelNotFoundError,
)
from app.api.errors.globals import FileImportProcessedError
from app.api.models.responses import ModelEvaluatedResponse
from app.api.response import Response
from app.core.config import Settings
from app.core.enums import MetricType
from app.ia.metrics.perplexity.computer_perplexity import (
    compute_perplexity,
)
from app.models_db import (
    EvaluationModel,
    ModelAutomaticMetricResult,
)
from app.services.supabase import retrieve_file
from app.utils import (
    preprocess_data,
)

router = APIRouter(prefix="/evaluate-model", tags=["evaluate-model"])
settings = Settings()
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

MAX_LENGTH_INPUT = 512
MAX_LENGTH_OUTPUT = 256


@router.put(
    "/{evaluation_model_id}",
    response_model=Response[ModelEvaluatedResponse],
)
def evaluate_model(
    evaluation_model_id: int, session: SessionDep, current_user: CurrentUserDep
):
    evaluation_model = find_evaluation_model_by_id(
        session, evaluation_model_id
    )

    evaluation = evaluation_model.evaluation
    model_hugginface_id = evaluation_model.model_title_id
    input_text_format = evaluation_model.input_text

    file_test_dataset = download_file_test(evaluation)
    tokenizer, model = download_model_and_tokenizer(model_hugginface_id)

    try:
        response_data = {}
        metric_value = 0.0

        if evaluation.metric_id == MetricType.PERPLEXITY.value:
            inputs, outputs = preprocess_data(
                examples=file_test_dataset,
                input_text=input_text_format,
                task_type=evaluation_model.task_id,
            )

            perplexity_value = compute_perplexity(
                eval_pred=(inputs, outputs),
                model=model,
                tokenizer=tokenizer,
                device=device,
                MAX_LENGTH_INPUT=MAX_LENGTH_INPUT,
                MAX_LENGTH_OUTPUT=MAX_LENGTH_OUTPUT,
            )

            response_data.update({"perplexity": perplexity_value})
            metric_value = perplexity_value

        if evaluation_model.is_evaluated:
            evaluation_model.model_automatic_metric_result.value = metric_value
        else:
            model_result = ModelAutomaticMetricResult(
                model_id=evaluation_model_id,
                metric_id=evaluation.metric_id,
                value=metric_value,
            )
            evaluation_model.model_automatic_metric_result = model_result
            evaluation_model.is_evaluated = True

        session.commit()

        return Response(
            message="Avaliação concluida com sucesso!",
            data=response_data,
        )
    except:
        raise ModelEvaluationError()


def evaluate_on_perplexity_metric(
    model_hugginface_id: str,
    model: AutoModelForSeq2SeqLM,
    tokenizer: AutoTokenizer,
    input_text: str,
    dataset: DataFrame,
):
    inputs, outputs = preprocess_data(
        model, tokenizer, input_text, device, dataset
    )
    result = compute_perplexity((inputs, outputs), model_hugginface_id)
    return result["perplexity"]


def find_evaluation_model_by_id(
    session: Session, evaluation_model_id: int
) -> EvaluationModel:
    evaluation_model: EvaluationModel | any = session.scalar(
        select(EvaluationModel).where(
            evaluation_model_id == EvaluationModel.id
        )
    )

    if not evaluation_model:
        raise ModelNotFoundError()
    return evaluation_model


def download_file_test(evaluation: EvaluationModel) -> DataFrame:
    if not evaluation.filename_test:
        raise FileTestNotFoundError()

    try:
        file_test = retrieve_file(
            bucket=settings.SUPABASE_STORAGE_BUCKET,
            path=f"{
                settings.SUPABASE_STORAGE_EVALUATION_AUTOMATIC}/{evaluation.filename_test}.csv",
        )
        file_test_data_frame = pd.read_csv(BytesIO(file_test))
        return Dataset.from_pandas(file_test_data_frame)
    except:
        raise FileImportProcessedError()


def download_model_and_tokenizer(
    model_hugginface_id: str,
) -> Tuple[AutoTokenizer, AutoModelForSeq2SeqLM]:
    try:
        tokenizer = AutoTokenizer.from_pretrained(model_hugginface_id)
        model = AutoModelForSeq2SeqLM.from_pretrained(model_hugginface_id).to(
            device
        )
        return (tokenizer, model)
    except:
        raise DonwloadModelHugginfaceError()
