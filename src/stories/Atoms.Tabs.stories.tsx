import type { Meta, StoryObj } from "@storybook/react";
import { atoms, StorySpec } from "./story-parts";
const meta = {
  title: "Atoms/Tabs",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: { component: `Bazowe zakładki Radix — używaj w panelach ustawień, w prostych grupach widoków (Lista/Mapa). Dla zakładek rekordu z paskiem aktywnym i przewijaniem — RecordTabs, dla segmentowych przełączników — SegmentedTabs.` },
    },
  },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
export const Docs: Story = { render: () => <StorySpec name="Tabs" type="Atom"><atoms.Tabs /></StorySpec> };
