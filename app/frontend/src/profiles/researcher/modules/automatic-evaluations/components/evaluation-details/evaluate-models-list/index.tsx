import { getEvaluationDetailsAction } from "@/automatic-evaluations/actions/http/get-evaluation-details-action";
import { EvaluateModelCard } from "./evaluate-model-card";

export type EvaluateModelsListProps = {
  evaluationId: string;
}

export async function EvaluateModelsList({ evaluationId }: EvaluateModelsListProps) {
  const response = await getEvaluationDetailsAction({ evaluationId });
  const avaliableForEvaluation = !!response?.data?.data?.evaluation.filename_test;

  return (
    <section className="mt-8 flex flex-wrap gap-4">
      {response?.data?.data?.models.map((model) => (
        <EvaluateModelCard
          key={model.id}
          model={model}
          isAvaliableForEvaluation={avaliableForEvaluation}
        />
      ))}
    </section>
  );
}
