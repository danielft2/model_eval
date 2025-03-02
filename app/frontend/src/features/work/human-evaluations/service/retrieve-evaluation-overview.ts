'use server'

import { retrieveAccessToken } from "@/actions/retrieve-access-token";
import { fetchClient } from "@/api/fetch-client";
import { ResponseApp } from "@/api/response";
import { HumanEvaluationOverview } from "../http/responses/human-evaluation-overview";
import { verifyResponse } from "@/api/verify-response";

export async function retrieveHumanEvaluationOverview(
  evaluationId: string
): Promise<ResponseApp<HumanEvaluationOverview, string>> {
  const token = await retrieveAccessToken();
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
