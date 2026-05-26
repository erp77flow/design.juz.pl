import type { Meta, StoryObj } from "@storybook/react";
import { atoms, StorySpec } from "./story-parts";

const meta = {
  title: "Atoms/LineChart",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: { component: `Wykres liniowy do trendów w czasie (sprzedaż dzienna, obciążenie maszyny, czas realizacji). Dla porównań kategorii bez osi czasu użyj BarChart.` },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Docs: Story = { render: () => <StorySpec name="LineChart" type="Atom"><atoms.LineChart /></StorySpec> };
