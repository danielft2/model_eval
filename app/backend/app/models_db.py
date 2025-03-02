import uuid
from datetime import datetime
from typing import List

from sqlalchemy import ForeignKey, func
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, registry, relationship
from sqlalchemy.schema import UniqueConstraint

table_registry = registry()


@table_registry.mapped_as_dataclass
class User:
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(init=False, primary_key=True)
    name: Mapped[str] = mapped_column(init=False, nullable=True)
    email: Mapped[str] = mapped_column(unique=True)
    created_at: Mapped[datetime] = mapped_column(
        init=False, server_default=func.now()
    )


@table_registry.mapped_as_dataclass
class EvaluationType:
    __tablename__ = "evaluation_types"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str]
    created_at: Mapped[datetime] = mapped_column(
        init=False, server_default=func.now()
    )
    metrics: Mapped[List["Metric"]] = relationship(
        backref="evaluationtype", cascade="all, delete", default_factory=list
    )
    evaluations: Mapped[List["Evaluation"]] = relationship(
        backref="evaluationtype", default_factory=list
    )


@table_registry.mapped_as_dataclass
class Evaluation:
    __tablename__ = "evaluations"

    id: Mapped[int] = mapped_column(init=False, primary_key=True)
    title: Mapped[str] = mapped_column(unique=True)
    filename_test: Mapped[str]
    filename_test_count: Mapped[int]
    created_at: Mapped[datetime] = mapped_column(
        init=False, server_default=func.now()
    )

    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"))
    evaluation_type_id: Mapped[int] = mapped_column(
        ForeignKey("evaluation_types.id")
    )
    metric_id: Mapped[int] = mapped_column(ForeignKey("metrics.id"))

    evaluation_models: Mapped[List["EvaluationModel"]] = relationship(
        back_populates="evaluation",
        cascade="all, delete",
        default_factory=list,
    )


@table_registry.mapped_as_dataclass
class Metric:
    __tablename__ = "metrics"

    id: Mapped[int] = mapped_column(init=False, primary_key=True)
    name: Mapped[str]
    description: Mapped[str]
    created_at: Mapped[datetime] = mapped_column(
        init=False, server_default=func.now()
    )

    evaluation_type_id: Mapped[int] = mapped_column(
        ForeignKey("evaluation_types.id")
    )
    question_for_evaluator: Mapped[str] = mapped_column(
        nullable=True, default=None
    )


@table_registry.mapped_as_dataclass
class TaskType:
    __tablename__ = "tasks_types"

    id: Mapped[int] = mapped_column(init=False, primary_key=True)
    name: Mapped[str]
    created_at: Mapped[datetime] = mapped_column(
        init=False, server_default=func.now()
    )


@table_registry.mapped_as_dataclass
class EvaluationModel:
    __tablename__ = "evaluation_models"

    id: Mapped[int] = mapped_column(init=False, primary_key=True)
    model_title_id: Mapped[str]
    input_text: Mapped[str]
    is_evaluated: Mapped[bool]
    created_at: Mapped[datetime] = mapped_column(
        init=False, server_default=func.now()
    )

    evaluation_id: Mapped[int] = mapped_column(ForeignKey("evaluations.id", ondelete="CASCADE"))
    evaluation: Mapped["Evaluation"] = relationship(
        back_populates="evaluation_models", init=False
    )

    task_id: Mapped[int] = mapped_column(ForeignKey("tasks_types.id"))
    task: Mapped["TaskType"] = relationship(
        backref="evaluationmodel", init=False
    )

    model_automatic_metric_result: Mapped["ModelAutomaticMetricResult"] = (
        relationship(default=None, cascade="all, delete")
    )


@table_registry.mapped_as_dataclass
class ModelAutomaticMetricResult:
    __tablename__ = "models_automatic_metric_results"

    id: Mapped[int] = mapped_column(init=False, primary_key=True)
    model_id: Mapped[int] = mapped_column(ForeignKey("evaluation_models.id", ondelete="CASCADE"))
    metric_id: Mapped[int] = mapped_column(ForeignKey("metrics.id"))
    value: Mapped[float]
    created_at: Mapped[datetime] = mapped_column(
        init=False, server_default=func.now()
    )


# Human Evaluation Models
@table_registry.mapped_as_dataclass
class HumanEvaluationStatus:
    __tablename__ = "human_evaluation_status"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str]
    created_at: Mapped[datetime] = mapped_column(
        init=False, server_default=func.now()
    )


@table_registry.mapped_as_dataclass
class HumanEvaluation:
    __tablename__ = "human_evaluations"

    id: Mapped[UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, init=False
    )

    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"))

    title: Mapped[str]
    num_questions_of_evaluator: Mapped[int]
    instructions: Mapped[str]
    use_relevance: Mapped[bool]
    use_answerability: Mapped[bool]
    use_utility: Mapped[bool]

    status_id: Mapped[int] = mapped_column(
        ForeignKey("human_evaluation_status.id")
    )
    status: Mapped["HumanEvaluationStatus"] = relationship(
        backref="humanevaluation", init=False
    )

    questions_for_evaluation: Mapped[List["HumanEvaluationQuestion"]] = (
        relationship(
            back_populates="evaluation",
            cascade="all, delete",
            default_factory=list,
        )
    )

    evaluated_questions: Mapped[List["HumanEvaluationQuestionResult"]] = (
        relationship(
            backref="humanevaluation",
            cascade="all, delete",
            default_factory=list,
        )
    )


@table_registry.mapped_as_dataclass
class HumanEvaluationQuestion:
    __tablename__ = "human_evaluation_questions"

    id: Mapped[UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, init=False
    )
    title: Mapped[str]
    text: Mapped[str]
    command: Mapped[str]
    descriptor: Mapped[str]
    descriptor_code: Mapped[str]
    answer_item: Mapped[str]
    answer: Mapped[str]
    options: Mapped[str]
    created_at: Mapped[datetime] = mapped_column(
        init=False, server_default=func.now()
    )

    evaluation_id: Mapped[UUID] = mapped_column(
        ForeignKey("human_evaluations.id")
    )

    evaluation: Mapped["HumanEvaluation"] = relationship(
        back_populates="questions_for_evaluation", init=False
    )

    evaluation_results: Mapped[List["HumanEvaluationQuestionResult"]] = (
        relationship(
            back_populates="question",
            cascade="all, delete",
            default_factory=list,
        )
    )


@table_registry.mapped_as_dataclass
class HumanEvaluationQuestionResult:
    __tablename__ = "human_evaluation_questions_results"
    __table_args__ = (
        UniqueConstraint(
            "question_id", "evaluator_id", name="uq_question_id_evaluator_id"
        ),
    )

    id: Mapped[UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, init=False
    )

    evaluation_id: Mapped[UUID] = mapped_column(
        ForeignKey("human_evaluations.id")
    )

    question_id: Mapped[UUID] = mapped_column(
        ForeignKey("human_evaluation_questions.id", ondelete="CASCADE"),
    )

    evaluator_id: Mapped[UUID] = mapped_column(UUID(as_uuid=True))

    question: Mapped["HumanEvaluationQuestion"] = relationship(
        back_populates="evaluation_results", init=False
    )

    considers_relevance: Mapped[bool] = mapped_column(
        default=None, nullable=True
    )
    considers_answerability: Mapped[bool] = mapped_column(
        default=None, nullable=True
    )
    utility: Mapped[int] = mapped_column(default=None, nullable=True)

    created_at: Mapped[datetime] = mapped_column(
        init=False, server_default=func.now()
    )
