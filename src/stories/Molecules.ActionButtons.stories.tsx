import type { Meta, StoryObj } from "@storybook/react";
import { molecules, StorySpec } from "./story-parts";
const meta = {
  title: "Molecules/ActionButtons",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: { component: `Spójna grupa akcji wiersza (\`Edytuj\`, \`Usuń\`, \`Podgląd\`) renderowana jako IconActionButton z Tooltipami. Używaj w prawej kolumnie tabel i w nagłówkach kart rekordu zamiast luźnych przycisków.` },
    },
  },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
export const Docs: Story = { render: () => <StorySpec name="ActionButtons" type="Molecule"><molecules.ActionButtons /></StorySpec> };
