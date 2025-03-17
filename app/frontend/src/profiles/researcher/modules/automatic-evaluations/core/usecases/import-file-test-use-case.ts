import { tUseCase } from "@/core/http/contracts/use-case";

type ImportFileTestUseCaseData = tUseCase & {
  evaluationId: number;
  file: File;
}

export async function importFileTestUseCase({ token, httpClient, file, evaluationId }: ImportFileTestUseCaseData) {
  const form = new FormData();
  form.append("file", file);
  
  const response = await httpClient.request<{ file_name_id: string }>({
    method: "POST",
    endpoint: `/automatic-evaluation/${evaluationId}/import-file-test`,
    isMultipart: true,
    body: form,
    options: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });
  
  return response;
}
