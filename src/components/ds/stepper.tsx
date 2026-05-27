import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const defaultSteps = ["Media", "Opis", "Akceptacja", "Plan", "Publikacja", "Wyniki"];

type StepperProps = {
  steps?: string[];
  current?: number;
};

export function Stepper({ steps = defaultSteps, current = 3 }: StepperProps) {
  return (
    <ol className="grid gap-3" style={{ gridTemplateColumns: `repeat(${steps.length}, minmax(0, 1fr))` }}>
      {steps.map((step, index) => {
        const done = index + 1 < current;
        const active = index + 1 === current;
        return (
          <li className="relative flex flex-col items-center text-center" key={step}>
            {index < steps.length - 1 ? <span className="absolute left-1/2 top-5 hidden h-0.5 w-full bg-border md:block" /> : null}
            <span
              className={cn(
                "relative z-10 grid size-10 place-items-center rounded-full border bg-card text-sm font-bold",
                done && "border-primary bg-primary text-primary-foreground",
                active && "border-primary text-primary ring-4 ring-primary-soft"
              )}
            >
              {done ? <Check className="size-4" /> : index + 1}
            </span>
            <strong className={cn("mt-2 text-sm", active && "text-primary")}>{step}</strong>
          </li>
        );
      })}
    </ol>
  );
}
