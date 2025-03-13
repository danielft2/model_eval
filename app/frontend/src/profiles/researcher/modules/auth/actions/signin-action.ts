"use server";

import { fetchClient } from "@/external/http/fetch-client";
import { ResponseApp } from "@/core/http/interfaces/response-app";
import { ValidationErrors } from "@/core/http/interfaces/response";
import { z } from "zod";
import { SigninData, SigninError } from "../types/signin";

const schema = z.object({
  email: z.string().email("Informe um email válido."),
});

export async function signinAction(
  prevState: unknown,
  data: FormData
): Promise<ResponseApp<SigninData, SigninError>> {
  const email = data.get("email") as string;
  const validatedFields = schema.safeParse({ email });

  if (!validatedFields.success) {
    const errors: ValidationErrors = {};
    const fieldErrors = validatedFields.error.errors;
    for (const error of fieldErrors) {
      errors[error.path[0]] = { message: error.message };
    }

    return {
      data: null,
      error: {
        message: "",
        validations: errors,
      },
    };
  }

  const response = await fetchClient.request<{ data: string; message: string }>(
    {
      method: "POST",
      endpoint: "/auth/signin",
      body: { email },
    }
  );

  return {
    data: {
      message: response.message || "",
    },
    error: {
      message: response.error?.message || "",
      validations: response.error?.validations,
    },
  };
}
