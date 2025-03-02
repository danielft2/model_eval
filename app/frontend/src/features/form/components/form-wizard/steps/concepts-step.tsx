import * as Accordion from "@radix-ui/react-accordion";
import Image from "next/image";
import { useState } from "react";
import { useWizard } from "react-use-wizard";

import { MetricAccordion } from "@/components/metric-accordion";
import { Button } from "@/components/ui/button";
import { Show } from "@/components/ui/show";

type ConceptsStepProps = {
  metricsUsed: {
    use_relevance: boolean;
    use_answerability: boolean;
    use_utility: boolean;
  };
};

export function ConceptsStep({ metricsUsed }: ConceptsStepProps) {
  const [atictiveAccordion, setActiveAccordion] = useState("");
  const { nextStep } = useWizard();

  return (
    <div className="flex flex-col h-full justify-center items-center gap-9 max-w-full">
      <div className="flex flex-col items-center gap-8 max-w-[600px]">
        <Image
          src="/concepts.svg"
          alt="apresentando conceitos"
          width={200}
          height={200}
        />
        <div className="text-center space-y-2">
          <h1 className="text-slate-950 text-4xl font-medium font-heading -tracking-wider">
            Apresentando conceitos
          </h1>
          <p className="text-slate-600 font-body font-medium">
            Antes de começar a avaliar as questões é importante que você conheça
            quais critérios você ira utilizar para avaliar as questões.
          </p>
        </div>
      </div>

      <Accordion.Root
        type="single"
        collapsible
        onValueChange={setActiveAccordion}
        className="space-y-3 w-full lg:w-[800px]"
      >
        <Show when={metricsUsed.use_relevance}>
          <MetricAccordion
            label="Relevância"
            activeAccordion={atictiveAccordion}
            accordionValue="relevance"
          >
            Avalie se a questão, como um todo, é relevante. Isso inclui
            verificar se ela faz sentido em relação ao descritor especificado,
            bem como se as alternativas geradas são coerentes com o comando e o
            texto fornecido.
          </MetricAccordion>
        </Show>

        <Show when={metricsUsed.use_answerability}>
          <MetricAccordion
            label="Respondibilidade"
            activeAccordion={atictiveAccordion}
            accordionValue="answerability"
          >
            Essa métrica tem como objetivo avaliar se a questão gerada é
            respondível, ou seja se há algum trecho no texto que responde à
            pergunta, ou que poderia levar a uma resposta sem nenhuma outra
            informação necessária.
          </MetricAccordion>
        </Show>

        <Show when={metricsUsed.use_utility}>
          <MetricAccordion
            label="Utilidade"
            activeAccordion={atictiveAccordion}
            accordionValue="utility"
          >
            Essa métrica tem como objetivo avaliar se a questão é útil para o
            contexto pedagógico. Então suponha que você queira ensinar sobre um
            descritor, avalie se a questão apresentada é útil para isso.
          </MetricAccordion>
        </Show>
      </Accordion.Root>

      <Button onClick={nextStep}>Entendido!</Button>
    </div>
  );
}
