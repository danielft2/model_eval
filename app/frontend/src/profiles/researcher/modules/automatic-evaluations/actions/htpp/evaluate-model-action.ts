"use server";

import { authActionClient } from "@/external/libs/safe-action";
import { evaluateModelUseCase } from "../../core/usecases/evaluate-model-use-case";
import { evaluateModelSchema } from "../../schemas/evaluate-model-schema";

export const evaluateModelAction = authActionClient
  .schema(evaluateModelSchema)
  .action(async ({ parsedInput, ctx: { httpClient, accessToken } }) => {
    const { modelId } = parsedInput;
    const response = await evaluateModelUseCase({ modelId, httpClient, token: accessToken });
    return response;
  })
