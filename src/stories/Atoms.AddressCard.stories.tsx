import type { Meta, StoryObj } from "@storybook/react";
import { atoms, StorySpec } from "./story-parts";

const meta = {
  title: "Atoms/AddressCard",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: { component: `Karta adresu firmy lub kontrahenta — używaj w rekordach klienta, w stopkach dokumentów (faktura, PZ) i wszędzie tam, gdzie pokazujesz dane teleadresowe razem z NIP i kontaktem. Flagę \`isPrimary\` zarezerwuj dla adresu głównego/domyślnego.` },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Docs: Story = {
  render: () => <StorySpec name="AddressCard" type="Atom"><atoms.AddressCard /></StorySpec>
};
