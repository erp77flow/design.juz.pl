import type { Meta, StoryObj } from "@storybook/react";
import { TypographyScale } from "@/components/ds/typography-scale";

const meta = {
  title: "Foundations/Typography",
  component: TypographyScale,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen"
  }
} satisfies Meta<typeof TypographyScale>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Scale: Story = {
  render: () => (
    <div className="bg-background p-8">
      <TypographyScale />
    </div>
  )
};
