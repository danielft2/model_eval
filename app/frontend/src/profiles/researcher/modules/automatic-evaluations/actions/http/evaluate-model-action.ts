"use server";

import { evaluateModelUseCase } from "@/automatic-evaluations/core/usecases/evaluate-model-use-case";
import { evaluateModelSchema } from "@/automatic-evaluations/schemas/evaluate-model-schema";
import { authActionClient } from "@/shared/libs/safe-action";

export const evaluateModelAction = authActionClient
  .schema(evaluateModelSchema)
  .action(async ({ parsedInput, ctx: { httpClient } }) => {
    const { modelId } = parsedInput;
    const response = await evaluateModelUseCase({ modelId, httpClient });
    return response;
  })
