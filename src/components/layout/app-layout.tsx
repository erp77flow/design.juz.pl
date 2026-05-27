import * as React from "react";
import { cn } from "@/lib/utils";

export interface AppLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  sidebar: React.ReactNode;
  navbar: React.ReactNode;
  topBar?: React.ReactNode;
  mainClassName?: string;
}

const AppLayout = React.forwardRef<HTMLDivElement, AppLayoutProps>(
  (
    { className, sidebar, navbar, topBar, mainClassName, children, ...props },
    ref
  ) => {
    return (
      <div
        className={cn("flex min-h-screen w-full bg-muted/40", className)}
        ref={ref}
        {...props}
      >
        <aside className="sticky top-0 z-30 hidden h-screen shrink-0 lg:block">
          {sidebar}
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <div className="sticky top-0 z-20 flex flex-col">
            {navbar}
            {topBar}
          </div>

          <main
            className={cn(
              "flex-1 overflow-y-auto p-4 md:p-6",
              mainClassName
            )}
          >
            {children}
          </main>
        </div>
      </div>
    );
  }
);
AppLayout.displayName = "AppLayout";

export { AppLayout };
