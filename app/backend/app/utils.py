import re
from pandas import DataFrame
from app.core.enums import TaskType

from app.api.models.human_evaluation import (
    BinaryMetricResult,
    ResultMetricsEvaluation,
    UtilityMetricResult,
)
from app.core.enums import UtilityMetricType
from app.models_db import (
    HumanEvaluationQuestion,
    HumanEvaluationQuestionResult,
)


def extract_placeholders(input_text: str):
    return re.findall(r"{(.*?)}", input_text)


def get_outputs_for_task_DG(example):
    label_mapping = {label: i for i, label in enumerate(["a", "b", "c", "d"])}
    all_labels = [0, 1, 2, 3]

    opcoes =  example["opcoes"]
    resposta_i = label_mapping[example["resposta_item"]]
    distratores_ids = [i for i in all_labels if i != resposta_i]
    distratores = [opcoes[i] for i in distratores_ids]

    output = f"{distratores[0]}; {distratores[1]}; {distratores[2]}"
    return output


def preprocess_data(
    examples: DataFrame,
    input_text: str,
    task_type: TaskType,
):
    placeholders = extract_placeholders(input_text)

    inputs = [
        input_text.format(**dict(zip(placeholders, values)))
        for values in zip(*(examples[key] for key in placeholders))
    ]

    outputs = []

    if task_type == TaskType.QUESTION_GENERATE.value:
        outputs = examples["comando"]
    elif task_type == TaskType.QUESTION_ANSWER.value:
        outputs = examples["resposta"]
    elif task_type == TaskType.DISTRACTOR_GENERATE.value:
        examples = DataFrame(examples)
        outputs = examples.apply(get_outputs_for_task_DG, axis=1).astype(str).tolist()

    return inputs, outputs


def format_validation_errors(errors):
    formatted_errors = {}
    for error in errors:
        field_name = ".".join(map(str, error["loc"][1:]))
        formatted_errors[field_name] = {"message": error["msg"]}
    return formatted_errors


class ComputesMetricResultsQuestions:
    def __init__(
        self,
        questions: list[HumanEvaluationQuestionResult],
        use_relevance: bool,
        use_answerability: bool,
        use_utility: bool,
    ):
        self.questions = questions
        self.total_questions = len(questions)

        self.use_relevance = use_relevance
        self.use_answerability = use_answerability
        self.use_utility = use_utility

        self.utility_results = UtilityMetricResult(
            total_not_useful=0,
            total_useful_with_importants_edits=0,
            total_userful_with_minor_edits=0,
            total_useful_without_edits=0,
        )

        self.relevance_results = BinaryMetricResult(
            total_considered=0, total_not_considered=0
        )

        self.answerability_results = BinaryMetricResult(
            total_considered=0, total_not_considered=0
        )

        self.metrics_result = ResultMetricsEvaluation(
            relevance=self.relevance_results if self.use_relevance else None,
            answerability=self.answerability_results
            if self.use_answerability
            else None,
            utility=self.utility_results if self.use_utility else None,
        )

    def calculate_result(self) -> ResultMetricsEvaluation:
        for question in self.questions:
            self.compute_evaluation_result(question)

        if self.use_answerability:
            total_not_considered_answerability = (
                self.total_questions
                - self.answerability_results.total_considered
            )
            self.answerability_results.total_not_considered = (
                total_not_considered_answerability
            )

        if self.use_relevance:
            total_not_considered_relevance = (
                self.total_questions - self.relevance_results.total_considered
            )
            self.relevance_results.total_not_considered = (
                total_not_considered_relevance
            )

        return self.metrics_result

    def compute_evaluation_result(
        self, question: HumanEvaluationQuestionResult
    ):
        if self.use_relevance and question.considers_relevance:
            self.relevance_results.total_considered += 1

        if self.use_answerability and question.considers_answerability:
            self.answerability_results.total_considered += 1

        if self.use_utility:
            if question.utility == UtilityMetricType.NOT_USEFUL.value:
                self.utility_results.total_not_useful += 1
            elif (
                question.utility
                == UtilityMetricType.USEFUL_WITH_IMPORTANTS_EDITS.value
            ):
                self.utility_results.total_useful_with_importants_edits += 1
            elif (
                question.utility
                == UtilityMetricType.USEFUL_WITH_MINOR_EDITS.value
            ):
                self.utility_results.total_userful_with_minor_edits += 1
            elif (
                question.utility
                == UtilityMetricType.USEFUL_WITHOUT_EDITS.value
            ):
                self.utility_results.total_useful_without_edits += 1


class CalculatesOverviewQuestions:
    def __init__(
        self,
        imported_questions: list[HumanEvaluationQuestion],
        evaluated_questions: list[HumanEvaluationQuestionResult],
        descriptor_code: str | None = None,
    ):
        self.evaluated_questions = evaluated_questions
        self.imported_questions = imported_questions
        self.descriptor_code = descriptor_code

    def calculate(self):
        unique_evaluated_questions = []
        not_evaluated_questions = []
        questions_seen = set()

        if self.descriptor_code:
            self.imported_questions = list(
                filter(
                    lambda x: x.descriptor_code == f"{self.descriptor_code} ",
                    self.imported_questions,
                )
            )

        for evaluation in self.evaluated_questions:
            repr_question = repr(evaluation.question_id)
            if repr_question not in questions_seen:
                unique_evaluated_questions.append(evaluation.question_id)
                questions_seen.add(repr_question)

        for question in self.imported_questions:
            repr_question = repr(question.id)
            if repr_question not in questions_seen:
                not_evaluated_questions.append(question.id)

        number_of_evaluations = calculate_number_of_evaluations(
            self.evaluated_questions
        )
        number_questions_evaluated = len(unique_evaluated_questions)
        number_ungraded_questions = len(not_evaluated_questions)

        return {
            "number_of_evaluations": number_of_evaluations,
            "number_questions_evaluated": number_questions_evaluated,
            "number_ungraded_questions": number_ungraded_questions,
        }


def calculate_number_of_evaluations(
    evaluated_questions: list[HumanEvaluationQuestionResult],
):
    unique_evaluators = []
    evaluators_seen = set()

    for question in evaluated_questions:
        if question.evaluator_id not in evaluators_seen:
            unique_evaluators.append(question.evaluator_id)
            evaluators_seen.add(question.evaluator_id)

    return len(unique_evaluators)
