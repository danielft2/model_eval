"use server"

import { authActionClient } from "@/external/libs/safe-action";
import { evaluationIdSchema } from "@/shared/schemas/evaluation-id-schema";
import { changeStatusUseCase } from "../../core/usecases/change-status-use-case";

export const changeStatusAction = authActionClient
.schema(evaluationIdSchema)
.action(async ({ parsedInput, ctx: { httpClient, accessToken } }) => {
  const { evaluationId } = parsedInput;
  const response = await changeStatusUseCase({ evaluationId, httpClient, token: accessToken });

  return response;
})