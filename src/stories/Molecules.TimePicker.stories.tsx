import type { Meta, StoryObj } from "@storybook/react";
import { molecules, StorySpec } from "./story-parts";
const meta = {
  title: "Molecules/TimePicker",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: { component: `Picker godziny z popoverem i listą interwałów (15/30/60 min). Używaj w formularzach rezerwacji i planowania wizyt — szybszy w obsłudze niż wpisywanie ręczne w TimeInput.` },
    },
  },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
export const Docs: Story = { render: () => <StorySpec name="TimePicker" type="Molecule"><molecules.TimePicker /></StorySpec> };
