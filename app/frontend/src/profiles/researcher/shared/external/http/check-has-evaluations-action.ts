import { ResponseApp } from "@/core/http/interfaces/response-app";
import { fetchClient } from "@/external/http/fetch-client";
import { getAccessToken } from "@/shared/actions/utils/auth/get-access-token-action";
import { verifyResponse } from "@/shared/actions/utils/auth/verify-response-action";


export async function checkHasEvaluations(): Promise<
  ResponseApp<boolean, string>
> {
  const token = await getAccessToken();
  const response = await fetchClient.request<{ has_evaluations: boolean }>({
    method: "GET",
    endpoint: "/evaluations/has-evaluations",
    options: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });

  await verifyResponse(response);

  const { data, error } = response;

  return {
    data: data?.has_evaluations ?? null,
    error: error?.message ?? null,
  };
}
