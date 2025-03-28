
import { tImportedQuestion } from "@/core/types";
import { HumanEvaluationDetails } from "@/human-evaluations/infra/http/responses/human-evaluation-details";
import { HumanEvaluationOverview } from "@/human-evaluations/infra/http/responses/human-evaluation-overview";
import { create } from "zustand";

export type tQuestions = Pick<tImportedQuestion, 'id' | 'descriptor_code'>;

type HumanEvaluationDetailsStore = {
  evaluation: HumanEvaluationDetails | null;
  questions: tQuestions[];
  setDataOverview: (value: Partial<HumanEvaluationOverview>) => void;
};

export const useHumanEvaluationDetailsStore =
  create<HumanEvaluationDetailsStore>((set, get) => ({
    evaluation: null,
    questions: [],
    setDataOverview: (value: Partial<HumanEvaluationOverview>) => {
      const questions = value.imported_questions ?? get().questions;
      return set({
        evaluation: value.evaluation,
        questions
      });
    },
  }));
