import * as React from "react";
import { Calendar, FileText } from "lucide-react";
import { Badge, type BadgeProps } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export type DocumentStatus =
  | "draft"
  | "issued"
  | "sent"
  | "paid"
  | "overdue"
  | "cancelled"
  | "neutral";

const statusLabels: Record<DocumentStatus, string> = {
  draft: "Szkic",
  issued: "Wystawiony",
  sent: "Wysłany",
  paid: "Opłacony",
  overdue: "Po terminie",
  cancelled: "Anulowany",
  neutral: "Status",
};

const statusVariants: Record<DocumentStatus, BadgeProps["variant"]> = {
  draft: "neutral",
  issued: "default",
  sent: "default",
  paid: "success",
  overdue: "destructive",
  cancelled: "neutral",
  neutral: "neutral",
};

export interface DocumentMeta {
  number: string;
  type: string;
  date: string;
  dueDate?: string;
  status: DocumentStatus;
  statusLabel?: string;
}

export interface DocumentPreviewProps
  extends React.HTMLAttributes<HTMLElement> {
  document: DocumentMeta;
  actions?: React.ReactNode;
  notes?: React.ReactNode;
}

const DocumentPreview = React.forwardRef<HTMLElement, DocumentPreviewProps>(
  ({ className, document, actions, notes, children, ...props }, ref) => {
    return (
      <article
        className={cn(
          "overflow-hidden rounded-xl border border-border bg-card shadow-juz",
          className
        )}
        ref={ref}
        {...props}
      >
        <header className="border-b border-border bg-primary-soft/30 px-6 py-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="min-w-0">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground">
                <FileText className="size-3.5" />
                {document.type}
              </div>
              <h1 className="mt-1 font-mono text-3xl font-extrabold leading-tight text-foreground">
                {document.number}
              </h1>
              <div className="mt-3 flex flex-wrap items-center gap-3 text-sm">
                <span className="inline-flex items-center gap-1.5 text-muted-foreground">
                  <Calendar className="size-4" />
                  Data wystawienia:{" "}
                  <span className="font-semibold text-foreground">
                    {document.date}
                  </span>
                </span>
                {document.dueDate ? (
                  <>
                    <Separator
                      className="h-4"
                      orientation="vertical"
                    />
                    <span className="inline-flex items-center gap-1.5 text-muted-foreground">
                      <Calendar className="size-4" />
                      Termin płatności:{" "}
                      <span className="font-semibold text-foreground">
                        {document.dueDate}
                      </span>
                    </span>
                  </>
                ) : null}
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant={statusVariants[document.status]}>
                {document.statusLabel ?? statusLabels[document.status]}
              </Badge>
              {actions}
            </div>
          </div>
        </header>

        <div className="space-y-6 p-6">{children}</div>

        {notes ? (
          <footer className="border-t border-border bg-muted/30 px-6 py-4 text-sm text-muted-foreground">
            {notes}
          </footer>
        ) : null}
      </article>
    );
  }
);
DocumentPreview.displayName = "DocumentPreview";

export { DocumentPreview };
