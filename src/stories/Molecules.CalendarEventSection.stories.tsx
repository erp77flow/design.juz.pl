import type { Meta, StoryObj } from "@storybook/react";
import { molecules, StorySpec } from "./story-parts";
const meta = {
  title: "Molecules/CalendarEventSection",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: { component: `Pionowa kolumna kalendarza dziennego z osią godzin i kartami wydarzeń. Używaj w widoku „Plan dnia” operatora i w tygodniówce — dla widoku miesięcznego sięgnij po Calendar.` },
    },
  },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
export const Docs: Story = { render: () => <StorySpec name="CalendarEventSection" type="Molecule"><molecules.CalendarEventSection /></StorySpec> };
