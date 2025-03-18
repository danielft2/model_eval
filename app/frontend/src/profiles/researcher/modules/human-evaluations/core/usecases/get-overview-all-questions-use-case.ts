import { tUseCase } from "@/core/http/contracts/use-case";
import { HumanEvaluationAllQuestionsOverview } from "../../externals/http/responses/human-evaluation-allquestions-overview";

type getOverviewAllQuestionsUseCaseData = tUseCase & {
  evaluationId: string,
  descriptor: string
}

export async function getOverviewAllQuestionsUseCase({ evaluationId, descriptor = "0", httpClient, token }: 
  getOverviewAllQuestionsUseCaseData) {
  const endpoint =
    descriptor != "0"
      ? `/human-evaluation/overview/global-results/${evaluationId}?descriptor_code=${descriptor}`
      : `/human-evaluation/overview/global-results/${evaluationId}`;

  const response =
    await httpClient.request<HumanEvaluationAllQuestionsOverview>({
      method: "GET",
      endpoint,
      options: {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      },
    });


  return response;
}
