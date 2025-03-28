import { fetchWrapperServerComponent } from "@/infra/http/fetch-wrapper-server-component";
import { getHumanEvaluationsUseCase } from "@/human-evaluations/core/usecases/get-evaluations-use-case";
import { EvaluationPreview } from "./evaluation-preview";

export async function HumanEvaluationsList() {
  const response = await fetchWrapperServerComponent({
    asyncFunction: getHumanEvaluationsUseCase
  });

  return (
    <div className="flex flex-wrap gap-4">
      {response.data?.map((evaluation) => (
        <EvaluationPreview key={evaluation.id} data={evaluation} />
      ))}
    </div>
  );
}
