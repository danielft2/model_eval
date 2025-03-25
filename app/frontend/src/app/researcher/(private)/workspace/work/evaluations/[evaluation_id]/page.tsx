import { Suspense } from "react";

import { getEvaluationDetailsAction } from "@/automatic-evaluations/actions/http/get-evaluation-details-action";
import { ConfiguredModelsList } from "@/automatic-evaluations/components/visualization";
import { EvaluationDetailsHeader } from "@/automatic-evaluations/components/visualization/visualization-header";
import { CardListFallback } from "@/profiles/researcher/shared/components/cards-list-fallback";
import { Divider } from "@/shared/components/ui/divider";

type Params = {
  evaluation_id: string;
};

export default async function EvaluationDetailsPage({ params }: {
  params: Promise<Params>;
}) {
  const { evaluation_id } = await params;
  const response = await getEvaluationDetailsAction({ evaluationId: evaluation_id });
  const evaluation = response?.data?.data?.evaluation;

  return (
    <>
      <EvaluationDetailsHeader evaluationTitle={evaluation?.title} evaluationId={evaluation_id}  />
      <Divider />
      <Suspense fallback={<CardListFallback />}>
        <ConfiguredModelsList evaluationId={evaluation_id} />
      </Suspense>
    </>
  );
}
