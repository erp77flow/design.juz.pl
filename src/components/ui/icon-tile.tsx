import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const iconTileVariants = cva(
  "inline-flex items-center justify-center rounded-lg [&_svg]:size-5",
  {
    variants: {
      tone: {
        primary: "bg-primary-soft text-primary",
        success: "bg-success-soft text-success",
        warning: "bg-warning-soft text-warning",
        destructive: "bg-destructive-soft text-destructive",
        muted: "bg-muted text-muted-foreground",
      },
      size: {
        sm: "size-8 [&_svg]:size-4",
        default: "size-10",
        lg: "size-12 [&_svg]:size-6",
      },
    },
    defaultVariants: { tone: "primary", size: "default" },
  }
);

interface IconTileProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof iconTileVariants> {
  asChild?: boolean;
  icon?: React.ReactNode;
}

const IconTile = React.forwardRef<HTMLSpanElement, IconTileProps>(
  ({ className, tone, size, icon, children, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(iconTileVariants({ tone, size }), className)}
      {...props}
    >
      {icon ?? children}
    </span>
  )
);
IconTile.displayName = "IconTile";

export { IconTile, iconTileVariants };
export type { IconTileProps };
