import { z } from "zod";
import { evaluationFormSchema } from "./evalution-form-schema";

export const createEvaluationSchema = z.object({
  data: evaluationFormSchema,
  evaluationId: z.string().optional(),
})

export type tCreateEvaluationSchema = z.infer<typeof createEvaluationSchema>;