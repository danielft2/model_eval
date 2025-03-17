import { tImportedQuestion } from "@/core/types";
import { MetricsResult } from "@/human-evaluations/externals/http/responses/human-evaluation-allquestions-overview";

export type QuestionOverview = {
  question: tImportedQuestion;
  metrics_result: MetricsResult;
  number_of_evaluations: number;
}

