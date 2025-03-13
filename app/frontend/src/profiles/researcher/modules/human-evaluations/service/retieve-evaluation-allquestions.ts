"use server";

import { getAccessToken } from "@/shared/actions/utils/auth/get-access-token-action";
import { fetchClient } from "@/external/http/fetch-client";
import { ResponseApp } from "@/core/http/interfaces/response-app";
import { verifyResponse } from "@/shared/actions/utils/auth/verify-response-action";
import { HumanEvaluationAllQuestionsOverview } from "../http/responses/human-evaluation-allquestions-overview";

export async function retrieveHumanEvaluationAllQuestionsOverview(
  evaluationId: string,
  descriptor: string = "0"
): Promise<ResponseApp<HumanEvaluationAllQuestionsOverview, string>> {
  const token = await getAccessToken();
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
