import { tUseCase } from "@/core/http/contracts/use-case";
import { HumanEvaluationDetails } from "../../externals/http/responses/human-evaluation-details";

type ChangeStatusUseCaseData = tUseCase & {
  evaluationId: string;
}

export async function changeStatusUseCase({ evaluationId, httpClient, token }: ChangeStatusUseCaseData) {
  const response = await httpClient.request<HumanEvaluationDetails>({
    endpoint: `/human-evaluation/${evaluationId}/change-status`,
    method: "PUT",
    options: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  })

  return response;
}