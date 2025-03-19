import { tUseCase } from "@/core/http/contracts/use-case";
import { tImportFileTestSchema } from "@/shared/schemas/import-file-test-schema";

type ImportFileTestUseCaseData = tUseCase & tImportFileTestSchema;

export async function importFileTestUseCase({ httpClient, file, evaluationId }: ImportFileTestUseCaseData) {
  const form = new FormData();
  form.append("file", file);
  
  const response = await httpClient.request<{ file_name_id: string }>({
    method: "POST",
    endpoint: `/automatic-evaluation/${evaluationId}/import-file-test`,
    isMultipart: true,
    body: form
  });
  
  return response;
}
