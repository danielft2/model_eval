"use server";

import { retrieveEvaluationDetails } from "@/profiles/researcher/modules/automatic-evaluations/http/retrieve-evaluation-details";

export async function retrieveEvaluationDetailsAction(evaluationId: string) {
  const response = await retrieveEvaluationDetails(evaluationId);
  return response;
}
