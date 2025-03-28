"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { tQuestions, useHumanEvaluationDetailsStore } from "@/shared/stores/human-evaluation-details";
import { Content } from "./content";

export function OverviewAllQuestions() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const descriptorCode = searchParams.get("descriptor_code") ?? "0";

  const questionsDecriptors = useHumanEvaluationDetailsStore(
    (state) => state.questions
  );

  const questionsOptions: tQuestions[] = useMemo(() => {
    return questionsDecriptors.reduce((acc, current) => {
      if (
        !acc.some(
          (item: tQuestions) =>
            item.descriptor_code === current.descriptor_code
        )
      ) {
        acc.push(current as never);
      }
      return acc;
    }, []);
  }, [questionsDecriptors]);

  function handleChangedDescriptor(descriptorCode: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("descriptor_code", descriptorCode);
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="space-y-4">
      <Select
        value={descriptorCode}
        defaultValue="0"
        onValueChange={handleChangedDescriptor}
      >
        <SelectTrigger className="w-52">
          <SelectValue placeholder="Descritor" className="text-slate-600" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="0">Todos os descritores</SelectItem>
          {questionsOptions.map((question) => (
            <SelectItem key={question.id} value={question.descriptor_code}>
              {question.descriptor_code}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Content decriptorCode={descriptorCode} />
    </div>
  );
}
