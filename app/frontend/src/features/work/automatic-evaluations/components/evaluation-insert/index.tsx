import * as Dialog from "@radix-ui/react-dialog";
import { Suspense } from "react";

import { DialogTitle } from "@/components/dialog/dialog-title";
import { EvaluationInsertForm } from "./evaluation-insert-form";

type EvaluationModalProps = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  evaluationId?: number;
};

export function EvaluationInsertModal({
  isOpen,
  setIsOpen,
  evaluationId,
}: EvaluationModalProps) {
  if (evaluationId) {
  }

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-slate-900/30 data-[state=open]:animate-overlayShow" />
        <Dialog.Content
          className="fixed left-1/2 top-1/2 min-h-[70vh] w-[90vw] max-w-[1000px] -translate-x-1/2 
          -translate-y-1/2 rounded-lg bg-white p-[25px] shadow-sm focus:outline-none data-[state=open]:animate-contentShow flex flex-col"
        >
          <DialogTitle>Avaliação Automática</DialogTitle>
          <Suspense>
            <EvaluationInsertForm onClose={() => setIsOpen(false)} />
          </Suspense>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
