"use server";

import { retrieveEvaluationDetails } from "@/features/work/automatic-evaluations/service/retrieve-evaluation-details";

export async function retrieveEvaluationDetailsAction(evaluationId: string) {
  const response = await retrieveEvaluationDetails(evaluationId);
  return response;
}
