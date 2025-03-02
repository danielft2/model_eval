from typing import Optional

from pydantic import BaseModel, ConfigDict

from app.models.human_evaluation import (
    HumanEvaluationBase,
    HumanEvaluationForEvaluator,
    HumanEvaluationQuestion,
    HumanEvaluationQuestionBase,
)


# Class Utilirárias
class BinaryMetricResult(BaseModel):
    total_considered: int
    total_not_considered: int

    model_config = ConfigDict(arbitrary_types_allowed=True)


class UtilityMetricResult(BaseModel):
    total_not_useful: int
    total_useful_with_importants_edits: int
    total_userful_with_minor_edits: int
    total_useful_without_edits: int

    model_config = ConfigDict(arbitrary_types_allowed=True)


class ResultMetricsEvaluation(BaseModel):
    relevance: Optional[BinaryMetricResult] = None
    answerability: Optional[BinaryMetricResult] = None
    utility: Optional[UtilityMetricResult] = None

    model_config = ConfigDict(arbitrary_types_allowed=True)


# Classes de Resposta
class HumanEvaluationWithNumberEvaluations(HumanEvaluationBase):
    number_of_evaluations: int


class HumanEvaluationOverview(BaseModel):
    evaluation: HumanEvaluationBase
    imported_questions: list[HumanEvaluationQuestionBase]

    model_config = ConfigDict(
        arbitrary_types_allowed=True, from_attributes=True
    )


class ResultImportedQuestion(BaseModel):
    question: HumanEvaluationQuestion
    metrics_result: ResultMetricsEvaluation
    number_of_evaluations: int

    model_config = ConfigDict(
        arbitrary_types_allowed=True, from_attributes=True
    )


class ResultAllImportedQuestions(BaseModel):
    num_questions_of_evaluator: int
    number_of_evaluations: int
    number_questions_evaluated: int
    number_ungraded_questions: int
    metrics_result: ResultMetricsEvaluation

    model_config = ConfigDict(
        arbitrary_types_allowed=True, from_attributes=True
    )


class HumanEvaluationFormConfig(BaseModel):
    questions: list[HumanEvaluationQuestion]
    evaluation: HumanEvaluationForEvaluator
