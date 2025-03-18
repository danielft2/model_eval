import { tUseCase } from "@/core/http/contracts/use-case";
import { QuestionOverview } from "../../external/http/responses/question-overview";

type GetQuestionOverviewUseCaseData = tUseCase & {
  questionId: number;
}

export async function getQuestionOverviewUseCase({ questionId, httpClient, token }: GetQuestionOverviewUseCaseData) {
  const response = await httpClient.request<QuestionOverview>({
    method: "GET",
    endpoint: `/human-evaluation/overview/question/${questionId}`,
    options: {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    },
  });

  return response;
}