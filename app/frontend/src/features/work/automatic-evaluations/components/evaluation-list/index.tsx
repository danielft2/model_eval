import { retrieveEvaluations } from "@/features/work/automatic-evaluations/service/retrieve-evaluations";
import { EvaluationCard } from "./evaluation-card";

export async function AutomaticEvaluationList() {
  const automaticEvaluations = await retrieveEvaluations();
  
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
