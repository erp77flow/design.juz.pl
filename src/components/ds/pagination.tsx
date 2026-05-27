import * as React from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export interface PaginationProps
  extends React.HTMLAttributes<HTMLElement> {
  page: number;
  pageCount: number;
  onPageChange?: (page: number) => void;
  siblings?: number;
  showFirstLast?: boolean;
  labelPrevious?: string;
  labelNext?: string;
}

type PageItem = number | "ellipsis-start" | "ellipsis-end";

function getPageItems(
  page: number,
  pageCount: number,
  siblings: number
): PageItem[] {
  const items: PageItem[] = [];
  const totalNumbers = siblings * 2 + 5; // first, last, current, 2*siblings, 2 ellipses

  if (pageCount <= totalNumbers) {
    for (let i = 1; i <= pageCount; i++) items.push(i);
    return items;
  }

  const leftSibling = Math.max(page - siblings, 1);
  const rightSibling = Math.min(page + siblings, pageCount);
  const showLeftEllipsis = leftSibling > 2;
  const showRightEllipsis = rightSibling < pageCount - 1;

  items.push(1);
  if (showLeftEllipsis) items.push("ellipsis-start");
  for (
    let i = Math.max(leftSibling, 2);
    i <= Math.min(rightSibling, pageCount - 1);
    i++
  ) {
    items.push(i);
  }
  if (showRightEllipsis) items.push("ellipsis-end");
  items.push(pageCount);

  return items;
}

const Pagination = React.forwardRef<HTMLElement, PaginationProps>(
  (
    {
      page,
      pageCount,
      onPageChange,
      siblings = 1,
      showFirstLast = true,
      labelPrevious = "Poprzednia",
      labelNext = "Następna",
      className,
      ...props
    },
    ref
  ) => {
    const safePageCount = Math.max(1, pageCount);
    const currentPage = Math.min(Math.max(1, page), safePageCount);
    const items = getPageItems(currentPage, safePageCount, siblings);

    const goTo = (next: number) => {
      const clamped = Math.min(Math.max(1, next), safePageCount);
      if (clamped !== currentPage) onPageChange?.(clamped);
    };

    return (
      <nav
        ref={ref}
        role="navigation"
        aria-label="Paginacja"
        className={cn("flex items-center justify-center gap-1", className)}
        {...props}
      >
        <Button
          type="button"
          variant="ghost"
          size="sm"
          disabled={currentPage === 1}
          onClick={() => goTo(currentPage - 1)}
          aria-label={labelPrevious}
        >
          <ChevronLeft className="size-4" />
          <span className="hidden sm:inline">{labelPrevious}</span>
        </Button>

        {showFirstLast
          ? items.map((item, index) => {
              if (item === "ellipsis-start" || item === "ellipsis-end") {
                return (
                  <span
                    key={`${item}-${index}`}
                    aria-hidden
                    className="flex size-9 items-center justify-center text-muted-foreground"
                  >
                    <MoreHorizontal className="size-4" />
                  </span>
                );
              }
              const isActive = item === currentPage;
              return (
                <Button
                  key={item}
                  type="button"
                  variant={isActive ? "default" : "ghost"}
                  size="sm"
                  aria-current={isActive ? "page" : undefined}
                  className="min-w-9 px-3"
                  onClick={() => goTo(item)}
                >
                  {item}
                </Button>
              );
            })
          : null}

        <Button
          type="button"
          variant="ghost"
          size="sm"
          disabled={currentPage === safePageCount}
          onClick={() => goTo(currentPage + 1)}
          aria-label={labelNext}
        >
          <span className="hidden sm:inline">{labelNext}</span>
          <ChevronRight className="size-4" />
        </Button>
      </nav>
    );
  }
);
Pagination.displayName = "Pagination";

export { Pagination };
