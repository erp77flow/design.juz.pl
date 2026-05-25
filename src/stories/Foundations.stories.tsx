import type { Meta, StoryObj } from "@storybook/react";
import { TokenShowcase } from "@/components/ds/token-showcase";

const meta = {
  title: "Foundations/Tokens",
  component: TokenShowcase,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen"
  }
} satisfies Meta<typeof TokenShowcase>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Tokens: Story = {
  render: () => (
    <div className="bg-background p-8">
      <TokenShowcase />
    </div>
  )
};
