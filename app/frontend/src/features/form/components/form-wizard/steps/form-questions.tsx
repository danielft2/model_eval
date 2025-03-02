import { evaluateQuestionsAction } from "@/features/form/actions/evaluate-questions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { useWizard, Wizard } from "react-use-wizard";

import {
  FormQuestionsData,
  FormQuestionsSchema,
} from "@/features/form/schemas/form-questions";
import { useLoadingStore } from "@/store/loading-store";
import { ImportedQuestion } from "@/types/imported-question";

import { FormQuestion } from "./form-question";

type FormQuestionsProps = {
  questions: ImportedQuestion[];
  metricsUsed: {
    use_relevance: boolean;
    use_answerability: boolean;
    use_utility: boolean;
  };
};

export function FormQuestions({ questions, metricsUsed }: FormQuestionsProps) {
  const { key } = useParams<{ key: string }>();
  const changeLoading = useLoadingStore((state) => state.changeLoadingState);
  const { nextStep } = useWizard();

  const form = useForm<FormQuestionsData>({
    defaultValues: {
      questions: questions?.map((question) => ({
        id: question.id,
        considered_answerability: metricsUsed.use_answerability
          ? undefined
          : null,
        considered_relevance: metricsUsed.use_relevance ? undefined : null,
        utility: metricsUsed.use_utility ? undefined : null,
      })),
    },
    mode: "all",
    resolver: zodResolver(FormQuestionsSchema),
  });

  const { fields } = useFieldArray({
    name: "questions",
    control: form.control,
  });

  const handleSubmit = async (data: FormQuestionsData) => {
    changeLoading(true);
    const response = await evaluateQuestionsAction({
      questions: data.questions,
      key,
    });
    if (response.data) nextStep();
    changeLoading(false);
  };

  return (
    <FormProvider {...form}>
      <Wizard>
        {fields.map((field, index) => (
          <FormQuestion
            key={field.id}
            index={index}
            question={questions[index]}
            metricsUsed={metricsUsed}
            onFinishEvaluation={form.handleSubmit(handleSubmit)}
          />
        ))}
      </Wizard>
    </FormProvider>
  );
}
