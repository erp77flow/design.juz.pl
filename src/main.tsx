import { createRoot } from "react-dom/client";
import { ArrowRight, Bot, Component, FileText, LayoutDashboard, Palette } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LoginScreen } from "@/components/ds/auth-screens";
import { ChartShowcase } from "@/components/ds/chart-showcase";
import { DataList } from "@/components/ds/data-list";
import { DetailHeader } from "@/components/ds/detail-header";
import { FormShowcase } from "@/components/ds/form-showcase";
import { JuzLogo } from "@/components/ds/logo";
import { ProgressLineCards } from "@/components/ds/progress-line-card";
import { SocialCalendar } from "@/components/ds/social-calendar";
import { Stepper } from "@/components/ds/stepper";
import { HorizontalTimeline } from "@/components/ds/timeline";
import { TokenShowcase } from "@/components/ds/token-showcase";
import { TypographyScale } from "@/components/ds/typography-scale";
import "./styles/globals.css";

const nav = ["Introduction", "Foundations", "Typography", "Atoms", "Molecules", "Components", "Forms", "Patterns", "Layouts", "Screens", "AI Usage", "License"];

function App() {
  return (
    <main className="juz-page">
      <div className="juz-doc-shell">
        <aside className="juz-doc-nav">
          <JuzLogo />
          <nav className="mt-8 flex gap-2 overflow-x-auto lg:flex-col lg:overflow-visible">
            {nav.map((item) => (
              <a
                className="rounded-md px-3 py-2 text-sm font-semibold text-muted-foreground hover:bg-primary-soft hover:text-primary"
                href={`#${item.toLowerCase().replaceAll(" ", "-")}`}
                key={item}
              >
                {item}
              </a>
            ))}
          </nav>
        </aside>

        <div className="juz-doc-main">
          <section id="introduction" className="juz-section">
            <Badge>DesignSystem</Badge>
            <h1 className="mt-4 max-w-4xl text-5xl font-extrabold leading-tight">
              Design system juz.pl oparty o shadcn, ale z naszym stylem produktu.
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">
              Publiczna baza pod DesignSystem: tokeny, komponenty, layouty, wzorce
              ekranów i instrukcje dla AI — gotowe do użycia w aplikacjach juz.pl.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button>
                Storybook docs
                <ArrowRight />
              </Button>
              <Button variant="outline">GitHub package</Button>
            </div>
          </section>

          <section id="foundations" className="juz-section">
            <div className="juz-grid-auto mt-5">
              <TokenCard icon={<Palette />} title="Kolory" text="Primary, success, warning, destructive i neutralne tony jako HSL CSS variables." />
              <TokenCard icon={<FileText />} title="Typografia" text="Inter dla UI, JetBrains Mono dla kodu, ID i danych tabelarycznych." />
              <TokenCard icon={<Component />} title="Komponenty" text="shadcn-compatible API, Radix pod spodem i nasze warianty wizualne." />
              <TokenCard icon={<LayoutDashboard />} title="Layouty" text="Listy pełnej szerokości, podglady rekordów do lewej i responsywne shell-e." />
            </div>
            <div className="mt-8">
              <TokenShowcase />
            </div>
          </section>

          <section id="typography" className="juz-section">
            <TypographyScale />
          </section>

          <section id="components" className="juz-section space-y-5">
            <h2 className="text-3xl font-extrabold">Komponenty</h2>
            <Card>
              <CardHeader>
                <CardTitle>Button / Badge / Input / Table</CardTitle>
                <CardDescription>Warianty bazowe zgodne z shadcn, ale pod tokenami juz.pl.</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-3">
                <Button>Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="success">Success</Button>
                <Button variant="warning">Warning</Button>
                <Button variant="destructive">Destructive</Button>
                <Badge>Online</Badge>
                <Badge variant="success">Aktywny</Badge>
                <Badge variant="warning">Pauza</Badge>
                <Badge variant="destructive">Blad</Badge>
              </CardContent>
            </Card>
          </section>

          <section id="atoms" className="juz-section">
            <CatalogEntry
              title="Atomy"
              text="Najmniejsze elementy interfejsu: przyciski, pola, selekty, kalendarze, statusy, tabele bazowe i kontrolki formularzy. Aktualny katalog jest utrzymywany w Storybooku."
              href="/?path=/docs/atoms-overview--docs"
            />
          </section>

          <section id="molecules" className="juz-section">
            <CatalogEntry
              title="Molekuły"
              text="Złożone fragmenty UI budowane z atomów: toolbary tabel, panele filtrów, selecty z wyszukiwaniem, menu, paginacja, nagłówki i układy rekordów."
              href="/?path=/docs/molecules-overview--docs"
            />
          </section>

          <section id="forms" className="juz-section">
            <h2 className="mb-5 text-3xl font-extrabold">Formularze</h2>
            <FormShowcase />
          </section>

          <section id="patterns" className="juz-section">
            <DataList />
            <div className="mt-10">
              <SocialCalendar />
            </div>
            <div className="mt-10">
              <ChartShowcase />
            </div>
            <div className="mt-10">
              <ProgressLineCards />
            </div>
            <Card className="mt-10 p-6">
              <HorizontalTimeline />
            </Card>
            <Card className="mt-10 p-6">
              <Stepper />
            </Card>
          </section>

          <section id="layouts" className="juz-section">
            <h2 className="mb-5 text-3xl font-extrabold">Podgląd rekordu</h2>
            <DetailHeader />
          </section>

          <section id="screens" className="juz-section">
            <h2 className="mb-5 text-3xl font-extrabold">Screens</h2>
            <LoginScreen />
          </section>

          <section id="ai-usage" className="juz-section">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Bot className="size-6 text-primary" />
                  <CardTitle>AI Usage</CardTitle>
                </div>
                <CardDescription>
                  Instrukcja dla AI i devow, jak budowac nowe aplikacje na bazie DesignSystem.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <pre className="overflow-auto rounded-lg bg-muted p-4 font-mono text-sm leading-7 text-muted-foreground">
{`Buduj aplikacje na podstawie DesignSystem.
Używaj komponentów @juz/design-system opartych o shadcn/ui.
Nie twórz własnych kolorów, radiusów, spacingu ani buttonów.
Listy rekordów buduj przez DataList/TableLayout.
Podglądy rekordów buduj przez DetailHeader + RecordLayout.
Zachowaj WCAG AA, focus states i responsywnosc mobile/desktop.`}
                </pre>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </main>
  );
}

function TokenCard({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <Card>
      <CardHeader>
        <div className="mb-2 grid size-11 place-items-center rounded-md bg-primary-soft text-primary">
          {icon}
        </div>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{text}</CardDescription>
      </CardHeader>
    </Card>
  );
}

function CatalogEntry({ title, text, href }: { title: string; text: string; href: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-3xl">{title}</CardTitle>
        <CardDescription className="max-w-3xl text-base leading-7">{text}</CardDescription>
      </CardHeader>
      <CardContent>
        <Button asChild>
          <a href={href}>
            Otwórz katalog
            <ArrowRight />
          </a>
        </Button>
      </CardContent>
    </Card>
  );
}

createRoot(document.getElementById("root")!).render(<App />);
