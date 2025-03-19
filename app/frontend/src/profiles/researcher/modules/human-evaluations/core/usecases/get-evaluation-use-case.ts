import { tUseCase } from "@/core/http/contracts/use-case";
import { HumanEvaluationDetails } from "@/human-evaluations/infra/http/responses/human-evaluation-details";
import { tEvaluationIdSchema } from "@/shared/schemas/evaluation-id-schema";

type tGetHumanEvaluationUseCaseData = tUseCase & tEvaluationIdSchema;

export async function getHumanEvaluationUseCase({ evaluationId, httpClient }: tGetHumanEvaluationUseCaseData) {
  const response = await httpClient.request<HumanEvaluationDetails>({
    method: "GET",
    endpoint: `/human-evaluation/${evaluationId}`
  });

  return response;
}
