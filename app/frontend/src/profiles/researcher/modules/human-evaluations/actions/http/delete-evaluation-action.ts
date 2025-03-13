'use server'

import { revalidateTag } from "next/cache";
import { getAccessToken } from "@/shared/actions/utils/auth/get-access-token-action";
import { fetchClient } from "@/external/http/fetch-client";
import { ResponseApp } from "@/core/http/interfaces/response-app";
import { REVALIDATE_TAGS } from "@/shared/constants/revalidate-tags";
import { verifyResponse } from "@/shared/actions/utils/auth/verify-response-action";

export async function deleteHumanEvaluationAction(evaluationId: string): Promise<ResponseApp<string, string>> {
  const token = await getAccessToken();

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