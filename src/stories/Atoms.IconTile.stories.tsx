import type { Meta, StoryObj } from "@storybook/react";
import { atoms, StorySpec } from "./story-parts";

const meta = {
  title: "Atoms/IconTile",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: { component: `Kolorowy kafelek z ikoną używany jako wizualny akcent (lewa strona MetaTile, MetricCard, listy kategorii). Ton (\`primary/success/warning/destructive/muted\`) ma znaczenie semantyczne — nie używaj go tylko dekoracyjnie.` },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Docs: Story = {
  render: () => <StorySpec name="IconTile" type="Atom"><atoms.IconTile /></StorySpec>
};
