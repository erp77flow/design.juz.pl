import type { Meta, StoryObj } from "@storybook/react";
import { molecules, StorySpec } from "./story-parts";
const meta = {
  title: "Molecules/BasicMenuItem",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: { component: `Pojedynczy wiersz menu z ikoną, tekstem i opcjonalnym skrótem klawiaturowym. Klocek do budowy DropdownMenu, ContextMenu i palety komend — rzadko używasz go bezpośrednio.` },
    },
  },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
export const Docs: Story = { render: () => <StorySpec name="BasicMenuItem" type="Molecule"><molecules.BasicMenuItem /></StorySpec> };
