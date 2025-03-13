"use server";

import { getAccessToken } from "@/shared/actions/utils/auth/get-access-token-action";
import { fetchClient } from "@/external/http/fetch-client";
import { verifyResponse } from "@/shared/actions/utils/auth/verify-response-action";
import { EvaluateModelResponse } from "../../http/responses/evaluate-model";
import { ResponseApp } from "@/core/http/interfaces/response-app";

export async function evaluateModelAction(modelId: number): Promise<ResponseApp<EvaluateModelResponse, string>> {
  const token = await getAccessToken();

  const response = await fetchClient.request<EvaluateModelResponse>({
    method: "PUT",
    endpoint: `/evaluate-model/${modelId}`,
    options: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });

  console.log(response)

  await verifyResponse(response);

  return {
    data: response.data || null,
    error: response.error?.message || "",
  }
}
