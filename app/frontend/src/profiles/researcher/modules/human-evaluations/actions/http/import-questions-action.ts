'use server'

import { importQuestionsUseCase } from "@/human-evaluations/core/usecases/import-questions-use-case";
import { authActionClient } from "@/shared/libs/safe-action";
import { importFileTestSchema } from "@/shared/schemas/import-file-test-schema";

export const importQuestionsAction = authActionClient
  .schema(importFileTestSchema)
  .action(async ({ parsedInput, ctx: { httpClient } }) => {
    const { evaluationId, file } = parsedInput;
    const response = await importQuestionsUseCase({ evaluationId, file, httpClient });
    return response;
  })
