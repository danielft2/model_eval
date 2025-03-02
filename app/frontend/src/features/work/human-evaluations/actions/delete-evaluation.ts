'use server'

import { revalidateTag } from "next/cache";
import { retrieveAccessToken } from "@/actions/retrieve-access-token";
import { fetchClient } from "@/api/fetch-client";
import { ResponseApp } from "@/api/response";
import { REVALIDATE_TAGS } from "@/constants/revalidate-tags";
import { verifyResponse } from "@/api/verify-response";

export async function deleteHumanEvaluationAction(evaluationId: string): Promise<ResponseApp<string, string>> {
  const token = await retrieveAccessToken();

  const response = await fetchClient.request({
    method: "DELETE",
    endpoint: `/human-evaluation/${evaluationId}`,
    options: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });

  await verifyResponse(response);
  if (response.message) revalidateTag(REVALIDATE_TAGS.HUMAN_EVALUATIONS);

  return {
    data: response?.message || "",
    error: response?.error?.message || "",
  }
}