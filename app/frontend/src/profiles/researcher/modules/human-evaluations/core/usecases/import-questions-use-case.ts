import { tUseCase } from "@/core/http/contracts/use-case";
import { HumanEvaluationOverview } from "../../externals/http/responses/human-evaluation-overview";

type importFileTestUseCase = tUseCase & {
  evaluationId: string, 
  file: File
}

export async function importQuestionsUseCase({ evaluationId, file, httpClient, token }: importFileTestUseCase) {
  const formData = new FormData();
  formData.append('file', file);

  const response = await httpClient.request<HumanEvaluationOverview>({
    endpoint: `/human-evaluation/${evaluationId}/import-questions`,
    method: "PUT",
    isMultipart: true,
    body: formData,
    options: {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }
  })

  return response;
}