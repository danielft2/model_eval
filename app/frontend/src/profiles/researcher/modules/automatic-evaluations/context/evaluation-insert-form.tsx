import { createContext, useState } from "react";
import { tEvaluationFormSchema } from "../schemas/evalution-form-schema";

type CreateEvaluationFormContextData = {
  evaluationData: tEvaluationFormSchema;
  updateEvaluation: (evaluation: Partial<tEvaluationFormSchema>) => void;
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
    useState<tEvaluationFormSchema>({} as tEvaluationFormSchema);

  function updateEvaluation(evaluation: Partial<tEvaluationFormSchema>) {
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
