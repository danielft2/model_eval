"use server";

import { cookies } from "next/headers";

export async function retrieveAccessToken(): Promise<string> {
  const token = (await cookies()).get("token")?.value ?? "";
  return token;
}
