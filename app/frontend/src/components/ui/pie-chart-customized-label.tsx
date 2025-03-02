import { PieLabelRenderProps } from "recharts";

export const PieChartCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent
}: PieLabelRenderProps) => {
  const RADIAN = Math.PI / 180;

  const radius = (innerRadius as number) + ((outerRadius as number) - (innerRadius as number)) * 0.5;
  const x = (cx as number) + radius * Math.cos(-midAngle! * RADIAN);
  const y = (cy as number) + radius * Math.sin(-midAngle! * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > (cx as number) ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent! * 100).toFixed(0)}%`}
    </text>
  );
};