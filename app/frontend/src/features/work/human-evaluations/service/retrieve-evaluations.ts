import { retrieveAccessToken } from "@/actions/retrieve-access-token";
import { fetchClient } from "@/api/fetch-client";
import { ResponseApp } from "@/api/response";
import { REVALIDATE_TAGS } from "@/constants/revalidate-tags";
import { HumanEvaluationResponse } from "@/features/work/human-evaluations/http/responses/human-evaluations";

export async function retieveHumanEvaluations(): Promise<ResponseApp<HumanEvaluationResponse[], string>> {
  const token = await retrieveAccessToken();

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