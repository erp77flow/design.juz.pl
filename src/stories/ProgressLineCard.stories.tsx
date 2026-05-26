import type { Meta, StoryObj } from "@storybook/react";
import { ProgressLineCards } from "@/components/ds/progress-line-card";

const meta = {
  title: "Patterns/ProgressLineCard",
  component: ProgressLineCards,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Karta linii produkcyjnej z paskiem postępu, godzinami i statusem zadania — używaj w dashboardach produkcyjnych i w widokach operatora. Dla pustej linii (brak aktywnego zlecenia) pokazuj inny pusty stan, sam ProgressLineCard zakłada aktywne zadanie."
      }
    }
  }
} satisfies Meta<typeof ProgressLineCards>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Cards: Story = {
  render: () => (
    <div className="bg-background p-8">
      <ProgressLineCards />
    </div>
  )
};
