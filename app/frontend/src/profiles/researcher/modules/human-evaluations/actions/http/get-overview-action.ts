'use server'

import { authActionClient } from "@/external/libs/safe-action";
import { evaluationIdSchema } from "@/shared/schemas/evaluation-id-schema";
import { getOverviewUseCase } from "../../core/usecases/get-overview-use-case";

export const getOverviewAction = authActionClient
.schema(evaluationIdSchema)
.action(async ({ parsedInput, ctx: { httpClient, accessToken } }) => {
  const { evaluationId } = parsedInput;
  const response = await getOverviewUseCase({ evaluationId, httpClient, token: accessToken });
  return response;
}) 
