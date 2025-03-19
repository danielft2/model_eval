'use client'
import { Edit, MoreHorizontal, Trash } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import { deleteHumanEvaluationAction } from "@/profiles/researcher/modules/human-evaluations/actions/http/delete-evaluation-action";
import { Button } from "@/shared/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { HumanEvaluationInsertModal } from "../evaluation-insert";

type AutomaticEvaluationCardOptionsProps = {
  evaluationId: string
};

export function HumanEvaluationCardOptions({ evaluationId }: AutomaticEvaluationCardOptionsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  async function handleDeleteEvaluation() {
    await deleteHumanEvaluationAction({ evaluationId })
  }

  function handleEditEvaluation() {
    const params = new URLSearchParams(searchParams.toString());
    params.set('edit', evaluationId.toString());
    router.push(`${pathname}?${params.toString()}`);
    setIsOpen(true);
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="absolute top-4 right-4 text-slate-600"
          >
            <MoreHorizontal size={16} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="bottom" align="end">
          <DropdownMenuItem onClick={handleEditEvaluation}>
            <Edit />
            Editar
          </DropdownMenuItem>
          <DropdownMenuItem className="text-red-700" onClick={handleDeleteEvaluation}>
            <Trash /> Excluir
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <HumanEvaluationInsertModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}
