"use client";

import { Button } from "@/components/ui/button";
import { ArrowUpFromLine } from "lucide-react";
import { useState } from "react";
import { ImportFileTestModal } from "./import-file-test-modal";
import Link from "next/link";

export function EvaluationDetailsHeader() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className="mb-6 flex justify-between items-center">
        <div>
          <div className="flex items-center gap-2 font-heading text-sm -tracking-wider text-slate-600">
            <Link href={"/workspace/work"}>Avaliações</Link>
            <span>/</span>
            <span className="text-brand-800 font-medium">
              Avaliação google/flan-t5-base{" "}
            </span>
          </div>
          <h1 className="font-heading -tracking-wider text-slate-900 text-lg font-medium">
            Detalhes da avaliação
          </h1>
        </div>

        <Button variant="secondary" onClick={() => setIsOpen(true)}>
          <ArrowUpFromLine />
          Base de teste
        </Button>
      </header>

      <ImportFileTestModal
        isOpen={isOpen}
        setIsOpen={(value) => setIsOpen(value)}
      />
    </>
  );
}
