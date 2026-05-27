import * as React from "react";
import { File, FileImage, FileText, FileVideo } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  IconActionButton,
  type IconActionButtonProps,
} from "@/components/ui/icon-action-button";

export interface FileMeta {
  name: string;
  size?: number;
  type?: string;
  url?: string;
}

export interface FileActionItem {
  key: string;
  label: string;
  icon: React.ReactNode;
  variant?: IconActionButtonProps["variant"];
  disabled?: boolean;
  onClick?: (file: FileMeta) => void;
}

export interface FileActionsProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onClick"> {
  file: FileMeta;
  actions: FileActionItem[];
}

function formatBytes(bytes?: number) {
  if (typeof bytes !== "number" || bytes <= 0) return "";
  const units = ["B", "KB", "MB", "GB", "TB"];
  const exp = Math.min(
    Math.floor(Math.log(bytes) / Math.log(1024)),
    units.length - 1
  );
  const value = bytes / Math.pow(1024, exp);
  return `${value.toFixed(value >= 10 || exp === 0 ? 0 : 1)} ${units[exp]}`;
}

function getFileIcon(type?: string) {
  if (!type) return File;
  if (type.startsWith("image/")) return FileImage;
  if (type.startsWith("video/")) return FileVideo;
  if (
    type.startsWith("text/") ||
    type.includes("pdf") ||
    type.includes("word")
  ) {
    return FileText;
  }
  return File;
}

const FileActions = React.forwardRef<HTMLDivElement, FileActionsProps>(
  ({ file, actions, className, ...props }, ref) => {
    const IconComponent = getFileIcon(file.type);
    const sizeLabel = formatBytes(file.size);

    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center gap-3 rounded-md border bg-card p-3 shadow-juz-sm",
          className
        )}
        {...props}
      >
        <div className="flex size-10 shrink-0 items-center justify-center rounded-md bg-primary-soft text-primary">
          <IconComponent className="size-5" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-foreground">
            {file.name}
          </p>
          {sizeLabel || file.type ? (
            <p className="truncate text-xs text-muted-foreground">
              {[sizeLabel, file.type].filter(Boolean).join(" - ")}
            </p>
          ) : null}
        </div>
        <div className="flex shrink-0 items-center gap-1">
          {actions.map((action) => (
            <IconActionButton
              key={action.key}
              label={action.label}
              variant={action.variant ?? "ghost"}
              size="sm"
              disabled={action.disabled}
              onClick={() => action.onClick?.(file)}
            >
              {action.icon}
            </IconActionButton>
          ))}
        </div>
      </div>
    );
  }
);
FileActions.displayName = "FileActions";

export { FileActions };
