import type { Meta, StoryObj } from "@storybook/react";
import { atoms, StorySpec } from "./story-parts";

const meta = {
  title: "Atoms/Separator",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: { component: `Cienka linia rozdzielająca treść — używaj w menu, listach i panelach. Domyślnie pozioma; \`orientation="vertical"\` w toolbarach między grupami przycisków.` },
    },
  },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const Docs: Story = { render: () => <StorySpec name="Separator" type="Atom"><atoms.Separator /></StorySpec> };
