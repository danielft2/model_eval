import { factoryHttpClient } from "@/infra/http/factory-http-client";
import { getAccessToken } from "@/shared/actions/utils/auth/get-access-token-action";
import { REVALIDATE_TAGS } from "@/shared/constants/revalidate-tags";
import { AutomaticEvaluationResponse } from "@/automatic-evaluations/infra/http/responses/automatic-evaluation-response";

export async function getEvaluationsUseCase() {
  const token = await getAccessToken();
  const httpClient = factoryHttpClient(token);

  const response = await httpClient.request<AutomaticEvaluationResponse[]>({
    method: "GET",
    endpoint: "/automatic-evaluation",
    options: {
      next: {
        tags: [REVALIDATE_TAGS.AUTOMATIC_EVALUATIONS],
      }
    },
  });

  return response;
}
