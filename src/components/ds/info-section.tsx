import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface InfoSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  icon: React.ElementType;
  title: string;
  required?: boolean;
  toolbar?: React.ReactNode;
  headerClassName?: string;
  bodyClassName?: string;
  children?: React.ReactNode;
}

export const InfoSection = React.forwardRef<HTMLDivElement, InfoSectionProps>(
  (
    {
      icon: Icon,
      title,
      required,
      toolbar,
      headerClassName,
      bodyClassName,
      className,
      children,
      ...props
    },
    ref
  ) => (
    <Card ref={ref} className={cn("overflow-hidden", className)} {...props}>
      <div
        className={cn(
          "flex flex-col gap-3 border-b px-5 py-3 lg:flex-row lg:items-center lg:justify-between",
          headerClassName
        )}
      >
        <h3 className="inline-flex items-center gap-2 font-extrabold">
          <span className="inline-flex size-7 items-center justify-center rounded-md bg-primary-soft text-primary">
            <Icon className="size-4" />
          </span>
          {title}
          {required ? (
            <Badge variant="destructive" className="ml-1">
              wymagane
            </Badge>
          ) : null}
        </h3>
        {toolbar ? (
          <div className="flex flex-wrap items-center gap-2">{toolbar}</div>
        ) : null}
      </div>
      <div className={cn("p-5", bodyClassName)}>{children}</div>
    </Card>
  )
);
InfoSection.displayName = "InfoSection";
