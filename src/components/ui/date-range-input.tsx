import * as React from "react";
import { format } from "date-fns";
import { pl } from "date-fns/locale";
import { Calendar as CalendarIcon } from "lucide-react";
import type { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DateRangeInputProps {
  value?: DateRange;
  onValueChange?: (value: DateRange | undefined) => void;
  placeholder?: { from?: string; to?: string };
  disabled?: boolean;
  className?: string;
  numberOfMonths?: number;
}

const formatDate = (date?: Date) =>
  date ? format(date, "d MMM yyyy", { locale: pl }) : "";

const DateRangeInput = React.forwardRef<HTMLDivElement, DateRangeInputProps>(
  (
    {
      value,
      onValueChange,
      placeholder = { from: "Data od", to: "Data do" },
      disabled,
      className,
      numberOfMonths = 2,
    },
    ref
  ) => {
    const [open, setOpen] = React.useState(false);

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div
            ref={ref}
            role="button"
            tabIndex={disabled ? -1 : 0}
            aria-disabled={disabled}
            className={cn(
              "flex w-full items-stretch gap-2 rounded-md border border-input bg-card p-1.5 shadow-juz-sm transition-colors focus-within:ring-2 focus-within:ring-ring",
              disabled && "cursor-not-allowed opacity-50",
              className
            )}
          >
            <div className="flex flex-1 items-center gap-2 px-2">
              <CalendarIcon className="size-4 shrink-0 text-muted-foreground" />
              <Input
                readOnly
                value={formatDate(value?.from)}
                placeholder={placeholder.from}
                className="h-auto border-0 bg-transparent p-0 shadow-none focus-visible:ring-0"
                tabIndex={-1}
              />
            </div>
            <span className="self-center text-sm text-muted-foreground">–</span>
            <div className="flex flex-1 items-center gap-2 px-2">
              <Input
                readOnly
                value={formatDate(value?.to)}
                placeholder={placeholder.to}
                className="h-auto border-0 bg-transparent p-0 shadow-none focus-visible:ring-0"
                tabIndex={-1}
              />
            </div>
          </div>
        </PopoverTrigger>
        <PopoverContent align="start" className="w-auto p-0">
          <Calendar
            mode="range"
            selected={value}
            onSelect={onValueChange}
            numberOfMonths={numberOfMonths}
            autoFocus
          />
        </PopoverContent>
      </Popover>
    );
  }
);
DateRangeInput.displayName = "DateRangeInput";

export { DateRangeInput };
export type { DateRangeInputProps };
