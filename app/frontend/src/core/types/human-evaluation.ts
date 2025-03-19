import { tHumanEvaluationStatus } from "./human-evaluation-status";

export type tHumanEvaluation = {
  id: string;
  title: string;
  instructions: string;
  use_relevance: boolean;
  use_answerability: boolean;
  use_utility: boolean;
  status: tHumanEvaluationStatus;
}

