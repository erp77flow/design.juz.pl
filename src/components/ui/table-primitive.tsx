import * as React from "react";
import { cn } from "@/lib/utils";

const TablePrimitive = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <div className="relative w-full overflow-auto">
    <table
      ref={ref}
      className={cn("w-full caption-bottom text-sm", className)}
      {...props}
    />
  </div>
));
TablePrimitive.displayName = "TablePrimitive";

const TablePrimitiveHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead
    ref={ref}
    className={cn("[&_tr]:border-b bg-muted/40", className)}
    {...props}
  />
));
TablePrimitiveHeader.displayName = "TablePrimitiveHeader";

const TablePrimitiveBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn("[&_tr:last-child]:border-0", className)}
    {...props}
  />
));
TablePrimitiveBody.displayName = "TablePrimitiveBody";

const TablePrimitiveRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      "border-b transition-colors hover:bg-muted/40 data-[state=selected]:bg-primary-soft/45",
      className
    )}
    {...props}
  />
));
TablePrimitiveRow.displayName = "TablePrimitiveRow";

const TablePrimitiveHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      "h-11 px-3 text-left align-middle text-xs font-semibold uppercase tracking-wide text-muted-foreground",
      className
    )}
    {...props}
  />
));
TablePrimitiveHead.displayName = "TablePrimitiveHead";

const TablePrimitiveCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td ref={ref} className={cn("px-3 py-2.5 align-middle", className)} {...props} />
));
TablePrimitiveCell.displayName = "TablePrimitiveCell";

const TablePrimitiveCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn("mt-4 text-sm text-muted-foreground", className)}
    {...props}
  />
));
TablePrimitiveCaption.displayName = "TablePrimitiveCaption";

export {
  TablePrimitive,
  TablePrimitiveHeader,
  TablePrimitiveBody,
  TablePrimitiveRow,
  TablePrimitiveHead,
  TablePrimitiveCell,
  TablePrimitiveCaption,
};
