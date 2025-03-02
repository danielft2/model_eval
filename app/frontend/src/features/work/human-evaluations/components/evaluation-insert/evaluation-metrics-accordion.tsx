import { useState } from "react";
import * as Accordion from "@radix-ui/react-accordion";
import { MetricAccordion } from "./metric-accordion";

export function EvaluationMetricsAccordion() {
  const [value, setValue] = useState("");

  return (
    <Accordion.Root
      type="single"
      collapsible
      onValueChange={(value) => setValue(value)}
      className="space-y-3"
    >
      <MetricAccordion
        label="Relevância"
        activeAccordion={value}
        accordionValue="relevance"
      >
        Essa métrica tem como objetivo avaliar se o modelo compreendeu bem a
        entrada e conseguiu produzir saídas coerentes e apropriadas ao contexto.
        Possui uma escala binária (sim ou não).
      </MetricAccordion>

      <MetricAccordion
        label="Respondibilidade"
        activeAccordion={value}
        accordionValue="answerability"
      >
        Essa métrica tem como objetivo avaliar se o modelo respondeu
        adequadamente às perguntas feitas. Possui uma escala binária (sim ou
        não).
      </MetricAccordion>

      <MetricAccordion
        label="Utilidade"
        activeAccordion={value}
        accordionValue="utility"
      >
        Essa métrica tem como objetivo avaliar se o modelo respondeu
        adequadamente às perguntas feitas. Possui uma escala binária (sim ou
        não).
      </MetricAccordion>
    </Accordion.Root>
  );
}
