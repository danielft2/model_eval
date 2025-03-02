import { HumanEvaluationDetails } from "@/features/work/human-evaluations/http/responses/human-evaluation-details";

export type HumanEvaluationOverview = {
  evaluation: HumanEvaluationDetails;
  imported_questions: ImportedQuestion[];
};

export type ImportedQuestion = {
  id: string;
  descriptor_code: string;
}
