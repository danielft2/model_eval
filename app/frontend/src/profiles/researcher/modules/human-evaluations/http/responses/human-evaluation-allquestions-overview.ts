import { eBinaryMetricOption, eUtilityMetricScale } from "@/core/enums";

export type MetricsResult = {
  relevance: eBinaryMetricOption;
  answerability: eBinaryMetricOption;
  utility: eUtilityMetricScale;
};

export type HumanEvaluationAllQuestionsOverview = {
  num_questions_of_evaluator: number;
  number_of_evaluations: number;
  number_questions_evaluated: number;
  number_ungraded_questions: number;
  metrics_result: MetricsResult;
};