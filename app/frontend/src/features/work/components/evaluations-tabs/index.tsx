import * as Tabs from "@radix-ui/react-tabs";
import { CircleUserRound, Wrench } from "lucide-react";
import { Suspense } from "react";

import { AutomaticEvaluationList } from "@/features/work/automatic-evaluations/components/evaluation-list";
import { HumanEvaluationsList } from "@/features/work/human-evaluations/components/evaluation-list";

import { NewEvaluationButton } from "./new-evaluation-button";

export function EvaluationsTabs() {
  return (
    <Tabs.Root className="flex flex-col" defaultValue="automatica">
      <div className="flex items-center justify-between">
        <Tabs.List
          className="flex w-[280px] font-heading bg-slate-100 p-1 rounded-lg"
          aria-label="Suas avaliações"
        >
          <Tabs.Trigger
            className="flex h-7 gap-2 -tracking-wide flex-1 cursor-default select-none items-center justify-center px-3 leading-none text-sm font-medium text-slate-500 outline-none rounded-lg hover:text-violet11 data-[state=active]:bg-slate-200 data-[state=active]:text-slate-800 transition-colors"
            value="automatica"
          >
            <Wrench size={16} />
            Automáticas
          </Tabs.Trigger>
          <Tabs.Trigger
            className="flex h-7 gap-2 flex-1 -tracking-wide cursor-default select-none items-center justify-center px-3 leading-none text-sm font-medium text-slate-500 outline-none rounded-lg hover:text-violet11 data-[state=active]:bg-slate-200 data-[state=active]:text-slate-800 transition-colors"
            value="humana"
          >
            <CircleUserRound size={16} />
            Humanas
          </Tabs.Trigger>
        </Tabs.List>
        
        <Suspense>
          <NewEvaluationButton />
        </Suspense>
      </div>
      <Tabs.Content
        className="grow rounded-b-md bg-white py-5 outline-none"
        value="automatica"
      >
        <Suspense fallback={<p>Carregando...</p>}>
          <AutomaticEvaluationList />
        </Suspense>
      </Tabs.Content>
      <Tabs.Content
        className="grow rounded-b-md bg-white py-5 outline-none"
        value="humana"
      >
        <Suspense fallback={<p>Carregando...</p>}>
          <HumanEvaluationsList />
        </Suspense>
      </Tabs.Content>
    </Tabs.Root>
  );
}
