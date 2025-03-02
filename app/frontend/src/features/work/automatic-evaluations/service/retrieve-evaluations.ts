import { retrieveAccessToken } from "@/actions/retrieve-access-token";
import { fetchClient } from "@/api/fetch-client";
import { ResponseApp } from "@/api/response";
import { AutomaticEvaluationResponse } from "../http/responses/automatic-evaluation-response";
import { REVALIDATE_TAGS } from "@/constants/revalidate-tags";
import { verifyResponse } from "@/api/verify-response";

export async function retrieveEvaluations(): Promise<
  ResponseApp<AutomaticEvaluationResponse[], string>
> {
  const token = await retrieveAccessToken();
  const response = await fetchClient.request<AutomaticEvaluationResponse[]>({
    method: "GET",
    endpoint: "/automatic-evaluation",
    options: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: {
        tags: [REVALIDATE_TAGS.AUTOMATIC_EVALUATIONS],
      }
    },
  });

  await verifyResponse(response);

  return {
    data: response.data || [],
    error: response.error?.message || null,
  };
}
