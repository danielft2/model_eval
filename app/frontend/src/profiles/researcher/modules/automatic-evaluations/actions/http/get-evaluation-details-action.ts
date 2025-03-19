"use server";

import { getEvaluationDetailsUseCase } from "@/automatic-evaluations/core/usecases/get-evaluation-details-use-case";
import { authActionClient } from "@/shared/libs/safe-action";
import { evaluationIdSchema } from "@/shared/schemas/evaluation-id-schema";

export const getEvaluationDetailsAction = authActionClient
  .schema(evaluationIdSchema)
  .action(async ({ parsedInput, ctx: { httpClient } }) => {
    const { evaluationId } = parsedInput;
    const response = await getEvaluationDetailsUseCase({ evaluationId, httpClient });
    return response
  })
