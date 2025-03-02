import { Divider } from "@/components/ui/divider";
import { EvaluateModelsList } from "@/features/work/automatic-evaluations/components/evaluation-details/evaluate-models-list";
import { EvaluationDetailsHeader } from "@/features/work/automatic-evaluations/components/evaluation-details/evaluation-details-header";
import { Suspense } from "react";

type Params = {
  evaluation_id: string;
};

export default async function EvaluationDetailsPage({ params }: {
  params: Promise<Params>;
}) {
  const { evaluation_id } = await params;

  return (
    <>
      <EvaluationDetailsHeader />
      <Divider />
      <Suspense fallback={<span>Carregando...</span>}>
        <EvaluateModelsList evaluationId={evaluation_id} />
      </Suspense>
    </>
  );
}
