"use client";

import { CircleCheck, LoaderCircle } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";
import { toast } from "sonner";

import { evaluateModelAction } from "@/automatic-evaluations/actions/http/evaluate-model-action";
import { EvaluatedModel } from "@/automatic-evaluations/types/evaluated-model";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { ShowConditional } from "@/shared/components/ui/show-conditional";

type ConfiguredModelPreviewProps = {
  model: EvaluatedModel;
  isAvaliableForEvaluation: boolean;
};

export function ConfiguredModelPreview({
  model,
  isAvaliableForEvaluation,
}: ConfiguredModelPreviewProps) {
  const [metricResult, setMetricResult] = useState(model.metric_result);

  const { isPending, executeAsync } = useAction(evaluateModelAction, {
    onSuccess: ({ data: response }) => {
      const { data } = response || {};
      setMetricResult(data?.perplexity || 0);
      toast.success("Modelo avaliado com sucesso!");
    },
    onError: ({ error }) => {
      toast.error(error.serverError);
    },
  });

  async function handleEvaluateMode() {
    await executeAsync({ modelId: model.id });
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
          disabled={isPending || !isAvaliableForEvaluation}
        >
          <ShowConditional
            condition={isPending}
            then={
              <>
                <LoaderCircle className="animate-spin" />
                Avaliando modelo
              </>
            }
            otherwise={"Avaliar modelo"}
          />
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
