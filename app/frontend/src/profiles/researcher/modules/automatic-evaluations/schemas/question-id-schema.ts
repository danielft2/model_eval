import { z } from "zod";

export const questionIdSchema = z.object({
  questionId: z.number(),
})

export type tQuestionIdSchemaData = z.infer<typeof questionIdSchema>;