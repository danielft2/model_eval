import { tUseCase } from "@/core/http/contracts/use-case";

type tCheckHasEvaluationsUseCaseData = tUseCase & {};

export async function checkHasEvaluationsUseCase({ httpClient }: tCheckHasEvaluationsUseCaseData) {
  const response = await httpClient.request<{ has_evaluations: boolean }>({
    method: "GET",
    endpoint: "/evaluations/has-evaluations"
  });
  return response;
}
