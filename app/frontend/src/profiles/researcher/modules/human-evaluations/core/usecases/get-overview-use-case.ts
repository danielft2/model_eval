import { tUseCase } from "@/core/http/contracts/use-case";
import { HumanEvaluationOverview } from "../../externals/http/responses/human-evaluation-overview";

type GetOverviewUseCaseData = tUseCase & {
  evaluationId: string;
}

export async function getOverviewUseCase({ evaluationId, httpClient, token }: GetOverviewUseCaseData) {
  const response = await httpClient.request<HumanEvaluationOverview>({
    method: "GET",
    endpoint: `/human-evaluation/overview/${evaluationId}`,
    options: {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    },
  });

  return response;
}
