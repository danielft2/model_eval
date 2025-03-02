from pydantic import BaseModel


class EvaluationModel(BaseModel):
    model_title_id: str
    input_text: str

    def is_empty(self) -> bool:
        return not (self.model_title_id or self.input_text)


class EvaluationModelDetails(BaseModel):
    id: int
    task_id: int
    task_name: str
    model_title_id: str
    metric_result: float
    input_text: str


class AutomaticEvaluationDetails(BaseModel):
    id: int
    filename_test: str
    title: str
    metric_id: int
