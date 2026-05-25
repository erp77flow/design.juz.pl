import type { Meta, StoryObj } from "@storybook/react";
import { Card } from "@/components/ui/card";
import { Stepper } from "@/components/ds/stepper";

const meta = {
  title: "Patterns/Stepper",
  component: Stepper,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen"
  }
} satisfies Meta<typeof Stepper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PublicationFlow: Story = {
  render: () => (
    <div className="bg-background p-8">
      <Card className="p-6">
        <Stepper />
      </Card>
    </div>
  )
};
