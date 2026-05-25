import * as React from "react";
import { Cell, Pie, PieChart } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { cn } from "@/lib/utils";

interface DonutChartProps {
  data: Array<{ key: string; value: number; label?: string; color?: string }>;
  className?: string;
  innerRadius?: number;
  outerRadius?: number;
  centerLabel?: React.ReactNode;
}

const DonutChart = ({
  data,
  className,
  innerRadius = 60,
  outerRadius = 90,
  centerLabel,
}: DonutChartProps) => {
  const chartConfig: ChartConfig = data.reduce<ChartConfig>(
    (acc, d, idx) => ({
      ...acc,
      [d.key]: {
        label: d.label ?? d.key,
        color: d.color ?? `hsl(var(--chart-${(idx % 5) + 1}, var(--primary)))`,
      },
    }),
    {}
  );

  return (
    <div className={cn("relative inline-flex items-center justify-center", className)}>
      <ChartContainer config={chartConfig} className="aspect-square h-56">
        <PieChart>
          <ChartTooltip content={<ChartTooltipContent hideLabel />} />
          <Pie
            data={data}
            dataKey="value"
            nameKey="key"
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            paddingAngle={2}
            strokeWidth={0}
          >
            {data.map((entry) => (
              <Cell key={entry.key} fill={`var(--color-${entry.key})`} />
            ))}
          </Pie>
        </PieChart>
      </ChartContainer>
      {centerLabel ? (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center text-center">
          {centerLabel}
        </div>
      ) : null}
    </div>
  );
};

export { DonutChart };
export type { DonutChartProps };
