import { createContext, useState } from "react";
import { tCreateEvaluationData } from "../schemas/evalution-form-schema";

type CreateEvaluationFormContextData = {
  evaluationData: tCreateEvaluationData;
  updateEvaluation: (evaluation: Partial<tCreateEvaluationData>) => void;
};

type CreateEvaluationFormContextType = {
  children: Readonly<React.ReactNode>;
};

export const CreateEvaluationFormContext =
  createContext<CreateEvaluationFormContextData>(
    {} as CreateEvaluationFormContextData
  );

export function EvaluationFormProvider({
  children,
}: CreateEvaluationFormContextType) {
  const [evaluationData, setEvaluationData] =
    useState<tCreateEvaluationData>({} as tCreateEvaluationData);

  function updateEvaluation(evaluation: Partial<tCreateEvaluationData>) {
    setEvaluationData((prevEvaluation) => ({
      ...prevEvaluation,
      ...evaluation,
    }));
  }

  return (
    <CreateEvaluationFormContext value={{ evaluationData, updateEvaluation }}>
      {children}
    </CreateEvaluationFormContext>
  );
}
