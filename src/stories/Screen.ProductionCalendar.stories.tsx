import type { Meta, StoryObj } from "@storybook/react";
import { ProductionCalendarScreen } from "@/components/ds/production-screens";
import { ScreenPreviewFrame } from "./screen-preview-frame";

const meta = {
  title: "Screens/Production/Calendar",
  component: ProductionCalendarScreen,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Pełny ekran kalendarza produkcji Długopis S.A. z osiami czasu, obciążeniem stanowisk i kartami złeceń."
      }
    }
  }
} satisfies Meta<typeof ProductionCalendarScreen>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <ScreenPreviewFrame>
      <ProductionCalendarScreen />
    </ScreenPreviewFrame>
  )
};
