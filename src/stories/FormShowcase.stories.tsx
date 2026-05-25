import type { Meta, StoryObj } from "@storybook/react";
import { FormShowcase } from "@/components/ds/form-showcase";

const meta = {
  title: "Molecules/FormShowcase",
  component: FormShowcase,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen"
  }
} satisfies Meta<typeof FormShowcase>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="bg-background p-8">
      <FormShowcase />
    </div>
  )
};
