"use server";

import { authActionClient } from "@/external/libs/safe-action";
import { revalidateTag } from "next/cache";
import { importFileTestUseCase } from "../../core/usecases/import-file-test-use-case";
import { importFileTestSchema } from "../../schemas/import-file-test-schema";

export const importFileTestAction = authActionClient
.schema(importFileTestSchema)
.action(async ({ parsedInput, ctx: { httpClient, accessToken } }) => {
  const { evaluationId, file } = parsedInput;
  const response = await importFileTestUseCase({ evaluationId, file, httpClient, token: accessToken });

  revalidateTag("evaluation-details");

  return response;
})

