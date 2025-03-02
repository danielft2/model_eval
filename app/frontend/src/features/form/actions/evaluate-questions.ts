import { fetchClient } from "@/api/fetch-client";
import { retrieveEvaluatorId } from "./retrieve-evaluator-id";

type EvaluateQuestionsActionProps = {
  key: string;
  questions: {
    id: string;
    considered_answerability: number | null;
    considered_relevance: number | null;
    utility: number | null;
}[];
}

export async function evaluateQuestionsAction({ questions, key }: EvaluateQuestionsActionProps) {
  const evaluatorId = await retrieveEvaluatorId();

  const response = await fetchClient.request({
    method: "POST",
    endpoint: "/evaluations/evaluate-questions",
    options: {
      headers: {
        Authorization: `Bearer ${key}`,
        "Evaluator-Id": evaluatorId
      },
    },
    body: questions
  })

  return {
    data: response.message || "",
    error: response.error?.message || ""
  }
}