import * as React from "react";
import { Eye } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ColumnVisibilityItem {
  id: string;
  label: string;
  visible: boolean;
  disabled?: boolean;
}

interface ColumnVisibilitySwitchProps {
  columns: ColumnVisibilityItem[];
  onChange: (id: string, visible: boolean) => void;
  label?: string;
  triggerLabel?: string;
  className?: string;
  align?: "start" | "center" | "end";
}

const ColumnVisibilitySwitch = React.forwardRef<
  HTMLButtonElement,
  ColumnVisibilitySwitchProps
>(
  (
    {
      columns,
      onChange,
      label = "Widoczność kolumn",
      triggerLabel = "Kolumny",
      className,
      align = "end",
    },
    ref
  ) => {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            ref={ref}
            variant="secondary"
            className={cn("gap-2", className)}
            aria-label={label}
          >
            <Eye className="size-4" />
            {triggerLabel}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align={align} className="min-w-[14rem]">
          <DropdownMenuLabel>{label}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {columns.map((column) => (
            <DropdownMenuCheckboxItem
              key={column.id}
              checked={column.visible}
              disabled={column.disabled}
              onSelect={(event) => event.preventDefault()}
              onCheckedChange={(checked) => onChange(column.id, Boolean(checked))}
            >
              {column.label}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
);
ColumnVisibilitySwitch.displayName = "ColumnVisibilitySwitch";

export { ColumnVisibilitySwitch };
export type { ColumnVisibilitySwitchProps, ColumnVisibilityItem };
