import type { Meta, StoryObj } from "@storybook/react";
import { atoms, StorySpec } from "./story-parts";

const meta = {
  title: "Atoms/PhoneFrame",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: { component: `Ramka telefonu (iPhone lub Android) do prezentacji mobilnych ekranów w Storybooku i materiałach. Czysto wizualne — nie wpływa na responsive breakpointy zawartości.` },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Docs: Story = {
  render: () => <StorySpec name="PhoneFrame" type="Atom"><atoms.PhoneFrame /></StorySpec>
};
