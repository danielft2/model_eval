"use server";

import { revalidateTag } from "next/cache";

import { createEvaluationUseCase } from "@/automatic-evaluations/core/usecases/create-evaluation-use-case";
import { createEvaluationSchema } from "@/automatic-evaluations/schemas/create-evaluation-schema";
import { REVALIDATE_TAGS } from "@/shared/constants/revalidate-tags";
import { authActionClient } from "@/shared/libs/safe-action";

export const createEvaluationAction = authActionClient
  .schema(createEvaluationSchema)
  .action(async ({ parsedInput, ctx: { httpClient } }) => {
    const { data, evaluationId } = parsedInput;
    const response = await createEvaluationUseCase({ data, evaluationId, httpClient });
    revalidateTag(REVALIDATE_TAGS.AUTOMATIC_EVALUATIONS)
    return response;
  });
