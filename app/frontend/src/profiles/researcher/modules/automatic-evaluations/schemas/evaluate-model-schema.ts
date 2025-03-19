import { z } from "zod";

export const evaluateModelSchema = z.object({
  modelId: z.number(),
})

export type tEvaluateModelSchema = z.infer<typeof evaluateModelSchema>;