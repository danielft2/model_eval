"use server";

import { getAccessToken } from "@/shared/actions/utils/auth/get-access-token-action";
import { fetchClient } from "@/external/http/fetch-client";
import { ResponseApp } from "@/core/http/interfaces/response-app";
import { verifyResponse } from "@/shared/actions/utils/auth/verify-response-action";
import { REVALIDATE_TAGS } from "@/shared/constants/revalidate-tags";
import { revalidateTag } from "next/cache";

export async function deleteEvaluationAction(
  evaluationId: number
): Promise<ResponseApp<string, string>> {
  const token = await getAccessToken();
  const response = await fetchClient.request({
    method: "DELETE",
    endpoint: `/automatic-evaluation/${evaluationId}`,
    options: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });
  
  await verifyResponse(response);
  if (response.message) revalidateTag(REVALIDATE_TAGS.AUTOMATIC_EVALUATIONS);

  return {
    data: response?.message || "",
    error: response?.error?.message || "",
  };
}
