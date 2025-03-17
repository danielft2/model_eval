import { getAccessToken } from "@/shared/actions/utils/auth/get-access-token-action";
import { fetchClient } from "@/external/http/client/fetch-client";
import { ResponseApp } from "@/core/http/interfaces/response-app";
import { REVALIDATE_TAGS } from "@/shared/constants/revalidate-tags";
import { HumanEvaluationResponse } from "../externals/http/responses/human-evaluations";

export async function retieveHumanEvaluations(): Promise<ResponseApp<HumanEvaluationResponse[], string>> {
  const token = await getAccessToken();

  const response = await fetchClient.request<HumanEvaluationResponse[]>({
    method: "GET",
    endpoint: "/human-evaluation",
    options: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: {
        tags: [REVALIDATE_TAGS.HUMAN_EVALUATIONS],
      },
    },
  });

  return {
    data: response.data || [],
    error: response.error?.message || null,
  }
}