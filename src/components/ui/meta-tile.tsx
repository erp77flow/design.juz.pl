import * as React from "react";
import { cn } from "@/lib/utils";
import { IconTile, type IconTileProps } from "@/components/ui/icon-tile";

type MetaTileTone = NonNullable<IconTileProps["tone"]>;

interface MetaTileProps extends React.HTMLAttributes<HTMLDivElement> {
  icon: React.ReactNode;
  label: React.ReactNode;
  value: React.ReactNode;
  tone?: MetaTileTone;
  size?: IconTileProps["size"];
}

const MetaTile = React.forwardRef<HTMLDivElement, MetaTileProps>(
  ({ icon, label, value, tone = "primary", size = "default", className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex items-center gap-3", className)}
      {...props}
    >
      <IconTile tone={tone} size={size} icon={icon} />
      <div className="flex min-w-0 flex-col gap-0.5">
        <span className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
          {label}
        </span>
        <span className="truncate text-sm font-semibold text-foreground">
          {value}
        </span>
      </div>
    </div>
  )
);
MetaTile.displayName = "MetaTile";

export { MetaTile };
export type { MetaTileProps, MetaTileTone };
