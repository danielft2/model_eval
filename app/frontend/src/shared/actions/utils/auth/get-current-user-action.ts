"use server";

import { tUser } from "@/core/types/user";
import { cookies } from "next/headers";

export async function getCurrentUser(): Promise<tUser | null> {
  const user = (await cookies()).get("user")?.value;
  return user ? JSON.parse(user) : null;
}
