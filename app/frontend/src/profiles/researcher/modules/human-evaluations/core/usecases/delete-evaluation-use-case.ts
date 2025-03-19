import { tUseCase } from "@/core/http/contracts/use-case";
import { tEvaluationIdSchema } from "@/shared/schemas/evaluation-id-schema";

type tDeleteHumanEvaluationUseCaseData = tUseCase & tEvaluationIdSchema;

export async function deleteHumanEvaluationUseCase({ evaluationId, httpClient }: tDeleteHumanEvaluationUseCaseData) {
  const response = await httpClient.request({
    method: "DELETE",
    endpoint: `/human-evaluation/${evaluationId}`
  });

  return response;
}