import * as React from "react";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { IconActionButton } from "@/components/ui/icon-action-button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SectionNavItem } from "@/components/ui/section-nav-item";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

export interface SidebarNavItem {
  key: string;
  label: string;
  icon?: React.ReactNode;
  href?: string;
  count?: number;
  active?: boolean;
  items?: SidebarNavItem[];
  onSelect?: () => void;
}

export interface SidebarGroup {
  label?: string;
  collapsible?: boolean;
  defaultOpen?: boolean;
  items: SidebarNavItem[];
}

export interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  logo?: React.ReactNode;
  groups: SidebarGroup[];
  footer?: React.ReactNode;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}

const Sidebar = React.forwardRef<HTMLElement, SidebarProps>(
  (
    {
      className,
      logo,
      groups,
      footer,
      collapsed = false,
      onToggleCollapse,
      ...props
    },
    ref
  ) => {
    return (
      <TooltipProvider delayDuration={200}>
        <aside
          aria-label="Nawigacja główna"
          className={cn(
            "flex h-full flex-col border-r border-border bg-card shadow-juz-sm transition-[width] duration-200",
            collapsed ? "w-[72px]" : "w-64",
            className
          )}
          data-collapsed={collapsed || undefined}
          ref={ref}
          {...props}
        >
          <div
            className={cn(
              "flex h-16 items-center gap-2 border-b border-border px-3",
              collapsed && "justify-center px-2"
            )}
          >
            {logo ? (
              <div className={cn("flex min-w-0 flex-1 items-center", collapsed && "justify-center")}>
                {logo}
              </div>
            ) : null}
            {onToggleCollapse ? (
              <IconActionButton
                label={collapsed ? "Rozwiń panel" : "Zwiń panel"}
                onClick={onToggleCollapse}
                size="sm"
                variant="ghost"
              >
                {collapsed ? <ChevronRight /> : <ChevronLeft />}
              </IconActionButton>
            ) : null}
          </div>

          <ScrollArea className="flex-1">
            <nav className="space-y-4 p-3">
              {groups.map((group, index) => (
                <SidebarGroupBlock
                  collapsed={collapsed}
                  group={group}
                  key={group.label ?? `group-${index}`}
                />
              ))}
            </nav>
          </ScrollArea>

          {footer ? (
            <>
              <Separator />
              <div className={cn("p-3", collapsed && "flex justify-center")}>
                {footer}
              </div>
            </>
          ) : null}
        </aside>
      </TooltipProvider>
    );
  }
);
Sidebar.displayName = "Sidebar";

function SidebarGroupBlock({
  group,
  collapsed,
}: {
  group: SidebarGroup;
  collapsed: boolean;
}) {
  const [open, setOpen] = React.useState(group.defaultOpen ?? true);
  const collapsible = group.collapsible ?? Boolean(group.label);

  return (
    <div className="space-y-1">
      {group.label && !collapsed ? (
        collapsible ? (
          <button
            aria-expanded={open}
            className="flex w-full items-center justify-between rounded-md px-2 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:text-foreground"
            onClick={() => setOpen((value) => !value)}
            type="button"
          >
            <span>{group.label}</span>
            <ChevronDown
              className={cn(
                "size-3.5 transition-transform",
                !open && "-rotate-90"
              )}
            />
          </button>
        ) : (
          <p className="px-2 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground">
            {group.label}
          </p>
        )
      ) : null}
      {(!collapsible || open || collapsed) ? (
        <ul className="space-y-1">
          {group.items.map((item) => (
            <li key={item.key}>
              <SidebarItem collapsed={collapsed} item={item} />
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

function SidebarItem({
  item,
  collapsed,
  depth = 0,
}: {
  item: SidebarNavItem;
  collapsed: boolean;
  depth?: number;
}) {
  const hasChildren = Boolean(item.items?.length);
  const [open, setOpen] = React.useState(item.active ?? false);

  const trailingBadge =
    typeof item.count === "number" ? (
      <Badge variant="neutral">{item.count}</Badge>
    ) : null;

  if (collapsed && depth === 0) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <a
            aria-label={item.label}
            className={cn(
              "flex size-12 items-center justify-center rounded-md transition-colors [&_svg]:size-5",
              item.active
                ? "bg-primary-soft text-primary"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
            href={item.href ?? "#"}
            onClick={(event) => {
              if (item.onSelect) {
                event.preventDefault();
                item.onSelect();
              }
            }}
          >
            {item.icon ?? <span className="text-sm font-bold">{item.label.slice(0, 2)}</span>}
          </a>
        </TooltipTrigger>
        <TooltipContent side="right">{item.label}</TooltipContent>
      </Tooltip>
    );
  }

  if (hasChildren) {
    return (
      <div className="space-y-1">
        <button
          aria-expanded={open}
          className={cn(
            "group flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-colors",
            item.active
              ? "bg-primary-soft text-primary font-semibold"
              : "text-foreground hover:bg-muted"
          )}
          onClick={() => setOpen((value) => !value)}
          type="button"
        >
          {item.icon ? (
            <span
              className={cn(
                "flex size-8 shrink-0 items-center justify-center rounded-md [&_svg]:size-4",
                item.active
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              )}
            >
              {item.icon}
            </span>
          ) : null}
          <span className="flex-1 text-left font-semibold leading-tight">
            {item.label}
          </span>
          {trailingBadge}
          <ChevronDown
            className={cn(
              "size-4 text-muted-foreground transition-transform",
              !open && "-rotate-90"
            )}
          />
        </button>
        {open ? (
          <ul className="ml-3 space-y-1 border-l border-border pl-3">
            {item.items!.map((child) => (
              <li key={child.key}>
                <SidebarItem
                  collapsed={collapsed}
                  depth={depth + 1}
                  item={child}
                />
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    );
  }

  if (depth > 0) {
    return (
      <a
        aria-current={item.active ? "page" : undefined}
        className={cn(
          "flex items-center justify-between gap-2 rounded-md px-3 py-2 text-sm transition-colors",
          item.active
            ? "bg-primary-soft text-primary font-semibold"
            : "text-muted-foreground hover:bg-muted hover:text-foreground"
        )}
        href={item.href ?? "#"}
        onClick={(event) => {
          if (item.onSelect) {
            event.preventDefault();
            item.onSelect();
          }
        }}
      >
        <span className="truncate">{item.label}</span>
        {trailingBadge}
      </a>
    );
  }

  return (
    <SectionNavItem
      active={item.active}
      asChild
      badge={trailingBadge ?? undefined}
      icon={item.icon}
      label={item.label}
    >
      <a
        href={item.href ?? "#"}
        onClick={(event) => {
          if (item.onSelect) {
            event.preventDefault();
            item.onSelect();
          }
        }}
      />
    </SectionNavItem>
  );
}

export { Sidebar };
