import { tUseCase } from "@/core/http/contracts/use-case";
import { HumanEvaluationDetails } from "../../externals/http/responses/human-evaluation-details";

type getHumanEvaluationUseCaseData = tUseCase & {
  evaluationId: string;
}

export async function getHumanEvaluationUseCase({ evaluationId, httpClient, token }: getHumanEvaluationUseCaseData) {
  const response = await httpClient.request<HumanEvaluationDetails>({
    method: "GET",
    endpoint: `/human-evaluation/${evaluationId}`,
    options: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });

  return response;
}
