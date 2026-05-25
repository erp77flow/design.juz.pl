import * as React from "react";
import { cn } from "@/lib/utils";
import { Input, type InputProps } from "@/components/ui/input";
import { InputGroup } from "@/components/ui/input-group";

export interface PrefixInputProps extends Omit<InputProps, "prefix"> {
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  containerClassName?: string;
}

const PrefixInput = React.forwardRef<HTMLInputElement, PrefixInputProps>(
  ({ prefix, suffix, containerClassName, className, ...props }, ref) => {
    return (
      <InputGroup
        leading={prefix}
        trailing={suffix}
        className={cn("h-11", containerClassName)}
      >
        <Input
          ref={ref}
          className={cn("h-full border-0 shadow-none", className)}
          {...props}
        />
      </InputGroup>
    );
  }
);
PrefixInput.displayName = "PrefixInput";

export { PrefixInput };
