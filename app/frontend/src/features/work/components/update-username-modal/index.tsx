import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import * as Dialog from "@radix-ui/react-dialog";

type UpdateNameUserProps = {
  isOpen: boolean;
}

export function UpdateUsernameModal({ isOpen }: UpdateNameUserProps) {
  return (
    <Dialog.Root open={isOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-slate-900/30 data-[state=open]:animate-overlayShow" />
        <Dialog.Content className="fixed left-1/2 top-1/2 max-h-[85vh] w-[90vw] max-w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-[25px] shadow-sm focus:outline-none data-[state=open]:animate-contentShow">
          <Dialog.Title className="text-lg font-medium font-heading -tracking-wide text-slate-900">
            Vamos começar?
          </Dialog.Title>
          <Dialog.Description className="font-body font-medium text-sm text-slate-600">
            Nos diga seu nome para continuarmos juntos nessa jornada.
          </Dialog.Description>
          <fieldset className="mt-5 space-y-1">
            <label
              htmlFor="email"
              className="text-sm font-heading font-medium -tracking-wider text-slate-700"
            >
              Nome
            </label>
            <Input />
          </fieldset>
          <div className="mt-[25px] flex justify-end">
            <Dialog.Close asChild>
              <Button>Atualizar</Button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
