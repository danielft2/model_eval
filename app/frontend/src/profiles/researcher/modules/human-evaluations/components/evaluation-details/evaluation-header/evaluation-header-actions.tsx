/* eslint-disable @typescript-eslint/no-unused-vars */
import { Link2 } from "lucide-react";
import { useParams } from "next/navigation";
import { useOptimistic, useTransition } from "react";
import { toast } from "sonner";

import { changeStatusAction } from "@/human-evaluations/actions/http/change-status-action";
import { createSharedLinkAction } from "@/human-evaluations/actions/utils/create-shared-link-action";
import { eHumanEvaluationStatus } from "@/human-evaluations/core/enums/evaluation-status";
import { HumanEvaluationDetails } from "@/human-evaluations/infra/http/responses/human-evaluation-details";
import { Button } from "@/shared/components/ui/button";
import { Show } from "@/shared/components/ui/show";
import { Switch } from "@/shared/components/ui/switch";
import { useHumanEvaluationDetailsStore } from "@/shared/stores/human-evaluation-details";

import { EvaluationHeaderImportQuestions } from "./evaluation-header-import-questions";
import { useAction } from "next-safe-action/hooks";

type EvaluationHeaderActionsProps = {
  evaluationDetails: HumanEvaluationDetails | null;
};

export function EvaluationHeaderActions({
  evaluationDetails,
}: EvaluationHeaderActionsProps) {
  const { evaluation_id } = useParams<{ evaluation_id: string }>();

  const setEvaluationDetails = useHumanEvaluationDetailsStore(
    (state) => state.setDataOverview
  );
  
  const evaluationQuestions = useHumanEvaluationDetailsStore(
    (state) => state.questions
  )

  const isAvaliableEvaluation =
    evaluationDetails?.status.id === eHumanEvaluationStatus.AVALIABLE;

  const [optimisticAvaliable, setOptimisticAvaliable] = useOptimistic<boolean>(
    isAvaliableEvaluation
  );
  const [_, startTransition] = useTransition();

  const isAvaliableToImportQuestions = !isAvaliableEvaluation && evaluationQuestions.length === 0;

  const { executeAsync } = useAction(changeStatusAction, {
    onSuccess: ({ data }) => {
      const evaluation = data?.data;
      toast.success(data?.message);
      setEvaluationDetails({ evaluation });
    }
  })

  const handleChangeStatus = async () => {
    startTransition(async () => {
      setOptimisticAvaliable((state) => !state);
      executeAsync({ evaluationId: evaluation_id });
    });
  };

  
  const handleSharedEvaluation = async () => {
    const link = await createSharedLinkAction(evaluationDetails?.id || "");
    navigator.clipboard.writeText(`${window.location.origin}/evaluator/form/${link}`);
    toast.success("Link copiado para a área de transferência");
  };

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium font-heading -tracking-wider text-slate-700">
          Aceitando respostas
        </span>
        <Switch
          checked={optimisticAvaliable}
          onCheckedChange={handleChangeStatus}
        />
      </div>

      <Show when={isAvaliableToImportQuestions}>
        <EvaluationHeaderImportQuestions evaluationId={evaluation_id} />
      </Show>

      <Button
        className="w-36"
        onClick={handleSharedEvaluation}
      >
        <Link2 />
        Compartilhar
      </Button>
    </div>
  );
}
