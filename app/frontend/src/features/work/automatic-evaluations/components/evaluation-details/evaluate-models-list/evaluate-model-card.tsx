"use client";

import { CircleCheck, LoaderCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Show } from "@/components/ui/show";
import { evaluateModelAction } from "@/features/work/automatic-evaluations/actions/evaluate-model";
import { EvaluatedModel } from "@/features/work/automatic-evaluations/types/evaluated-model";

type EvaluateModelCardProps = {
  model: EvaluatedModel;
  isAvaliableForEvaluation: boolean;
};

export function EvaluateModelCard({
  model,
  isAvaliableForEvaluation,
}: EvaluateModelCardProps) {
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [metricResult, setMetricResult] = useState(model.metric_result);

  async function handleEvaluateMode() {
    try {
      setIsEvaluating(true);
      const response = await evaluateModelAction(model.id);
      if (response.data) {
        setMetricResult(response.data.perplexity);
        toast.success("Modelo avaliado com sucesso!");
      };
    } finally {
      setIsEvaluating(false);
    }
  }

  return (
    <div className="block rounded-lg border overflow-hidden border-slate-300 min-w-[400px] flex-1 font-heading relative">
      <div className="bg-slate-100 p-4 flex items-end justify-between">
        <div className="space-y-2" style={{ maxWidth: "calc(100% - 150px)" }}>
          <Badge variant="green">{model.task_name || "-"}</Badge>
          <h1 className="font-heading -tracking-wider text-base font-medium max-w-full truncate">
            {model.model_title_id || "-"}
          </h1>
        </div>

        <Button
          variant="evaluate"
          size="sm"
          onClick={handleEvaluateMode}
          disabled={isEvaluating || !isAvaliableForEvaluation}
        >
          Avaliar modelo
          <Show when={isEvaluating}>
            <LoaderCircle className="animate-spin" />
          </Show>
        </Button>
      </div>

      <div className="px-4 py-2 flex items-center gap-1 border-t border-slate-300">
        <CircleCheck size={16} className="text-green-700" />
        <p className="font-heading -tracking-wider font-medium text-sm text-slate-800">
          Perplexidade = {metricResult.toFixed(4)}
        </p>
      </div>
    </div>
  );
}
