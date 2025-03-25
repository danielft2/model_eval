import { getEvaluationDetailsAction } from "@/automatic-evaluations/actions/http/get-evaluation-details-action";
import { ConfiguredModelPreview } from "./configured-model-preview";

export type ConfiguredModelsListProps = {
  evaluationId: string;
}

export async function ConfiguredModelsList({ evaluationId }: ConfiguredModelsListProps) {
  const response = await getEvaluationDetailsAction({ evaluationId });
  const data = response?.data?.data;
  const avaliableForEvaluation = Boolean(data?.evaluation.filename_test);

  return (
    <section className="mt-8 flex flex-wrap gap-4">
      {data?.models.map((model) => (
        <ConfiguredModelPreview
          key={model.id}
          model={model}
          isAvaliableForEvaluation={avaliableForEvaluation}
        />
      ))}
    </section>
  );
}
