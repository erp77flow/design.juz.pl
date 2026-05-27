import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Badge, type BadgeProps } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { IconActionButton } from "@/components/ui/icon-action-button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

export type ScheduleView = "day" | "week" | "month";

export type ScheduleEventStatus =
  | "planned"
  | "progress"
  | "done"
  | "warning"
  | "blocked";

export interface ScheduleEvent {
  id: string | number;
  title: string;
  start: Date;
  end: Date;
  resource?: string;
  color?: string;
  status?: ScheduleEventStatus;
  description?: string;
}

export interface ScheduleResource {
  id: string;
  name: string;
}

export interface ScheduleProps extends React.HTMLAttributes<HTMLDivElement> {
  view: ScheduleView;
  currentDate: Date;
  events: ScheduleEvent[];
  resources?: ScheduleResource[];
  onEventClick?: (event: ScheduleEvent) => void;
  onDateChange?: (date: Date) => void;
  onViewChange?: (view: ScheduleView) => void;
  startHour?: number;
  endHour?: number;
}

const statusToneMap: Record<ScheduleEventStatus, BadgeProps["variant"]> = {
  planned: "default",
  progress: "warning",
  done: "success",
  warning: "warning",
  blocked: "destructive",
};

const statusBackgroundMap: Record<ScheduleEventStatus, string> = {
  planned: "border-l-primary bg-primary-soft/65",
  progress: "border-l-warning bg-warning-soft/65",
  done: "border-l-success bg-success-soft/65",
  warning: "border-l-warning bg-warning-soft/75",
  blocked: "border-l-destructive bg-destructive-soft/70",
};

const POLISH_DAYS = [
  "poniedziałek",
  "wtorek",
  "środa",
  "czwartek",
  "piątek",
  "sobota",
  "niedziela",
];

const POLISH_MONTHS = [
  "styczeń",
  "luty",
  "marzec",
  "kwiecień",
  "maj",
  "czerwiec",
  "lipiec",
  "sierpień",
  "wrzesień",
  "październik",
  "listopad",
  "grudzień",
];

function startOfDay(date: Date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

function startOfWeek(date: Date) {
  const d = startOfDay(date);
  const day = d.getDay();
  const diff = (day + 6) % 7; // make Monday = 0
  d.setDate(d.getDate() - diff);
  return d;
}

function addDays(date: Date, days: number) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

function sameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function formatTime(date: Date) {
  return `${String(date.getHours()).padStart(2, "0")}:${String(
    date.getMinutes()
  ).padStart(2, "0")}`;
}

function formatDateLabel(date: Date, view: ScheduleView) {
  if (view === "day") {
    return `${POLISH_DAYS[(date.getDay() + 6) % 7]}, ${date.getDate()} ${POLISH_MONTHS[date.getMonth()]} ${date.getFullYear()}`;
  }
  if (view === "week") {
    const start = startOfWeek(date);
    const end = addDays(start, 6);
    return `${start.getDate()} ${POLISH_MONTHS[start.getMonth()]} - ${end.getDate()} ${POLISH_MONTHS[end.getMonth()]} ${end.getFullYear()}`;
  }
  return `${POLISH_MONTHS[date.getMonth()]} ${date.getFullYear()}`;
}

function shiftDate(date: Date, view: ScheduleView, direction: 1 | -1) {
  const d = new Date(date);
  if (view === "day") {
    d.setDate(d.getDate() + direction);
  } else if (view === "week") {
    d.setDate(d.getDate() + 7 * direction);
  } else {
    d.setMonth(d.getMonth() + direction);
  }
  return d;
}

const Schedule = React.forwardRef<HTMLDivElement, ScheduleProps>(
  (
    {
      className,
      view,
      currentDate,
      events,
      resources,
      onEventClick,
      onDateChange,
      onViewChange,
      startHour = 7,
      endHour = 19,
      ...props
    },
    ref
  ) => {
    return (
      <div
        className={cn(
          "rounded-xl border border-border bg-card shadow-juz-sm",
          className
        )}
        ref={ref}
        {...props}
      >
        <header className="flex flex-col gap-3 border-b border-border p-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2">
            <IconActionButton
              label="Poprzedni okres"
              onClick={() =>
                onDateChange?.(shiftDate(currentDate, view, -1))
              }
              variant="ghost"
            >
              <ChevronLeft />
            </IconActionButton>
            <Button
              onClick={() => onDateChange?.(new Date())}
              size="sm"
              variant="outline"
            >
              Dzisiaj
            </Button>
            <IconActionButton
              label="Następny okres"
              onClick={() => onDateChange?.(shiftDate(currentDate, view, 1))}
              variant="ghost"
            >
              <ChevronRight />
            </IconActionButton>
            <h2 className="ml-2 text-lg font-extrabold capitalize text-foreground">
              {formatDateLabel(currentDate, view)}
            </h2>
          </div>
          {onViewChange ? (
            <div className="inline-flex rounded-md border border-border bg-background p-1 shadow-juz-sm">
              {(["day", "week", "month"] as ScheduleView[]).map((option) => (
                <button
                  className={cn(
                    "rounded-sm px-3 py-1.5 text-sm font-semibold transition-colors",
                    view === option
                      ? "bg-primary text-primary-foreground shadow-juz-sm"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                  key={option}
                  onClick={() => onViewChange(option)}
                  type="button"
                >
                  {option === "day"
                    ? "Dzień"
                    : option === "week"
                      ? "Tydzień"
                      : "Miesiąc"}
                </button>
              ))}
            </div>
          ) : null}
        </header>

        <div className="p-4">
          {view === "day" ? (
            <ScheduleDayView
              currentDate={currentDate}
              endHour={endHour}
              events={events}
              onEventClick={onEventClick}
              resources={resources}
              startHour={startHour}
            />
          ) : view === "week" ? (
            <ScheduleWeekView
              currentDate={currentDate}
              endHour={endHour}
              events={events}
              onEventClick={onEventClick}
              startHour={startHour}
            />
          ) : (
            <ScheduleMonthView
              currentDate={currentDate}
              events={events}
              onEventClick={onEventClick}
            />
          )}
        </div>
      </div>
    );
  }
);
Schedule.displayName = "Schedule";

function ScheduleEventChip({
  event,
  onClick,
  className,
}: {
  event: ScheduleEvent;
  onClick?: (event: ScheduleEvent) => void;
  className?: string;
}) {
  const statusClass = event.status
    ? statusBackgroundMap[event.status]
    : "border-l-primary bg-primary-soft/55";

  const content = (
    <>
      <div className="flex items-start justify-between gap-2">
        <p className="truncate text-sm font-extrabold text-foreground">
          {event.title}
        </p>
        {event.status ? (
          <Badge
            className="shrink-0 px-1.5 py-0 text-[10px] leading-5"
            variant={statusToneMap[event.status]}
          >
            {event.status}
          </Badge>
        ) : null}
      </div>
      <p className="mt-0.5 font-mono text-xs text-muted-foreground">
        {formatTime(event.start)} - {formatTime(event.end)}
      </p>
      {event.resource ? (
        <p className="truncate text-xs font-semibold text-muted-foreground">
          {event.resource}
        </p>
      ) : null}
    </>
  );

  const classes = cn(
    "rounded-md border border-l-4 p-2 text-left shadow-juz-sm transition-colors",
    statusClass,
    onClick && "cursor-pointer hover:border-primary/60",
    className
  );

  if (onClick) {
    return (
      <button
        className={classes}
        onClick={() => onClick(event)}
        style={event.color ? { borderLeftColor: event.color } : undefined}
        type="button"
      >
        {content}
      </button>
    );
  }
  return (
    <div
      className={classes}
      style={event.color ? { borderLeftColor: event.color } : undefined}
    >
      {content}
    </div>
  );
}

function ScheduleDayView({
  currentDate,
  events,
  resources,
  startHour,
  endHour,
  onEventClick,
}: {
  currentDate: Date;
  events: ScheduleEvent[];
  resources?: ScheduleResource[];
  startHour: number;
  endHour: number;
  onEventClick?: (event: ScheduleEvent) => void;
}) {
  const hours = React.useMemo(() => {
    const out: number[] = [];
    for (let h = startHour; h <= endHour; h += 1) out.push(h);
    return out;
  }, [startHour, endHour]);

  const dayEvents = events.filter((event) => sameDay(event.start, currentDate));
  const columns = resources && resources.length ? resources : null;

  return (
    <ScrollArea className="max-h-[600px]">
      <div
        className="grid"
        style={{
          gridTemplateColumns: `64px repeat(${columns ? columns.length : 1}, minmax(160px, 1fr))`,
        }}
      >
        <div />
        {columns ? (
          columns.map((resource) => (
            <div
              className="border-b border-l border-border p-2 text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground"
              key={resource.id}
            >
              {resource.name}
            </div>
          ))
        ) : (
          <div className="border-b border-l border-border p-2 text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground">
            Plan dnia
          </div>
        )}
        {hours.map((hour) => (
          <React.Fragment key={hour}>
            <div className="border-t border-border px-2 py-3 text-right font-mono text-xs text-muted-foreground">
              {String(hour).padStart(2, "0")}:00
            </div>
            {(columns ?? [{ id: "__single", name: "" }]).map((resource) => {
              const cellEvents = dayEvents.filter((event) => {
                if (event.start.getHours() !== hour) return false;
                if (columns) return event.resource === resource.name;
                return true;
              });
              return (
                <div
                  className="min-h-[64px] border-l border-t border-border p-1"
                  key={`${hour}-${resource.id}`}
                >
                  <div className="flex flex-col gap-1">
                    {cellEvents.map((event) => (
                      <ScheduleEventChip
                        event={event}
                        key={event.id}
                        onClick={onEventClick}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </ScrollArea>
  );
}

function ScheduleWeekView({
  currentDate,
  events,
  startHour,
  endHour,
  onEventClick,
}: {
  currentDate: Date;
  events: ScheduleEvent[];
  startHour: number;
  endHour: number;
  onEventClick?: (event: ScheduleEvent) => void;
}) {
  const start = startOfWeek(currentDate);
  const days = React.useMemo(
    () => Array.from({ length: 7 }, (_, i) => addDays(start, i)),
    [start]
  );
  const hours = React.useMemo(() => {
    const out: number[] = [];
    for (let h = startHour; h <= endHour; h += 1) out.push(h);
    return out;
  }, [startHour, endHour]);

  return (
    <ScrollArea className="max-h-[640px]">
      <div
        className="grid min-w-[760px]"
        style={{
          gridTemplateColumns: `72px repeat(7, minmax(120px, 1fr))`,
        }}
      >
        <div />
        {days.map((day) => {
          const isToday = sameDay(day, new Date());
          return (
            <div
              className={cn(
                "border-b border-l border-border px-2 py-2 text-center",
                isToday && "bg-primary-soft/40"
              )}
              key={day.toISOString()}
            >
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground">
                {POLISH_DAYS[(day.getDay() + 6) % 7].slice(0, 3)}
              </p>
              <p
                className={cn(
                  "mt-1 text-lg font-extrabold",
                  isToday ? "text-primary" : "text-foreground"
                )}
              >
                {day.getDate()}
              </p>
            </div>
          );
        })}
        {hours.map((hour) => (
          <React.Fragment key={hour}>
            <div className="border-t border-border px-2 py-3 text-right font-mono text-xs text-muted-foreground">
              {String(hour).padStart(2, "0")}:00
            </div>
            {days.map((day) => {
              const cellEvents = events.filter(
                (event) =>
                  sameDay(event.start, day) && event.start.getHours() === hour
              );
              return (
                <div
                  className="min-h-[64px] border-l border-t border-border p-1"
                  key={`${day.toISOString()}-${hour}`}
                >
                  <div className="flex flex-col gap-1">
                    {cellEvents.map((event) => (
                      <ScheduleEventChip
                        event={event}
                        key={event.id}
                        onClick={onEventClick}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </ScrollArea>
  );
}

function ScheduleMonthView({
  currentDate,
  events,
  onEventClick,
}: {
  currentDate: Date;
  events: ScheduleEvent[];
  onEventClick?: (event: ScheduleEvent) => void;
}) {
  const firstOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );
  const gridStart = startOfWeek(firstOfMonth);
  const days = React.useMemo(
    () => Array.from({ length: 42 }, (_, i) => addDays(gridStart, i)),
    [gridStart]
  );

  return (
    <div>
      <div className="grid grid-cols-7 border-b border-border">
        {POLISH_DAYS.map((day) => (
          <div
            className="p-2 text-center text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground"
            key={day}
          >
            {day.slice(0, 3)}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7">
        {days.map((day) => {
          const dayEvents = events.filter((event) =>
            sameDay(event.start, day)
          );
          const inMonth = day.getMonth() === currentDate.getMonth();
          const isToday = sameDay(day, new Date());
          return (
            <Card
              className={cn(
                "min-h-[110px] rounded-none border-0 border-b border-l border-border p-2 shadow-none",
                !inMonth && "bg-muted/30 text-muted-foreground",
                isToday && "bg-primary-soft/30"
              )}
              key={day.toISOString()}
            >
              <p
                className={cn(
                  "text-sm font-bold",
                  isToday ? "text-primary" : "text-foreground"
                )}
              >
                {day.getDate()}
              </p>
              <div className="mt-1 space-y-1">
                {dayEvents.slice(0, 3).map((event) => (
                  <button
                    className={cn(
                      "block w-full truncate rounded-sm border-l-2 px-1.5 py-0.5 text-left text-xs font-semibold transition-colors hover:bg-muted",
                      event.status
                        ? statusBackgroundMap[event.status]
                        : "border-l-primary bg-primary-soft/55"
                    )}
                    key={event.id}
                    onClick={() => onEventClick?.(event)}
                    style={
                      event.color
                        ? { borderLeftColor: event.color }
                        : undefined
                    }
                    type="button"
                  >
                    <span className="font-mono text-[10px] leading-5 text-muted-foreground">
                      {formatTime(event.start)}
                    </span>{" "}
                    {event.title}
                  </button>
                ))}
                {dayEvents.length > 3 ? (
                  <p className="text-xs font-semibold text-muted-foreground">
                    +{dayEvents.length - 3} więcej
                  </p>
                ) : null}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

export { Schedule };
