import { getAccessToken } from "@/shared/actions/utils/auth/get-access-token-action";
import { fetchClient } from "@/external/http/client/fetch-client";
import { ResponseApp } from "@/core/http/interfaces/response-app";
import { HumanEvaluationDetails } from "../externals/http/responses/human-evaluation-details";

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


  return {
    data: response.data || null,
    error: response.error?.message || "",
  };
}
