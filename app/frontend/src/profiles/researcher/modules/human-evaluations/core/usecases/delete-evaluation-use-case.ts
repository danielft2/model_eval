import { tUseCase } from "@/core/http/contracts/use-case";

type deleteHumanEvaluationUseCaseData = tUseCase & {
  evaluationId: string;
}

export async function deleteHumanEvaluationUseCase({ evaluationId, httpClient, token }: deleteHumanEvaluationUseCaseData) {
  const response = await httpClient.request({
    method: "DELETE",
    endpoint: `/human-evaluation/${evaluationId}`,
    options: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });


  return response;
}