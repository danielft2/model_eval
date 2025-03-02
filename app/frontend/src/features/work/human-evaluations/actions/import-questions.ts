'use server'

import { retrieveAccessToken } from "@/actions/retrieve-access-token";
import { fetchClient } from "@/api/fetch-client";
import { ResponseApp } from "@/api/response";
import { verifyResponse } from "@/api/verify-response";
import { HumanEvaluationOverview } from "../http/responses/human-evaluation-overview";

export async function importQuestionsAction(evaluationId: string, formData: FormData): Promise<ResponseApp<HumanEvaluationOverview, string>> {
  const token = await retrieveAccessToken();
  const response = await fetchClient.request<HumanEvaluationOverview>({
    endpoint: `/human-evaluation/${evaluationId}/import-questions`,
    method: "PUT",
    isMultipart: true,
    body: formData,
    options: {
      headers: {
        Authorization: `Bearer ${token}`,
      } 
    }
  })

  await verifyResponse(response);

  return {
    data: response.data ?? null,
    error: response.error?.message || ''
  }
}