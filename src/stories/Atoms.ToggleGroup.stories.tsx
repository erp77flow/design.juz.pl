import type { Meta, StoryObj } from "@storybook/react";
import { atoms, StorySpec } from "./story-parts";

const meta = {
  title: "Atoms/ToggleGroup",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: { component: `Grupa Toggle z trybem \`single\` (jak radio) lub \`multiple\` (jak checkboxy). Używaj w toolbarach edytora i jako szybki filtr widoków — dla pełnoprawnej nawigacji zakładkami wybierz Tabs.` },
    },
  },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const Docs: Story = { render: () => <StorySpec name="ToggleGroup" type="Atom"><atoms.ToggleGroup /></StorySpec> };
