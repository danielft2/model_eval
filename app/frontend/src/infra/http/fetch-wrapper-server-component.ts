import { redirect } from "next/navigation";

import { HttpResponse } from "@/core/http/contracts/http-client";
import { tUseCase } from "@/core/http/contracts/use-case";
import { AppError } from "@/core/http/errors/app-error";
import { getAccessToken } from "@/shared/actions/utils/auth/get-access-token-action";
import { factoryHttpClient } from "./factory-http-client";

type fetchWrapperServerComponentData<R, T> = {
  asyncFunction: (params: T & tUseCase) => Promise<HttpResponse<R>>
  data?: any;
};

export async function fetchWrapperServerComponent<R = unknown, T = unknown>({ asyncFunction, data }:
  fetchWrapperServerComponentData<R, T>) {
  const token = await getAccessToken();
  const httpClient = factoryHttpClient(token);

  try {
    const response = await asyncFunction({ ...data, httpClient });
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