import type { Meta, StoryObj } from "@storybook/react";
import { atoms, StorySpec } from "./story-parts";

const meta = {
  title: "Atoms/PageSizeControl",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: { component: `Mini-select „Wyświetl X na stronie” — używaj w stopce każdej dużej tabeli razem z Pagination. Domyślne opcje 10/25/50/100, ale dostosuj do specyfiki danych.` },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Docs: Story = {
  render: () => <StorySpec name="PageSizeControl" type="Atom"><atoms.PageSizeControl /></StorySpec>
};
