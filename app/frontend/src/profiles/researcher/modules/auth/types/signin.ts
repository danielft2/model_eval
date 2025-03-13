import { ValidationErrors } from "@/core/http/interfaces/response";

export interface SigninData {
  message: string;
}

export interface SigninError {
  message?: string | null;
  validations?: ValidationErrors;
}