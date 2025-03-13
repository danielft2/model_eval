import { ValidationErrors } from "@/core/http/contracts/http-client";

export interface SigninData {
  message: string;
}

export interface SigninError {
  message?: string | null;
  validations?: ValidationErrors;
}