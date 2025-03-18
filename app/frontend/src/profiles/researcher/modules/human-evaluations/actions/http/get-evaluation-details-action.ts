"use server"

import { authActionClient } from "@/external/libs/safe-action";
import { evaluationIdSchema } from "@/shared/schemas/evaluation-id-schema";
import { getHumanEvaluationUseCase } from "../../core/usecases/get-evaluation-use-case";

export const getHumanEvaluationAction = authActionClient
  .schema(evaluationIdSchema)
  .action(async ({ parsedInput, ctx: { httpClient, accessToken } }) => {
    const { evaluationId } = parsedInput;
    const response = getHumanEvaluationUseCase({ evaluationId, httpClient, token: accessToken });
    return response;
  })
