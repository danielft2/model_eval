import { MetricsResult } from "@/profiles/researcher/modules/human-evaluations/http/responses/human-evaluation-allquestions-overview";
import { ImportedQuestion } from "@/core/types/imported-question";

export type QuestionOverview = {
  question: ImportedQuestion;
  metrics_result: MetricsResult;
  number_of_evaluations: number;
}

