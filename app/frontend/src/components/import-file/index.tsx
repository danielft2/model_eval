"use client";

import * as Dialog from "@radix-ui/react-dialog";
import {
  ArrowUpFromLine,
  FileSpreadsheet,
  LoaderCircle,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Show } from "@/components/ui/show";
import { ShowConditional } from "@/components/ui/show-conditional";

import { FilePreview } from "./file-preview";
import { useLoadingStore } from "@/store/loading-store";

type ImportFileModalProps = {
  isOpen: boolean;
  title: string;
  legend: string;
  setIsOpen: (value: boolean) => void;
  onImportFile: (file: File) => Promise<void>; 
};

export function ImportFileModal({
  isOpen,
  title,
  legend,
  setIsOpen,
  onImportFile,
}: ImportFileModalProps) {
  const [file, setFile] = useState<File>();
  const isLoading = useLoadingStore(state => state.isLoading);

  function handleFileUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) setFile(file);
  }

  async function save() {
    if (!file) {
      console.error("Nenhum arquivo foi selecionado.");
      return;
    }

    const form = new FormData();
    form.append("file", file);
    onImportFile(file);
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
              {title}
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
                  {legend}
                </h2>
                <p className="text-slate-600 font-body font-medium text-sm">
                  Seu arquivo csv deve está no mesmo formato do apresentado no exemplo abaixo.
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

          <FilePreview file={file} />

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
