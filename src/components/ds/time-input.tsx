import * as React from "react";
import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input, type InputProps } from "@/components/ui/input";
import { InputGroup } from "@/components/ui/input-group";

const TIME_REGEX = /^([01]?\d|2[0-3]):[0-5]\d$/;

export interface TimeInputProps
  extends Omit<InputProps, "value" | "onChange" | "type"> {
  value?: string;
  onValueChange?: (value: string) => void;
  invalid?: boolean;
  step?: number;
  showIcon?: boolean;
}

const TimeInput = React.forwardRef<HTMLInputElement, TimeInputProps>(
  (
    {
      value = "",
      onValueChange,
      placeholder = "HH:MM",
      step = 15,
      invalid,
      showIcon = true,
      className,
      onBlur,
      ...props
    },
    ref
  ) => {
    const isInvalid = invalid ?? (value !== "" && !TIME_REGEX.test(value));

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      onValueChange?.(event.target.value);
    };

    return (
      <InputGroup
        leading={
          showIcon ? <Clock className="size-4" aria-hidden /> : undefined
        }
        className={cn(
          "h-11",
          isInvalid && "border-destructive focus-within:ring-destructive"
        )}
      >
        <Input
          ref={ref}
          type="time"
          value={value}
          placeholder={placeholder}
          step={step * 60}
          aria-invalid={isInvalid || undefined}
          onChange={handleChange}
          onBlur={onBlur}
          className={cn("h-full border-0 shadow-none", className)}
          {...props}
        />
      </InputGroup>
    );
  }
);
TimeInput.displayName = "TimeInput";

export { TimeInput };
