import * as React from "react";
import { cn } from "@/lib/utils";

interface InputGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
}

const InputGroup = React.forwardRef<HTMLDivElement, InputGroupProps>(
  ({ className, leading, trailing, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex h-10 items-stretch overflow-hidden rounded-md border border-input bg-background text-sm shadow-juz-sm focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
        className
      )}
      {...props}
    >
      {leading ? (
        <div className="flex select-none items-center bg-muted px-3 text-muted-foreground">
          {leading}
        </div>
      ) : null}
      <div className="flex flex-1 items-center [&>input]:border-0 [&>input]:bg-transparent [&>input]:shadow-none [&>input]:focus-visible:ring-0 [&>input]:focus-visible:ring-offset-0">
        {children}
      </div>
      {trailing ? (
        <div className="flex select-none items-center bg-muted px-3 text-muted-foreground">
          {trailing}
        </div>
      ) : null}
    </div>
  )
);
InputGroup.displayName = "InputGroup";

export { InputGroup };
export type { InputGroupProps };
