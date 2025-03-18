import { fetchDataForServerComponent } from "@/external/http/fetch-data-server-components";
import { getHumanEvaluationsUseCase } from "@/human-evaluations/core/usecases/get-evaluations-use-case";
import { HumanEvaluationCard } from "./evaluation-card";

export async function HumanEvaluationsList() {
  const response = await fetchDataForServerComponent({
    asyncFunction: getHumanEvaluationsUseCase
  });

  return (
    <div className="flex flex-wrap gap-4">
      {response.data?.map((evaluation) => (
        <HumanEvaluationCard key={evaluation.id} data={evaluation} />
      ))}
    </div>
  );
}
