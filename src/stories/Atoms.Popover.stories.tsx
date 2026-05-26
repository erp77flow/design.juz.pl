import type { Meta, StoryObj } from "@storybook/react";
import { atoms, StorySpec } from "./story-parts";

const meta = {
  title: "Atoms/Popover",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: { component: `Lekki pływający kontener wyzwalany kliknięciem — używaj dla mini-formularzy, pickerów daty/koloru i pomocniczych paneli przy elemencie. Dla tooltipów na hover użyj Tooltip, dla pełnych menu — DropdownMenu.` },
    },
  },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const Docs: Story = { render: () => <StorySpec name="Popover" type="Atom"><atoms.Popover /></StorySpec> };
