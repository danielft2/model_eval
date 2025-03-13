'use server'

import { getAccessToken } from "@/shared/actions/utils/auth/get-access-token-action";
import { fetchClient } from "@/external/http/fetch-client";
import { ResponseApp } from "@/core/http/interfaces/response-app";
import { HumanEvaluationOverview } from "../http/responses/human-evaluation-overview";
import { verifyResponse } from "@/shared/actions/utils/auth/verify-response-action";

export async function retrieveHumanEvaluationOverview(
  evaluationId: string
): Promise<ResponseApp<HumanEvaluationOverview, string>> {
  const token = await getAccessToken();
  const response = await fetchClient.request<HumanEvaluationOverview>({
    method: "GET",
    endpoint: `/human-evaluation/overview/${evaluationId}`,
    options: {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    },
  });

  await verifyResponse(response);

  return {
    data: response.data || null,
    error: response.error?.message || "",
  };
}
