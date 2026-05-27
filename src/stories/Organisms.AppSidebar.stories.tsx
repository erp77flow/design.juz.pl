import type { Meta, StoryObj } from "@storybook/react";
import {
  BarChart3,
  Building2,
  ClipboardList,
  Cog,
  Factory,
  FileText,
  Home,
  ShoppingCart,
  Users,
} from "lucide-react";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { AppSidebarGroup } from "@/components/layout/app-sidebar-group";
import { AppSidebarItem } from "@/components/layout/app-sidebar-item";
import { Navbar } from "@/components/layout/navbar";
import { SidebarProvider, useSidebar } from "@/hooks/use-sidebar";
import { cn } from "@/lib/utils";

const meta = {
  title: "Organisms/AppSidebar",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    // Render in an iframe (not inline) so `position: fixed` + the `lg:` mobile
    // breakpoint behave like in a real page; inline render would clip the
    // sidebar off-canvas in the narrow Docs preview.
    docs: {
      story: { inline: false, iframeHeight: 600 },
      description: {
        component:
          "Lewy sidebar aplikacji z trybem pinned/collapsed, grupami i pozycjami nawigacji. Wymaga `SidebarProvider` w korzeniu drzewa — bez niego stan pin/hover nie działa, a `useSidebar` rzuci wyjątkiem. W parze z `Navbar` daje pełny szablon aplikacji."
      }
    },
  },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const Logo = ({ collapsed = false }: { collapsed?: boolean }) => (
  <div className="flex items-center gap-2">
    <div className="grid size-8 place-items-center rounded-lg bg-primary text-primary-foreground">
      <span className="text-sm font-extrabold">J</span>
    </div>
    {collapsed ? null : (
      <span className="text-sm font-extrabold tracking-tight">juz.pl</span>
    )}
  </div>
);

/**
 * Wrapper that pushes the Navbar + content to the right based on sidebar
 * pinned/collapsed state. Pure composition — no new component needed since
 * the design system already ships `Navbar` (full top-bar with logo, search,
 * profile menu, notifications) and `AppSidebar`.
 */
const AppShell = ({ children }: { children: React.ReactNode }) => {
  const { isExpanded } = useSidebar();
  return (
    <div
      className={cn(
        "min-h-screen transition-[margin-left] duration-200 ease-in-out",
        isExpanded ? "lg:ml-56" : "lg:ml-16"
      )}
    >
      {children}
    </div>
  );
};

const ContentShell = () => (
  <main className="space-y-4 p-6">
    <h1 className="text-2xl font-extrabold">Dashboard</h1>
    <p className="text-muted-foreground">
      Najedź na sidebar żeby zobaczyć tymczasowe rozwinięcie. Kliknij chevron
      na dole sidebara żeby zmienić tryb (pinned / collapsed) — stan zapisuje
      się w localStorage.
    </p>
    <div className="grid gap-4 md:grid-cols-3">
      {["Otwarte zlecenia", "Nowi klienci", "Przychód"].map((label) => (
        <div key={label} className="rounded-lg border bg-card p-4">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">
            {label}
          </p>
          <p className="mt-1 text-2xl font-extrabold">128</p>
        </div>
      ))}
    </div>
  </main>
);

export const Default: Story = {
  render: () => (
    <SidebarProvider>
      <AppSidebar logo={<Logo />} logoCollapsed={<Logo collapsed />}>
        <AppSidebarGroup id="main" label="Główne" icon={<Home />}>
          <AppSidebarItem isActive>
            <Home /> <span>Dashboard</span>
          </AppSidebarItem>
          <AppSidebarItem>
            <ClipboardList /> <span>Zlecenia</span>
          </AppSidebarItem>
          <AppSidebarItem>
            <ShoppingCart /> <span>Magazyn</span>
          </AppSidebarItem>
          <AppSidebarItem>
            <Users /> <span>Klienci</span>
          </AppSidebarItem>
        </AppSidebarGroup>

        <AppSidebarGroup id="production" label="Produkcja" icon={<Factory />}>
          <AppSidebarItem>
            <Factory /> <span>Zlecenia produkcyjne</span>
          </AppSidebarItem>
          <AppSidebarItem>
            <BarChart3 /> <span>Wykorzystanie</span>
          </AppSidebarItem>
        </AppSidebarGroup>

        <AppSidebarGroup id="reports" label="Raporty" icon={<FileText />}>
          <AppSidebarItem>
            <FileText /> <span>Sprzedażowe</span>
          </AppSidebarItem>
          <AppSidebarItem>
            <Building2 /> <span>Operacyjne</span>
          </AppSidebarItem>
        </AppSidebarGroup>

        <AppSidebarGroup id="settings" label="Ustawienia" icon={<Cog />}>
          <AppSidebarItem>
            <Cog /> <span>Profil firmy</span>
          </AppSidebarItem>
          <AppSidebarItem>
            <Users /> <span>Użytkownicy</span>
          </AppSidebarItem>
        </AppSidebarGroup>
      </AppSidebar>

      <AppShell>
        <Navbar
          breadcrumbs={[
            { label: "juz.pl", href: "/" },
            { label: "Dashboard" },
          ]}
          user={{
            name: "Imię Nazwisko",
            email: "uzytkownik@juz.pl",
            role: "Administrator",
          }}
          notifications={3}
          onLogout={() => {}}
          onProfile={() => {}}
          onSettings={() => {}}
        />
        <ContentShell />
      </AppShell>
    </SidebarProvider>
  ),
};
