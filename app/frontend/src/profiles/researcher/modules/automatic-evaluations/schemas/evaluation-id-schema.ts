import { z } from "zod";

export const evaluationIdSchema = z.object({
  evaluationId: z.number(),
})

export type tEvaluationIdSchemaData = z.infer<typeof evaluationIdSchema>;