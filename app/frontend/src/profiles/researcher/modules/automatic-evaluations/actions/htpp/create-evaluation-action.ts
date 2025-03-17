"use server";

import { authActionClient } from "@/external/libs/safe-action";
import { REVALIDATE_TAGS } from "@/shared/constants/revalidate-tags";
import { revalidateTag } from "next/cache";
import { z } from "zod";
import { createEvaluationUseCase } from "../../core/usecases/create-evaluation-use-case";
import { createEvaluationSchema } from "../../schemas/create-evalution-schema";

const actionSchema = z.object({
  data: createEvaluationSchema,
  evaluationId: z.number().optional(),
})

export const createEvaluationAction = authActionClient
  .schema(actionSchema)
  .action(async ({ parsedInput, ctx: { accessToken, httpClient } }) => {
    const { data, evaluationId } = parsedInput;
    const response = await createEvaluationUseCase({ data, evaluationId, token: accessToken, httpClient });
    revalidateTag(REVALIDATE_TAGS.AUTOMATIC_EVALUATIONS)
    return response;
  });
