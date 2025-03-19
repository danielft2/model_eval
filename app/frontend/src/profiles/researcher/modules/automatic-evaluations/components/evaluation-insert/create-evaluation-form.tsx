"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Wizard } from "react-use-wizard";
import { toast } from "sonner";

import { createEvaluationAction } from "@/automatic-evaluations/actions/http/create-evaluation-action";
import { getEvaluationDetailsAction } from "@/automatic-evaluations/actions/http/get-evaluation-details-action";
import { eModelTaskType } from "@/automatic-evaluations/core/enums";
import {
  evaluationFormSchema,
  tEvaluationFormSchema,
} from "@/automatic-evaluations/schemas/evalution-form-schema";
import { useLoadingStore } from "@/shared/stores/loading-store";

import { ChoiceEvaluateMetric } from "./steps/choice-evaluate-metric";
import { ModelDGConfig } from "./steps/model-dg-config";
import { ModelQAConfig } from "./steps/model-qa-config";
import { ModelQGConfig } from "./steps/model-qg-config";

type FormWrappperProps = {
  onClose: () => void;
};

export function CreateEvaluationForm({ onClose }: FormWrappperProps) {
  const searchParams = useSearchParams();
  const editEvaluationId = searchParams.get("edit");

  const { isLoading } = useLoadingStore();
  const { executeAsync } = useAction(createEvaluationAction, {
    onError: ({ error }) => {
      toast.error(error.serverError);
    },
    onSuccess: ({ data }) => {
      toast.success(data?.message);
      onClose();
    },
  });

  const { executeAsync: getEvaluationDetailsActionExecute } = useAction(
    getEvaluationDetailsAction,
    {
      onSuccess: ({ data: response }) => {
        const { evaluation, models } = response?.data || {};

        const modelQG = models?.find(
          (model) => model.task_id == eModelTaskType.QUESTION_GENERATE
        );
        const modelQA = models?.find(
          (model) => model.task_id == eModelTaskType.QUESTION_ANSWER
        );
        const modelDG = models?.find(
          (model) => model.task_id == eModelTaskType.DISTRACTOR_GENERATE
        );

        createEvaluationForm.reset({
          title: evaluation?.title,
          metric_id: evaluation?.metric_id.toString(),
          model_qg: modelQG,
          model_qa: modelQA,
          model_dg: modelDG,
        });
      },
    }
  );

  const createEvaluationForm = useForm<tEvaluationFormSchema>({
    mode: "all",
    resolver: zodResolver(evaluationFormSchema),
    defaultValues: {
      metric_id: "",
    },
  });

  const { getValues } = createEvaluationForm;

  async function handleSubmitData() {
    await executeAsync({
      data: getValues(),
      evaluationId: editEvaluationId || "",
    });
  }

  const retrieveDetails = useCallback(
    async (evaluationId: string) => {
      await getEvaluationDetailsActionExecute({ evaluationId });
    },
    [getEvaluationDetailsActionExecute]
  );

  useEffect(() => {
    if (editEvaluationId) {
      retrieveDetails(editEvaluationId);
    }
  }, [editEvaluationId, retrieveDetails]);

  return (
    <>
      <FormProvider {...createEvaluationForm}>
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
