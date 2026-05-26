import type { Meta, StoryObj } from "@storybook/react";
import { molecules, StorySpec } from "./story-parts";
const meta = {
  title: "Molecules/Table",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: { component: `Tabela danych z nagłówkiem, wierszami, paskiem hover i zebrą — używaj jako bazę dla list rekordów. Dla zaawansowanych funkcji (sortowanie, filtry, paginacja, zarządca kolumn) opakuj w \`DataTableToolbar\` + \`Pagination\` lub użyj \`DataTablePattern\`.` },
    },
  },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
export const Docs: Story = { render: () => <StorySpec name="Table" type="Molecule"><molecules.Table /></StorySpec> };
