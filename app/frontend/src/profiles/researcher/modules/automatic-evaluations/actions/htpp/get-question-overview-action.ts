import { getAccessToken } from "@/shared/actions/utils/auth/get-access-token-action";
import { fetchClient } from "@/external/http/fetch-client";
import { ResponseApp } from "@/core/http/interfaces/response-app";
import { verifyResponse } from "@/shared/actions/utils/auth/verify-response-action";

import { QuestionOverview } from "../../http/responses/question-overview";

export async function getQuestionOverview(questionId: string): Promise<ResponseApp<QuestionOverview, string>> {
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
  
  await verifyResponse(response);

  return {
    data: response.data || null,
    error: response.error?.message || "",
  }
}