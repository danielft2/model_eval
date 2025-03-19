import { tUseCase } from "@/core/http/contracts/use-case";
import { HumanEvaluationDetails } from "@/human-evaluations/infra/http/responses/human-evaluation-details";
import { tEvaluationIdSchema } from "@/shared/schemas/evaluation-id-schema";

type tChangeStatusUseCaseData = tUseCase & tEvaluationIdSchema;

export async function changeStatusUseCase({ evaluationId, httpClient }: tChangeStatusUseCaseData) {
  const response = await httpClient.request<HumanEvaluationDetails>({
    endpoint: `/human-evaluation/${evaluationId}/change-status`,
    method: "PUT"
  })

  return response;
}