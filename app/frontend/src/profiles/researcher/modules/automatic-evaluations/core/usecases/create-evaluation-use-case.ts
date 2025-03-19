import { tCreateEvaluationSchema } from "@/automatic-evaluations/schemas/create-evaluation-schema";
import { tUseCase } from "@/core/http/contracts/use-case";

type tCreateEvaluationUseCaseData = tUseCase & tCreateEvaluationSchema;

export async function createEvaluationUseCase({ data, evaluationId, httpClient }: tCreateEvaluationUseCaseData) {
  const method = evaluationId ? "PUT" : "POST";
  const endpoint = evaluationId
    ? `/automatic-evaluation/${evaluationId}`
    : "/automatic-evaluation";

  const response = await httpClient.request({
    method,
    endpoint,
    body: { ...data, metric_id: parseInt(data.metric_id) }
  });

  return response;
}