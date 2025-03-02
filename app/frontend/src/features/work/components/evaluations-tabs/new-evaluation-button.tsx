"use client";

import { ListVideo } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";

import { ChoiceEvaluationTypeModal } from "../choice-evaluation-type-modal";

export function NewEvaluationButton() {
  const [isOpen, setIsOpen] = useState(false);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  function handleNewEvaluation() {
    if (searchParams.has("edit")) {
      const params = new URLSearchParams(searchParams.toString());
      params.delete("edit");
      router.push(`${pathname}?${params.toString()}`);
      setTimeout(() => setIsOpen(true), 100);
    } else {
      setIsOpen(true);
    }
  }

  return (
    <>
      <Button size="sm" className="gap-1" onClick={handleNewEvaluation}>
        <ListVideo />
        Nova avaliação
      </Button>

      <ChoiceEvaluationTypeModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}
