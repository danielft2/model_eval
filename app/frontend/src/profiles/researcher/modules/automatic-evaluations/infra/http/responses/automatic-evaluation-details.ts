import { Evaluation } from "@/automatic-evaluations/types/evaluation";
import { EvaluatedModel } from "@/automatic-evaluations/types/evaluated-model";

export type AutomaticEvaluationDetailsResponse = {
  evaluation: Evaluation;
  models: EvaluatedModel[];
};