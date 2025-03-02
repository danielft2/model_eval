import { createContext, useState } from "react";
import { AutomaticEvaluationInsertDto } from "@/features/work/automatic-evaluations/http/dtos/automatic-evaluation-insert";

type EvaluationInsertFormContextData = {
  evaluationData: AutomaticEvaluationInsertDto;
  updateEvaluation: (evaluation: Partial<AutomaticEvaluationInsertDto>) => void;
};

type EvaluationInsertFormContextType = {
  children: Readonly<React.ReactNode>;
};

export const EvaluationInsertFormContext =
  createContext<EvaluationInsertFormContextData>(
    {} as EvaluationInsertFormContextData
  );

export function EvaluationFormProvider({
  children,
}: EvaluationInsertFormContextType) {
  const [evaluationData, setEvaluationData] =
    useState<AutomaticEvaluationInsertDto>({} as AutomaticEvaluationInsertDto);

  function updateEvaluation(evaluation: Partial<AutomaticEvaluationInsertDto>) {
    setEvaluationData((prevEvaluation) => ({
      ...prevEvaluation,
      ...evaluation,
    }));
  }

  return (
    <EvaluationInsertFormContext value={{ evaluationData, updateEvaluation }}>
      {children}
    </EvaluationInsertFormContext>
  );
}
