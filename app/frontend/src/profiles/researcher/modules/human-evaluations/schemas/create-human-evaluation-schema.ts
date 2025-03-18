import { z } from "zod";
import { humanEvaluationSchema } from "./human-evaluation-schema";

export const createHumanEvaluationSchema = z.object({
  data: humanEvaluationSchema,
  evaluationId: z.string()
});

export type tCreateHumanEvaluation = z.infer<typeof createHumanEvaluationSchema>;