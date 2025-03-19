import { z } from "zod";
import { humanEvaluationSchema } from "./human-evaluation-schema";

export const createEvaluationSchema = z.object({
  data: humanEvaluationSchema,
  evaluationId: z.string()
});

export type tCreateEvaluationSchema = z.infer<typeof createEvaluationSchema>;