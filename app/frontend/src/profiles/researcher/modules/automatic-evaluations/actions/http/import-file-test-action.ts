"use server";

import { revalidateTag } from "next/cache";

import { importFileTestUseCase } from "@/automatic-evaluations/core/usecases/import-file-test-use-case";
import { authActionClient } from "@/shared/libs/safe-action";
import { importFileTestSchema } from "@/shared/schemas/import-file-test-schema";

export const importFileTestAction = authActionClient
.schema(importFileTestSchema)
.action(async ({ parsedInput, ctx: { httpClient } }) => {
  const { evaluationId, file } = parsedInput;
  const response = await importFileTestUseCase({ evaluationId, file, httpClient });

  revalidateTag("evaluation-details");

  return response;
})

