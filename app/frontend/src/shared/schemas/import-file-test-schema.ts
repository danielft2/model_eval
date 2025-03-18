import { z } from "zod";

export const importFileTestSchema = z.object({
  file: z.instanceof(File),
  evaluationId: z.string(),
})