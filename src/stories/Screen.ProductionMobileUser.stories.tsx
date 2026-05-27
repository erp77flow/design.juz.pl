import type { Meta, StoryObj } from "@storybook/react";
import { ProductionMobileUserScreen } from "@/components/ds/production-screens";
import { ScreenPreviewFrame } from "./screen-preview-frame";

const meta = {
  title: "Screens/Production/MobileUser",
  component: ProductionMobileUserScreen,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: "Wersja mobilna konta użytkownika produkcji: kolejka zadań, karta pracy, status etapu i komunikacja."
      }
    }
  }
} satisfies Meta<typeof ProductionMobileUserScreen>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Mobile: Story = {
  render: () => (
    <ScreenPreviewFrame>
      <ProductionMobileUserScreen />
    </ScreenPreviewFrame>
  )
};
