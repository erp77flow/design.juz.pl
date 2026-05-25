import type { LucideIcon } from "lucide-react";
import { Calendar, Check, Image, LineChart, Send } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  ["Media", "09:24", Image, "done"],
  ["Akceptacja", "teraz", Check, "active"],
  ["Plan", "25.05", Calendar, "planned"],
  ["Publikacja", "10:00", Send, "planned"],
  ["Wyniki", "po publikacji", LineChart, "planned"]
] as const;

type VerticalTimelineItem = {
  title: string;
  meta: string;
  icon?: LucideIcon;
  state?: "done" | "active" | "planned";
  description?: string;
};

type PlainTimelineItem = {
  title: string;
  meta: string;
  description?: string;
};

export function HorizontalTimeline() {
  return (
    <ol className="grid gap-4 md:grid-cols-5">
      {steps.map(([label, meta, Icon, state], index) => (
        <li className="relative flex flex-col items-center text-center" key={label}>
          {index < steps.length - 1 ? (
            <span className="absolute left-1/2 top-6 hidden h-0.5 w-full bg-border md:block" />
          ) : null}
          <span
            className={cn(
              "relative z-10 grid size-12 place-items-center rounded-full border-4 bg-card",
              state === "done" && "border-success-soft text-success",
              state === "active" && "border-primary-soft text-primary",
              state === "planned" && "border-border text-muted-foreground"
            )}
          >
            <Icon className="size-5" />
          </span>
          <strong className="mt-3 text-lg">{label}</strong>
          <span className="text-sm font-semibold text-muted-foreground">{meta}</span>
        </li>
      ))}
    </ol>
  );
}

export function VerticalTimeline({ items = steps.map(([title, meta, icon, state]) => ({ title, meta, icon, state })) }: { items?: VerticalTimelineItem[] }) {
  return (
    <ol className="space-y-0">
      {items.map(({ title, meta, icon: Icon = Check, state = "active", description }, index) => (
        <li className="grid grid-cols-[44px_minmax(0,1fr)] gap-4" key={`${title}-${meta}`}>
          <div className="relative flex justify-center">
            <span
              className={cn(
                "grid size-10 place-items-center rounded-full border-2 bg-card",
                state === "done" && "border-success-soft text-success",
                state === "active" && "border-primary-soft text-primary",
                state === "planned" && "border-border text-muted-foreground"
              )}
            >
              <Icon className="size-4" />
            </span>
            {index < items.length - 1 ? <span className="absolute top-10 h-full w-px bg-border" /> : null}
          </div>
          <div className="pb-6">
            <strong>{title}</strong>
            <p className="text-sm text-muted-foreground">{meta}</p>
            {description ? <p className="mt-2 text-sm text-muted-foreground">{description}</p> : null}
          </div>
        </li>
      ))}
    </ol>
  );
}

export function PlainTimeline({ items }: { items: PlainTimelineItem[] }) {
  return (
    <ol className="relative space-y-6 pl-8 before:absolute before:left-3 before:top-3 before:h-[calc(100%-24px)] before:w-px before:bg-border">
      {items.map(({ title, meta, description }) => (
        <li className="relative" key={`${title}-${meta}`}>
          <span className="absolute -left-[31px] top-1 grid size-6 place-items-center rounded-full bg-background">
            <span className="size-4 rounded-full bg-primary" />
          </span>
          <strong className="block text-lg leading-tight">{title}</strong>
          <p className="mt-2 text-sm text-muted-foreground">{meta}</p>
          {description ? <p className="mt-2 text-sm text-muted-foreground">{description}</p> : null}
        </li>
      ))}
    </ol>
  );
}
