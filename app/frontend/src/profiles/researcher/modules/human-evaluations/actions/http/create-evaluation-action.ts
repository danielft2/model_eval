"use server"

import { revalidateTag } from "next/cache";

import { createHumanEvaluationUseCase } from "@/human-evaluations/core/usecases/create-evaluation-use-case";
import { createEvaluationSchema } from "@/profiles/researcher/modules/human-evaluations/schemas/create-evaluation-schema";
import { REVALIDATE_TAGS } from "@/shared/constants/revalidate-tags";
import { authActionClient } from "@/shared/libs/safe-action";

export const createHumanEvaluationAction = authActionClient
  .schema(createEvaluationSchema)
  .action(async ({ parsedInput, ctx: { httpClient } }) => {
    const { evaluationId, data } = parsedInput;
    const response = await createHumanEvaluationUseCase({ evaluationId, data, httpClient });
    
    revalidateTag(REVALIDATE_TAGS.HUMAN_EVALUATIONS)
    
    return response;
  })

