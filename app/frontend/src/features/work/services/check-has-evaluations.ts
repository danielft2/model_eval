import { retrieveAccessToken } from "@/actions/retrieve-access-token";
import { fetchClient } from "@/api/fetch-client";
import { ResponseApp } from "@/api/response";
import { verifyResponse } from "@/api/verify-response";

export async function checkHasEvaluations(): Promise<
  ResponseApp<boolean, string>
> {
  const token = await retrieveAccessToken();
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
