import * as React from "react";
import { cn } from "@/lib/utils";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Typography } from "@/components/ui/typography";

export interface HeaderBreadcrumb {
  label: React.ReactNode;
  href?: string;
}

export interface HeaderProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  title: React.ReactNode;
  description?: React.ReactNode;
  breadcrumbs?: HeaderBreadcrumb[];
  actions?: React.ReactNode;
  eyebrow?: React.ReactNode;
}

const Header = React.forwardRef<HTMLElement, HeaderProps>(
  (
    { title, description, breadcrumbs, actions, eyebrow, className, ...props },
    ref
  ) => {
    return (
      <header
        ref={ref}
        className={cn("flex flex-col gap-4", className)}
        {...props}
      >
        {breadcrumbs && breadcrumbs.length > 0 ? (
          <Breadcrumb>
            <BreadcrumbList>
              {breadcrumbs.map((crumb, index) => {
                const isLast = index === breadcrumbs.length - 1;
                return (
                  <React.Fragment key={`${crumb.label}-${index}`}>
                    <BreadcrumbItem>
                      {isLast || !crumb.href ? (
                        <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                      ) : (
                        <BreadcrumbLink href={crumb.href}>
                          {crumb.label}
                        </BreadcrumbLink>
                      )}
                    </BreadcrumbItem>
                    {!isLast ? <BreadcrumbSeparator /> : null}
                  </React.Fragment>
                );
              })}
            </BreadcrumbList>
          </Breadcrumb>
        ) : null}

        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0 space-y-1">
            {eyebrow ? (
              <Typography
                variant="caption"
                className="font-bold uppercase tracking-[0.14em] text-primary"
              >
                {eyebrow}
              </Typography>
            ) : null}
            <Typography variant="h2" className="truncate text-foreground">
              {title}
            </Typography>
            {description ? (
              <Typography
                variant="muted"
                className="max-w-2xl text-base leading-relaxed"
              >
                {description}
              </Typography>
            ) : null}
          </div>
          {actions ? (
            <div className="flex shrink-0 flex-wrap items-center gap-2">
              {actions}
            </div>
          ) : null}
        </div>
      </header>
    );
  }
);
Header.displayName = "Header";

export { Header };
