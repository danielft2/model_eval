import { tUseCase } from "@/core/http/contracts/use-case";

type checkHasEvaluationsUseCaseData = tUseCase & {};

export async function checkHasEvaluationsUseCase({ token, httpClient }: checkHasEvaluationsUseCaseData) {
  const response = await httpClient.request<{ has_evaluations: boolean }>({
    method: "GET",
    endpoint: "/evaluations/has-evaluations",
    options: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });
  return response;
}
