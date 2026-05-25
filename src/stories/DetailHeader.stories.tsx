import type { Meta, StoryObj } from "@storybook/react";
import { DetailHeader } from "@/components/ds/detail-header";
import { ScreenPreviewFrame } from "./screen-preview-frame";

const meta = {
  title: "Layouts/DetailHeader",
  component: DetailHeader,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen"
  }
} satisfies Meta<typeof DetailHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LinkPreview: Story = {
  render: () => (
    <ScreenPreviewFrame>
      <DetailHeader />
    </ScreenPreviewFrame>
  )
};
