"use server"

import { revalidateTag } from "next/cache";

import { authActionClient } from "@/external/libs/safe-action";
import { REVALIDATE_TAGS } from "@/shared/constants/revalidate-tags";
import { createHumanEvaluationUseCase } from "../../core/usecases/create-evaluation-use-case";
import { createHumanEvaluationSchema } from "../../schemas/create-human-evaluation-schema";

export const createHumanEvaluationAction = authActionClient
  .schema(createHumanEvaluationSchema)
  .action(async ({ parsedInput, ctx: { httpClient, accessToken } }) => {
    const { evaluationId, data } = parsedInput;
    const response = await createHumanEvaluationUseCase({ evaluationId, data, httpClient, token: accessToken });
    
    revalidateTag(REVALIDATE_TAGS.HUMAN_EVALUATIONS)
    
    return response;
  })

