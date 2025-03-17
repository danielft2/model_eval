import { authActionClient } from "@/external/libs/safe-action";
import { getQuestionOverviewUseCase } from "../../core/usecases/get-question-overview-use-case";
import { questionIdSchema } from "../../schemas/question-id-schema";

export const getQuestionOverviewAction = authActionClient
.schema(questionIdSchema)
.action(async ({ parsedInput, ctx: { httpClient, accessToken } }) => {
  const { questionId } = parsedInput;
  const response = await getQuestionOverviewUseCase({ questionId, httpClient, token: accessToken });
  return response;
})
