"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogClose } from "@radix-ui/react-dialog";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Divider } from "@/components/ui/divider";
import { ErrorField } from "@/components/ui/error-field";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { insertHumanEvaluationAction } from "@/features/work/human-evaluations/actions/insert-evaluation";
import { retrieveHumanEvaluationDetailsAction } from "@/features/work/human-evaluations/actions/retrieve-evaluation-details";
import { humanEvaluationInsertScheme } from "@/features/work/human-evaluations/schemes/human-evaluation-insert";
import { cn } from "@/lib/utils";
import { useLoadingStore } from "@/store/loading-store";

import { EvaluationMetricsAccordion } from "./evaluation-metrics-accordion";

type HumanEvaluationInsertData = z.infer<typeof humanEvaluationInsertScheme>;
type HumanEvaluationInsertFormProps = {
  onClose: () => void;
};

export function HumanEvaluationInsertForm({
  onClose,
}: HumanEvaluationInsertFormProps) {
  const { isLoading, changeLoadingState } = useLoadingStore();
  const searchParams = useSearchParams();
  const editEvaluationId = searchParams.get("edit");

  const humanEvaluationForm = useForm<HumanEvaluationInsertData>({
    resolver: zodResolver(humanEvaluationInsertScheme),
    defaultValues: {
      title: "",
      instructions: "",
      num_questions_of_evaluator: undefined,
      use_relevance: false,
      use_answerability: false,
      use_utility: false,
    },
  });

  async function handleSubmitData(data: HumanEvaluationInsertData) {
    const shouldUseMetrics =
      data.use_relevance || data.use_answerability || data.use_utility;
    if (!shouldUseMetrics) {
      toast.error("Selecione pelo menos uma métrica de avaliação.");
      return;
    }

    try {
      changeLoadingState(true);
      const response = await insertHumanEvaluationAction(
        {
          ...data,
          num_questions_of_evaluator: parseInt(data.num_questions_of_evaluator),
        },
        editEvaluationId
      );

      if (response.data) {
        toast.success(response.data);
        onClose();
      } else if (response.error) {
        toast.error(response.error);
      }
    } finally {
      changeLoadingState(false);
    }
  }

  const retrieveDetails = useCallback(
    async (evaluationId: string) => {
      try {
        changeLoadingState(true);
        const response = await retrieveHumanEvaluationDetailsAction(
          evaluationId
        );
        if (response.data) {
          const data = response.data;

          humanEvaluationForm.reset({ 
            ...response.data,
            num_questions_of_evaluator: data.num_questions_of_evaluator.toString(),
          });
        }
      } finally {
        changeLoadingState(false);
      }
    },
    [humanEvaluationForm, changeLoadingState]
  );

  useEffect(() => {
    if (editEvaluationId) {
      retrieveDetails(editEvaluationId);
    }
  }, [editEvaluationId, retrieveDetails]);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = humanEvaluationForm;

  const titleErrorMessage = errors.title?.message;
  const numQuestionsErrorMessage = errors.num_questions_of_evaluator?.message;
  const instructionsErrorMessage = errors.instructions?.message;

  return (
    <form className="mt-7">
      <ScrollArea className="h-[400px]">
        <div className="px-0.5 space-y-7">
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="space-y-1 flex-1">
                <label
                  htmlFor="evaluation_title"
                  className="text-sm font-heading font-medium -tracking-wider text-slate-800"
                >
                  Título da avaliação
                </label>
                <Input
                  id="evaluation_title"
                  type="text"
                  className={titleErrorMessage && "invalid-field"}
                  {...register("title")}
                />
                <ErrorField message={titleErrorMessage} />
              </div>

              <div className="space-y-1 flex-1">
                <label
                  htmlFor="number_of_questions"
                  className="text-sm font-heading font-medium -tracking-wider text-slate-800"
                >
                  Numero de questões para cada avaliador
                </label>
                <Input
                  id="number_of_questions"
                  type="number"
                  className={numQuestionsErrorMessage && "invalid-field"}
                  {...register("num_questions_of_evaluator")}
                />
                <ErrorField message={numQuestionsErrorMessage} />
              </div>
            </div>

            <div className="space-y-1 flex-1">
              <label
                htmlFor="instructions"
                className="text-sm font-heading font-medium -tracking-wider text-slate-800"
              >
                Texto de instrução para avaliador
              </label>
              <Textarea
                id="instructions"
                placeholder="Texto inicial apresentado aos avaliadores"
                className={cn(
                  "max-h-[150px]",
                  instructionsErrorMessage && "invalid-field"
                )}
                {...register("instructions")}
              />
              <ErrorField message={instructionsErrorMessage} />
            </div>
          </div>

          <Divider />

          <FormProvider {...humanEvaluationForm}>
            <EvaluationMetricsAccordion />
          </FormProvider>
        </div>
      </ScrollArea>

      <div className="mt-[25px] flex gap-2 justify-end">
        <DialogClose asChild>
          <Button
            variant="secondary"
            className="min-w-[100px]"
            type="button"
            disabled={isLoading}
          >
            Cancelar
          </Button>
        </DialogClose>
        <Button
          type="submit"
          className="min-w-[100px]"
          disabled={isLoading}
          onClick={handleSubmit(handleSubmitData)}
        >
          Salvar
        </Button>
      </div>
    </form>
  );
}
