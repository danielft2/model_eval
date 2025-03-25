import { getEvaluationsUseCase } from "@/automatic-evaluations/core/usecases/get-evaluations-use-case";
import { fetchWrapperServerComponent } from "@/infra/http/fetch-wrapper-server-component";
import { EvaluationCard } from "./evaluation-preview";

export async function AutomaticEvaluationList() {
  const { data } = await fetchWrapperServerComponent({
    asyncFunction: getEvaluationsUseCase
  });
  
  return (
    <>
      <div className="flex flex-wrap gap-4">
        {data?.map((evaluation) => (
          <EvaluationCard data={evaluation} key={evaluation.id} />
        ))}
      </div>
    </>
  );
}
