import type { Meta, StoryObj } from "@storybook/react";
import { CrmPhoneScreen } from "@/components/ds/production-screens";
import { ScreenPreviewFrame } from "./screen-preview-frame";

const meta = {
  title: "Screens/CRM/Phone",
  component: CrmPhoneScreen,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: "Widok rozmowy telefonicznej z kontekstem klienta i aktywnymi zleceniami."
      }
    }
  }
} satisfies Meta<typeof CrmPhoneScreen>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <ScreenPreviewFrame>
      <CrmPhoneScreen />
    </ScreenPreviewFrame>
  )
};
