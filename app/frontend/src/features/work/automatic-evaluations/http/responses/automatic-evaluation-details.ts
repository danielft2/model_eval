import { Evaluation } from "@/features/work/automatic-evaluations/types/evaluation";
import { EvaluatedModel } from "@/features/work/automatic-evaluations/types/evaluated-model";

export type AutomaticEvaluationDetailsResponse = {
  evaluation: Evaluation;
  models: EvaluatedModel[];
};