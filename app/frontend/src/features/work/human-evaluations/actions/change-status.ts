import { retrieveAccessToken } from "@/actions/retrieve-access-token";
import { fetchClient } from "@/api/fetch-client";
import { verifyResponse } from "@/api/verify-response";
import { HumanEvaluationDetails } from "../http/responses/human-evaluation-details";

export async function changeStatusAction(evaluationId: string) {
  const token = await retrieveAccessToken();
  const response = await fetchClient.request<HumanEvaluationDetails>({
    endpoint: `/human-evaluation/${evaluationId}/change-status`,
    method: "PUT",
    options: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  })

  await verifyResponse(response);

  return {
    data: response.data || null,
    error: response.error?.message || '',
  }
}