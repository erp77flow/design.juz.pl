import type { Meta, StoryObj } from "@storybook/react";
import { atoms, StorySpec } from "./story-parts";

const meta = {
  title: "Atoms/DonutChart",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: { component: `Wykres kołowy z dziurką w środku — używaj dla rozbicia procentowego (udział kanałów, struktura kosztów). Maksymalnie 5-7 segmentów, więcej staje się nieczytelne — wtedy rozważ BarChart.` },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Docs: Story = { render: () => <StorySpec name="DonutChart" type="Atom"><atoms.DonutChart /></StorySpec> };
