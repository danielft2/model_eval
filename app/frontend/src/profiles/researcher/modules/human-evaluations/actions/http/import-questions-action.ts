'use server'

import { authActionClient } from "@/external/libs/safe-action";
import { importFileTestSchema } from "@/shared/schemas/import-file-test-schema";
import { importQuestionsUseCase } from "../../core/usecases/import-questions-use-case";

export const importQuestionsAction = authActionClient
  .schema(importFileTestSchema)
  .action(async ({ parsedInput, ctx: { httpClient, accessToken } }) => {
    const { evaluationId, file } = parsedInput;
    const response = await importQuestionsUseCase({ evaluationId, file, httpClient, token: accessToken });
    return response;
  })
