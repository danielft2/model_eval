"use server";

import { retrieveAccessToken } from "@/actions/retrieve-access-token";
import { fetchClient } from "@/api/fetch-client";
import { ResponseApp } from "@/api/response";
import { verifyResponse } from "@/api/verify-response";
import { REVALIDATE_TAGS } from "@/constants/revalidate-tags";
import { revalidateTag } from "next/cache";

export async function deleteEvaluationAction(
  evaluationId: number
): Promise<ResponseApp<string, string>> {
  const token = await retrieveAccessToken();
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
