"use client";

import { CircleHelp, Database } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import { ScrollArea } from "@/components/ui/scroll-area";
import { useHumanEvaluationDetailsStore } from "@/store/human-evaluation-details";
import { SidebarItem } from "./sidebar-item";

export function Sidebar() {
  const questions = useHumanEvaluationDetailsStore(state => state.questions);
  const router = useRouter();
  const pathName = usePathname();
  const basePath = pathName.split("/question-overview")[0];
  
  function handleSelecteItem(value: string) {
    const newPath = value === "overview" ? basePath : `${basePath}/question-overview/${value}`;
    router.replace(newPath);
  }

  return (
    <ScrollArea style={{ height: "calc(100vh - 200px)" }}>
      <aside className="min-w-[256px] h-full py-6 pr-5 border-r space-y-4 border-slate-300" >
        <SidebarItem
          valueItem="overview"
          activeItem={!pathName.includes("question-overview")}
          onClickItem={handleSelecteItem}
        >
          <Database />
          Informações Gerais
        </SidebarItem>

        <div className="space-y-1 h-full">
          <span className="font-heading text-xs font-medium text-slate-600">
            QUESTÕES
          </span>
          <ul className="space-y-2">
            {questions.map((question, index) => (
              <li key={question.id}>
                <SidebarItem
                  valueItem={question.id}
                  activeItem={pathName.includes(`question-overview/${question.id}`)}
                  onClickItem={handleSelecteItem}
                >
                  <CircleHelp />
                  Q{index + 1} {question.descriptor_code}
                </SidebarItem>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </ScrollArea>
  );
}
