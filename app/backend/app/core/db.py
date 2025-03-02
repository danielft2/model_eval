from sqlalchemy import create_engine
from sqlalchemy.orm import Session

from app.core.config import Settings
from app.core.enums import (
    EvaluationType as EvaluationTypeEnum,
)
from app.core.enums import (
    HumanEvaluationStatus as HumanEvaluationStatusEnum,
)
from app.models_db import (
    EvaluationType,
    HumanEvaluationStatus,
    Metric,
    TaskType,
)

engine = create_engine(Settings().DATABASE_URL)


def init_db(session: Session) -> None:
    create_metrics(session)
    create_tasks_types(session)
    create_human_evaluation_status(session)


def create_metrics(session: Session):
    automatic_evaluation = EvaluationType(
        id=EvaluationTypeEnum.AUTOMATIC.value, name="Automática"
    )

    human_evaluation = EvaluationType(
        id=EvaluationTypeEnum.HUMAN.value, name="Humana"
    )

    perplexity = Metric(
        evaluation_type_id=EvaluationTypeEnum.AUTOMATIC.value,
        name="Perplexidade",
        description="A métrica perplexidade mede o quão previsível um texto é por um modelo de linguagem (LM) e é frequentemente usada para avaliar a fluência ou naturalidade do texto (quanto menor a perplexidade, mais fluente ou natural o texto é).",
    )

    relevance = Metric(
        evaluation_type_id=EvaluationTypeEnum.HUMAN.value,
        name="Relevância",
        description="Essa métrica tem como objetivo avaliar se o modelo compreendeu bem a entrada e conseguiu produzir saídas coerentes e apropriadas ao contexto. Possui uma escala binária (sim ou não).",
    )

    answerability = Metric(
        evaluation_type_id=EvaluationTypeEnum.HUMAN.value,
        name="Respondibilidade",
        description="Essa métrica tem como objetivo avaliar se o modelo respondeu adequadamente às perguntas feitas. Possui uma escala binária (sim ou não).",
    )

    utility = Metric(
        evaluation_type_id=EvaluationTypeEnum.HUMAN.value,
        name="Utilidade",
        description="Essa métrica tem como objetivo avaliar se o modelo produziu perguntas uteis para o contexto educacional.",
    )

    automatic_evaluation.metrics.append(perplexity)
    human_evaluation.metrics.extend([relevance, answerability, utility])

    session.add_all([automatic_evaluation, human_evaluation])
    session.commit()


def create_tasks_types(session: Session):
    question_generate = TaskType(name="Geração de perguntas")
    answer_question = TaskType(name="Respostas a perguntas")
    distractors_generate = TaskType(name="Geração de distratores")

    session.add_all([question_generate, answer_question, distractors_generate])
    session.commit()


def create_human_evaluation_status(session: Session):
    unavailable = HumanEvaluationStatus(
        id=HumanEvaluationStatusEnum.UNAVALIABLE.value, name="Indisponível"
    )
    available = HumanEvaluationStatus(
        id=HumanEvaluationStatusEnum.AVALIABLE.value, name="Disponível"
    )
    session.add_all([unavailable, available])
    session.commit()
