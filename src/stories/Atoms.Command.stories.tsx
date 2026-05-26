import type { Meta, StoryObj } from "@storybook/react";
import { atoms, StorySpec } from "./story-parts";
const meta = {
  title: "Atoms/Command",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: { component: `Bazowa palet komend (cmd+k) z polem wyszukiwania, grupami i pustym stanem. Sam Command rzadko renderujemy bezpośrednio — używamy go pod spodem w Combobox, SearchableSelect i MultiSelect.` },
    },
  },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
export const Docs: Story = { render: () => <StorySpec name="Command" type="Atom"><atoms.Command /></StorySpec> };
