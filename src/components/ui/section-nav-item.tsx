import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

interface SectionNavItemProps extends React.HTMLAttributes<HTMLElement> {
  asChild?: boolean;
  icon?: React.ReactNode;
  label: React.ReactNode;
  description?: React.ReactNode;
  active?: boolean;
  badge?: React.ReactNode;
  trailing?: React.ReactNode;
}

const SectionNavItem = React.forwardRef<HTMLElement, SectionNavItemProps>(
  (
    {
      className,
      asChild,
      icon,
      label,
      description,
      active,
      badge,
      trailing,
      ...props
    },
    ref
  ) => {
    const Comp: any = asChild ? Slot : "a";
    return (
      <Comp
        ref={ref}
        data-active={active || undefined}
        className={cn(
          "group relative flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-colors",
          "hover:bg-muted",
          active
            ? "bg-primary-soft text-primary font-semibold"
            : "text-foreground",
          className
        )}
        {...props}
      >
        {icon ? (
          <span
            className={cn(
              "flex size-8 shrink-0 items-center justify-center rounded-md [&_svg]:size-4",
              active
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground"
            )}
          >
            {icon}
          </span>
        ) : null}
        <span className="flex flex-1 flex-col gap-0.5 text-left">
          <span className="font-semibold leading-tight">{label}</span>
          {description ? (
            <span className="text-xs font-normal text-muted-foreground">
              {description}
            </span>
          ) : null}
        </span>
        {badge}
        {trailing}
      </Comp>
    );
  }
);
SectionNavItem.displayName = "SectionNavItem";

export { SectionNavItem };
export type { SectionNavItemProps };
