import type { Meta, StoryObj } from "@storybook/react";
import { CompanyRecordScreen } from "@/components/ds/enterprise-screens";
import { ScreenPreviewFrame } from "./screen-preview-frame";

const meta = {
  title: "Screens/Dictionary/CompanyRecord",
  component: CompanyRecordScreen,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Ekran podgladu i edycji firmy: boczne menu, zakladki rekordu, karta formularza i pola slownikowe."
      }
    }
  }
} satisfies Meta<typeof CompanyRecordScreen>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <ScreenPreviewFrame>
      <CompanyRecordScreen />
    </ScreenPreviewFrame>
  )
};

