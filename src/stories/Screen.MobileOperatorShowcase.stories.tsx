import type { Meta, StoryObj } from "@storybook/react";
import { MobileOperatorShowcase } from "@/components/ds/enterprise-screens";
import { ScreenPreviewFrame } from "./screen-preview-frame";

const meta = {
  title: "Screens/Mobile/OperatorShowcase",
  component: MobileOperatorShowcase,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Mobilne ekrany produkcyjne: kolejka, karta zadańia i czat w telefonach, oparte o tokeny juz.pl."
      }
    }
  }
} satisfies Meta<typeof MobileOperatorShowcase>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <ScreenPreviewFrame>
      <MobileOperatorShowcase />
    </ScreenPreviewFrame>
  )
};
