import { tUseCase } from "@/core/http/contracts/use-case";
import { EvaluateModelResponse } from "../../external/http/responses/evaluate-model";

type EvaluateModelUseCase = tUseCase & {
  modelId: number;
}

export async function evaluateModelUseCase({ token, httpClient, modelId }: EvaluateModelUseCase) {
  const response = await httpClient.request<EvaluateModelResponse>({
    method: "PUT",
    endpoint: `/evaluate-model/${modelId}`,
    options: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });

  return response;
}
