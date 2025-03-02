"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import {
  useCallback,
  useEffect,
} from "react";

import { Badge } from "@/components/ui/badge";
import { Show } from "@/components/ui/show";
import { retrieveHumanEvaluationOverview } from "@/features/work/human-evaluations/service/retrieve-evaluation-overview";
import { useHumanEvaluationDetailsStore } from "@/store/human-evaluation-details";

import { EvaluationHeaderActions } from "./evaluation-header-actions";

export function HumanEvaluationDetailsHeader() {
  const { id } = useParams<{ id: string }>();

  const evaluationDetails = useHumanEvaluationDetailsStore((state) => state.evaluation);
  const setEvaluationDetails = useHumanEvaluationDetailsStore((state) => state.setDataOverview);

  const retrieveQuestions = useCallback(async () => {
    try {
      const response = await retrieveHumanEvaluationOverview(id);
      if (response.data) setEvaluationDetails(response.data);
    } finally {}
  }, [id, setEvaluationDetails]);

  useEffect(() => {
    retrieveQuestions();
  }, [retrieveQuestions]);

  return (
    <>
      <header className="flex justify-between items-end h-20">
        <div>
          <div className="flex items-center gap-2 font-heading text-sm -tracking-wider text-slate-600">
            <Link href={"/workspace/work"}>Avaliações</Link>
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
