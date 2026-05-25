import type { Meta, StoryObj } from "@storybook/react";
import { EmailTemplateScreen } from "@/components/ds/enterprise-screens";
import { ScreenPreviewFrame } from "./screen-preview-frame";

const meta = {
  title: "Screens/Content/EmailTemplate",
  component: EmailTemplateScreen,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Ekran edycji szablonu wiadomości z polami formularza, akcjami i panelem zmiennych."
      }
    }
  }
} satisfies Meta<typeof EmailTemplateScreen>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <ScreenPreviewFrame>
      <EmailTemplateScreen />
    </ScreenPreviewFrame>
  )
};

