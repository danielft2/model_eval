import { retrieveAccessToken } from "@/actions/retrieve-access-token";
import { fetchClient } from "@/api/fetch-client";
import { ResponseApp } from "@/api/response";
import { verifyResponse } from "@/api/verify-response";

import { QuestionOverview } from "../http/responses/question-overview";

export async function getQuestionOverview(questionId: string): Promise<ResponseApp<QuestionOverview, string>> {
  const token = await retrieveAccessToken();
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