'use client'

import { Edit, MoreHorizontal, Trash } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { deleteEvaluationAction } from "@/automatic-evaluations/actions/http/delete-evaluation-action";
import { EvaluationInsertModal } from "@/automatic-evaluations/components/evaluation-insert";
import { Button } from "@/shared/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";

type AutomaticEvaluationCardOptionsProps = {
  evaluationId: string;
};

export function EvaluationCardOptions({ evaluationId }: AutomaticEvaluationCardOptionsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { executeAsync } = useAction(deleteEvaluationAction, {
    onSuccess: ({ data }) => {
      toast.success(data?.message);
    },
    onError: ({ error }) => {
      toast.error(error.serverError);
    },
  });

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  async function handleDeleteEvaluation() {
    await executeAsync({ evaluationId });
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
