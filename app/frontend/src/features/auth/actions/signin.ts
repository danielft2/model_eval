"use server";

import { fetchClient } from "@/api/fetch-client";
import { ResponseApp } from "@/api/response";
import { SigninData, SigninError } from "@/features/auth/types/signin";
import { ValidationErrors } from "@/infra/http/response";
import { z } from "zod";

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
