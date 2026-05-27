import type { Meta, StoryObj } from "@storybook/react";
import { molecules, StorySpec } from "./story-parts";
const meta = {
  title: "Molecules/Autocomplete",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: { component: `Input z podpowiedziami pod spodem zwracanymi z API w trakcie pisania. Używaj dla pól, gdzie wartość pochodzi ze słownika (kontrahent, produkt, adres). Dla statycznej krótkiej listy — SearchableSelect.` },
    },
  },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
export const Docs: Story = { render: () => <StorySpec name="Autocomplete" type="Molecule"><molecules.Autocomplete /></StorySpec> };
