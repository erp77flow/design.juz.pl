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

    return (
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
              className
            )}
          >
            <CalendarIcon className="size-4" />
            {label ? <span>{label}:</span> : null}
            <span>{display ?? placeholder}</span>
            {clearable && value ? (
              <span
                role="button"
                tabIndex={-1}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onValueChange?.(undefined);
                }}
                className="ml-1 inline-flex size-4 items-center justify-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground"
                aria-label="Wyczyść"
              >
                <X className="size-3" />
              </span>
            ) : null}
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
    );
  }
);
DateFilter.displayName = "DateFilter";

export { DateFilter };
export type { DateFilterProps };
