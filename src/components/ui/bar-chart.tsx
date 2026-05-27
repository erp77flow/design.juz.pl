import * as React from "react";
import {
  Bar,
  BarChart as RechartsBarChart,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { cn } from "@/lib/utils";

interface BarChartProps {
  data: Array<Record<string, any>>;
  categoryKey: string;
  series: Array<{ key: string; label?: string; color?: string }>;
  config?: ChartConfig;
  stacked?: boolean;
  className?: string;
  hideGrid?: boolean;
  hideAxis?: boolean;
}

const BarChart = ({
  data,
  categoryKey,
  series,
  config,
  stacked,
  className,
  hideGrid,
  hideAxis,
}: BarChartProps) => {
  const chartConfig: ChartConfig =
    config ||
    series.reduce<ChartConfig>(
      (acc, s, idx) => ({
        ...acc,
        [s.key]: {
          label: s.label ?? s.key,
          color:
            s.color ??
            `hsl(var(--chart-${(idx % 5) + 1}, var(--primary)))`,
        },
      }),
      {}
    );

  return (
    <ChartContainer config={chartConfig} className={cn("aspect-auto h-64 w-full", className)}>
      <RechartsBarChart data={data}>
        {hideGrid ? null : <CartesianGrid vertical={false} />}
        {hideAxis ? null : (
          <>
            <XAxis
              dataKey={categoryKey}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis tickLine={false} axisLine={false} width={32} />
          </>
        )}
        <ChartTooltip content={<ChartTooltipContent />} />
        {series.map((s) => (
          <Bar
            key={s.key}
            dataKey={s.key}
            stackId={stacked ? "stack" : undefined}
            fill={`var(--color-${s.key})`}
            radius={stacked ? 0 : 6}
          />
        ))}
      </RechartsBarChart>
    </ChartContainer>
  );
};

export { BarChart };
export type { BarChartProps };
