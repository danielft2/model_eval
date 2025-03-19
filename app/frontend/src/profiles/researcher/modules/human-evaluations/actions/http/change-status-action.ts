"use server"

import { changeStatusUseCase } from "@/human-evaluations/core/usecases/change-status-use-case";
import { authActionClient } from "@/shared/libs/safe-action";
import { evaluationIdSchema } from "@/shared/schemas/evaluation-id-schema";

export const changeStatusAction = authActionClient
.schema(evaluationIdSchema)
.action(async ({ parsedInput, ctx: { httpClient } }) => {
  const { evaluationId } = parsedInput;
  const response = await changeStatusUseCase({ evaluationId, httpClient });
  return response;
})