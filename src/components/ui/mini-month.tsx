import * as React from "react";
import { isSameDay } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";

interface MiniMonthProps {
  month: Date;
  events?: Date[];
  selected?: Date;
  onSelect?: (date: Date | undefined) => void;
  className?: string;
}

const MiniMonth = React.forwardRef<HTMLDivElement, MiniMonthProps>(
  ({ month, events = [], selected, onSelect, className }, ref) => {
    const modifiers = React.useMemo(
      () => ({
        hasEvent: (date: Date) => events.some((event) => isSameDay(event, date)),
      }),
      [events]
    );

    return (
      <div ref={ref} className={cn("inline-block", className)}>
        <Calendar
          mode="single"
          month={month}
          selected={selected}
          onSelect={onSelect}
          showOutsideDays
          numberOfMonths={1}
          disableNavigation
          modifiers={modifiers}
          modifiersClassNames={{
            hasEvent:
              "relative after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2 after:size-1 after:rounded-full after:bg-primary",
          }}
          className="p-2"
          classNames={{
            caption_label: "text-xs font-semibold",
            nav: "hidden",
            weekday:
              "text-muted-foreground rounded-md w-7 font-normal text-[0.65rem]",
            day: cn(
              "relative p-0 text-center text-xs focus-within:relative focus-within:z-20 size-7",
              "[&:has([aria-selected])]:bg-primary-soft"
            ),
            day_button:
              "size-7 p-0 font-normal text-xs aria-selected:opacity-100 rounded-md hover:bg-muted",
            selected:
              "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground",
            today: "bg-muted text-foreground",
          }}
        />
      </div>
    );
  }
);
MiniMonth.displayName = "MiniMonth";

export { MiniMonth };
export type { MiniMonthProps };
