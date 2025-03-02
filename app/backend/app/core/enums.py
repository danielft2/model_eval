from enum import Enum


class EvaluationType(Enum):
    AUTOMATIC = 1
    HUMAN = 2


class MetricType(Enum):
    PERPLEXITY = 1


class UtilityMetricType(Enum):
    NOT_USEFUL = 1
    USEFUL_WITH_IMPORTANTS_EDITS = 2
    USEFUL_WITH_MINOR_EDITS = 3
    USEFUL_WITHOUT_EDITS = 4


class TaskType(Enum):
    QUESTION_GENERATE = 1
    QUESTION_ANSWER = 2
    DISTRACTOR_GENERATE = 3


class HumanEvaluationStatus(Enum):
    UNAVALIABLE = 1
    AVALIABLE = 2
