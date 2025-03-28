"use client";

import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";

import { getOverviewAction } from "@/human-evaluations/actions/http/get-overview-action";
import { Badge } from "@/shared/components/ui/badge";
import { Show } from "@/shared/components/ui/show";
import { useHumanEvaluationDetailsStore } from "@/shared/stores/human-evaluation-details";

import { EvaluationHeaderActions } from "./evaluation-header-actions";

export function HumanEvaluationDetailsHeader() {
  const { evaluation_id } = useParams<{ evaluation_id: string }>();
  const { back } = useRouter();

  const evaluationDetails = useHumanEvaluationDetailsStore(
    (state) => state.evaluation
  );
  const setEvaluationDetails = useHumanEvaluationDetailsStore(
    (state) => state.setDataOverview
  );

  const retrieveQuestions = useCallback(async () => {
    const response = await getOverviewAction({ evaluationId: evaluation_id });
    if (response?.data?.data) setEvaluationDetails(response?.data.data);
  }, [evaluation_id, setEvaluationDetails]);

  useEffect(() => {
    retrieveQuestions();
  }, [retrieveQuestions]);

  return (
    <>
      <header className="flex justify-between items-end h-20">
        <div>
          <div className="flex items-center gap-2 font-heading text-sm -tracking-wider text-slate-600">
            <a className="cursor-pointer" onClick={back}>Avaliações</a>
            <span>/</span>
            <span className="text-brand-800 font-medium">
              {evaluationDetails?.title || "-"}
            </span>
          </div>
          <h1 className="font-heading -tracking-wider text-slate-900 text-lg font-medium">
            Detalhes da avaliação
          </h1>

          <div className="flex gap-2 mt-2">
            <Show when={!!evaluationDetails?.use_relevance}>
              <Badge variant="blue">Relevância</Badge>
            </Show>

            <Show when={!!evaluationDetails?.use_answerability}>
              <Badge variant="violet">Respondibilidade</Badge>
            </Show>

            <Show when={!!evaluationDetails?.use_utility}>
              <Badge variant="green">Utilidade</Badge>
            </Show>
          </div>
        </div>

        <EvaluationHeaderActions evaluationDetails={evaluationDetails} />
      </header>
    </>
  );
}
