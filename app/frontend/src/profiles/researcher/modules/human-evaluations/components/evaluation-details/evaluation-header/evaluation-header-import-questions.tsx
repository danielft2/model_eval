import { ArrowUpFromLine } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { importQuestionsAction } from "@/human-evaluations/actions/http/import-questions-action";
import { ImportFileModal } from "@/shared/components/business/import-file";
import { Button } from "@/shared/components/ui/button";
import { useHumanEvaluationDetailsStore } from "@/shared/stores/human-evaluation-details";

type EvaluationHeaderImportQuestionsProps = {
  evaluationId: string;
};

export function EvaluationHeaderImportQuestions({
  evaluationId,
}: EvaluationHeaderImportQuestionsProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const setEvaluationDetails = useHumanEvaluationDetailsStore(
    (state) => state.setDataOverview
  );
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const handleImportQuestions = async (file: File) => {
    const response = await importQuestionsAction({ evaluationId, file });
    if (response?.data?.data) {
      toast.success("Questões importadas com sucesso!");
      setEvaluationDetails(response?.data?.data);
      handleUpdateOverviewAllQuestions();
    }
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
