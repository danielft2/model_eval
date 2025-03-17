import { AppError } from "@/core/http/errors/app-error";
import { createSafeActionClient, DEFAULT_SERVER_ERROR_MESSAGE } from "next-safe-action";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { fetchClient } from "../http/client/fetch-client";

export const actionClient = createSafeActionClient({
  handleServerError: (error) => {
    if (error instanceof AppError) {
      if (error.statusCode === 401) {
        redirect("/?token=expired");
      }

      return error.message;
    };
    
    return DEFAULT_SERVER_ERROR_MESSAGE;
  } 
});

export const authActionClient = actionClient
  .use(async ({ next }) => {
    return next({ ctx: { httpClient: fetchClient } })
  })
  .use(async ({ next }) => {
    const accessToken = (await cookies()).get("token")?.value;

    if (!accessToken) {
      throw new AppError(401, "Não autorizado");
    }

    return next({ ctx: { accessToken } });
  });