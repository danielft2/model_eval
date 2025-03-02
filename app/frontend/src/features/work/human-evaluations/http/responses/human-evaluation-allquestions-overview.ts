import { BinaryMetric, UtilityMetric } from "@/features/work/human-evaluations/types/human-metrics";

export type MetricsResult = {
  relevance: BinaryMetric;
  answerability: BinaryMetric;
  utility: UtilityMetric;
};

export type HumanEvaluationAllQuestionsOverview = {
  num_questions_of_evaluator: number;
  number_of_evaluations: number;
  number_questions_evaluated: number;
  number_ungraded_questions: number;
  metrics_result: MetricsResult;
};