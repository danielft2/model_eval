import { fetchClient } from "@/external/http/client/fetch-client";
import { getAccessToken } from "@/shared/actions/utils/auth/get-access-token-action";
import { QuestionOverview } from "../../external/http/responses/question-overview";

type GetQuestionOverviewUseCaseData = {
  questionId: number;
}

export async function getQuestionOverviewUseCase({ questionId }: GetQuestionOverviewUseCaseData) {
  const token = await getAccessToken();
  const response = await fetchClient.request<QuestionOverview>({
    method: "GET",
    endpoint: `/human-evaluation/overview/question/${questionId}`,
    options: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: {
        revalidate: 60
      }
    },
  });

  return response;
}