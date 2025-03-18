"use server";

import { authActionClient } from "@/external/libs/safe-action";
import { getEvaluationDetailsUseCase } from "../../core/usecases/get-evaluation-details-use-case";
import { evaluationIdSchema } from "../../../../../../shared/schemas/evaluation-id-schema";

export const getEvaluationDetailsAction = authActionClient
  .schema(evaluationIdSchema)
  .action(async ({ parsedInput, ctx: { httpClient, accessToken } }) => {
    const { evaluationId } = parsedInput;
    const response = await getEvaluationDetailsUseCase({ evaluationId, httpClient, token: accessToken });
    return response
  })
