import { z } from "zod";

export const evaluationIdSchema = z.object({
  evaluationId: z.string(),
})

export type tEvaluationIdSchema = z.infer<typeof evaluationIdSchema>;