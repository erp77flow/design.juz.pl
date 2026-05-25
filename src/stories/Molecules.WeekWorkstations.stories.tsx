import type { Meta, StoryObj } from "@storybook/react";
import { molecules, StorySpec } from "./story-parts";

const meta = { title: "Molecules/WeekWorkstations", tags: ["autodocs"] } satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Docs: Story = {
  render: () => (
    <StorySpec name="WeekWorkstations" type="Molecule">
      <molecules.WeekWorkstations />
    </StorySpec>
  )
};
