import { tUseCase } from "@/core/http/contracts/use-case";
import { tHumanEvaluation } from "../../schemas/human-evaluation-schema";

type createHumanEvaluationUseCaseData = tUseCase & {
  data: tHumanEvaluation;
  evaluationId?: string | null;
}

export async function createHumanEvaluationUseCase({ evaluationId, data, httpClient, token }:
  createHumanEvaluationUseCaseData) {
  const method = evaluationId ? "PUT" : "POST";
  const endpoint = evaluationId
    ? `/human-evaluation/${evaluationId}`
    : "/human-evaluation";

  const response = await httpClient.request({
    endpoint,
    method,
    body: data,
    options: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });


  return response;
}
