"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { importFileTestAction } from "@/features/work/automatic-evaluations/actions/import-file-test";
import * as Dialog from "@radix-ui/react-dialog";
import {
  ArrowUpFromLine,
  FileSpreadsheet,
  LoaderCircle,
  X,
} from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { FileTestFormat } from "./file-test-format";
import { ShowConditional } from "@/components/ui/show-conditional";
import { Show } from "@/components/ui/show";

type ImportFileTestModalProps = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
};

export function ImportFileTestModal({
  isOpen,
  setIsOpen,
}: ImportFileTestModalProps) {
  const { evaluation_id } = useParams<{ evaluation_id: string }>();

  const [file, setFile] = useState<File>();
  const [isLoading, setIsLoading] = useState(false);

  function handleFileUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) setFile(file);
  }

  async function save() {
    if (!file) {
      console.error("Nenhum arquivo foi selecionado.");
      return;
    }

    try {
      setIsLoading(true);

      const form = new FormData();
      form.append("file", file);

      const response = await importFileTestAction(evaluation_id, form);

      if (response.data) {
        toast.success(response.data);
        setIsOpen(false);
      } else {
        toast.error(response.error);
      }
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (!isOpen) setFile(undefined);
  }, [isOpen]);

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-slate-900/30 data-[state=open]:animate-overlayShow" />
        <Dialog.Content
          className="fixed left-1/2 top-1/2 w-[90vw] max-w-[1000px] -translate-x-1/2 
          -translate-y-1/2 rounded-lg bg-white p-[25px] shadow-sm focus:outline-none data-[state=open]:animate-contentShow"
        >
          <Dialog.Title className="flex justify-between items-center text-slate-900 border-b border-slate-300 pb-4 mb-6">
            <span className="font-medium font-heading -tracking-wider text-lg">
              Avaliação Automática
            </span>
            <Dialog.Close asChild>
              <button>
                <X size={20} />
              </button>
            </Dialog.Close>
          </Dialog.Title>

          <div className="flex items-center justify-between mb-7">
            <div className="flex items-center gap-2">
              <div className="size-8 bg-brand-700 rounded-full flex items-center justify-center">
                <FileSpreadsheet className="text-white" size={16} />
              </div>

              <div className="">
                <h2 className="text-slate-800 font-heading font-medium -tracking-wider">
                  Importe sua base de teste
                </h2>
                <p className="text-slate-600 font-body font-medium text-sm">
                  Sua base deve está no mesmo formato da base de teste
                  apresentada no exemplo abaixo.
                </p>
              </div>
            </div>

            <div>
              <label
                htmlFor="file"
                className="px-3 flex items-center gap-1 w-fit py-2 border border-brand-800 rounded-lg font-heading -tracking-wider text-sm 
                font-medium text-brand-900 cursor-pointer hover:bg-brand-100/40"
              >
                <ArrowUpFromLine size={16} />
                Importar CSV
              </label>
              <Input
                id="file"
                type="file"
                accept=".csv"
                className="hidden"
                onChange={handleFileUpload}
              />
            </div>
          </div>

          <FileTestFormat file={file} />

          <div className="mt-[25px] flex gap-2 justify-end">
            <Dialog.Close asChild disabled={isLoading}>
              <Button variant="secondary">Cancelar</Button>
            </Dialog.Close>
            <Button onClick={save} disabled={isLoading || !file}>
              <ShowConditional
                condition={isLoading}
                then={"Salvando"}
                otherwise={"Salvar"}
              />
              <Show when={isLoading}>
                <LoaderCircle className="animate-spin size-full" />
              </Show>
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
