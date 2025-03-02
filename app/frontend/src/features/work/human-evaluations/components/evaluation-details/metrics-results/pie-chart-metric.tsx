"use client";

import { Pie, PieChart as PieChartRechart } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { PieChartCustomizedLabel } from "@/components/ui/pie-chart-customized-label";
import { ShowConditional } from "@/components/ui/show-conditional";
import { NotResults } from "./not-results";

type ChartMetricData = {
  category: string;
  value: number;
  fill: string;
};

type PieChartProps = {
  title: string;
  description: string;
  data: ChartMetricData[];
};

export function PieChartMetric({ title, description, data }: PieChartProps) {
  const chartConfig = data.reduce((config, item) => {
    config[item.category] = {
      label: item.category,
      color: item.fill,
    };
    return config;
  }, {} as Record<string, { label: string; color: string }>);

  const allValuesZered = data.every((d) => d.value === 0);

  return (
    <Card className="flex flex-col shadow-none">
      <CardHeader className="items-center pb-0">
        <CardTitle>{title}</CardTitle>
        <CardDescription className="text-center max-w-[65ch]">
          {description}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-1 pb-0">
        <ShowConditional
          condition={allValuesZered}
          then={<NotResults />}
          otherwise={
            <ChartContainer
              config={chartConfig}
              className="mx-auto aspect-square max-h-[250px] pb-0 [&_.recharts-pie-label-text]:fill-foreground"
            >
              <PieChartRechart>
                <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                <ChartLegend
                  layout="vertical"
                  content={<ChartLegendContent verticalAlign="middle" />}
                />
                <Pie
                  data={data}
                  dataKey="value"
                  label={PieChartCustomizedLabel}
                  nameKey="category"
                />
              </PieChartRechart>
            </ChartContainer>
          }
        />
      </CardContent>
    </Card>
  );
}
