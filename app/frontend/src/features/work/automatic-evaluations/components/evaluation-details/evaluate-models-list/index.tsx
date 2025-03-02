import { retrieveEvaluationDetails } from "@/features/work/automatic-evaluations/service/retrieve-evaluation-details";
import { EvaluateModelCard } from "./evaluate-model-card";

export type EvaluateModelsListProps = {
  evaluationId: string;
}

export async function EvaluateModelsList({ evaluationId }: EvaluateModelsListProps) {
  const details = await retrieveEvaluationDetails(evaluationId);
  const avaliableForEvaluation = !!details.data?.evaluation.filename_test;

  return (
    <section className="mt-8 flex flex-wrap gap-4">
      {details.data?.models.map((model) => (
        <EvaluateModelCard
          key={model.id}
          model={model}
          isAvaliableForEvaluation={avaliableForEvaluation}
        />
      ))}
    </section>
  );
}
