from http import HTTPStatus
from io import StringIO
from uuid import uuid4

import pandas as pd
from fastapi import APIRouter, UploadFile
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.api.deps import CurrentUserDep, SessionDep
from app.api.errors.globals import (
    EvaluationNotFoundError,
    EvaluationTitleConflictError,
    FileImportFormatInvalidError,
    FileImportProcessedError,
    FileImportTypeInvalidError,
    SomethingWrongError,
)
from app.api.models.requests import AutomaticEvaluationRequest
from app.api.models.responses import (
    AutomaticEvaluationDetailsResponse,
    AutomaticEvaluationsResponse,
)
from app.api.response import Response
from app.core.config import Settings
from app.core.enums import EvaluationType, TaskType
from app.models.automatic_evaluation import (
    AutomaticEvaluationDetails,
    EvaluationModelDetails,
)
from app.models_db import Evaluation, EvaluationModel
from app.services.supabase import supabase_client

router = APIRouter(
    prefix="/automatic-evaluation", tags=["automatic-evaluation"]
)

settings = Settings()
required_columns_file_import = [
    "texto",
    "descritor",
    "comando",
    "resposta",
    "resposta_item",
    "opcoes",
]


@router.get("", response_model=Response[list[AutomaticEvaluationsResponse]])
async def list_evaluations(current_user: CurrentUserDep, session: SessionDep):
    evaluations_db = session.scalars(
        select(Evaluation).where(current_user.id == Evaluation.user_id)
    ).all()

    evaluations_response = []
    for evaluation in evaluations_db:
        models = evaluation.evaluation_models
        models_evaluated = sum(1 for model in models if model.is_evaluated)

        evaluations_response.append(
            AutomaticEvaluationsResponse(
                id=evaluation.id,
                evaluation_type_id=evaluation.evaluation_type_id,
                title=evaluation.title,
                models_configured=len(models),
                models_evaluated=models_evaluated,
                filename_test_count=evaluation.filename_test_count,
            )
        )

    return Response(data=evaluations_response)


@router.get(
    "/{evaluation_id}",
    response_model=Response[AutomaticEvaluationDetailsResponse],
)
async def evaluation_details(
    evaluation_id: int, current_user: CurrentUserDep, session: SessionDep
):
    evaluation = find_evaluation_by_id(
        session=session, evaluation_id=evaluation_id
    )

    try:
        evaluation_details = AutomaticEvaluationDetails(
            id=evaluation_id,
            filename_test=evaluation.filename_test,
            title=evaluation.title,
            metric_id=evaluation.metric_id,
        )

        evaluation_models = evaluation.evaluation_models
        models_details = []

        for model in evaluation_models:
            task_name = model.task.name
            metric_value = 0.0

            if model.is_evaluated:
                metric_value = model.model_automatic_metric_result.value

            models_details.append(
                EvaluationModelDetails(
                    id=model.id,
                    task_id=model.task_id,
                    input_text=model.input_text,
                    model_title_id=model.model_title_id,
                    task_name=task_name,
                    metric_result=metric_value,
                )
            )

        response_data = AutomaticEvaluationDetailsResponse(
            evaluation=evaluation_details, models=models_details
        )

        return Response(data=response_data.model_dump())
    except:
        raise SomethingWrongError()


@router.post(
    "", status_code=HTTPStatus.CREATED, response_model=Response[Evaluation]
)
async def create_evaluation(
    current_user: CurrentUserDep,
    session: SessionDep,
    data: AutomaticEvaluationRequest,
):
    verify_if_title_alredy_exists(session=session, evaluation_title=data.title)

    try:
        evaluation = Evaluation(
            title=data.title,
            filename_test_count=0,
            filename_test="",
            user_id=current_user.id,
            evaluation_type_id=EvaluationType.AUTOMATIC.value,
            metric_id=data.metric_id,
        )

        session.add(evaluation)
        session.commit()
        session.refresh(evaluation)

        task_data_map = {
            TaskType.QUESTION_GENERATE.value: data.model_qg,
            TaskType.QUESTION_ANSWER.value: data.model_qa,
            TaskType.DISTRACTOR_GENERATE.value: data.model_dg,
        }

        for task_id, task_data in task_data_map.items():
            if task_data and not task_data.is_empty():
                session.add(
                    EvaluationModel(
                        evaluation_id=evaluation.id,
                        task_id=task_id,
                        input_text=task_data.input_text,
                        model_title_id=task_data.model_title_id,
                        is_evaluated=False,
                    )
                )

        session.commit()
        return Response(
            message="Avaliação criada com sucesso!", data=evaluation
        )
    except:
        session.rollback()
        raise SomethingWrongError()


@router.put("/{evaluation_id}", response_model=Response[Evaluation])
async def update_evaluate(
    evaluation_id: int,
    session: SessionDep,
    current_user: CurrentUserDep,
    data: AutomaticEvaluationRequest,
):
    evaluation = find_evaluation_by_id(
        session=session, evaluation_id=evaluation_id
    )

    if evaluation.title != data.title:
        verify_if_title_alredy_exists(
            session=session, evaluation_title=data.title
        )

    try:
        evaluation.title = data.title
        evaluation.metric_id = data.metric_id

        task_data_map = {
            TaskType.QUESTION_GENERATE.value: data.model_qg,
            TaskType.QUESTION_ANSWER.value: data.model_qa,
            TaskType.DISTRACTOR_GENERATE.value: data.model_dg,
        }

        existing_task_ids = set()
        for model in evaluation.evaluation_models:
            task_data = task_data_map.get(model.task_id)
            if task_data and not task_data.is_empty():
                model.input_text = task_data.input_text
                model.model_title_id = task_data.model_title_id
                existing_task_ids.add(model.task_id)

        for task_id, task_data in task_data_map.items():
            if (
                task_id not in existing_task_ids
                and task_data
                and not task_data.is_empty()
            ):
                evaluation.evaluation_models.append(
                    EvaluationModel(
                        evaluation_id=evaluation_id,
                        task_id=task_id,
                        input_text=task_data.input_text,
                        model_title_id=task_data.model_title_id,
                        is_evaluated=False,
                    )
                )

        session.commit()
        return Response(
            message="Avaliação atualizada com sucesso!", data=evaluation
        )
    except Exception as e:
        print(e)
        session.rollback()
        raise SomethingWrongError()


@router.delete("/{evaluation_id}", response_model=Response[None])
def delete_evaluate(
    evaluation_id: int, session: SessionDep, current_user: CurrentUserDep
):
    evaluation = find_evaluation_by_id(
        session=session, evaluation_id=evaluation_id
    )

    try:
        session.delete(evaluation)
        session.commit()
        return Response(message="Avaliação excluida com sucesso!")
    except:
        session.rollback()
        raise SomethingWrongError()


@router.post("/{evaluation_id}/import-file-test")
async def evaluation_import_file_test(
    evaluation_id: int,
    session: SessionDep,
    current_user: CurrentUserDep,
    file: UploadFile,
):
    file_read = await file.read()

    if not file.content_type == "text/csv":
        raise FileImportTypeInvalidError()

    try:
        df = pd.read_csv(StringIO(file_read.decode("utf-8")))
        line_count = len(df)

        verify_if_file_format_is_valid(df.columns)
        df = df.loc[:, required_columns_file_import]
    except FileImportFormatInvalidError as exeception:
        raise exeception
    except Exception as e:
        print(e)
        raise FileImportProcessedError()

    evaluation = find_evaluation_by_id(
        session=session, evaluation_id=evaluation_id
    )

    try:
        file_id = (
            evaluation.filename_test if evaluation.filename_test else uuid4()
        )

        supabase_client.storage.from_(settings.SUPABASE_STORAGE_BUCKET).upload(
            file=file_read,
            path=f"{settings.SUPABASE_STORAGE_EVALUATION_AUTOMATIC}/{file_id}.csv",
            file_options={"upsert": "true", "content-type": "text/csv"},
        )

        evaluation.filename_test = file_id
        evaluation.filename_test_count = line_count
        session.commit()
    except:
        raise SomethingWrongError()

    return Response(
        message="Arquivo de teste importado com sucesso!",
        data={"file_name_id": file_id},
    )


def verify_if_file_format_is_valid(columns: any):
    missing_columns = [
        col for col in required_columns_file_import if col not in columns
    ]

    if missing_columns:
        raise FileImportFormatInvalidError(
            missing_columns=", ".join(missing_columns)
        )


def find_evaluation_by_id(session: Session, evaluation_id: int) -> Evaluation:
    evaluation = session.scalar(
        select(Evaluation).where(evaluation_id == Evaluation.id)
    )

    if not evaluation:
        raise EvaluationNotFoundError()
    return evaluation


def verify_if_title_alredy_exists(session: Session, evaluation_title: str):
    evaluation_aredy_exists = session.scalar(
        select(Evaluation).where(evaluation_title == Evaluation.title)
    )

    if evaluation_aredy_exists:
        raise EvaluationTitleConflictError()
