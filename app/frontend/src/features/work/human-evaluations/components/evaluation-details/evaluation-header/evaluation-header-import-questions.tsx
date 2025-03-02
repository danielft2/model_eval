import { ArrowUpFromLine } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { ImportFileModal } from "@/components/import-file";
import { Button } from "@/components/ui/button";
import { importQuestionsAction } from "@/features/work/human-evaluations/actions/import-questions";
import { useHumanEvaluationDetailsStore } from "@/store/human-evaluation-details";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

type EvaluationHeaderImportQuestionsProps = {
  evaluationId: string;
};

export function EvaluationHeaderImportQuestions({ evaluationId }: EvaluationHeaderImportQuestionsProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const setEvaluationDetails = useHumanEvaluationDetailsStore(state => state.setDataOverview);
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const handleImportQuestions = async (file: File) => {
    try {
      const form = new FormData();
      form.append("file", file);

      const response = await importQuestionsAction(evaluationId, form);
      if (response.data) { 
        toast.success("Questões importadas com sucesso!");
        setEvaluationDetails(response.data);
        handleUpdateOverviewAllQuestions();
      } else toast.error(response.error);
    } finally {}
  };

  function handleUpdateOverviewAllQuestions() {
    const params = new URLSearchParams(searchParams.toString());
    params.set("descriptor_code", "0");
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <>
      <Button
        variant="secondary"
        className="w-36"
        onClick={() => setIsModalOpen(true)}
      >
        <ArrowUpFromLine />
        Questões
      </Button>

      <ImportFileModal
        isOpen={isModalOpen}
        title="Avaliação Humana - Questões"
        legend="Importe as questões para avaliação"
        setIsOpen={setIsModalOpen}
        onImportFile={handleImportQuestions}
      />
    </>
  );
}
