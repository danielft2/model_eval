import { z } from "zod";

export const evaluateModelSchema = z.object({
  modelId: z.number(),
})

export type tEvaluateModelData = z.infer<typeof evaluateModelSchema>;