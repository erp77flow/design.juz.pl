import * as React from "react";
import { format } from "date-fns";
import { pl } from "date-fns/locale";
import { Calendar as CalendarIcon, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DateFilterProps {
  value?: Date;
  onValueChange?: (value: Date | undefined) => void;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  clearable?: boolean;
}

const DateFilter = React.forwardRef<HTMLButtonElement, DateFilterProps>(
  (
    {
      value,
      onValueChange,
      label,
      placeholder = "Filtr daty",
      disabled,
      className,
      clearable = true,
    },
    ref
  ) => {
    const [open, setOpen] = React.useState(false);

    const display = value ? format(value, "d MMM yyyy", { locale: pl }) : null;

    const showClear = clearable && value;
    return (
      // Clear affordance lives next to the trigger button rather than inside
      // it because axe-core `nested-interactive` forbids interactive
      // children (role="button", tabindex>=0, focusable) under another
      // button. Wrapping both in a single inline-flex preserves the visual
      // pill shape.
      <div className={cn("inline-flex items-stretch", className)}>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              ref={ref}
              type="button"
              variant="secondary"
              disabled={disabled}
              aria-label={label ?? placeholder}
              className={cn(
                "h-10 justify-start gap-2 font-semibold",
                !value && "text-muted-foreground",
                showClear && "rounded-r-none"
              )}
            >
              <CalendarIcon className="size-4" />
              {label ? <span>{label}:</span> : null}
              <span>{display ?? placeholder}</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent align="start" className="w-auto p-0">
            <Calendar
              mode="single"
              selected={value}
              onSelect={(date) => {
                onValueChange?.(date);
                setOpen(false);
              }}
              autoFocus
            />
          </PopoverContent>
        </Popover>
        {showClear ? (
          <button
            type="button"
            aria-label="Wyczyść datę"
            onClick={() => onValueChange?.(undefined)}
            className="inline-flex h-10 items-center justify-center rounded-r-md border border-l-0 border-input bg-secondary px-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <X className="size-3" />
          </button>
        ) : null}
      </div>
    );
  }
);
DateFilter.displayName = "DateFilter";

export { DateFilter };
export type { DateFilterProps };
