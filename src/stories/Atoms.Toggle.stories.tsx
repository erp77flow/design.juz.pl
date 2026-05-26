import type { Meta, StoryObj } from "@storybook/react";
import { atoms, StorySpec } from "./story-parts";

const meta = {
  title: "Atoms/Toggle",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: { component: `Pojedynczy przycisk-przełącznik (bold/italic w edytorze, tryb edycji w tabeli). Dla grupy powiązanych przełączników użyj ToggleGroup, dla ustawień on/off w formularzu — Switch.` },
    },
  },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const Docs: Story = { render: () => <StorySpec name="Toggle" type="Atom"><atoms.Toggle /></StorySpec> };
