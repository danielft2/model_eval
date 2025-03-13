import { getAccessToken } from "@/shared/actions/utils/auth/get-access-token-action";
import { fetchClient } from "@/external/http/fetch-client";
import { verifyResponse } from "@/shared/actions/utils/auth/verify-response-action";
import { HumanEvaluationDetails } from "../../http/responses/human-evaluation-details";

export async function changeStatusAction(evaluationId: string) {
  const token = await getAccessToken();
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