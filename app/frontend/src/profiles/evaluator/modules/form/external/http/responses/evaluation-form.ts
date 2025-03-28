import { tHumanEvaluation } from "@/core/types/human-evaluation";
import { tImportedQuestion } from "@/core/types/imported-question";

type tHumanEvaluationWithoutId = Omit<tHumanEvaluation, "id">;

export type EvaluationFormResponse = {
  questions: tImportedQuestion[];
  evaluation: tHumanEvaluationWithoutId;
}
