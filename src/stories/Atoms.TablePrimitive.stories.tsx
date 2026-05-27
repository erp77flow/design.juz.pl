import type { Meta, StoryObj } from "@storybook/react";
import { atoms, StorySpec } from "./story-parts";

const meta = {
  title: "Atoms/TablePrimitive",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: { component: `Niskopoziomowy zestaw \`<table>/<thead>/<tbody>\` ze stylem juz.pl — używaj do prostych statycznych tabel. Dla list z sortowaniem, filtrami i paginacją sięgnij po \`Molecules/Table\` lub \`DataTablePattern\`.` },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Docs: Story = { render: () => <StorySpec name="TablePrimitive" type="Atom"><atoms.TablePrimitive /></StorySpec> };
