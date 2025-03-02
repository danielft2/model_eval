import { HumanEvaluation } from "@/types/human-evaluation";
import { ImportedQuestion } from "@/types/imported-question";

type Evaluation = Omit<HumanEvaluation, "id">;

export type EvaluationFormResponse = {
  questions: ImportedQuestion[];
  evaluation: Evaluation;
}
