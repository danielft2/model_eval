import z from "zod";

const modelConfigScheme = z
  .object({
    model_title_id: z.string().optional(),
    input_text: z.string().optional(),
  })
  .refine(
    (data) => {
      const { model_title_id, input_text } = data;
      return (model_title_id && input_text) || (!model_title_id && !input_text);
    },
    {
      message:
        "Ambos os campos devem ser preenchidos ou ambos devem estar vazios.",
      path: ["input_text"],
    }
  );

export const evaluationFormSchema = z.object({
  title: z.string().nonempty("O título é obrigatório."),
  metric_id: z
    .string()
    .min(1, "A métrica é obrigatória."),
  model_dg: modelConfigScheme,
  model_qg: modelConfigScheme,
  model_qa: modelConfigScheme,
});

export type tEvaluationFormSchema = z.infer<typeof evaluationFormSchema>;
