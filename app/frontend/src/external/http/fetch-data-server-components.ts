import { redirect } from "next/navigation";

import { fetchClient } from "@/external/http/client/fetch-client";
import { getAccessToken } from "@/shared/actions/utils/auth/get-access-token-action";

import { ResponseHttp } from "@/core/http/contracts/http-client";
import { tUseCase } from "@/core/http/contracts/use-case";
import { AppError } from "@/core/http/errors/app-error";

type FetchDataForServerComponentData<R, T> = {
  asyncFunction: (params: T & tUseCase) => Promise<ResponseHttp<R>>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
};

export async function fetchDataForServerComponent<R = unknown, T = unknown>({ asyncFunction, data }:
  FetchDataForServerComponentData<R, T>) {
  const token = await getAccessToken();
  const httpClient = fetchClient;

  try {
    const response = await asyncFunction({ ...data, httpClient, token });
    return response;
  } catch (error) {
    if (error instanceof AppError) {
      if (error.statusCode === 401) {
        redirect("/?token=expired");
      }

      return {
        error: {
          message: error.message,
          statusCode: error.statusCode,
        },
        data: null,
      };
    } else {
      console.error("Unexpected error:", error);
      return {
        error: {
          message: "An unexpected error occurred.",
          statusCode: 500,
        },
        data: null,
      };
    }
  }
}