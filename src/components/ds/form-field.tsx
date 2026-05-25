import * as React from "react";
import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

export interface FormFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: React.ReactNode;
  htmlFor?: string;
  error?: React.ReactNode;
  hint?: React.ReactNode;
  required?: boolean;
  children: React.ReactNode;
  labelClassName?: string;
  description?: React.ReactNode;
}

const FormField = React.forwardRef<HTMLDivElement, FormFieldProps>(
  (
    {
      label,
      htmlFor,
      error,
      hint,
      required,
      description,
      children,
      className,
      labelClassName,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn("flex w-full flex-col gap-1.5", className)}
        {...props}
      >
        {label ? (
          <Label
            htmlFor={htmlFor}
            className={cn(
              "flex items-center gap-1 text-sm font-bold text-foreground",
              labelClassName
            )}
          >
            <span>{label}</span>
            {required ? (
              <span aria-hidden className="text-destructive">
                *
              </span>
            ) : null}
          </Label>
        ) : null}
        {description ? (
          <p className="text-xs text-muted-foreground">{description}</p>
        ) : null}
        {children}
        {error ? (
          <p
            role="alert"
            className="flex items-center gap-1 text-xs font-semibold text-destructive"
          >
            <AlertCircle className="size-3.5 shrink-0" />
            <span>{error}</span>
          </p>
        ) : hint ? (
          <p className="text-xs text-muted-foreground">{hint}</p>
        ) : null}
      </div>
    );
  }
);
FormField.displayName = "FormField";

export { FormField };
