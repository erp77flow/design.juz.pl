import type { Meta, StoryObj } from "@storybook/react";
import { ProgressLineCards } from "@/components/ds/progress-line-card";

const meta = {
  title: "Patterns/ProgressLineCard",
  component: ProgressLineCards,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen"
  }
} satisfies Meta<typeof ProgressLineCards>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Cards: Story = {
  render: () => (
    <div className="bg-background p-8">
      <ProgressLineCards />
    </div>
  )
};
