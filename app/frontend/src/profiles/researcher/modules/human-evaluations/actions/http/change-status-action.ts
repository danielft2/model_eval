import { getAccessToken } from "@/shared/actions/utils/auth/get-access-token-action";
import { fetchClient } from "@/external/http/client/fetch-client";
import { HumanEvaluationDetails } from "../../externals/http/responses/human-evaluation-details";

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

  return {
    data: response.data || null,
    error: response.error?.message || '',
  }
}