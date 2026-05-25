import * as React from "react";
import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { IconTile } from "@/components/ui/icon-tile";
import { Typography } from "@/components/ui/typography";

type MetricTrendDirection = "up" | "down" | "flat";

interface MetricTrend {
  direction: MetricTrendDirection;
  value: string;
  label?: string;
}

interface MetricCardProps extends React.HTMLAttributes<HTMLDivElement> {
  label: React.ReactNode;
  value: React.ReactNode;
  description?: React.ReactNode;
  trend?: MetricTrend;
  icon?: React.ReactNode;
}

const trendStyles: Record<MetricTrendDirection, { className: string; icon: React.ReactNode }> = {
  up: {
    className: "text-success bg-success-soft",
    icon: <ArrowUpRight className="size-3.5" />,
  },
  down: {
    className: "text-destructive bg-destructive-soft",
    icon: <ArrowDownRight className="size-3.5" />,
  },
  flat: {
    className: "text-muted-foreground bg-muted",
    icon: <Minus className="size-3.5" />,
  },
};

const MetricCard = React.forwardRef<HTMLDivElement, MetricCardProps>(
  ({ label, value, description, trend, icon, className, ...props }, ref) => {
    const trendStyle = trend ? trendStyles[trend.direction] : null;
    return (
      <Card
        ref={ref}
        className={cn("flex flex-col gap-4 p-6", className)}
        {...props}
      >
        <div className="flex items-start justify-between gap-3">
          <Typography variant="caption" className="font-semibold uppercase tracking-[0.12em]">
            {label}
          </Typography>
          {icon ? <IconTile tone="primary" size="sm" icon={icon} /> : null}
        </div>
        <div className="flex items-end justify-between gap-3">
          <Typography variant="h2" className="leading-none">
            {value}
          </Typography>
          {trend && trendStyle ? (
            <span
              className={cn(
                "inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold",
                trendStyle.className
              )}
            >
              {trendStyle.icon}
              {trend.value}
            </span>
          ) : null}
        </div>
        {description ? (
          <Typography variant="muted">{description}</Typography>
        ) : null}
        {trend?.label ? (
          <Typography variant="caption">{trend.label}</Typography>
        ) : null}
      </Card>
    );
  }
);
MetricCard.displayName = "MetricCard";

export { MetricCard };
export type { MetricCardProps, MetricTrend, MetricTrendDirection };
