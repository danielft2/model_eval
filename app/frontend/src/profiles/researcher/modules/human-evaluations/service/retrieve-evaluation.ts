import { getAccessToken } from "@/shared/actions/utils/auth/get-access-token-action";
import { fetchClient } from "@/external/http/fetch-client";
import { ResponseApp } from "@/core/http/interfaces/response-app";
import { HumanEvaluationDetails } from "../http/responses/human-evaluation-details";
import { verifyResponse } from "@/shared/actions/utils/auth/verify-response-action";

export async function retrieveHumanEvaluation(
  evaluationId: string
): Promise<ResponseApp<HumanEvaluationDetails, string>> {
  const token = await getAccessToken();
  const response = await fetchClient.request<HumanEvaluationDetails>({
    method: "GET",
    endpoint: `/human-evaluation/${evaluationId}`,
    options: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });

  await verifyResponse(response);

  return {
    data: response.data || null,
    error: response.error?.message || "",
  };
}
