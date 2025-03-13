"use client";

import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Wizard } from "react-use-wizard";

import { getEvaluationFormAction } from "@/profiles/evaluator/form/actions/get-evaluation-form-action";
import { ErrorScreenForm } from "@/profiles/evaluator/form/components/error-screen-form";
import { EvaluationFormResponse } from "@/profiles/evaluator/form/external/http/responses/evaluation-form";
import { LoadingFullScreen } from "@/shared/components/business/loading/loading-full-screen";

import { ConceptsStep } from "./steps/concepts-step";
import { FinishStep } from "./steps/finish-step";
import { FormQuestions } from "./steps/form-questions";
import { WelcomeStep } from "./steps/welcome-step";

export function FormEvaluationWizard() {
  const [isLoading, setIsLoading] = useState(true);
  const [errorStatusCode, setErrorStatusCode] = useState<number | null>(null);

  const [evaluationForm, setEvaluationForm] =
    useState<EvaluationFormResponse | null>(null);

  const { key } = useParams<{ key: string }>();
  const getEvaluationForm = useCallback(async () => {
    setIsLoading(true);

    try {
      const response = await getEvaluationFormAction(key);
      if (response.data) setEvaluationForm(response.data);
      if (response.error) setErrorStatusCode(response.error.status);
    } finally {
      setIsLoading(false);
    }
  }, [key]);

  useEffect(() => {
    getEvaluationForm();
  }, [getEvaluationForm]);

  const metricsUsed = {
    use_relevance: evaluationForm?.evaluation?.use_relevance || false,
    use_answerability: evaluationForm?.evaluation?.use_answerability || false,
    use_utility: evaluationForm?.evaluation?.use_utility || false,
  };

  if (isLoading) return <LoadingFullScreen />
  if (errorStatusCode) return <ErrorScreenForm errorStatusCode={errorStatusCode} />;
  
  return (
    <Wizard>
      <WelcomeStep
        instructions={evaluationForm?.evaluation?.instructions || ""}
      />
      <ConceptsStep metricsUsed={metricsUsed} />
      <FormQuestions
        metricsUsed={metricsUsed}
        questions={evaluationForm?.questions || []}
      />
      <FinishStep />
    </Wizard>
  );
}
