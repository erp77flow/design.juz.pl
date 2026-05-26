import type { Meta, StoryObj } from "@storybook/react";
import { atoms, StorySpec } from "./story-parts";

const meta = {
  title: "Atoms/ButtonGroup",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: { component: `Zlepiona grupa przycisków do akcji powiązanych ze sobą (segmentowany toggle widoków, paginacja stronami, eksport w kilku formatach). Dla pojedynczych przełączników widoku rozważ Tabs lub SegmentedTabs.` },
    },
  },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const Docs: Story = { render: () => <StorySpec name="ButtonGroup" type="Atom"><atoms.ButtonGroup /></StorySpec> };
