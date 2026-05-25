import * as React from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { InputGroup } from "@/components/ui/input-group";

interface DecimalInputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "value" | "onChange" | "type" | "prefix" | "min" | "max"
  > {
  value?: number | string | null;
  onValueChange?: (value: number | null) => void;
  precision?: number;
  min?: number;
  max?: number;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
}

const THOUSAND_SEPARATOR = " ";
const DECIMAL_SEPARATOR = ",";

function parseDecimal(input: string): number | null {
  if (input == null) return null;
  const trimmed = input.trim();
  if (!trimmed) return null;
  const normalized = trimmed
    .replace(/\s/g, "")
    .replace(/\./g, "")
    .replace(",", ".");
  const num = Number(normalized);
  if (Number.isNaN(num)) return null;
  return num;
}

function formatDecimal(value: number | string | null | undefined, precision?: number): string {
  if (value === null || value === undefined || value === "") return "";
  const num = typeof value === "number" ? value : parseDecimal(String(value));
  if (num === null || Number.isNaN(num)) return "";
  const options: Intl.NumberFormatOptions = {};
  if (typeof precision === "number") {
    options.minimumFractionDigits = precision;
    options.maximumFractionDigits = precision;
  } else {
    options.maximumFractionDigits = 20;
  }
  return new Intl.NumberFormat("pl-PL", options).format(num);
}

function clamp(num: number, min?: number, max?: number): number {
  let result = num;
  if (typeof min === "number" && result < min) result = min;
  if (typeof max === "number" && result > max) result = max;
  return result;
}

const DecimalInput = React.forwardRef<HTMLInputElement, DecimalInputProps>(
  (
    {
      className,
      value,
      onValueChange,
      precision,
      min,
      max,
      prefix,
      suffix,
      onBlur,
      onFocus,
      placeholder,
      inputMode = "decimal",
      ...props
    },
    ref
  ) => {
    const [focused, setFocused] = React.useState(false);
    const [localValue, setLocalValue] = React.useState<string>(() =>
      formatDecimal(value ?? null, precision)
    );

    React.useEffect(() => {
      if (!focused) {
        setLocalValue(formatDecimal(value ?? null, precision));
      }
    }, [value, precision, focused]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const raw = event.target.value;
      // Allow only digits, separators, minus
      const sanitized = raw.replace(/[^\d\s.,-]/g, "");
      setLocalValue(sanitized);
      const parsed = parseDecimal(sanitized);
      if (parsed === null) {
        onValueChange?.(null);
      } else {
        onValueChange?.(clamp(parsed, min, max));
      }
    };

    const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
      setFocused(true);
      // Show raw editable value with comma decimal but no thousand separators
      const num = parseDecimal(localValue);
      if (num !== null) {
        const str =
          typeof precision === "number" ? num.toFixed(precision) : String(num);
        setLocalValue(str.replace(".", DECIMAL_SEPARATOR));
      }
      onFocus?.(event);
    };

    const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
      setFocused(false);
      const parsed = parseDecimal(localValue);
      if (parsed === null) {
        setLocalValue("");
        onValueChange?.(null);
      } else {
        const clamped = clamp(parsed, min, max);
        setLocalValue(formatDecimal(clamped, precision));
        onValueChange?.(clamped);
      }
      onBlur?.(event);
    };

    const inputEl = (
      <Input
        ref={ref}
        type="text"
        inputMode={inputMode}
        value={localValue}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={placeholder ?? "0,00"}
        className={cn("text-right tabular-nums", className)}
        {...props}
      />
    );

    if (prefix || suffix) {
      return (
        <InputGroup leading={prefix} trailing={suffix}>
          {inputEl}
        </InputGroup>
      );
    }
    return inputEl;
  }
);
DecimalInput.displayName = "DecimalInput";

export { DecimalInput };
export type { DecimalInputProps };
