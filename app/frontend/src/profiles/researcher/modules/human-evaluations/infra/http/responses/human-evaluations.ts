import { tHumanEvaluationStatus } from "@/core/types/human-evaluation-status";

export type HumanEvaluationResponse = {
  id: string;
  title: string;
  use_relevance: boolean;
  use_answerability: boolean;
  use_utility: boolean;
  status: tHumanEvaluationStatus;
  number_of_evaluations: number;
}

