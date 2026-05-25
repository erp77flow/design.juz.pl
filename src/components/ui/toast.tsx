import * as React from "react";
import { Toaster as Sonner, toast } from "sonner";
import { cn } from "@/lib/utils";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ className, ...props }: ToasterProps) => (
  <Sonner
    className={cn("toaster group", className)}
    toastOptions={{
      classNames: {
        toast:
          "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-juz",
        description: "group-[.toast]:text-muted-foreground",
        actionButton:
          "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
        cancelButton:
          "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        success:
          "group-[.toaster]:bg-success-soft group-[.toaster]:text-foreground group-[.toaster]:border-success/40",
        error:
          "group-[.toaster]:bg-destructive-soft group-[.toaster]:text-foreground group-[.toaster]:border-destructive/40",
        warning:
          "group-[.toaster]:bg-warning-soft group-[.toaster]:text-foreground group-[.toaster]:border-warning/40",
      },
    }}
    {...props}
  />
);

export { Toaster, toast };
