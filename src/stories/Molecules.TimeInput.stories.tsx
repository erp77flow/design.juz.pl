import type { Meta, StoryObj } from "@storybook/react";
import { molecules, StorySpec } from "./story-parts";
const meta = {
  title: "Molecules/TimeInput",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: { component: `Input do godziny w formacie 24h z maską \`HH:MM\`. Używaj w formularzach harmonogramu (godziny otwarcia, czas realizacji). Dla wyboru z dropdownu — TimePicker.` },
    },
  },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
export const Docs: Story = { render: () => <StorySpec name="TimeInput" type="Molecule"><molecules.TimeInput /></StorySpec> };
