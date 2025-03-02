'use client'
import { Edit, MoreHorizontal, Trash } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteEvaluationAction } from "@/features/work/automatic-evaluations/actions/delete-evaluation";
import { EvaluationInsertModal } from "@/features/work/automatic-evaluations/components/evaluation-insert";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type AutomaticEvaluationCardOptionsProps = {
  evaluationId: number
};

export function EvaluationCardOptions({ evaluationId }: AutomaticEvaluationCardOptionsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  async function handleDeleteEvaluation() {
    try {
      toast.promise(deleteEvaluationAction(evaluationId), {
        loading: 'Deletando...',
        success: (response) => {
          return response.data ?? response.error;   
        },
      });
    } finally {}
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

      <EvaluationInsertModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}
