import { tUseCase } from "@/core/http/contracts/use-case";
import { HumanEvaluationOverview } from "@/human-evaluations/infra/http/responses/human-evaluation-overview";
import { tImportFileTestSchema } from "@/shared/schemas/import-file-test-schema";

type importFileTestUseCase = tUseCase & tImportFileTestSchema;

export async function importQuestionsUseCase({ evaluationId, file, httpClient }: importFileTestUseCase) {
  const formData = new FormData();
  formData.append('file', file);

  const response = await httpClient.request<HumanEvaluationOverview>({
    endpoint: `/human-evaluation/${evaluationId}/import-questions`,
    method: "PUT",
    isMultipart: true,
    body: formData
  })

  return response;
}