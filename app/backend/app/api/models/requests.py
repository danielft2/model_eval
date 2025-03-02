from pydantic import BaseModel, EmailStr

from app.models.automatic_evaluation import EvaluationModel


class SignInRequest(BaseModel):
    email: EmailStr


class AutomaticEvaluationRequest(BaseModel):
    metric_id: int
    title: str
    model_qg: EvaluationModel = None
    model_qa: EvaluationModel = None
    model_dg: EvaluationModel = None


class HumanEvaluationRequest(BaseModel):
    title: str
    num_questions_of_evaluator: int
    instructions: str
    use_relevance: bool
    use_answerability: bool
    use_utility: bool
    status: int = None
