"use server";

import { retrieveAccessToken } from "@/actions/retrieve-access-token";
import { fetchClient } from "@/api/fetch-client";
import { ResponseApp } from "@/api/response";
import { AutomaticEvaluationInsertDto } from "@/features/work/automatic-evaluations/http/dtos/automatic-evaluation-insert";
import { revalidateTag } from "next/cache";

export async function insertEvaluationAction(
  data: AutomaticEvaluationInsertDto,
  evaluationId?: number
): Promise<ResponseApp<string, string>> {
  const token = await retrieveAccessToken();
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
