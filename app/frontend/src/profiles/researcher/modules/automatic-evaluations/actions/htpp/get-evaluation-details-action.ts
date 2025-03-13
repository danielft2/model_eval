"use server";

import { retrieveEvaluationDetails } from "../../external/http/retrieve-evaluation-details";

export async function getEvaluationDetailsAction(evaluationId: string) {
  const response = await retrieveEvaluationDetails(evaluationId);
  return response;
}
