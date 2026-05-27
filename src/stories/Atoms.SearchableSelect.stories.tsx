import type { Meta, StoryObj } from "@storybook/react";
import { atoms, StorySpec } from "./story-parts";

const meta = {
  title: "Atoms/SearchableSelect",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: { component: `Select z polem wyszukiwania pod popoverem — używaj dla list 10+ opcji (klienci, produkty, użytkownicy). Dla wielokrotnego wyboru sięgnij po MultiSelect.` },
    },
  },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const Docs: Story = {
  render: () => (
    <StorySpec name="SearchableSelect" type="Atom">
      <atoms.SearchableSelect />
    </StorySpec>
  )
};
