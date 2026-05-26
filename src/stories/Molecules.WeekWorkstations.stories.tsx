import type { Meta, StoryObj } from "@storybook/react";
import { molecules, StorySpec } from "./story-parts";

const meta = {
  title: "Molecules/WeekWorkstations",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: { component: `Widok siatki tygodniowej dla wielu stanowisk produkcyjnych — używaj w ekranach planowania produkcji (Gantt, harmonogram operatora). Dla pojedynczego dnia/kolumny — CalendarEventSection.` },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Docs: Story = {
  render: () => (
    <StorySpec name="WeekWorkstations" type="Molecule">
      <molecules.WeekWorkstations />
    </StorySpec>
  )
};
