import type { Meta, StoryObj } from "@storybook/react";
import { atoms, StorySpec } from "./story-parts";

const meta = {
  title: "Atoms/MultiSelect",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: { component: `Select z możliwością wyboru wielu wartości, wyświetlanych jako badge w triggerze. Używaj dla tagów, kategorii, ról użytkownika — dla pojedynczego wyboru sięgnij po Select lub SearchableSelect.` },
    },
  },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const Docs: Story = {
  render: () => (
    <StorySpec name="MultiSelect" type="Atom">
      <atoms.MultiSelect />
    </StorySpec>
  )
};
