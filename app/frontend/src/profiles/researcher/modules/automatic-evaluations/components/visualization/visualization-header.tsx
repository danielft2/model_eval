"use client";

import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { importFileTestAction } from "@/automatic-evaluations/actions/http/import-file-test-action";
import { ImportFileModal } from "@/profiles/researcher/shared/components/import-file-modal";
import { Button } from "@/shared/components/ui/button";

export type EvaluationDetailsHeaderProps = {
  evaluationId: string;
  evaluationTitle: string | undefined;
}

export function EvaluationDetailsHeader({ evaluationId, evaluationTitle }: EvaluationDetailsHeaderProps) {
  const [isOpenModalImportTestBase, setIsOpenModalImportTestBase] = useState(false);
  
  const { back } = useRouter();
  const { isPending, executeAsync } = useAction(importFileTestAction, {
    onSuccess: ({ data }) => {
      toast.success(data?.message);
      setIsOpenModalImportTestBase(false)
    },
    onError: ({ error }) => {
      toast.error(error.serverError)
    }
  })

  const handleImportTestBase = async (file: File) => {
    await executeAsync({ evaluationId, file });
  };

  return (
    <>
      <header className="mb-6 flex justify-between items-center">
        <div>
          <div className="flex items-center gap-2 font-heading text-sm -tracking-wider text-slate-600">
            <a onClick={back} className="cursor-pointer">Avaliações</a>
            <span>/</span>
            <span className="text-brand-800 font-medium">
              {evaluationTitle}{" "}
            </span>
          </div>
          <h1 className="font-heading -tracking-wider text-slate-900 text-lg font-medium">
            Detalhes da avaliação
          </h1>
        </div>

        <Button variant="secondary" onClick={() => setIsOpenModalImportTestBase(true)}>
          Base de teste
        </Button>
      </header>

      <ImportFileModal
        title="Avaliação Automática - Base de Teste"
        legend="Importe o conjunto de teste a ser utilizado"
        isOpen={isOpenModalImportTestBase}
        isLoading={isPending}
        setIsOpen={(value) => setIsOpenModalImportTestBase(value)}
        onImportFile={handleImportTestBase}
      />
    </>
  );
}
