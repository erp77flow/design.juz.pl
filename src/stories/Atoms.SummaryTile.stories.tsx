import type { Meta, StoryObj } from "@storybook/react";
import { atoms, StorySpec } from "./story-parts";

const meta = {
  title: "Atoms/SummaryTile",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: { component: `Mały kafelek na bazie Card z etykietą, wartością i opcjonalnym hintem — używaj w grupie 3-5 sztuk pod nagłówkiem rekordu (Saldo, Otwarte sprawy, Ostatnia płatność). Dla pełnoprawnych KPI z trendem — MetricCard.` },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Docs: Story = { render: () => <StorySpec name="SummaryTile" type="Atom"><atoms.SummaryTile /></StorySpec> };
