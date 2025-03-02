import * as Dialog from "@radix-ui/react-dialog";
import { ChoiceEvaluationCards } from "../choice-evaluation-cards";
import Image from "next/image";
import { X } from "lucide-react";

type ChoiceEvaluationTypeModalProps = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
};

export function ChoiceEvaluationTypeModal({
  isOpen,
  setIsOpen,
}: ChoiceEvaluationTypeModalProps) {
  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-slate-900/30 data-[state=open]:animate-overlayShow" />
        <Dialog.Content
          className="fixed left-1/2 top-1/2 max-h-[85vh] w-fit -translate-x-1/2 
          -translate-y-1/2 rounded-xl bg-white px-8 py-10 shadow-sm focus:outline-none 
          data-[state=open]:animate-contentShow flex flex-col items-center gap-7"
        >
          <Dialog.Close className="absolute top-5 right-5 cursor-pointer text-sla">
            <X size={20}/>
          </Dialog.Close>
           
          <div className="flex flex-col items-center">
            <Image src={"/logo.svg"} width={36} height={36} alt="logo" className="mb-3" />
            <Dialog.Title className="text-lg font-medium font-heading -tracking-wide text-slate-900">
              Que avaliação você deseja criar?
            </Dialog.Title>
            <Dialog.Description className="font-body font-medium text-sm text-slate-600">
              Escolha abaixo um dos tipos de avaliação disponiveis para ser
              realizada
            </Dialog.Description>
          </div>

          <ChoiceEvaluationCards />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
