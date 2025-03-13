import { HumanEvaluation } from "@/profiles/researcher/modules/human-evaluations/core/types/human-evaluation";
import { ImportedQuestion } from "@/core/types/imported-question";

type Evaluation = Omit<HumanEvaluation, "id">;

export type EvaluationFormResponse = {
  questions: ImportedQuestion[];
  evaluation: Evaluation;
}
