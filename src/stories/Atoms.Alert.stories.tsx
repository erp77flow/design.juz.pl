import type { Meta, StoryObj } from "@storybook/react";
import { atoms, StorySpec } from "./story-parts";
const meta = {
  title: "Atoms/Alert",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: { component: `Statyczny komunikat w formie banera — używaj do informacji kontekstowych w obrębie strony (np. tryb tylko do odczytu, brak uprawnień). Do krótkich potwierdzeń akcji użyj Toast, do destrukcyjnych potwierdzeń AlertDialog.` },
    },
  },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
export const Docs: Story = { render: () => <StorySpec name="Alert" type="Atom"><atoms.Alert /></StorySpec> };
