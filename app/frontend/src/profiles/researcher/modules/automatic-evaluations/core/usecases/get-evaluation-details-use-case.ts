import { tUseCase } from "@/core/http/contracts/use-case";
import { REVALIDATE_TAGS } from "@/shared/constants/revalidate-tags";
import { AutomaticEvaluationDetailsResponse } from "../../external/http/responses/automatic-evaluation-details";

type AutomaticEvaluationDetailsUseCase = tUseCase & {
  evaluationId: number;
}

export async function getEvaluationDetailsUseCase({ token, httpClient, evaluationId }: AutomaticEvaluationDetailsUseCase) {
  const response = await httpClient.request<AutomaticEvaluationDetailsResponse>({
    method: "GET",
    endpoint: `/automatic-evaluation/${evaluationId}`,
    options: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: {
        tags: [REVALIDATE_TAGS.AUTOMATIC_EVALUATION_DETAILS],
      },
    },
  });
  
  return response;
}
