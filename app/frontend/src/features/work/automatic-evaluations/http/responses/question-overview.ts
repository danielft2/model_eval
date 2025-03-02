import { MetricsResult } from "@/features/work/human-evaluations/http/responses/human-evaluation-allquestions-overview";
import { ImportedQuestion } from "@/types/imported-question";

export type QuestionOverview = {
  question: ImportedQuestion;
  metrics_result: MetricsResult;
  number_of_evaluations: number;
}

