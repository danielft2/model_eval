import * as RadioGroup from "@radix-ui/react-radio-group";
import { useCallback, useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { useWizard } from "react-use-wizard";

import { QuestionView } from "@/components/question-view";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Show } from "@/components/ui/show";
import { MetricAsk } from "@/features/form/components/metric-ask";
import { RadioAlternative } from "@/features/form/components/radio-alternative";
import { FormQuestionsData } from "@/features/form/schemas/form-questions";
import { useLoadingStore } from "@/store/loading-store";
import { ImportedQuestion } from "@/types/imported-question";
import { eBinaryMetricOption, eUtilityMetricScale } from "@/core/enums";

type FormQuestionsProps = {
  index: number;
  question: ImportedQuestion;
  onFinishEvaluation: VoidFunction;
  metricsUsed: {
    use_relevance: boolean;
    use_answerability: boolean;
    use_utility: boolean;
  };
};

export function FormQuestion({
  index,
  question,
  metricsUsed,
  onFinishEvaluation,
}: FormQuestionsProps) {
  const {
    control,
    trigger,
    formState: { errors },
  } = useFormContext<FormQuestionsData>();
  const { isLastStep, isFirstStep, stepCount, nextStep, previousStep } =
    useWizard();
  const isSubmitingForm = useLoadingStore((state) => state.isLoading);

  const handleNextQuestion = () => {
    if (isLastStep) onFinishEvaluation();
    else nextStep();
  };

  const triggerValidationsFields = useCallback(async () => {
    await Promise.all([
      trigger(`questions.${index}.considered_relevance`),
      trigger(`questions.${index}.considered_answerability`),
      trigger(`questions.${index}.utility`),
    ]);
  }, [index, trigger]);

  useEffect(() => {
    triggerValidationsFields();
  }, [triggerValidationsFields]);

  const isInvalidQuestion = Boolean(errors.questions?.[index]);
  const isNextButtonDisabled = isSubmitingForm || isInvalidQuestion;

  return (
    <div className="flex h-full">
      <ScrollArea className="h-full flex-1 p-8">
        <h1 className="mb-10 font-heading uppercase text-sm font-medium text-slate-600">
          Questão {index + 1} de {stepCount}
        </h1>
        <QuestionView question={question} />
      </ScrollArea>
      <div className="flex-1 flex flex-col justify-between p-8 pb-4 border-l border-slate-200 ">
        <div className="space-y-8">
          <Show when={metricsUsed.use_relevance}>
            <div className="space-y-5">
              <MetricAsk>
                Levando em consideração o descritor, o texto e as alternativas,
                em sua opinião você considera que essa questão é relevante?
              </MetricAsk>
              <Controller
                name={`questions.${index}.considered_relevance`}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <RadioGroup.Root
                    className="flex flex-col gap-3 max-w-[250px]"
                    onValueChange={onChange}
                    value={String(value) || undefined}
                  >
                    <RadioGroup.Item
                      value={String(eBinaryMetricOption.CONSIDERED)}
                      asChild
                    >
                      <RadioAlternative letter="A">Sim, considero</RadioAlternative>
                    </RadioGroup.Item>
                    <RadioGroup.Item
                      value={String(eBinaryMetricOption.NOT_CONSIDERED)}
                      asChild
                    >
                      <RadioAlternative letter="B">Não considero</RadioAlternative>
                    </RadioGroup.Item>
                  </RadioGroup.Root>
                )}
              />
            </div>
          </Show>

          <Show when={metricsUsed.use_answerability}>
            <div className="space-y-5">
              <MetricAsk>
                Levando em consideração o descritor, o texto e as alternativas,
                em sua opinião você considera que essa questão é respondível?
              </MetricAsk>
              <Controller
                name={`questions.${index}.considered_answerability`}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <RadioGroup.Root
                    className="flex flex-col gap-3 max-w-[250px]"
                    onValueChange={onChange}
                    value={String(value) || undefined}
                  >
                    <RadioGroup.Item
                      value={String(eBinaryMetricOption.CONSIDERED)}
                      asChild
                    >
                      <RadioAlternative letter="A">Sim, considero</RadioAlternative>
                    </RadioGroup.Item>
                    <RadioGroup.Item
                      value={String(eBinaryMetricOption.NOT_CONSIDERED)}
                      asChild
                    >
                      <RadioAlternative letter="B">Não considero</RadioAlternative>
                    </RadioGroup.Item>
                  </RadioGroup.Root>
                )}
              />
            </div>
          </Show>

          <Show when={metricsUsed.use_utility}>
            <div className="space-y-5">
              <MetricAsk>
                Com base no descritor, no texto e nas alternativas apresentadas,
                em qual das escalas de utilidade abaixo você acredita que esta
                questão se encaixa melhor?
              </MetricAsk>

              <Controller
                control={control}
                name={`questions.${index}.utility`}
                render={({ field: { onChange, value } }) => (
                  <RadioGroup.Root
                    className="flex flex-col gap-3 max-w-[250px]"
                    onValueChange={onChange}
                    value={value?.toString() || undefined}
                  >
                    <RadioGroup.Item
                      value={String(eUtilityMetricScale.NOT_USEFUL)}
                      asChild
                    >
                      <RadioAlternative letter="A">Não útil</RadioAlternative>
                    </RadioGroup.Item>
                    <RadioGroup.Item
                      value={String(
                        eUtilityMetricScale.USEFUL_WITH_IMPORTANTS_EDITS
                      )}
                      asChild
                    >
                      <RadioAlternative letter="B">
                        Útil com edições importantes
                      </RadioAlternative>
                    </RadioGroup.Item>
                    <RadioGroup.Item
                      value={String(eUtilityMetricScale.USEFUL_WITH_MINOR_EDITS)}
                      asChild
                    >
                      <RadioAlternative letter="C">
                        Útil com pequenas edições
                      </RadioAlternative>
                    </RadioGroup.Item>
                    <RadioGroup.Item
                      value={String(eUtilityMetricScale.USEFUL_WITHOUT_EDITS)}
                      asChild
                    >
                      <RadioAlternative letter="D">Útil sem edições</RadioAlternative>
                    </RadioGroup.Item>
                  </RadioGroup.Root>
                )}
              />
            </div>
          </Show>
        </div>
        <div className="text-right space-x-2">
          <Show when={!isFirstStep}>
            <Button
              variant="secondary"
              disabled={isSubmitingForm}
              onClick={previousStep}
            >
              Anterior
            </Button>
          </Show>
          <Button disabled={isNextButtonDisabled} onClick={handleNextQuestion}>
            {isLastStep ? 'Finalizar' : 'Proxima'}
          </Button>
        </div>
      </div>
    </div>
  );
}
