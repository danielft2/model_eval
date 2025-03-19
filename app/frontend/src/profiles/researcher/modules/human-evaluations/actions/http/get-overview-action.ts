'use server'

import { getOverviewUseCase } from "@/human-evaluations/core/usecases/get-overview-use-case";
import { authActionClient } from "@/shared/libs/safe-action";
import { evaluationIdSchema } from "@/shared/schemas/evaluation-id-schema";

export const getOverviewAction = authActionClient
.schema(evaluationIdSchema)
.action(async ({ parsedInput, ctx: { httpClient } }) => {
  const { evaluationId } = parsedInput;
  const response = await getOverviewUseCase({ evaluationId, httpClient });
  return response;
}) 
