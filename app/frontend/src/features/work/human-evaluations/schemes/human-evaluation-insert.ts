import { z } from "zod";

export const humanEvaluationInsertScheme = z.object({
  title: z.string().nonempty("O título da avaliação é obrigatório."),
  num_questions_of_evaluator: z
    .string()
    .refine(
      (value) => {
        const number = Number(value);
        return Number.isInteger(number) && number >= 1;
      },
      "O número de questões para cada avaliador deve ser maior que 0."
    ),
  instructions: z.string().nonempty("As instruções para o avaliador são obrigatórias."),
  use_relevance: z.boolean(),
  use_answerability: z.boolean(),
  use_utility: z.boolean(),
});
