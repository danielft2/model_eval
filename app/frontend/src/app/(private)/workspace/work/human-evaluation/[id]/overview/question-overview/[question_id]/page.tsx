import { Divider } from "@/components/ui/divider";
import { Show } from "@/components/ui/show";
import { getQuestionOverview } from "@/features/work/automatic-evaluations/actions/get-question-overview";
import { PieChartMetric } from "@/features/work/human-evaluations/components/evaluation-details/metrics-results/pie-chart-metric";
import { OverviewCard } from "@/features/work/human-evaluations/components/evaluation-details/overview-card";
import { formatRechartData } from "@/lib/rechart";
import { cn } from "@/lib/utils";
import { CircleCheck } from "lucide-react";

type Params = {
  question_id: string;
};

export default async function QuestionOverviewPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { question_id } = await params;
  const response = await getQuestionOverview(question_id);

  if (!response.data) return <h1>Ocorreu um erro.</h1>;
  const { question, metrics_result, number_of_evaluations } = response.data;
  const questionOptions = question.options
    .replace(/^\['|'\]$/g, "")
    .split("', '");
  const optionsLabels = ["A", "B", "C", "D"];

  return (
    <div className="space-y-7">
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="font-heading font-medium text-slate-800 -tracking-wider">
            {question.title}
          </h1>
          <p className="font-body text-sm font-medium text-slate-600 max-w-full line-clamp-3 leading-relaxed">
            {question.text}
          </p>
        </div>

        <div className="font-heading -tracking-wider space-y-2">
          <h1 className="text-[15px] font-medium text-slate-700">
            {question.command}
          </h1>
          <ul className="space-y-1">
            {questionOptions.map((option, index) => (
              <li key={index}>
                <span
                  className={cn("text-[15px] text-slate-600", {
                    "text-brand-800 font-medium":
                      optionsLabels[index].toLowerCase() ==
                      question.answer_item,
                  })}
                >
                  {`${optionsLabels[index]})`} {option}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <p className="px-4 py-2 bg-slate-200 font-heading font-medium -tracking-wider text-slate-700 text-[15px] rounded-lg">
          {question.descriptor}
        </p>
      </div>

      <Divider />

      <OverviewCard
        className="flex-1"
        value={number_of_evaluations}
        icon={CircleCheck}
      >
        Avaliações Realizadas
      </OverviewCard>

      <div className="space-y-6">
        <Show when={metrics_result.relevance != null}>
          <PieChartMetric
            data={formatRechartData(metrics_result.relevance)}
            title="Métrica de Relevância"
            description="Levando em consideração o descritor, o texto e as alternativas, 
                    em sua opinião você considera essa questão relevante?"
          />
        </Show>

        <Show when={metrics_result.answerability != null}>
          <PieChartMetric
            data={formatRechartData(metrics_result.answerability)}
            title="Métrica de Respondibilidade"
            description="Levando em consideração o descritor, o texto e as alternativas, em sua 
            opinião você considera que essa questão é respondível?"
          />
        </Show>

        <Show when={metrics_result.utility != null}>
          <PieChartMetric
            data={formatRechartData(metrics_result.utility)}
            title="Métrica de Utilidade"
            description="Com base no descritor, no texto e nas alternativas apresentadas, em qual 
            das escalas de utilidade abaixo você acredita que esta questão se encaixa melhor?"
          />
        </Show>
      </div>
    </div>
  );
}
