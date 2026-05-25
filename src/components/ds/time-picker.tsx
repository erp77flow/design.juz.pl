import * as React from "react";
import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { NativeSelect } from "@/components/ui/native-select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export interface TimePickerProps {
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  minuteStep?: number;
  className?: string;
}

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

function parseValue(value?: string): { hour: string; minute: string } {
  if (!value) return { hour: "", minute: "" };
  const [h, m] = value.split(":");
  return { hour: h ?? "", minute: m ?? "" };
}

const TimePicker = React.forwardRef<HTMLButtonElement, TimePickerProps>(
  (
    {
      value,
      onValueChange,
      placeholder = "Wybierz godzinę",
      disabled,
      minuteStep = 15,
      className,
    },
    ref
  ) => {
    const [open, setOpen] = React.useState(false);
    const { hour, minute } = parseValue(value);

    const hours = React.useMemo(
      () => Array.from({ length: 24 }, (_, i) => pad(i)),
      []
    );
    const minutes = React.useMemo(() => {
      const arr: string[] = [];
      for (let m = 0; m < 60; m += minuteStep) arr.push(pad(m));
      return arr;
    }, [minuteStep]);

    const setPart = (next: { hour?: string; minute?: string }) => {
      const h = next.hour ?? hour ?? "00";
      const m = next.minute ?? minute ?? "00";
      onValueChange?.(`${h || "00"}:${m || "00"}`);
    };

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            ref={ref}
            type="button"
            variant="outline"
            disabled={disabled}
            className={cn(
              "h-11 w-full justify-start gap-2 px-3 text-sm font-medium",
              !value && "text-muted-foreground",
              className
            )}
          >
            <Clock className="size-4 shrink-0 text-muted-foreground" />
            {value || placeholder}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-4" align="start">
          <div className="flex items-end gap-2">
            <div className="flex flex-col gap-1">
              <Label className="text-xs">Godziny</Label>
              <NativeSelect
                value={hour}
                onChange={(e) => setPart({ hour: e.target.value })}
                className="w-24"
                aria-label="Godziny"
              >
                <option value="" disabled>
                  --
                </option>
                {hours.map((h) => (
                  <option key={h} value={h}>
                    {h}
                  </option>
                ))}
              </NativeSelect>
            </div>
            <span className="pb-2 text-lg font-bold text-muted-foreground">
              :
            </span>
            <div className="flex flex-col gap-1">
              <Label className="text-xs">Minuty</Label>
              <NativeSelect
                value={minute}
                onChange={(e) => setPart({ minute: e.target.value })}
                className="w-24"
                aria-label="Minuty"
              >
                <option value="" disabled>
                  --
                </option>
                {minutes.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </NativeSelect>
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <Button
              type="button"
              size="sm"
              onClick={() => setOpen(false)}
              disabled={!hour || !minute}
            >
              Zatwierdź
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    );
  }
);
TimePicker.displayName = "TimePicker";

export { TimePicker };
