import { fetchClient } from "@/external/http/client/fetch-client";
import { getAccessToken } from "@/shared/actions/utils/auth/get-access-token-action";
import { REVALIDATE_TAGS } from "@/shared/constants/revalidate-tags";
import { AutomaticEvaluationResponse } from "../../external/http/responses/automatic-evaluation-response";

export async function getEvaluationsUseCase() {
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

  return response;
}
