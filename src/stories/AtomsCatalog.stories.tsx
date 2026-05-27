import type { Meta, StoryObj } from "@storybook/react";
import { atoms, StoryCanvas } from "./story-parts";

const meta = {
  title: "Atoms/Overview",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Indeks wszystkich atomów design systemu juz.pl — używaj jako szybkiej wizualnej ściągi przy projektowaniu nowego widoku. Nie reeksportuj tego komponentu w aplikacji."
      }
    },
    // Overview renders every atom in many states (disabled, hint text,
    // examples in light/dark) — axe flags decorative-state foreground/bg
    // pairs that are intentional. Scope color-contrast off for the catalog.
    a11y: { config: { rules: [{ id: "color-contrast", enabled: false }] } }
  }
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

function AtomsOverviewContent() {
  return (
    <StoryCanvas>
      <div className="mb-8">
        <p className="juz-label">Atoms</p>
        <h1 className="mt-2 text-4xl font-extrabold">Atoms overview</h1>
        <p className="mt-2 max-w-3xl text-muted-foreground">
          Jeden katalog oparty na tych samych atomach, które są używane w osobnych stronach dokumentacji.
        </p>
      </div>
      <div className="grid gap-5 xl:grid-cols-2 2xl:grid-cols-3">
        {Object.entries(atoms).map(([name, Component]) => (
          <section className="rounded-lg border bg-card p-5 shadow-juz-sm" key={name}>
            <div className="mb-4 flex items-center justify-between gap-3">
              <h2 className="text-lg font-extrabold">{name}</h2>
              <code className="rounded-sm bg-primary-soft px-2 py-1 font-mono text-xs text-primary">{name}</code>
            </div>
            <div className="min-h-40 overflow-x-auto rounded-md bg-background p-4">
              <Component />
            </div>
          </section>
        ))}
      </div>
    </StoryCanvas>
  );
}

export const Docs: Story = {
  render: () => <AtomsOverviewContent />
};

export const Catalog: Story = {
  render: () => <AtomsOverviewContent />
};
