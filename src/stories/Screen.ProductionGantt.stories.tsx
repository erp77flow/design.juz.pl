import type { Meta, StoryObj } from "@storybook/react";
import { ProductionGanttScreen } from "@/components/ds/production-screens";
import { ScreenPreviewFrame } from "./screen-preview-frame";

const meta = {
  title: "Screens/Production/Gantt",
  component: ProductionGanttScreen,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: "Tygodniowy Gantt maszyn/stanowisk z paskami złeceń opartymi o tokeny DS."
      }
    }
  }
} satisfies Meta<typeof ProductionGanttScreen>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <ScreenPreviewFrame>
      <ProductionGanttScreen />
    </ScreenPreviewFrame>
  )
};
