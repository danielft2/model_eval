import { getAccessToken } from "@/shared/actions/utils/auth/get-access-token-action";
import { fetchClient } from "@/external/http/fetch-client";
import { ResponseApp } from "@/core/http/interfaces/response-app";
import { AutomaticEvaluationResponse } from "./responses/automatic-evaluation-response";
import { REVALIDATE_TAGS } from "@/shared/constants/revalidate-tags";
import { verifyResponse } from "@/shared/actions/utils/auth/verify-response-action";

export async function retrieveEvaluations(): Promise<
  ResponseApp<AutomaticEvaluationResponse[], string>
> {
  const token = await getAccessToken();
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
