"use server";

import { revalidateTag } from "next/cache";

import { deleteEvaluationUseCase } from "@/automatic-evaluations/core/usecases/delete-evaluation-use-case";
import { REVALIDATE_TAGS } from "@/shared/constants/revalidate-tags";
import { authActionClient } from "@/shared/libs/safe-action";
import { evaluationIdSchema } from "@/shared/schemas/evaluation-id-schema";

export const deleteEvaluationAction = authActionClient
  .schema(evaluationIdSchema)
  .action(async ({ parsedInput, ctx: { httpClient } }) => {
    const { evaluationId } = parsedInput;
    const response = await deleteEvaluationUseCase({ evaluationId, httpClient });

    revalidateTag(REVALIDATE_TAGS.AUTOMATIC_EVALUATIONS)

    return response;
  })


