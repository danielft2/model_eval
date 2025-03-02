export type HumanEvaluationInsertDto = {
  title: string;
  num_questions_of_evaluator: number;
  instructions: string;
  use_relevance: boolean;
  use_answerability: boolean;
  use_utility: boolean;
}