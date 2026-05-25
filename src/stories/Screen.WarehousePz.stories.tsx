import type { Meta, StoryObj } from "@storybook/react";
import { WarehousePzDocumentScreen } from "@/components/ds/production-screens";
import { ScreenPreviewFrame } from "./screen-preview-frame";

const meta = {
  title: "Screens/Warehouse/PZDocument",
  component: WarehousePzDocumentScreen,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: "Dokument PZ: formularz, sekcje, tabela pozycji i podsumowanie rozliczenia."
      }
    }
  }
} satisfies Meta<typeof WarehousePzDocumentScreen>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <ScreenPreviewFrame>
      <WarehousePzDocumentScreen />
    </ScreenPreviewFrame>
  )
};
