import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const iconActionButtonVariants = cva(
  "inline-flex items-center justify-center rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "border bg-card text-foreground shadow-juz-sm hover:bg-muted",
        ghost: "text-muted-foreground hover:bg-muted hover:text-foreground",
        primary:
          "bg-primary text-primary-foreground shadow-juz-sm hover:bg-primary/90",
        destructive:
          "bg-destructive-soft text-destructive hover:bg-destructive-soft/70",
      },
      size: {
        sm: "size-8",
        default: "size-9",
        lg: "size-10",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
);

interface IconActionButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof iconActionButtonVariants> {
  asChild?: boolean;
  label: string;
}

const IconActionButton = React.forwardRef<
  HTMLButtonElement,
  IconActionButtonProps
>(({ className, variant, size, asChild, label, children, ...props }, ref) => {
  const Comp: any = asChild ? Slot : "button";
  return (
    <Comp
      ref={ref}
      type={asChild ? undefined : "button"}
      aria-label={label}
      title={label}
      className={cn(iconActionButtonVariants({ variant, size }), className)}
      {...props}
    >
      {children}
    </Comp>
  );
});
IconActionButton.displayName = "IconActionButton";

export { IconActionButton, iconActionButtonVariants };
export type { IconActionButtonProps };
