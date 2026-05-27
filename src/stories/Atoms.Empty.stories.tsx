import type { Meta, StoryObj } from "@storybook/react";
import { atoms, StorySpec } from "./story-parts";

const meta = {
  title: "Atoms/Empty",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: { component: `Lekki, „cichy” pusty stan z ikoną, tytułem i opcjonalną akcją — używaj wewnątrz kart i sekcji, gdy lista nie ma jeszcze wyników. Dla pełnoekranowych „nic tu nie ma” sięgnij po EmptyState.` },
    },
  },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const Docs: Story = { render: () => <StorySpec name="Empty" type="Atom"><atoms.Empty /></StorySpec> };
