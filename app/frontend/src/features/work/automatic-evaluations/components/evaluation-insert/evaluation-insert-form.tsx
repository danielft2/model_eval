"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Wizard } from "react-use-wizard";
import { toast } from "sonner";
import { z } from "zod";

import { insertEvaluationAction } from "@/features/work/automatic-evaluations/actions/insert-evaluation";
import { retrieveEvaluationDetailsAction } from "@/features/work/automatic-evaluations/actions/retrieve-evaluation-details";
import { evaluationInsertScheme } from "@/features/work/automatic-evaluations/schemes/evalution-insert";
import { useLoadingStore } from "@/store/loading-store";
import { eModelTaskType } from "@/core/enums";

import { ChoiceEvaluateMetric } from "./steps/choice-evaluate-metric";
import { ModelDGConfig } from "./steps/model-dg-config";
import { ModelQAConfig } from "./steps/model-qa-config";
import { ModelQGConfig } from "./steps/model-qg-config";

type FormWrappperProps = {
  onClose: () => void;
};

export type EvaluationInsertData = z.infer<typeof evaluationInsertScheme>;

export function EvaluationInsertForm({ onClose }: FormWrappperProps) {
  const searchParams = useSearchParams();
  const editEvaluationId = searchParams.get("edit");

  const { isLoading, changeLoadingState } = useLoadingStore();

  const evaluationInsertForm = useForm<EvaluationInsertData>({
    mode: "all",
    resolver: zodResolver(evaluationInsertScheme),
    defaultValues: {
      metric_id: ""
    }
  });

  const { getValues } = evaluationInsertForm;

  async function handleSubmitData() {
    try {
      changeLoadingState(true)

      const evaluationId = editEvaluationId ? parseInt(editEvaluationId) : undefined;
      const response = await insertEvaluationAction(getValues(), evaluationId);

      if (!response.error) {
        toast.success(response.data);
        onClose();
      } else {
        toast.error(response.error);
      }
    } finally {
      changeLoadingState(false)
    }
  }

  const retrieveDetails = useCallback(
    async (evaluationId: string) => {
      try {
        changeLoadingState(true)
        const response = await retrieveEvaluationDetailsAction(evaluationId);
        if (response.data) {
          const { evaluation, models } = response.data;
          
          const modelQG = models.find((model) => model.task_id == eModelTaskType.QUESTION_GENERATE);
          const modelQA = models.find((model) => model.task_id == eModelTaskType.QUESTION_ANSWER);
          const modelDG = models.find((model) => model.task_id == eModelTaskType.DISTRACTOR_GENERATE);

          evaluationInsertForm.reset({
            title: evaluation.title,
            metric_id: evaluation.metric_id.toString(),
            model_qg: modelQG,
            model_qa: modelQA,
            model_dg: modelDG,
          });
        }
      } finally {
        changeLoadingState(false)
      }
    },
    [evaluationInsertForm, changeLoadingState]
  );

  useEffect(() => {
    if (editEvaluationId) {
      retrieveDetails(editEvaluationId);
    }
  }, [editEvaluationId, retrieveDetails]);

  return (
    <>
      <FormProvider {...evaluationInsertForm}>
        <Wizard>
          <ChoiceEvaluateMetric isLoading={isLoading} />
          <ModelQGConfig />
          <ModelQAConfig />
          <ModelDGConfig onFinish={handleSubmitData} isLoading={isLoading} />
        </Wizard>
      </FormProvider>
    </>
  );
}
