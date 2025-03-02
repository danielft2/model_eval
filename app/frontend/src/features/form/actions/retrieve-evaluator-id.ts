"use server";

import { cookies } from "next/headers";
import { randomUUID } from "node:crypto";

export async function retrieveEvaluatorId() {
  const cookiesInstance = await cookies();
  let evaluatorId = cookiesInstance.get("evaluatorId")?.value;

  if (!evaluatorId) {
    evaluatorId = cookiesInstance
      .set("evaluatorId", randomUUID(), {
        maxAge: 60 * 60 * 24 * 365,
        httpOnly: true,
      })
      .get("evaluatorId")?.value;
  }

  return evaluatorId || "";
}
