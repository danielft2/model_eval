import { z } from "zod";

export const getOverviewAllQuestionsSchema = z.object({
  evaluationId: z.string(),
  descriptor: z.string(),
});

export type tGetOverviewAllQuestionsSchema = z.infer<typeof getOverviewAllQuestionsSchema>;