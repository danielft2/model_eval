'use server'

import { revalidateTag } from "next/cache";

import { authActionClient } from "@/external/libs/safe-action";
import { REVALIDATE_TAGS } from "@/shared/constants/revalidate-tags";
import { evaluationIdSchema } from "@/shared/schemas/evaluation-id-schema";
import { deleteHumanEvaluationUseCase } from "../../core/usecases/delete-evaluation-use-case";

export const deleteHumanEvaluationAction = authActionClient
  .schema(evaluationIdSchema)
  .action(async ({ parsedInput, ctx: { httpClient, accessToken } }) => {
    const { evaluationId } = parsedInput;
    const response = await deleteHumanEvaluationUseCase({ evaluationId, httpClient, token: accessToken });

    revalidateTag(REVALIDATE_TAGS.HUMAN_EVALUATIONS)

    return response;
  })