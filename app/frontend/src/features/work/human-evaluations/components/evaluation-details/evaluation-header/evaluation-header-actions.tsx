/* eslint-disable @typescript-eslint/no-unused-vars */
import { Link2 } from "lucide-react";
import { useParams } from "next/navigation";
import { useOptimistic, useTransition } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Show } from "@/components/ui/show";
import { Switch } from "@/components/ui/switch";
import { changeStatusAction } from "@/features/work/human-evaluations/actions/change-status";
import { createSharedLink } from "@/features/work/human-evaluations/actions/create-shared-link";
import { HumanEvaluationDetails } from "@/features/work/human-evaluations/http/responses/human-evaluation-details";
import { HumanEvaluationStatus } from "@/features/work/human-evaluations/types/evaluation-status";
import { useHumanEvaluationDetailsStore } from "@/store/human-evaluation-details";

import { EvaluationHeaderImportQuestions } from "./evaluation-header-import-questions";

type EvaluationHeaderActionsProps = {
  evaluationDetails: HumanEvaluationDetails | null;
};

export function EvaluationHeaderActions({
  evaluationDetails,
}: EvaluationHeaderActionsProps) {
  const { id } = useParams<{ id: string }>();

  const setEvaluationDetails = useHumanEvaluationDetailsStore(
    (state) => state.setDataOverview
  );
  
  const evaluationQuestions = useHumanEvaluationDetailsStore(
    (state) => state.questions
  )

  const isAvaliableEvaluation =
    evaluationDetails?.status.id === HumanEvaluationStatus.AVALIABLE;

  const [optimisticAvaliable, setOptimisticAvaliable] = useOptimistic<boolean>(
    isAvaliableEvaluation
  );
  const [_, startTransition] = useTransition();

  const isAvaliableToImportQuestions = !isAvaliableEvaluation && evaluationQuestions.length === 0;

  const handleChangeStatus = async () => {
    startTransition(async () => {
      setOptimisticAvaliable((state) => !state);

      const response = await changeStatusAction(id);
      if (response.data) {
        toast.success("Status alterado com sucesso");
        setEvaluationDetails({ evaluation: response.data });
      } else {
        toast.error(response.error);
      }
    });
  };

  const handleSharedEvaluation = async () => {
    const link = await createSharedLink(evaluationDetails?.id || "");
    navigator.clipboard.writeText(`${window.location.origin}/form/${link}`);
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
        <EvaluationHeaderImportQuestions evaluationId={id} />
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
