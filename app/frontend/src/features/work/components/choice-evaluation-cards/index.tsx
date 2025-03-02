'use client'
import { useState } from "react";

import { EvaluationTypeCard } from "@/components/evaluation-type-card";
import { EvaluationInsertModal } from "@/features/work/automatic-evaluations/components/evaluation-insert";
import { HumanEvaluationInsertModal } from "@/features/work/human-evaluations/components/evaluation-insert";

export function ChoiceEvaluationCards() {
  const [automaticEvaluationIsOpen, setAutomaticEvaluationIsOpen] = useState(false);
  const [humanEvaluationIsOpen, setHumanEvaluationIsOpen] = useState(false);

  function handleOpenAutomaticEvaluation() {
    setAutomaticEvaluationIsOpen(true);
  }

  function handleOpenHumanEvaluation() {
    setHumanEvaluationIsOpen(true);
  }

  return (
    <>
      <div className="flex w-[800px] space-x-5">
        <EvaluationTypeCard.Root onClick={handleOpenAutomaticEvaluation}>
          <EvaluationTypeCard.Image
            src={"/evaluation-automatic.svg"}
            width={110}
            height={110}
            alt="avaliação automática"
          />

          <EvaluationTypeCard.Title>
            Avaliação Automática
          </EvaluationTypeCard.Title>
          <EvaluationTypeCard.Description>
            Avalie seu modelo com métricas automáticas e confira os resultados na
            hora.
          </EvaluationTypeCard.Description>
        </EvaluationTypeCard.Root>

        <EvaluationTypeCard.Root onClick={handleOpenHumanEvaluation}>
          <EvaluationTypeCard.Image
            src={"/evaluation-human.svg"}
            width={110}
            height={110}
            alt="avaliação humana"
          />

          <EvaluationTypeCard.Title>
            Avaliação Humana
          </EvaluationTypeCard.Title>
          <EvaluationTypeCard.Description>
            Crie uma avaliação para avaliar seu modelo com métricas humanas.
          </EvaluationTypeCard.Description>
        </EvaluationTypeCard.Root>
      </div>
    
      <EvaluationInsertModal
        isOpen={automaticEvaluationIsOpen}
        setIsOpen={setAutomaticEvaluationIsOpen}
      />   

      <HumanEvaluationInsertModal 
        isOpen={humanEvaluationIsOpen}
        setIsOpen={setHumanEvaluationIsOpen}
      />
    </>
  );
}
