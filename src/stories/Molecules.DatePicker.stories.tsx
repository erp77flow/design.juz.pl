import type { Meta, StoryObj } from "@storybook/react";
import { molecules, StorySpec } from "./story-parts";
const meta = {
  title: "Molecules/DatePicker",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: { component: `Input z popoverem do wyboru jednej daty — używaj w formularzach (data realizacji, termin płatności). Dla zakresu — DateRangeInput, dla filtrowania tabeli — DateFilter.` },
    },
  },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
export const Docs: Story = { render: () => <StorySpec name="DatePicker" type="Molecule"><molecules.DatePicker /></StorySpec> };
