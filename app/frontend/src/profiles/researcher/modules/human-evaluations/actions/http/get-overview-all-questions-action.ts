"use server";

import { authActionClient } from "@/external/libs/safe-action";
import { getOverviewAllQuestionsUseCase } from "../../core/usecases/get-overview-all-questions-use-case";
import { getOverviewAllQuestionsSchema } from "../../schemas/get-overview-all-questions-schema";

export const getOverviewAllQuestionsAction = authActionClient
.schema(getOverviewAllQuestionsSchema)
.action(async ({ parsedInput, ctx: { httpClient, accessToken } }) => {
  const { evaluationId, descriptor } = parsedInput;
  const response = await getOverviewAllQuestionsUseCase({ evaluationId, descriptor, httpClient, token: accessToken });
  return response;
})
