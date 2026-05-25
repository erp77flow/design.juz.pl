import * as React from "react";
import {
  CartesianGrid,
  Line,
  LineChart as RechartsLineChart,
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

interface LineChartProps {
  data: Array<Record<string, any>>;
  categoryKey: string;
  series: Array<{ key: string; label?: string; color?: string; dashed?: boolean }>;
  config?: ChartConfig;
  className?: string;
  hideGrid?: boolean;
  hideAxis?: boolean;
}

const LineChart = ({
  data,
  categoryKey,
  series,
  config,
  className,
  hideGrid,
  hideAxis,
}: LineChartProps) => {
  const chartConfig: ChartConfig =
    config ||
    series.reduce<ChartConfig>(
      (acc, s, idx) => ({
        ...acc,
        [s.key]: {
          label: s.label ?? s.key,
          color:
            s.color ?? `hsl(var(--chart-${(idx % 5) + 1}, var(--primary)))`,
        },
      }),
      {}
    );

  return (
    <ChartContainer config={chartConfig} className={cn("h-64 w-full", className)}>
      <RechartsLineChart data={data}>
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
          <Line
            key={s.key}
            type="monotone"
            dataKey={s.key}
            stroke={`var(--color-${s.key})`}
            strokeWidth={2}
            strokeDasharray={s.dashed ? "6 4" : undefined}
            dot={false}
            activeDot={{ r: 4 }}
          />
        ))}
      </RechartsLineChart>
    </ChartContainer>
  );
};

export { LineChart };
export type { LineChartProps };
