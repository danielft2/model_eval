"use server";

import { retrieveAccessToken } from "@/actions/retrieve-access-token";
import { fetchClient } from "@/api/fetch-client";
import { ResponseApp } from "@/api/response";
import { verifyResponse } from "@/api/verify-response";
import { revalidateTag } from "next/cache";

export async function importFileTestAction(
  evaluationId: string,
  form: FormData
): Promise<ResponseApp<string, string>> {
  const token = await retrieveAccessToken();
  const response = await fetchClient.request<{ file_name_id: string }>({
    method: "POST",
    endpoint: `/automatic-evaluation/${evaluationId}/import-file-test`,
    isMultipart: true,
    body: form,
    options: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });

  await verifyResponse(response);
  if (response.data) revalidateTag("evaluation-details");

  return {
    data: response.message || "",
    error: response.error?.message || "",
  };
}
