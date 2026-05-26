import type { Meta, StoryObj } from "@storybook/react";
import { molecules, StorySpec } from "./story-parts";
const meta = {
  title: "Molecules/ModeToggle",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: { component: `Przełącznik trybu jasny/ciemny — używaj w \`ProfileMenu\` lub w stopce nawigacji. Zapisuje preferencję w \`localStorage\` i respektuje \`prefers-color-scheme\` przy pierwszym wejściu.` },
    },
  },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
export const Docs: Story = { render: () => <StorySpec name="ModeToggle" type="Molecule"><molecules.ModeToggle /></StorySpec> };
