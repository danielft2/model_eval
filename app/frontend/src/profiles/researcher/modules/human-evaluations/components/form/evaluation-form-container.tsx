"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { DialogClose } from "@radix-ui/react-dialog";
import { LoaderCircle } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";

import { createHumanEvaluationAction } from "@/human-evaluations/actions/http/create-evaluation-action";
import { getHumanEvaluationAction } from "@/human-evaluations/actions/http/get-evaluation-details-action";
import {
  humanEvaluationSchema,
  tHumanEvaluation,
} from "@/human-evaluations/schemas/human-evaluation-schema";
import { Button } from "@/shared/components/ui/button";
import { Divider } from "@/shared/components/ui/divider";
import { ErrorField } from "@/shared/components/ui/error-field";
import { Input } from "@/shared/components/ui/input";
import { ScrollArea } from "@/shared/components/ui/scroll-area";
import { ShowConditional } from "@/shared/components/ui/show-conditional";
import { Textarea } from "@/shared/components/ui/textarea";
import { cn } from "@/shared/libs/cn";

import { MetricsAccordionContainer } from "./metrics-accordion-container";

type EvaluationFormContainerProps = {
  onClose: () => void;
};

export function EvaluationFormContainer({
  onClose,
}: EvaluationFormContainerProps) {
  const {
    isPending: isCreateEvaluationPending,
    executeAsync: createHumanEvaluation,
  } = useAction(createHumanEvaluationAction, {
    onSuccess: ({ data }) => {
      toast.success(data?.message);
      onClose();
    },
    onError: ({ error }) => {
      toast.error(error.serverError);
    },
  });

  const {
    isPending: isEvaluationDetailsPending,
    executeAsync: getHumanEvaluationDetails,
  } = useAction(getHumanEvaluationAction, {
    onSuccess: ({ data }) => {
      const evaluation = data?.data;

      humanEvaluationForm.reset({
        ...evaluation,
        num_questions_of_evaluator:
          evaluation?.num_questions_of_evaluator.toString(),
      });
    },
    onError: ({ error }) => {
      toast.error(error.serverError);
    },
  });

  const searchParams = useSearchParams();
  const editEvaluationId = searchParams.get("edit");

  const humanEvaluationForm = useForm<tHumanEvaluation>({
    resolver: zodResolver(humanEvaluationSchema),
    defaultValues: {
      title: "",
      instructions: "",
      num_questions_of_evaluator: undefined,
      use_relevance: false,
      use_answerability: false,
      use_utility: false,
    },
  });

  async function handleSubmitData(data: tHumanEvaluation) {
    const shouldUseMetrics =
      data.use_relevance || data.use_answerability || data.use_utility;
    if (!shouldUseMetrics) {
      toast.error("Selecione pelo menos uma métrica de avaliação.");
      return;
    }

    await createHumanEvaluation({
      data: {
        ...data,
        num_questions_of_evaluator: data.num_questions_of_evaluator,
      },
      evaluationId: editEvaluationId || "",
    });
  }

  const retrieveDetails = useCallback(
    async (evaluationId: string) => {
      await getHumanEvaluationDetails({ evaluationId });
    },
    [getHumanEvaluationDetails]
  );

  useEffect(() => {
    if (editEvaluationId) retrieveDetails(editEvaluationId);
  }, [editEvaluationId, retrieveDetails]);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = humanEvaluationForm;

  const titleErrorMessage = errors.title?.message;
  const numQuestionsErrorMessage = errors.num_questions_of_evaluator?.message;
  const instructionsErrorMessage = errors.instructions?.message;

  const isFetchForm = isCreateEvaluationPending || isEvaluationDetailsPending;

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
            <MetricsAccordionContainer />
          </FormProvider>
        </div>
      </ScrollArea>

      <div className="mt-[25px] flex gap-2 justify-end">
        <DialogClose asChild>
          <Button
            variant="secondary"
            className="min-w-[100px]"
            type="button"
            disabled={isFetchForm}
          >
            Cancelar
          </Button>
        </DialogClose>
        <Button
          type="submit"
          className="min-w-[100px]"
          disabled={isFetchForm}
          onClick={handleSubmit(handleSubmitData)}
        >
          <ShowConditional
            condition={isCreateEvaluationPending}
            then={
              <>
                <LoaderCircle className="animate-spin" />
                Criando
              </>
            }
            otherwise={"Salvar"}
          />
        </Button>
      </div>
    </form>
  );
}
