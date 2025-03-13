"use server";

import { fetchClient } from "@/external/http/fetch-client";
import { verifyResponse } from "@/shared/actions/utils/auth/verify-response-action";
import { EvaluationFormResponse } from "../http/responses/evaluation-form";
import { ResponseApp } from "@/core/http/interfaces/response-app";

export async function getEvaluationFormAction(
  key: string
): Promise<
  ResponseApp<EvaluationFormResponse, { status: number; message: string }>
> {
  const response = await fetchClient.request<EvaluationFormResponse>({
    method: "GET",
    endpoint: "/evaluations/evaluate-questions",
    options: {
      headers: {
        Authorization: `Bearer ${key}`,
      },
    },
  });

  await verifyResponse(response);

  return {
    data: response.data || null,
    error: {
      status: response.status_code,
      message: response.error?.message || "",
    },
  };
}
