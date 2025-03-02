from uuid import UUID

from fastapi import APIRouter
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.api.deps import CurrentUserDep, SessionDep
from app.api.errors.globals import (
    EvaluationNotFoundError,
    SomethingWrongError,
)
from app.api.models.human_evaluation import (
    HumanEvaluationOverview,
    ResultAllImportedQuestions,
    ResultImportedQuestion,
)
from app.api.response import Response
from app.models.human_evaluation import (
    HumanEvaluationBase,
    HumanEvaluationQuestionBase,
)
from app.models.human_evaluation import (
    HumanEvaluationQuestion as HumanEvaluationImportedQuestion,
)
from app.models_db import HumanEvaluation, HumanEvaluationQuestion
from app.utils import (
    CalculatesOverviewQuestions,
    ComputesMetricResultsQuestions,
)

router = APIRouter(
    prefix="/human-evaluation/overview", tags=["human-evaluation-results"]
)


@router.get(
    "/{evaluation_id}", response_model=Response[HumanEvaluationOverview]
)
def get_evaluation_results(
    evaluation_id: UUID, session: SessionDep, current_user: CurrentUserDep
):
    evaluation_db = find_evaluation_by_id(
        session=session, evaluation_id=evaluation_id
    )

    try:
        evaluation = HumanEvaluationBase.model_validate(evaluation_db)
        imported_questions = sorted(
            [
                HumanEvaluationQuestionBase.model_validate(question)
                for question in evaluation_db.questions_for_evaluation
            ],
            key=lambda x: x.descriptor_code,
        )

        response_data = HumanEvaluationOverview(
            evaluation=evaluation, imported_questions=imported_questions
        )

        return Response(data=response_data)
    except:
        raise SomethingWrongError()


@router.get(
    "/question/{question_id}",
    response_model=Response[ResultImportedQuestion],
)
def get_question_results(
    question_id: UUID, session: SessionDep, current_user: CurrentUserDep
):
    try:
        question_db: HumanEvaluationQuestion = session.scalar(
            select(HumanEvaluationQuestion).where(
                question_id == HumanEvaluationQuestion.id
            )
        )

        calcultate_metrics = ComputesMetricResultsQuestions(
            questions=question_db.evaluation_results,
            use_relevance=question_db.evaluation.use_relevance,
            use_answerability=question_db.evaluation.use_answerability,
            use_utility=question_db.evaluation.use_utility,
        )

        metrics_result = calcultate_metrics.calculate_result()
        question = HumanEvaluationImportedQuestion.model_validate(question_db)
        number_of_evaluations = len(question_db.evaluation_results)

        return Response(
            data=ResultImportedQuestion(
                question=question,
                number_of_evaluations=number_of_evaluations,
                metrics_result=metrics_result,
            )
        )
    except:
        raise SomethingWrongError()


@router.get(
    "/global-results/{evaluation_id}",
    response_model=Response[ResultAllImportedQuestions],
)
def get_global_results(
    evaluation_id: UUID,
    session: SessionDep,
    current_user: CurrentUserDep,
    descriptor_code: str | None = None,
):
    evaluation = find_evaluation_by_id(
        session=session, evaluation_id=evaluation_id
    )

    try:
        evaluated_questions = evaluation.evaluated_questions

        if descriptor_code is not None:
            evaluated_questions = list(
                filter(
                    lambda evaluation: evaluation.question.descriptor_code
                    == f"{descriptor_code} ",
                    evaluated_questions,
                )
            )

        computer_metrics = ComputesMetricResultsQuestions(
            questions=evaluated_questions,
            use_relevance=evaluation.use_relevance,
            use_answerability=evaluation.use_answerability,
            use_utility=evaluation.use_utility,
        )

        calculate_overview = CalculatesOverviewQuestions(
            imported_questions=evaluation.questions_for_evaluation,
            evaluated_questions=evaluated_questions,
            descriptor_code=descriptor_code,
        )

        result_evaluations = calculate_overview.calculate()
        result_metrics = computer_metrics.calculate_result()

        response_data = ResultAllImportedQuestions(
            num_questions_of_evaluator=evaluation.num_questions_of_evaluator,
            metrics_result=result_metrics,
            **result_evaluations,
        )

        return Response(data=response_data)
    except Exception as e:
        print(e)
        raise SomethingWrongError()


def find_evaluation_by_id(
    session: Session, evaluation_id: UUID
) -> HumanEvaluation:
    evaluation = session.scalar(
        select(HumanEvaluation).where(evaluation_id == HumanEvaluation.id)
    )

    if not evaluation:
        raise EvaluationNotFoundError()
    return evaluation
