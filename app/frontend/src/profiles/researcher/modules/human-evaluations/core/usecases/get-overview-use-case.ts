import { tUseCase } from "@/core/http/contracts/use-case";
import { HumanEvaluationOverview } from "@/human-evaluations/infra/http/responses/human-evaluation-overview";
import { tEvaluationIdSchema } from "@/shared/schemas/evaluation-id-schema";

type tGetOverviewUseCaseData = tUseCase & tEvaluationIdSchema;

export async function getOverviewUseCase({ evaluationId, httpClient }: tGetOverviewUseCaseData) {
  const response = await httpClient.request<HumanEvaluationOverview>({
    method: "GET",
    endpoint: `/human-evaluation/overview/${evaluationId}`
  });

  return response;
}
