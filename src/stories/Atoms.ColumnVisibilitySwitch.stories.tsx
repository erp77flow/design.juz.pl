import type { Meta, StoryObj } from "@storybook/react";
import { atoms, StorySpec } from "./story-parts";

const meta = {
  title: "Atoms/ColumnVisibilitySwitch",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: { component: `Przełącznik kolumn tabeli w toolbarze listy. Używaj w \`DataTableToolbar\` razem z \`ColumnManagerPanel\` — daje użytkownikom kontrolę nad tym, co widzą bez konieczności otwierania ustawień.` },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Docs: Story = {
  render: () => <StorySpec name="ColumnVisibilitySwitch" type="Atom"><atoms.ColumnVisibilitySwitch /></StorySpec>
};
