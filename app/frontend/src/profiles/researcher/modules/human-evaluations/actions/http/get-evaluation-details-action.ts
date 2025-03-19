"use server"

import { getHumanEvaluationUseCase } from "@/human-evaluations/core/usecases/get-evaluation-use-case";
import { authActionClient } from "@/shared/libs/safe-action";
import { evaluationIdSchema } from "@/shared/schemas/evaluation-id-schema";

export const getHumanEvaluationAction = authActionClient
  .schema(evaluationIdSchema)
  .action(async ({ parsedInput, ctx: { httpClient } }) => {
    const { evaluationId } = parsedInput;
    const response = getHumanEvaluationUseCase({ evaluationId, httpClient });
    return response;
  })
