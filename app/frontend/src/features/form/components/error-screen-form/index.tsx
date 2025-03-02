import { notFound } from "next/navigation";
import { UnavailableForResponse } from "./unavailable-for-response";

type ErrorScreenProps = {
  errorStatusCode: number | null;
};

export function ErrorScreenForm({ errorStatusCode }: ErrorScreenProps) {
  if (errorStatusCode === 400) return <UnavailableForResponse />;
  if (errorStatusCode === 404 || errorStatusCode === 401) return notFound();
  return null;
}