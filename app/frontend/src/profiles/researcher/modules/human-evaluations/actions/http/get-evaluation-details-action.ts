"use server";

import { retrieveHumanEvaluation } from "@/human-evaluations/service/retrieve-evaluation";

export async function retrieveHumanEvaluationDetailsAction(evaluationId: string) {
  const response = await retrieveHumanEvaluation(evaluationId);
  return response;
}
