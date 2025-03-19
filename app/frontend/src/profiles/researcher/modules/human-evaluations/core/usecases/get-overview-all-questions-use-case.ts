import { tUseCase } from "@/core/http/contracts/use-case";
import { HumanEvaluationAllQuestionsOverview } from "@/human-evaluations/infra/http/responses/human-evaluation-allquestions-overview";
import { tGetOverviewAllQuestionsSchema } from "@/human-evaluations/schemas/get-overview-all-questions-schema";

type getOverviewAllQuestionsUseCaseData = tUseCase & tGetOverviewAllQuestionsSchema;

export async function getOverviewAllQuestionsUseCase({ evaluationId, descriptor = "0", httpClient }:
  getOverviewAllQuestionsUseCaseData) {
  const endpoint =
    descriptor != "0"
      ? `/human-evaluation/overview/global-results/${evaluationId}?descriptor_code=${descriptor}`
      : `/human-evaluation/overview/global-results/${evaluationId}`;

  const response =
    await httpClient.request<HumanEvaluationAllQuestionsOverview>({
      method: "GET",
      endpoint
    });

  return response;
}
