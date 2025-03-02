import { z } from "zod";

export const FormQuestionsSchema = z.object({
  questions: z.array(
    z.object({
      id: z.string(),
      considered_answerability: z
        .string()
        .nonempty()
        .nullable()
        .transform((val) => (val !== null ? Number(val) : val)),
      considered_relevance: z
        .string()
        .nonempty()
        .nullable()
        .transform((val) => (val !== null ? Number(val) : val)),
      utility: z
        .string()
        .nonempty()
        .nullable()
        .transform((val) => (val !== null ? Number(val) : val)),
    })
  ),
});

export type FormQuestionsData = z.infer<typeof FormQuestionsSchema>;
