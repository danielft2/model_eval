import { QuestionOverview } from "@/automatic-evaluations/infra/http/responses/question-overview";
import { tQuestionIdSchema } from "@/automatic-evaluations/schemas/question-id-schema";
import { tUseCase } from "@/core/http/contracts/use-case";

type GetQuestionOverviewUseCaseData = tUseCase & tQuestionIdSchema;

export async function getQuestionOverviewUseCase({ questionId, httpClient }: GetQuestionOverviewUseCaseData) {
  const response = await httpClient.request<QuestionOverview>({
    method: "GET",
    endpoint: `/human-evaluation/overview/question/${questionId}`
  });

  return response;
}