import type { Meta, StoryObj } from "@storybook/react";
import { atoms, StorySpec } from "./story-parts";

const meta = {
  title: "Atoms/DateRangeInput",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: { component: `Input z popoverem do wyboru zakresu dat (od–do). Używaj w panelu filtrów listy, w raportach i w formularzach urlopów/rezerwacji. Dla jednej daty użyj DatePicker.` },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Docs: Story = {
  render: () => <StorySpec name="DateRangeInput" type="Atom"><atoms.DateRangeInput /></StorySpec>
};
