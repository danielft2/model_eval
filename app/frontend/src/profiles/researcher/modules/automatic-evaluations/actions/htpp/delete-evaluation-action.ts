"use server";

import { authActionClient } from "@/external/libs/safe-action";
import { REVALIDATE_TAGS } from "@/shared/constants/revalidate-tags";
import { revalidateTag } from "next/cache";
import { deleteEvaluationUseCase } from "../../core/usecases/delete-evaluation-use-case";
import { evaluationIdSchema } from "../../schemas/evaluation-id-schema";

export const deleteEvaluationAction = authActionClient
  .schema(evaluationIdSchema)
  .action(async ({ parsedInput, ctx: { accessToken, httpClient } }) => {
    const { evaluationId } = parsedInput;
    const response = await deleteEvaluationUseCase({ evaluationId, token: accessToken, httpClient });

    revalidateTag(REVALIDATE_TAGS.AUTOMATIC_EVALUATIONS)

    return response;
  })


