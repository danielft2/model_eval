"use server";

import { getAccessToken } from "@/shared/actions/utils/auth/get-access-token-action";
import { fetchClient } from "@/external/http/fetch-client";
import { ResponseApp } from "@/core/http/interfaces/response-app";
import { revalidateTag } from "next/cache";
import { AutomaticEvaluationInsertDto } from "../../external/http/dtos/automatic-evaluation-insert";

export async function createEvaluationAction(
  data: AutomaticEvaluationInsertDto,
  evaluationId?: number
): Promise<ResponseApp<string, string>> {
  const token = await getAccessToken();
  const method = evaluationId ? "PUT" : "POST";
  const endpoint = evaluationId
    ? `/automatic-evaluation/${evaluationId}`
    : "/automatic-evaluation";

  const response = await fetchClient.request({
    method,
    endpoint,
    body: { ...data, metric_id: parseInt(data.metric_id) },
    options: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });

  if (!response.error) {
    revalidateTag("automatic-evaluations");
  }

  return {
    data: response?.message || "",
    error: response?.error?.message || "",
  };
}
