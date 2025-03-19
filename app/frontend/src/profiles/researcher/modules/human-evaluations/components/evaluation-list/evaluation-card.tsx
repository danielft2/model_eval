import { CircleCheck, CircleMinus } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

import { eHumanEvaluationStatus } from "@/human-evaluations/core/enums/evaluation-status";
import { HumanEvaluationResponse } from "@/human-evaluations/infra/http/responses/human-evaluations";
import { Badge } from "@/shared/components/ui/badge";
import { Show } from "@/shared/components/ui/show";
import { ShowConditional } from "@/shared/components/ui/show-conditional";
import { HumanEvaluationCardOptions } from "./evaluation-card-options";

type HumanEvaluationCardProps = {
  data: HumanEvaluationResponse;
};

export function HumanEvaluationCard({ data }: HumanEvaluationCardProps) {
  const existsEvaluations = data.number_of_evaluations > 0;

  return (
    <div className="block rounded-lg border overflow-hidden border-slate-300 min-w-[400px] flex-1 font-heading relative">
      <Link href={`/workspace/work/human-evaluation/${data.id}/overview`}>
        <div className="bg-slate-100 space-y-1 p-4">
          <h1 className="font-heading -tracking-wider text-base font-medium">
            {data.title}
          </h1>
          <div className="flex items-center gap-1">
            <Show when={data.use_relevance}>
              <Badge variant="blue">Relevância</Badge>
            </Show>
            <Show when={data.use_answerability}>
              <Badge variant="violet">Respondibilidade</Badge>
            </Show>
            <Show when={data.use_utility}>
              <Badge variant="green">Utilidade</Badge>
            </Show>
          </div>
        </div>

        <div className="px-4 py-2 flex items-center gap-1 border-t border-slate-300">
          <ShowConditional
            condition={existsEvaluations}
            then={<CircleCheck size={16} className="text-green-700" />}
            otherwise={<CircleMinus size={14} className="text-slate-600" />}
          />
          <p className="font-heading -tracking-wider font-medium text-sm text-slate-800">
            <ShowConditional
              condition={existsEvaluations}
              then={`${data.number_of_evaluations} ${data.number_of_evaluations > 1 ? 'avaliações' : 'avaliação'}`}
              otherwise={"Ainda não possui avaliações"}
            />
          </p>
        </div>
      </Link>

      <Show when={data.status.id == eHumanEvaluationStatus.UNAVAILABLE}>
        <Suspense>
          <HumanEvaluationCardOptions evaluationId={data.id} />
        </Suspense>
      </Show>
    </div>
  );
}
