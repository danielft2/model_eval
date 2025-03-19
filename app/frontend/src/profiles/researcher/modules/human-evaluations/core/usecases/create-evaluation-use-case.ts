import { tUseCase } from "@/core/http/contracts/use-case";
import { tCreateEvaluationSchema } from "@/profiles/researcher/modules/human-evaluations/schemas/create-evaluation-schema";

type createHumanEvaluationUseCaseData = tUseCase & tCreateEvaluationSchema;

export async function createHumanEvaluationUseCase({ evaluationId, data, httpClient }:
  createHumanEvaluationUseCaseData) {
  const method = evaluationId ? "PUT" : "POST";
  const endpoint = evaluationId
    ? `/human-evaluation/${evaluationId}`
    : "/human-evaluation";

  const response = await httpClient.request({
    endpoint,
    method,
    body: data
  });

  return response;
}
