"use server";

import { retrieveAccessToken } from "@/actions/retrieve-access-token";
import { fetchClient } from "@/api/fetch-client";
import { verifyResponse } from "@/api/verify-response";
import { EvaluateModelResponse } from "../http/responses/evaluate-model";
import { ResponseApp } from "@/api/response";

export async function evaluateModelAction(modelId: number): Promise<ResponseApp<EvaluateModelResponse, string>> {
  const token = await retrieveAccessToken();

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
