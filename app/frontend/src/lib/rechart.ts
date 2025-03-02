import { BinaryMetric, UtilityMetric } from "@/features/work/human-evaluations/types/human-metrics";

const metricLabels: Record<string, string> = {
  total_considered: "Sim considero",
  total_not_considered: "Não considero",
  total_useful_without_edits: "Útil sem edições",
  total_userful_with_minor_edits: "Útil com pequenas edições",
  total_useful_with_importants_edits: "Útil com edições importantes",
  total_not_useful: "Não útil",
};

export function formatRechartData(
  metric: BinaryMetric | UtilityMetric | undefined,
) {
  const data = metric as Record<string, number>;
  if (!data) return [];
  
  const formatData = Object.keys(data).map((key, index) => ({
    category: metricLabels[key],
    value: data[key],
    fill: `hsl(var(--chart-${index + 1}))`,
  }));

  return formatData;
}

export function formatRechartDataWithConfig(
  metric: BinaryMetric | UtilityMetric,
) {
  const data = metric as Record<string, number>;
  const formatConfig = Object.keys(data).map((key, index) => ({
    category: metricLabels[key],
    value: data[key],
    fill: `hsl(var(--chart-${index + 1}))`,
  }));

  return formatConfig;
}
