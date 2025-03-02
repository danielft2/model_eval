from typing import Optional
from uuid import UUID

from pydantic import BaseModel, ConfigDict


class HumanEvaluationStatus(BaseModel):
    id: int
    name: str

    model_config = ConfigDict(
        arbitrary_types_allowed=True, from_attributes=True
    )


class HumanEvaluationBase(BaseModel):
    id: UUID
    title: str
    num_questions_of_evaluator: int
    instructions: str
    use_relevance: bool
    use_answerability: bool
    use_utility: bool
    status: HumanEvaluationStatus

    model_config = ConfigDict(
        arbitrary_types_allowed=True, from_attributes=True
    )


class HumanEvaluationForEvaluator(BaseModel):
    instructions: str
    use_relevance: bool
    use_answerability: bool
    use_utility: bool
    status: HumanEvaluationStatus

    model_config = ConfigDict(
        arbitrary_types_allowed=True, from_attributes=True
    )


class HumanEvaluationQuestionBase(BaseModel):
    id: UUID
    descriptor_code: str

    model_config = ConfigDict(
        arbitrary_types_allowed=True, from_attributes=True
    )


class HumanEvaluationQuestion(HumanEvaluationQuestionBase):
    title: str
    text: str
    command: str
    descriptor: str
    answer: str
    answer_item: str
    options: str


class EvaluatedQuestionByEvaluator(BaseModel):
    id: UUID
    considered_relevance: Optional[bool] = None
    considered_answerability: Optional[bool] = None
    utility: Optional[int] = None

    model_config = ConfigDict(
        arbitrary_types_allowed=True, from_attributes=True
    )
