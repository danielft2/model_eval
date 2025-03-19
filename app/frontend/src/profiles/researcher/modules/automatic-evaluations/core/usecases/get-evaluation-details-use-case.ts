import { AutomaticEvaluationDetailsResponse } from "@/automatic-evaluations/infra/http/responses/automatic-evaluation-details";
import { tUseCase } from "@/core/http/contracts/use-case";
import { REVALIDATE_TAGS } from "@/shared/constants/revalidate-tags";
import { tEvaluationIdSchema } from "@/shared/schemas/evaluation-id-schema";

type tAutomaticEvaluationDetailsUseCaseData = tUseCase & tEvaluationIdSchema;

export async function getEvaluationDetailsUseCase({ httpClient, evaluationId }: tAutomaticEvaluationDetailsUseCaseData) {
  const response = await httpClient.request<AutomaticEvaluationDetailsResponse>({
    method: "GET",
    endpoint: `/automatic-evaluation/${evaluationId}`,
    options: {
      next: {
        tags: [REVALIDATE_TAGS.AUTOMATIC_EVALUATION_DETAILS],
      },
    },
  });
  
  return response;
}
