import { tUseCase } from "@/core/http/contracts/use-case";
import { REVALIDATE_TAGS } from "@/shared/constants/revalidate-tags";
import { HumanEvaluationResponse } from "@/human-evaluations/infra/http/responses/human-evaluations";

type getHumanEvaluationsUseCaseData = tUseCase & {};

export async function getHumanEvaluationsUseCase({ httpClient }: getHumanEvaluationsUseCaseData) {
  const response = await httpClient.request<HumanEvaluationResponse[]>({
    method: "GET",
    endpoint: "/human-evaluation",
    options: {
      next: {
        tags: [REVALIDATE_TAGS.HUMAN_EVALUATIONS],
      },
    },
  });

  return response;
}