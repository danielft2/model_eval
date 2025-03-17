'use server'

import { getAccessToken } from "@/shared/actions/utils/auth/get-access-token-action";
import { fetchClient } from "@/external/http/client/fetch-client";
import { ResponseApp } from "@/core/http/interfaces/response-app";
import { HumanEvaluationOverview } from "../../externals/http/responses/human-evaluation-overview";

export async function importQuestionsAction(evaluationId: string, formData: FormData): Promise<ResponseApp<HumanEvaluationOverview, string>> {
  const token = await getAccessToken();
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


  return {
    data: response.data ?? null,
    error: response.error?.message || ''
  }
}