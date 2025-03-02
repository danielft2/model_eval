import random
import uuid
from http import HTTPStatus

from fastapi import APIRouter, Request
from sqlalchemy import func, select

from app.api.deps import CurrentHumanEvaluationDep, CurrentUserDep, SessionDep
from app.api.errors.globals import SomethingWrongError
from app.api.models.human_evaluation import HumanEvaluationFormConfig
from app.api.response import Response
from app.models.human_evaluation import (
    EvaluatedQuestionByEvaluator,
    HumanEvaluationForEvaluator,
)
from app.models_db import (
    Evaluation,
    HumanEvaluation,
    HumanEvaluationQuestionResult,
)

router = APIRouter(prefix="/evaluations", tags=["evaluations"])


@router.get(
    "/has-evaluations",
    status_code=HTTPStatus.CREATED,
    response_model=Response[dict[str, bool]],
)
def has_evaluations(session: SessionDep, current_user: CurrentUserDep):
    automatic_evaluation_count = session.scalar(
        select(func.count(Evaluation.id)).where(
            Evaluation.user_id == current_user.id
        )
    )

    human_evaluation_count = session.scalar(
        select(func.count(HumanEvaluation.id)).where(
            HumanEvaluation.user_id == current_user.id
        )
    )

    if automatic_evaluation_count > 0 or human_evaluation_count > 0:
        return Response(data={"has_evaluations": True})

    return Response(data={"has_evaluations": False})


@router.get(
    "/evaluate-questions", response_model=Response[HumanEvaluationFormConfig]
)
def evaluate_questions(current_evaluation: CurrentHumanEvaluationDep):
    all_questions = current_evaluation.questions_for_evaluation
    number_of_questions = current_evaluation.num_questions_of_evaluator
    questions_for_evaluate = random.sample(all_questions, number_of_questions)

    evaluation = HumanEvaluationForEvaluator.model_validate(current_evaluation)

    return Response(
        data=HumanEvaluationFormConfig(
            evaluation=evaluation, questions=questions_for_evaluate
        )
    )


@router.post("/evaluate-questions", response_model=Response)
def create_evaluate_for_questions(
    request: Request,
    questions: list[EvaluatedQuestionByEvaluator],
    current_evaluation: CurrentHumanEvaluationDep,
    session: SessionDep,
):
    evaluator_id = request.headers.get("evaluator-id")

    if not evaluator_id:
        evaluator_id = str(uuid.uuid4())

    try:
        for question in questions:
            current_evaluation.evaluated_questions.append(
                HumanEvaluationQuestionResult(
                    evaluation_id=current_evaluation.id,
                    question_id=question.id,
                    evaluator_id=evaluator_id,
                    considers_answerability=question.considered_answerability
                    if current_evaluation.use_answerability
                    else None,
                    considers_relevance=question.considered_relevance
                    if current_evaluation.use_relevance
                    else None,
                    utility=question.utility
                    if current_evaluation.use_utility
                    else None,
                )
            )

        session.commit()

        return Response(message="Avaliação realizada com sucesso!")
    except:
        raise SomethingWrongError()
