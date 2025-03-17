import { tUseCase } from "@/core/http/contracts/use-case";

type DeleteEvaluationUseCaseData = tUseCase & {
  evaluationId: number
}

export async function deleteEvaluationUseCase({ httpClient, token, evaluationId }: DeleteEvaluationUseCaseData) {
  const response = await httpClient.request({
    method: "DELETE",
    endpoint: `/automatic-evaluation/${evaluationId}`,
    options: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });

  return response;
}
