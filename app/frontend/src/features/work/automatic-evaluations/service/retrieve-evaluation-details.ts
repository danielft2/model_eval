import { retrieveAccessToken } from "@/actions/retrieve-access-token";
import { fetchClient } from "@/api/fetch-client";
import { ResponseApp } from "@/api/response";
import { AutomaticEvaluationDetailsResponse } from "../http/responses/automatic-evaluation-details";
import { REVALIDATE_TAGS } from "@/constants/revalidate-tags";
import { verifyResponse } from "@/api/verify-response";

export async function retrieveEvaluationDetails(
  evaluationId: string
): Promise<ResponseApp<AutomaticEvaluationDetailsResponse, string>> {
  const token = await retrieveAccessToken();
  const response =
    await fetchClient.request<AutomaticEvaluationDetailsResponse>({
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

  await verifyResponse(response);

  return {
    data: response?.data || null,
    error: response?.error?.message || null,
  };
}
