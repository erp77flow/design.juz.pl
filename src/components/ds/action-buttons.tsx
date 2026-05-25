import * as React from "react";
import { cn } from "@/lib/utils";
import { Button, type ButtonProps } from "@/components/ui/button";
import { IconActionButton } from "@/components/ui/icon-action-button";

export interface ActionButtonItem {
  key: string;
  label: string;
  icon: React.ReactNode;
  variant?: ButtonProps["variant"];
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export interface ActionButtonsProps extends React.HTMLAttributes<HTMLDivElement> {
  actions: ActionButtonItem[];
  compact?: boolean;
}

const ActionButtons = React.forwardRef<HTMLDivElement, ActionButtonsProps>(
  ({ actions, compact = false, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("inline-flex items-center gap-2", className)}
        role="group"
        {...props}
      >
        {actions.map((action) =>
          compact ? (
            <IconActionButton
              key={action.key}
              label={action.label}
              variant={action.variant === "destructive" ? "destructive" : "default"}
              disabled={action.disabled}
              onClick={action.onClick}
            >
              {action.icon}
            </IconActionButton>
          ) : (
            <Button
              key={action.key}
              variant={action.variant ?? "secondary"}
              size="sm"
              disabled={action.disabled}
              onClick={action.onClick}
            >
              {action.icon}
              <span>{action.label}</span>
            </Button>
          )
        )}
      </div>
    );
  }
);
ActionButtons.displayName = "ActionButtons";

export { ActionButtons };
