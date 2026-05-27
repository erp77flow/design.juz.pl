import type { Meta, StoryObj } from "@storybook/react";
import { atoms, StorySpec } from "./story-parts";

const meta = {
  title: "Atoms/BarChart",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: { component: `Wykres słupkowy do porównań kategorii (sprzedaż per miesiąc, obciążenie linii). Bazuje na tokenach juz.pl i recharts — używaj w dashboardach i raportach. Dla relacji czasowych z trendem rozważ LineChart.` },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Docs: Story = { render: () => <StorySpec name="BarChart" type="Atom"><atoms.BarChart /></StorySpec> };
