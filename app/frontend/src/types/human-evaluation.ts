import { HumanEvaluationStatus } from "@/types/human-evaluation-status";

export type HumanEvaluation = {
  id: string;
  title: string;
  instructions: string;
  use_relevance: boolean;
  use_answerability: boolean;
  use_utility: boolean;
  status: HumanEvaluationStatus;
}

