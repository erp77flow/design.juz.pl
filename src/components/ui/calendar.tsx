import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";
import { pl } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      locale={pl}
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        month_caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-semibold",
        nav: "space-x-1 flex items-center",
        button_previous: cn(
          buttonVariants({ variant: "ghost", size: "icon" }),
          "size-8 bg-transparent p-0 opacity-70 hover:opacity-100 absolute left-1"
        ),
        button_next: cn(
          buttonVariants({ variant: "ghost", size: "icon" }),
          "size-8 bg-transparent p-0 opacity-70 hover:opacity-100 absolute right-1"
        ),
        month_grid: "w-full border-collapse space-y-1",
        weekdays: "flex",
        weekday:
          "text-muted-foreground rounded-md w-9 font-normal text-[0.75rem] leading-[1.5]",
        week: "flex w-full mt-2",
        day: cn(
          "relative p-0 text-center text-sm focus-within:relative focus-within:z-20",
          "has-aria-[selected]:bg-primary-soft",
          "[&:has([aria-selected].day-range-end)]:rounded-r-md",
          "[&:has([aria-selected].day-outside)]:bg-primary-soft/40"
        ),
        day_button: cn(
          buttonVariants({ variant: "ghost" }),
          "size-9 p-0 font-normal aria-selected:opacity-100"
        ),
        range_end: "day-range-end",
        selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        today: "bg-muted text-foreground",
        // Outside (adjacent-month) days are decorative — but axe-core still
        // checks their text contrast. `opacity-50` on `text-muted-foreground`
        // blends to ~#878a92 on a white card (~3.4:1, FAIL). Drop the opacity
        // and rely on the tinted `bg-primary-soft/40` parent to keep outside
        // days visually de-emphasised without dropping below WCAG AA in
        // either light or dark mode (muted-foreground alone reads ~5.4:1).
        outside:
          "day-outside text-muted-foreground aria-selected:bg-primary-soft/40 aria-selected:text-muted-foreground",
        // `disabled` calendar buttons get the native `disabled` attribute from
        // react-day-picker which axe-core's color-contrast rule skips — so
        // the opacity here is fine and preserves the "unavailable" look.
        disabled: "text-muted-foreground opacity-50",
        range_middle:
          "aria-selected:bg-primary-soft aria-selected:text-foreground",
        hidden: "invisible",
        ...classNames,
      }}
      modifiersClassNames={{
        selected:
          "[&_button]:bg-primary [&_button]:text-primary-foreground [&_button]:hover:bg-primary [&_button]:hover:text-primary-foreground [&_button]:focus:bg-primary [&_button]:focus:text-primary-foreground",
      }}
      components={{
        Chevron: ({ orientation, ...iconProps }: any) =>
          orientation === "left" ? (
            <ChevronLeft className="size-4" {...iconProps} />
          ) : (
            <ChevronRight className="size-4" {...iconProps} />
          ),
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
