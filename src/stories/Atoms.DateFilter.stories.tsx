import type { Meta, StoryObj } from "@storybook/react";
import { atoms, StorySpec } from "./story-parts";

const meta = {
  title: "Atoms/DateFilter",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Pole daty do filtrowania list: input z ikoną kalendarza, popover miesiąca i akcje Wyczyść/Dzisiaj."
      }
    }
  }
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Docs: Story = {
  render: () => (
    <StorySpec name="DateFilter" type="Atom">
      <atoms.DateFilter />
    </StorySpec>
  )
};

