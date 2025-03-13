import { getAccessToken } from "@/shared/actions/utils/auth/get-access-token-action";
import { fetchClient } from "@/external/http/fetch-client";
import { ResponseApp } from "@/core/http/interfaces/response-app";
import { AutomaticEvaluationDetailsResponse } from "./responses/automatic-evaluation-details";
import { REVALIDATE_TAGS } from "@/shared/constants/revalidate-tags";
import { verifyResponse } from "@/shared/actions/utils/auth/verify-response-action";

export async function retrieveEvaluationDetails(
  evaluationId: string
): Promise<ResponseApp<AutomaticEvaluationDetailsResponse, string>> {
  const token = await getAccessToken();
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
