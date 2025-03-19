"use server";

import { getOverviewAllQuestionsUseCase } from "@/human-evaluations/core/usecases/get-overview-all-questions-use-case";
import { getOverviewAllQuestionsSchema } from "@/human-evaluations/schemas/get-overview-all-questions-schema";
import { authActionClient } from "@/shared/libs/safe-action";

export const getOverviewAllQuestionsAction = authActionClient
.schema(getOverviewAllQuestionsSchema)
.action(async ({ parsedInput, ctx: { httpClient } }) => {
  const { evaluationId, descriptor } = parsedInput;
  const response = await getOverviewAllQuestionsUseCase({ evaluationId, descriptor, httpClient });
  return response;
})
