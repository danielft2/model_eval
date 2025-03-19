import { EvaluateModelResponse } from "@/automatic-evaluations/infra/http/responses/evaluate-model";
import { tEvaluateModelSchema } from "@/automatic-evaluations/schemas/evaluate-model-schema";
import { tUseCase } from "@/core/http/contracts/use-case";

type tEvaluateModelUseCasData = tUseCase & tEvaluateModelSchema;

export async function evaluateModelUseCase({ httpClient, modelId }: tEvaluateModelUseCasData) {
  const response = await httpClient.request<EvaluateModelResponse>({
    method: "PUT",
    endpoint: `/evaluate-model/${modelId}`
  });

  return response;
}
