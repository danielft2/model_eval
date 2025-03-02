from typing import Optional

from pydantic import BaseModel, ConfigDict

from app.models.automatic_evaluation import (
    AutomaticEvaluationDetails,
    EvaluationModelDetails,
)


class AutomaticEvaluationsResponse(BaseModel):
    id: int
    evaluation_type_id: int
    title: str
    filename_test_count: int
    models_configured: int
    models_evaluated: int

    model_config = ConfigDict(
        arbitrary_types_allowed=True, from_attributes=True
    )


class AutomaticEvaluationDetailsResponse(BaseModel):
    evaluation: AutomaticEvaluationDetails
    models: list[EvaluationModelDetails]

    model_config = ConfigDict(
        arbitrary_types_allowed=True, from_attributes=True
    )


class ModelEvaluatedResponse(BaseModel):
    perplexity: Optional[float] = None
