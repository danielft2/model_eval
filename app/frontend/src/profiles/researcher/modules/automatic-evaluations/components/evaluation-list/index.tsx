import { getEvaluationsUseCase } from "@/automatic-evaluations/core/usecases/get-evaluations-use-case";
import { EvaluationCard } from "./evaluation-card";

export async function AutomaticEvaluationList() {
  const automaticEvaluations = await getEvaluationsUseCase();
  
  return (
    <>
      <div className="flex flex-wrap gap-4">
        {automaticEvaluations.data?.map((evaluation) => (
          <EvaluationCard data={evaluation} key={evaluation.id} />
        ))}
      </div>
    </>
  );
}
