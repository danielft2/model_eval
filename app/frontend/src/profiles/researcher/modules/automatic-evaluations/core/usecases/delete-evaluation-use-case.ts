import { tUseCase } from "@/core/http/contracts/use-case";
import { tEvaluationIdSchema } from "@/shared/schemas/evaluation-id-schema";

type tDeleteEvaluationUseCaseData = tUseCase & tEvaluationIdSchema;

export async function deleteEvaluationUseCase({ httpClient, evaluationId }: tDeleteEvaluationUseCaseData) {
  const response = await httpClient.request({
    method: "DELETE",
    endpoint: `/automatic-evaluation/${evaluationId}`
  });

  return response;
}
