import * as React from "react";

interface SidebarContextValue {
  /** Sidebar is pinned in the expanded state */
  isPinned: boolean;
  /** Mouse is hovering the sidebar (temporary expand) */
  isHovered: boolean;
  /** Mobile drawer is open */
  isMobileOpen: boolean;
  /** Derived: sidebar is expanded (pinned OR hovered) */
  isExpanded: boolean;
  /** Per-group open state (true = open) */
  collapsedGroups: Record<string, boolean>;

  togglePin: () => void;
  setHovered: (value: boolean) => void;
  setMobileOpen: (value: boolean) => void;
  toggleGroup: (id: string) => void;
}

const SidebarContext = React.createContext<SidebarContextValue | undefined>(
  undefined
);

interface SidebarProviderProps {
  children: React.ReactNode;
  /**
   * localStorage key prefix. Defaults to `"juz-sidebar"` — set per-app
   * (e.g. `storagePrefix="income"`) when the design system is consumed
   * by multiple apps on the same origin and you want their sidebar
   * state to stay independent.
   */
  storagePrefix?: string;
}

function readLS<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

const SidebarProvider = ({
  children,
  storagePrefix = "juz-sidebar",
}: SidebarProviderProps) => {
  const pinnedKey = `${storagePrefix}-pinned`;
  const groupsKey = `${storagePrefix}-groups`;

  const [isPinned, setIsPinned] = React.useState(() => readLS(pinnedKey, true));
  const [isHovered, setIsHovered] = React.useState(false);
  const [isMobileOpen, setIsMobileOpen] = React.useState(false);
  const [collapsedGroups, setCollapsedGroups] = React.useState<
    Record<string, boolean>
  >(() => readLS(groupsKey, {}));

  const isExpanded = isPinned || isHovered;

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(pinnedKey, JSON.stringify(isPinned));
  }, [pinnedKey, isPinned]);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(groupsKey, JSON.stringify(collapsedGroups));
  }, [groupsKey, collapsedGroups]);

  const togglePin = React.useCallback(() => setIsPinned((p) => !p), []);
  const setHovered = React.useCallback(
    (value: boolean) => setIsHovered(value),
    []
  );
  const setMobileOpen = React.useCallback(
    (value: boolean) => setIsMobileOpen(value),
    []
  );
  const toggleGroup = React.useCallback(
    (id: string) =>
      setCollapsedGroups((prev) => ({ ...prev, [id]: !prev[id] })),
    []
  );

  const value = React.useMemo<SidebarContextValue>(
    () => ({
      isPinned,
      isHovered,
      isMobileOpen,
      isExpanded,
      collapsedGroups,
      togglePin,
      setHovered,
      setMobileOpen,
      toggleGroup,
    }),
    [
      isPinned,
      isHovered,
      isMobileOpen,
      isExpanded,
      collapsedGroups,
      togglePin,
      setHovered,
      setMobileOpen,
      toggleGroup,
    ]
  );

  return (
    <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
  );
};

const useSidebar = () => {
  const ctx = React.useContext(SidebarContext);
  if (!ctx) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return ctx;
};

export { SidebarProvider, useSidebar };
export type { SidebarContextValue, SidebarProviderProps };
