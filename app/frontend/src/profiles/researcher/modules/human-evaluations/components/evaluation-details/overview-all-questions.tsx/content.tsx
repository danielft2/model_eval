import { CircleCheck, CircleHelp } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { formatRechartData } from "@/shared/libs/rechart";
import { Show } from "@/shared/components/ui/show";

import { getOverviewAllQuestionsAction } from "@/human-evaluations/actions/http/get-overview-all-questions-action";
import { HumanEvaluationAllQuestionsOverview } from "@/human-evaluations/infra/http/responses/human-evaluation-allquestions-overview";
import { PieChartMetric } from "../metrics-results/pie-chart-metric";
import { OverviewCard } from "../overview-card";

type OverviewAllQuestionsProps = {
  decriptorCode: string;
};

export function Content({ decriptorCode }: OverviewAllQuestionsProps) {
  const [data, setData] = useState<HumanEvaluationAllQuestionsOverview>();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    (async () => {
      try {
        const response = await getOverviewAllQuestionsAction({
          evaluationId: id,
          descriptor: decriptorCode,
        });
        if (!response?.data) toast.error(response?.serverError);
        else setData(response.data.data);
      } finally {
      }
    })();
  }, [id, decriptorCode]);

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-4">
        <OverviewCard
          className="flex-1"
          value={data?.num_questions_of_evaluator}
          icon={CircleHelp}
        >
          Questões por Avaliador
        </OverviewCard>

        <OverviewCard
          className="flex-1"
          value={data?.number_of_evaluations}
          icon={CircleCheck}
        >
          Avaliações Realizadas
        </OverviewCard>

        <OverviewCard
          className="flex-1"
          value={data?.number_questions_evaluated}
          icon={CircleHelp}
        >
          Questões Avaliadas
        </OverviewCard>

        <OverviewCard
          className="flex-1"
          value={data?.number_ungraded_questions}
          icon={CircleHelp}
        >
          Questões não Avaliadas
        </OverviewCard>
      </div>

      <Show when={data?.metrics_result.relevance != null}>
        <PieChartMetric
          data={formatRechartData(data?.metrics_result.relevance)}
          title="Métrica de Relevância"
          description="Levando em consideração o descritor, o texto e as alternativas, 
            em sua opinião você considera essa questão relevante?"
        />
      </Show>

      <Show when={data?.metrics_result.answerability != null}>
        <PieChartMetric
          data={formatRechartData(data?.metrics_result.answerability)}
          title="Métrica de Respondibilidade"
          description="Levando em consideração o descritor, o texto e as alternativas, em sua 
            opinião você considera que essa questão é respondível?"
        />
      </Show>

      <Show when={data?.metrics_result.utility != null}>
        <PieChartMetric
          data={formatRechartData(data?.metrics_result.utility)}
          title="Métrica de Utilidade"
          description="Com base no descritor, no texto e nas alternativas apresentadas, em qual 
            das escalas de utilidade abaixo você acredita que esta questão se encaixa melhor?"
        />
      </Show>
    </div>
  );
}
