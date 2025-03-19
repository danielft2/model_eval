import { z } from "zod";

export const questionIdSchema = z.object({
  questionId: z.number(),
})

export type tQuestionIdSchema = z.infer<typeof questionIdSchema>;