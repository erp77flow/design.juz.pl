import type { Meta, StoryObj } from "@storybook/react";
import { ChartShowcase } from "@/components/ds/chart-showcase";

const meta = {
  title: "Patterns/Charts",
  component: ChartShowcase,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Galeria wszystkich wykresów (Bar, Line, Donut, Composed) z presetami juz.pl — używaj jako referencji wyboru typu wykresu pod konkretne dane: trend w czasie → Line, porównanie kategorii → Bar, udział procentowy → Donut."
      }
    }
  }
} satisfies Meta<typeof ChartShowcase>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Analytics: Story = {
  render: () => (
    <div className="bg-background p-8">
      <ChartShowcase />
    </div>
  )
};
