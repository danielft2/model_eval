"use server";

import { getAccessToken } from "@/shared/actions/utils/auth/get-access-token-action";
import { fetchClient } from "@/external/http/fetch-client";
import { ResponseApp } from "@/core/http/interfaces/response-app";
import { verifyResponse } from "@/shared/actions/utils/auth/verify-response-action";
import { revalidateTag } from "next/cache";

export async function importFileTestAction(
  evaluationId: string,
  form: FormData
): Promise<ResponseApp<string, string>> {
  const token = await getAccessToken();
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
