import { tUseCase } from "@/core/http/contracts/use-case";
import { tCreateEvaluationData } from "../../schemas/create-evalution-schema";

type CreateEvaluationUseCaseData = tUseCase & {
  data: tCreateEvaluationData,
  evaluationId?: number,
}

export async function createEvaluationUseCase({ data, token, evaluationId, httpClient }: CreateEvaluationUseCaseData) {
  const method = evaluationId ? "PUT" : "POST";
  const endpoint = evaluationId
    ? `/automatic-evaluation/${evaluationId}`
    : "/automatic-evaluation";

  const response = await httpClient.request({
    method,
    endpoint,
    body: { ...data, metric_id: parseInt(data.metric_id) },
    options: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });

  return response;
}