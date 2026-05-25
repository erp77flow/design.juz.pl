import type { Meta, StoryObj } from "@storybook/react";
import { SocialCalendar } from "@/components/ds/social-calendar";
import { ScreenPreviewFrame } from "./screen-preview-frame";

const meta = {
  title: "Patterns/SocialCalendar",
  component: SocialCalendar,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen"
  }
} satisfies Meta<typeof SocialCalendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Month: Story = {
  render: () => (
    <ScreenPreviewFrame>
      <SocialCalendar />
    </ScreenPreviewFrame>
  )
};
