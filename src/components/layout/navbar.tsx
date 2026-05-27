import * as React from "react";
import { Bell, LogOut, Search, Settings, User as UserIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IconActionButton } from "@/components/ui/icon-action-button";
import { Kbd } from "@/components/ui/kbd";
import { cn } from "@/lib/utils";

export interface NavbarBreadcrumb {
  label: string;
  href?: string;
}

export interface NavbarUser {
  name: string;
  email?: string;
  avatarUrl?: string;
  role?: string;
}

export interface NavbarProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  logo?: React.ReactNode;
  title?: React.ReactNode;
  breadcrumbs?: NavbarBreadcrumb[];
  nav?: React.ReactNode;
  user: NavbarUser;
  notifications?: number;
  searchPlaceholder?: string;
  onSearch?: () => void;
  onOpenNotifications?: () => void;
  onLogout: () => void;
  onProfile?: () => void;
  onSettings?: () => void;
  endSlot?: React.ReactNode;
}

function getInitials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

const Navbar = React.forwardRef<HTMLElement, NavbarProps>(
  (
    {
      className,
      logo,
      title,
      breadcrumbs,
      nav,
      user,
      notifications,
      searchPlaceholder = "Szukaj w aplikacji...",
      onSearch,
      onOpenNotifications,
      onLogout,
      onProfile,
      onSettings,
      endSlot,
      ...props
    },
    ref
  ) => {
    return (
      <header
        className={cn(
          "flex h-16 items-center gap-4 border-b border-border bg-card px-4 shadow-juz-sm",
          className
        )}
        ref={ref}
        {...props}
      >
        <div className="flex min-w-0 items-center gap-3">
          {logo}
          {title || breadcrumbs?.length ? (
            <div className="min-w-0">
              {breadcrumbs?.length ? (
                <Breadcrumb>
                  <BreadcrumbList>
                    {breadcrumbs.map((item, index) => {
                      const isLast = index === breadcrumbs.length - 1;
                      return (
                        <React.Fragment key={`${item.label}-${index}`}>
                          <BreadcrumbItem>
                            {isLast ? (
                              <BreadcrumbPage>{item.label}</BreadcrumbPage>
                            ) : (
                              <BreadcrumbLink href={item.href ?? "#"}>
                                {item.label}
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
              {title ? (
                <p className="truncate text-base font-extrabold leading-tight">
                  {title}
                </p>
              ) : null}
            </div>
          ) : null}
        </div>

        {nav ? (
          <nav aria-label="Główna nawigacja" className="hidden items-center md:flex">
            {nav}
          </nav>
        ) : null}

        <div className="hidden flex-1 justify-center md:flex">
          <button
            aria-label="Otwórz wyszukiwarkę globalną"
            className="group flex h-10 w-full max-w-md items-center gap-3 rounded-md border border-border bg-background px-3 text-sm text-muted-foreground shadow-juz-sm transition-colors hover:border-primary/50 hover:text-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
            onClick={onSearch}
            type="button"
          >
            <Search className="size-4" />
            <span className="flex-1 truncate text-left">{searchPlaceholder}</span>
            <span className="hidden items-center gap-1 lg:flex">
              <Kbd>Ctrl</Kbd>
              <Kbd>K</Kbd>
            </span>
          </button>
        </div>

        <div className="ml-auto flex items-center gap-2">
          {endSlot}
          <IconActionButton
            className="md:hidden"
            label="Szukaj"
            onClick={onSearch}
            variant="ghost"
          >
            <Search />
          </IconActionButton>
          <div className="relative">
            <IconActionButton
              label="Powiadomienia"
              onClick={onOpenNotifications}
              variant="ghost"
            >
              <Bell />
            </IconActionButton>
            {notifications && notifications > 0 ? (
              <Badge
                className="pointer-events-none absolute -right-1 -top-1 min-w-5 justify-center px-1.5 py-0 text-[10px] leading-5"
                variant="destructive"
              >
                {notifications > 99 ? "99+" : notifications}
              </Badge>
            ) : null}
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                aria-label="Menu profilu"
                className="flex items-center gap-2 rounded-md p-1 transition-colors hover:bg-muted focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
                type="button"
              >
                <Avatar className="size-9">
                  {user.avatarUrl ? (
                    <AvatarImage alt={user.name} src={user.avatarUrl} />
                  ) : null}
                  <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                </Avatar>
                <div className="hidden flex-col text-left lg:flex">
                  <span className="text-sm font-semibold leading-tight">
                    {user.name}
                  </span>
                  {user.role ? (
                    <span className="text-xs text-muted-foreground">
                      {user.role}
                    </span>
                  ) : null}
                </div>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-56">
              <DropdownMenuLabel>
                <div className="flex flex-col">
                  <span className="font-bold">{user.name}</span>
                  {user.email ? (
                    <span className="text-xs font-normal text-muted-foreground">
                      {user.email}
                    </span>
                  ) : null}
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              {onProfile ? (
                <DropdownMenuItem onSelect={onProfile}>
                  <UserIcon />
                  Mój profil
                </DropdownMenuItem>
              ) : null}
              {onSettings ? (
                <DropdownMenuItem onSelect={onSettings}>
                  <Settings />
                  Ustawienia
                </DropdownMenuItem>
              ) : null}
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-destructive focus:bg-destructive-soft focus:text-destructive"
                onSelect={onLogout}
              >
                <LogOut />
                Wyloguj się
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
    );
  }
);
Navbar.displayName = "Navbar";

export { Navbar };
