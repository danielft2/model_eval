/* eslint-disable @typescript-eslint/no-unused-vars */
import { Link2 } from "lucide-react";
import { useParams } from "next/navigation";
import { useOptimistic, useTransition } from "react";
import { toast } from "sonner";

import { changeStatusAction } from "@/profiles/researcher/modules/human-evaluations/actions/http/change-status-action";
import { createSharedLinkAction } from "@/profiles/researcher/modules/human-evaluations/actions/utils/create-shared-link-action";
import { eHumanEvaluationStatus } from "@/human-evaluations/core/enums/evaluation-status";
import { Button } from "@/shared/components/ui/button";
import { Show } from "@/shared/components/ui/show";
import { Switch } from "@/shared/components/ui/switch";
import { useHumanEvaluationDetailsStore } from "@/shared/stores/human-evaluation-details";

import { EvaluationHeaderImportQuestions } from "./evaluation-header-import-questions";
import { HumanEvaluationDetails } from "../../../externals/http/responses/human-evaluation-details";

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
    evaluationDetails?.status.id === eHumanEvaluationStatus.AVALIABLE;

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
    const link = await createSharedLinkAction(evaluationDetails?.id || "");
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
