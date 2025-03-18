import { z } from "zod";

export const evaluationIdSchema = z.object({
  evaluationId: z.string(),
})

export type tEvaluationIdSchemaData = z.infer<typeof evaluationIdSchema>;