import * as React from "react";
import { ChevronDown, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export interface ProfileUser {
  name: string;
  email?: string;
  avatarUrl?: string;
  role?: string;
}

export interface ProfileMenuItem {
  key: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

export interface ProfileMenuProps {
  user: ProfileUser;
  items?: ProfileMenuItem[];
  onLogout?: () => void;
  className?: string;
  showName?: boolean;
  align?: "start" | "center" | "end";
  logoutLabel?: string;
}

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
}

function ProfileMenu({
  user,
  items = [],
  onLogout,
  className,
  showName = true,
  align = "end",
  logoutLabel = "Wyloguj się",
}: ProfileMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className={cn(
            "flex items-center gap-2 rounded-full p-1 pr-2 text-left transition-colors hover:bg-muted focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            className
          )}
          aria-label="Menu profilu"
        >
          <Avatar className="size-9">
            {user.avatarUrl ? (
              <AvatarImage src={user.avatarUrl} alt={user.name} />
            ) : null}
            <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
          </Avatar>
          {showName ? (
            <span className="hidden min-w-0 flex-col sm:flex">
              <span className="truncate text-sm font-semibold text-foreground">
                {user.name}
              </span>
              {user.role ? (
                <span className="truncate text-xs text-muted-foreground">
                  {user.role}
                </span>
              ) : null}
            </span>
          ) : null}
          <ChevronDown
            aria-hidden
            className="hidden size-4 shrink-0 text-muted-foreground sm:inline"
          />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={align} className="w-64">
        <DropdownMenuLabel className="flex flex-col gap-0.5 normal-case tracking-normal">
          <span className="text-sm font-bold text-foreground">{user.name}</span>
          {user.email ? (
            <span className="truncate text-xs font-normal text-muted-foreground">
              {user.email}
            </span>
          ) : null}
        </DropdownMenuLabel>
        {items.length > 0 ? (
          <>
            <DropdownMenuSeparator />
            {items.map((item) => (
              <DropdownMenuItem
                key={item.key}
                disabled={item.disabled}
                onSelect={(e) => {
                  e.preventDefault();
                  item.onClick?.();
                }}
              >
                {item.icon}
                <span>{item.label}</span>
              </DropdownMenuItem>
            ))}
          </>
        ) : null}
        {onLogout ? (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onSelect={(e) => {
                e.preventDefault();
                onLogout();
              }}
              className="text-destructive focus:bg-destructive-soft focus:text-destructive"
            >
              <LogOut className="size-4" />
              <span>{logoutLabel}</span>
            </DropdownMenuItem>
          </>
        ) : null}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export { ProfileMenu };
