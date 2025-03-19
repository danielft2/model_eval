import { tImportedQuestion } from "@/core/types";
import { HumanEvaluationDetails } from "./human-evaluation-details";

type tQuestions = Pick<tImportedQuestion, 'id' | 'descriptor_code'>;

export type HumanEvaluationOverview = {
  evaluation: HumanEvaluationDetails;
  imported_questions: tQuestions[];
};

