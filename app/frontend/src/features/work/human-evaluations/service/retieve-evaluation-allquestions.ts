"use server";

import { retrieveAccessToken } from "@/actions/retrieve-access-token";
import { fetchClient } from "@/api/fetch-client";
import { ResponseApp } from "@/api/response";
import { verifyResponse } from "@/api/verify-response";
import { HumanEvaluationAllQuestionsOverview } from "../http/responses/human-evaluation-allquestions-overview";

export async function retrieveHumanEvaluationAllQuestionsOverview(
  evaluationId: string,
  descriptor: string = "0"
): Promise<ResponseApp<HumanEvaluationAllQuestionsOverview, string>> {
  const token = await retrieveAccessToken();
  const endpoint =
    descriptor != "0"
      ? `/human-evaluation/overview/global-results/${evaluationId}?descriptor_code=${descriptor}`
      : `/human-evaluation/overview/global-results/${evaluationId}`;

  const response =
    await fetchClient.request<HumanEvaluationAllQuestionsOverview>({
      method: "GET",
      endpoint,
      options: {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      },
    });

  await verifyResponse(response);

  return {
    data: response.data || null,
    error: response.error?.message || "",
  };
}
