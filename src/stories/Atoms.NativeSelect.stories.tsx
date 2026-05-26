import type { Meta, StoryObj } from "@storybook/react";
import { atoms, StorySpec } from "./story-parts";

const meta = {
  title: "Atoms/NativeSelect",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: { component: `Natywny \`<select>\` opakowany do stylu juz.pl — używaj na widokach mobilnych (lepszy picker systemowy) i w prostych formularzach z 2-10 opcjami. Dla wyszukiwania w długiej liście użyj SearchableSelect.` },
    },
  },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const Docs: Story = { render: () => <StorySpec name="NativeSelect" type="Atom"><atoms.NativeSelect /></StorySpec> };
