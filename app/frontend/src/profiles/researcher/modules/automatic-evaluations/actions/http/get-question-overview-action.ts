import { getQuestionOverviewUseCase } from "@/automatic-evaluations/core/usecases/get-question-overview-use-case";
import { questionIdSchema } from "@/automatic-evaluations/schemas/question-id-schema";
import { authActionClient } from "@/shared/libs/safe-action";

export const getQuestionOverviewAction = authActionClient
.schema(questionIdSchema)
.action(async ({ parsedInput, ctx: { httpClient } }) => {
  const { questionId } = parsedInput;
  const response = await getQuestionOverviewUseCase({ questionId, httpClient });
  return response;
})
