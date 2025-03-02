import {
  BrainCircuit,
  CircleCheck,
  CircleMinus,
  TableProperties,
} from "lucide-react";
import Link from "next/link";

import { AutomaticEvaluationResponse } from "@/features/work/automatic-evaluations/http/responses/automatic-evaluation-response";
import { EvaluationCardOptions } from "./automatic-evaluation-card-options";
import { Suspense } from "react";
import { ShowConditional } from "@/components/ui/show-conditional";
import { Show } from "@/components/ui/show";

type AutomaticEvaluationCardProps = {
  data: AutomaticEvaluationResponse;
};

export function EvaluationCard({ data }: AutomaticEvaluationCardProps) {
  const existsEvaluations = data.models_evaluated > 0;
  const modelsEvaluated = data.models_evaluated;

  return (
    <div className="block rounded-lg border overflow-hidden border-slate-300 min-w-[400px] flex-1 font-heading relative">
      <Link href={`/workspace/work/evaluations/${data.id}`}>
        <div className="bg-slate-100 space-y-4 p-4">
          <div className="flex items-center justify-between">
            <h1 className="font-heading -tracking-wider text-base font-medium">
              {data.title}
            </h1>
          </div>

          <div className="text-sm -tracking-wider space-y-2">
            <div className="flex items-center gap-2">
              <BrainCircuit size={18} className="text-slate-600" />
              <p className="text-slate-600">
                <strong className="font-medium text-slate-800">
                  {data.models_configured} modelos
                </strong>{" "}
                configurados
              </p>
            </div>

            <div className="flex items-center gap-2">
              <TableProperties size={18} className="text-slate-600" />
              <p className="text-slate-600">
                Conjunto de teste com{" "}
                <strong className="font-medium text-slate-800">
                  {data.filename_test_count} registros
                </strong>
              </p>
            </div>
          </div>
        </div>

        <div className="px-4 py-2 flex items-center gap-1 border-t border-slate-300">
          <ShowConditional
            condition={existsEvaluations}
            then={<CircleCheck size={16} className="text-green-700" />}
            otherwise={<CircleMinus size={14} className="text-slate-600" />}
          />

          <p className="font-heading -tracking-wider font-medium text-sm text-slate-800">
            {modelsEvaluated} {""}
            <Show when={modelsEvaluated === 1}>Modelo avalidado</Show>
            <Show when={modelsEvaluated === 0 || modelsEvaluated > 1}>Modelos avalidados</Show>
          </p>
        </div>
      </Link>

      <Suspense>
        <EvaluationCardOptions evaluationId={data.id} />
      </Suspense>
    </div>
  );
}
