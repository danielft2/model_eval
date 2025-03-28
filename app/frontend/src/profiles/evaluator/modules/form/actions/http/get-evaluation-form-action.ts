"use server";

import { ResponseApp } from "@/core/http/contracts/response-app";
import { EvaluationFormResponse } from "../../external/http/responses/evaluation-form";
import { factoryHttpClient } from "@/infra/http/factory-http-client";

export async function getEvaluationFormAction(
  key: string
): Promise<
  ResponseApp<EvaluationFormResponse, { status: number; message: string }>
> {
  const response = await factoryHttpClient().request<EvaluationFormResponse>({
    method: "GET",
    endpoint: "/evaluations/evaluate-questions",
    options: {
      headers: {
        Authorization: `Bearer ${key}`,
      },
    },
  });

  return {
    data: response.data || null,
    error: {
      status: response.status_code,
      message: response.error?.message || "",
    },
  };
}
