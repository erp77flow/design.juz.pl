import * as React from "react";
import { addDays, format, isSameDay, startOfWeek } from "date-fns";
import { pl } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export interface Workstation {
  id: string;
  name: string;
  description?: string;
}

export type WeekEventColor =
  | "default"
  | "success"
  | "warning"
  | "destructive"
  | "neutral";

export interface WeekWorkstationEvent {
  id?: string | number;
  workstationId: string;
  day: number | Date;
  label: React.ReactNode;
  color?: WeekEventColor;
  meta?: React.ReactNode;
  onClick?: () => void;
}

export interface WeekWorkstationsProps
  extends React.HTMLAttributes<HTMLDivElement> {
  workstations: Workstation[];
  weekStart: Date;
  events: WeekWorkstationEvent[];
  daysCount?: number;
  emptyLabel?: string;
}

function resolveDayIndex(day: number | Date, weekStart: Date, days: number) {
  if (typeof day === "number") {
    return Math.min(Math.max(day, 0), days - 1);
  }
  for (let i = 0; i < days; i++) {
    if (isSameDay(day, addDays(weekStart, i))) return i;
  }
  return -1;
}

const WeekWorkstations = React.forwardRef<HTMLDivElement, WeekWorkstationsProps>(
  (
    {
      workstations,
      weekStart,
      events,
      daysCount = 7,
      emptyLabel = "Brak",
      className,
      ...props
    },
    ref
  ) => {
    const normalizedWeekStart = startOfWeek(weekStart, { weekStartsOn: 1 });
    const days = Array.from({ length: daysCount }, (_, i) =>
      addDays(normalizedWeekStart, i)
    );

    const grid: Record<string, Record<number, WeekWorkstationEvent[]>> = {};
    for (const ws of workstations) {
      grid[ws.id] = {};
    }
    for (const ev of events) {
      const dayIndex = resolveDayIndex(ev.day, normalizedWeekStart, daysCount);
      if (dayIndex < 0 || !grid[ev.workstationId]) continue;
      if (!grid[ev.workstationId][dayIndex]) {
        grid[ev.workstationId][dayIndex] = [];
      }
      grid[ev.workstationId][dayIndex].push(ev);
    }

    return (
      <div
        ref={ref}
        className={cn("juz-card overflow-hidden", className)}
        {...props}
      >
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead className="bg-muted/40">
              <tr>
                <th
                  scope="col"
                  className="sticky left-0 z-10 min-w-[180px] bg-muted/40 px-4 py-3 text-left text-xs font-extrabold uppercase tracking-[0.14em] text-muted-foreground"
                >
                  Stanowisko
                </th>
                {days.map((day, index) => (
                  <th
                    key={index}
                    scope="col"
                    className="min-w-[140px] border-l px-3 py-3 text-left text-xs font-extrabold uppercase tracking-[0.14em] text-muted-foreground"
                  >
                    <div className="flex flex-col">
                      <span>{format(day, "EEE", { locale: pl })}</span>
                      <span className="text-sm font-semibold text-foreground">
                        {format(day, "d MMM", { locale: pl })}
                      </span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {workstations.map((ws) => (
                <tr key={ws.id} className="border-t">
                  <th
                    scope="row"
                    className="sticky left-0 z-10 min-w-[180px] bg-card px-4 py-3 text-left align-top"
                  >
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-foreground">
                        {ws.name}
                      </span>
                      {ws.description ? (
                        <span className="text-xs text-muted-foreground">
                          {ws.description}
                        </span>
                      ) : null}
                    </div>
                  </th>
                  {days.map((_, dayIndex) => {
                    const cellEvents = grid[ws.id]?.[dayIndex] ?? [];
                    return (
                      <td
                        key={dayIndex}
                        className="min-w-[140px] border-l p-2 align-top"
                      >
                        {cellEvents.length === 0 ? (
                          <span className="text-xs text-muted-foreground/60">
                            {emptyLabel}
                          </span>
                        ) : (
                          <div className="flex flex-col gap-1.5">
                            {cellEvents.map((ev, evIndex) => {
                              const content = (
                                <>
                                  <Badge
                                    variant={ev.color ?? "default"}
                                    className="w-full justify-start"
                                  >
                                    {ev.label}
                                  </Badge>
                                  {ev.meta ? (
                                    <span className="block text-xs text-muted-foreground">
                                      {ev.meta}
                                    </span>
                                  ) : null}
                                </>
                              );
                              if (ev.onClick) {
                                return (
                                  <button
                                    key={ev.id ?? evIndex}
                                    type="button"
                                    onClick={ev.onClick}
                                    className="block w-full rounded-md text-left transition-colors hover:bg-muted/40 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                  >
                                    {content}
                                  </button>
                                );
                              }
                              return (
                                <div key={ev.id ?? evIndex}>{content}</div>
                              );
                            })}
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
);
WeekWorkstations.displayName = "WeekWorkstations";

export { WeekWorkstations };
