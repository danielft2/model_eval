from io import StringIO
from uuid import UUID

import pandas as pd
from fastapi import APIRouter, UploadFile
from sqlalchemy import delete, select
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
from app.api.errors.human_evaluation import (
    ImportQuestionCountError,
    ImportQuestionError,
)
from app.api.models.human_evaluation import (
    HumanEvaluationOverview,
    HumanEvaluationWithNumberEvaluations,
)
from app.api.models.requests import HumanEvaluationRequest
from app.api.response import Response
from app.core.enums import HumanEvaluationStatus
from app.models.human_evaluation import (
    HumanEvaluationBase,
    HumanEvaluationQuestionBase,
)
from app.models_db import HumanEvaluation, HumanEvaluationQuestion
from app.utils import calculate_number_of_evaluations

router = APIRouter(prefix="/human-evaluation", tags=["human-evaluation"])

required_columns_file_import = [
    "titulo_do_texto",
    "texto",
    "descritor",
    "comando",
    "resposta",
    "resposta_item",
    "opcoes",
]


@router.get(
    "", response_model=Response[list[HumanEvaluationWithNumberEvaluations]]
)
def get_evaluations(current_user: CurrentUserDep, session: SessionDep):
    try:
        evaluations = session.scalars(
            select(HumanEvaluation).where(
                current_user.id == HumanEvaluation.user_id
            )
        ).all()

        for evaluation in evaluations:
            evaluation.number_of_evaluations = calculate_number_of_evaluations(
                evaluation.evaluated_questions
            )

        return Response(data=evaluations)
    except:
        raise SomethingWrongError()


@router.get("/{evaluation_id}", response_model=Response[HumanEvaluationBase])
def evalution_details(
    evaluation_id: UUID, current_user: CurrentUserDep, session: SessionDep
):
    evaluation = find_evaluation_by_id(
        session=session, evaluation_id=evaluation_id
    )
    return Response(data=evaluation)


@router.post("", response_model=Response[HumanEvaluation])
def create_evaluation(
    current_user: CurrentUserDep,
    session: SessionDep,
    data: HumanEvaluationRequest,
):
    verify_if_title_alredy_exists(session=session, evaluation_title=data.title)

    try:
        evaluation = HumanEvaluation(
            title=data.title,
            user_id=current_user.id,
            num_questions_of_evaluator=data.num_questions_of_evaluator,
            instructions=data.instructions,
            use_relevance=data.use_relevance,
            use_answerability=data.use_answerability,
            use_utility=data.use_utility,
            status_id=HumanEvaluationStatus.UNAVALIABLE.value,
        )

        session.add(evaluation)
        session.commit()
        session.refresh(evaluation)

        return Response(
            message="Avaliação criada com sucesso!", data=evaluation
        )
    except:
        session.rollback()
        raise SomethingWrongError()


@router.put("/{evaluation_id}", response_model=Response[HumanEvaluationBase])
def update_evaluation(
    evaluation_id: UUID,
    current_user: CurrentUserDep,
    session: SessionDep,
    data: HumanEvaluationRequest,
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
        evaluation.num_questions_of_evaluator = data.num_questions_of_evaluator
        evaluation.instructions = data.instructions
        evaluation.use_relevance = data.use_relevance
        evaluation.use_answerability = data.use_answerability
        evaluation.use_utility = data.use_utility

        session.commit()

        return Response(
            message="Avaliação atualizada com sucesso!", data=evaluation
        )
    except:
        session.rollback()
        raise SomethingWrongError()


@router.delete("/{evaluation_id}", response_model=Response)
def delete_evaluation(
    evaluation_id: UUID, current_user: CurrentUserDep, session: SessionDep
):
    evaluation = find_evaluation_by_id(
        session=session, evaluation_id=evaluation_id
    )

    try:
        session.delete(evaluation)
        session.commit()

        return Response(message="Avaliação deletada com sucesso!")
    except:
        session.rollback()
        raise SomethingWrongError()


@router.put(
    "/{evaluation_id}/change-status",
    response_model=Response[HumanEvaluationBase],
)
def change_evaluation_status(evaluation_id: UUID, session: SessionDep):
    evaluation = find_evaluation_by_id(
        session=session, evaluation_id=evaluation_id
    )

    try:
        status = evaluation.status_id
        if status == HumanEvaluationStatus.UNAVALIABLE.value:
            evaluation.status_id = HumanEvaluationStatus.AVALIABLE.value
        elif status == HumanEvaluationStatus.AVALIABLE.value:
            evaluation.status_id = HumanEvaluationStatus.UNAVALIABLE.value

        session.commit()
        session.refresh(evaluation)

        return Response(
            message="Status da avaliação alterado com sucesso!",
            data=evaluation,
        )
    except:
        session.rollback()
        raise SomethingWrongError()


@router.put(
    "/{evaluation_id}/import-questions",
    response_model=Response[HumanEvaluationOverview],
)
async def import_questions(
    evaluation_id: UUID,
    session: SessionDep,
    current_user: CurrentUserDep,
    file: UploadFile,
):
    evaluation = find_evaluation_by_id(
        session=session, evaluation_id=evaluation_id
    )

    if evaluation.status_id == HumanEvaluationStatus.AVALIABLE.value:
        raise ImportQuestionError()

    file_read = await file.read()
    if not file.content_type == "text/csv":
        raise FileImportTypeInvalidError()

    try:
        df = pd.read_csv(StringIO(file_read.decode("utf-8")))

        if len(df) < evaluation.num_questions_of_evaluator:
            raise ImportQuestionCountError()

        verify_if_file_format_is_valid(df.columns)
        df = df.loc[:, required_columns_file_import]

        if len(evaluation.questions_for_evaluation) > 0:
            stmt = delete(HumanEvaluationQuestion).where(
                HumanEvaluationQuestion.evaluation_id == str(evaluation_id)
            )
            session.execute(stmt)

        df.apply(
            lambda row: evaluation.questions_for_evaluation.append(
                HumanEvaluationQuestion(
                    evaluation_id=evaluation_id,
                    title=row["titulo_do_texto"],
                    text=row["texto"],
                    descriptor_code=row["descritor"].split("-")[0],
                    descriptor=row["descritor"],
                    command=row["comando"],
                    answer=row["resposta"],
                    answer_item=row["resposta_item"],
                    options=row["opcoes"],
                )
            ),
            axis=1,
        )

        session.commit()
        session.refresh(evaluation)

        evaluation_res = HumanEvaluationBase.model_validate(evaluation)
        imported_questions = sorted(
            [
                HumanEvaluationQuestionBase.model_validate(question)
                for question in evaluation.questions_for_evaluation
            ],
            key=lambda x: x.descriptor_code,
        )

        response_data = HumanEvaluationOverview(
            evaluation=evaluation_res, imported_questions=imported_questions
        )

        return Response(
            message="Questões importadas com sucesso!", data=response_data
        )
    except ImportQuestionCountError as exception:
        session.rollback()
        raise exception
    except FileImportFormatInvalidError as exeception:
        session.rollback()
        raise exeception
    except:
        session.rollback()
        raise FileImportProcessedError()


def find_evaluation_by_id(
    session: Session, evaluation_id: int
) -> HumanEvaluation:
    evaluation = session.scalar(
        select(HumanEvaluation).where(evaluation_id == HumanEvaluation.id)
    )

    if not evaluation:
        raise EvaluationNotFoundError()
    return evaluation


def verify_if_title_alredy_exists(session: Session, evaluation_title: str):
    evaluation_aredy_exists = session.scalar(
        select(HumanEvaluation).where(
            evaluation_title == HumanEvaluation.title
        )
    )

    if evaluation_aredy_exists:
        raise EvaluationTitleConflictError()


def verify_if_file_format_is_valid(columns: any):
    missing_columns = [
        col for col in required_columns_file_import if col not in columns
    ]

    if missing_columns:
        raise FileImportFormatInvalidError(
            missing_columns=", ".join(missing_columns)
        )
