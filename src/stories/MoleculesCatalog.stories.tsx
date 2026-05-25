import type { Meta, StoryObj } from "@storybook/react";
import { molecules, StoryCanvas } from "./story-parts";

const meta = {
  title: "Molecules/Overview",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen"
  }
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

function MoleculesOverviewContent() {
  return (
    <StoryCanvas>
      <div className="mb-8">
        <p className="juz-label">Molecules</p>
        <h1 className="mt-2 text-4xl font-extrabold">Molecules overview</h1>
        <p className="mt-2 max-w-3xl text-muted-foreground">
          Przeglad molekul renderowany z tych samych komponentów, które mają osobne strony dokumentacji.
        </p>
      </div>
      <div className="grid gap-5 xl:grid-cols-2 2xl:grid-cols-3">
        {Object.entries(molecules).map(([name, Component]) => (
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
  render: () => <MoleculesOverviewContent />
};

export const Catalog: Story = {
  render: () => <MoleculesOverviewContent />
};
