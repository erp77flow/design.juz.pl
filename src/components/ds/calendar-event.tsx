import * as React from "react";
import { Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export type CalendarEventStatus = "new" | "planned" | "progress" | "done" | "warning" | "blocked";

const statusLabels: Record<CalendarEventStatus, string> = {
  new: "Nowe",
  planned: "Zaplanowane",
  progress: "W toku",
  done: "Gotowe",
  warning: "Wymaga uwagi",
  blocked: "Zablokowane"
};

const statusClasses: Record<CalendarEventStatus, string> = {
  new: "border-l-primary bg-primary-soft/65",
  planned: "border-l-primary bg-primary-soft/45",
  progress: "border-l-warning bg-warning-soft/65",
  done: "border-l-success bg-success-soft/65",
  warning: "border-l-warning bg-warning-soft/75",
  blocked: "border-l-destructive bg-destructive-soft/70"
};

const badgeVariants: Record<CalendarEventStatus, React.ComponentProps<typeof Badge>["variant"]> = {
  new: "neutral",
  planned: "default",
  progress: "warning",
  done: "success",
  warning: "warning",
  blocked: "destructive"
};

export interface CalendarEventProps extends Omit<React.HTMLAttributes<HTMLElement>, "id" | "onClick"> {
  eventId?: number;
  status: CalendarEventStatus;
  title: string;
  startTime: string;
  endTime: string;
  station?: string;
  owner?: string;
  description?: string;
  isActive?: boolean;
  onClick?: (eventId?: number) => void;
}

export function CalendarEvent({
  eventId,
  status,
  title,
  startTime,
  endTime,
  station,
  owner,
  description,
  isActive,
  className,
  onClick,
  ...props
}: CalendarEventProps) {
  const durationLabel = startTime && endTime ? `${startTime} - ${endTime}` : startTime || endTime;
  const content = (
    <>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate font-mono text-sm font-extrabold text-foreground">{title}</p>
          {description ? (
            <p className="mt-0.5 truncate text-xs font-bold uppercase tracking-[0.08em] text-muted-foreground">
              {description}
            </p>
          ) : null}
        </div>
        <Badge className="shrink-0 whitespace-nowrap" variant={badgeVariants[status]}>
          {statusLabels[status]}
        </Badge>
      </div>
      <div className="mt-2 space-y-1 text-sm font-semibold">
        <p className="flex items-center gap-1.5">
          <Clock className="size-4 text-primary" />
          {durationLabel}
        </p>
        {station || owner ? (
          <p className="text-muted-foreground">
            {station ? `[${station}]` : null} {owner}
          </p>
        ) : null}
      </div>
    </>
  );

  const classes = cn(
    "min-w-[240px] rounded-md border border-l-4 p-3 shadow-juz-sm transition-colors",
    statusClasses[status],
    isActive && "ring-2 ring-ring ring-offset-2 ring-offset-background",
    onClick && "cursor-pointer hover:border-primary/60",
    className
  );

  if (onClick) {
    return (
      <button className={cn(classes, "text-left")} onClick={() => onClick(eventId)} type="button" {...props}>
        {content}
      </button>
    );
  }

  return (
    <article className={classes} {...props}>
      {content}
    </article>
  );
}
