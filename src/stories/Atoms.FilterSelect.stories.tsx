import type { Meta, StoryObj } from "@storybook/react";
import { atoms, StorySpec } from "./story-parts";

const meta = {
  title: "Atoms/FilterSelect",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Wielokrotny select do filtrowania tabel: trigger, lista opcji z checkboxami, focus ring-3 i stan wybranych wartości."
      }
    }
  }
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Docs: Story = {
  render: () => (
    <StorySpec name="FilterSelect" type="Atom">
      <atoms.FilterSelect />
    </StorySpec>
  )
};

