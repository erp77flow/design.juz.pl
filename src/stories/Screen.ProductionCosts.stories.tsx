import type { Meta, StoryObj } from "@storybook/react";
import { ProductionCostsScreen } from "@/components/ds/production-screens";
import { ScreenPreviewFrame } from "./screen-preview-frame";

const meta = {
  title: "Screens/Production/Costs",
  component: ProductionCostsScreen,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: "Ekran analizy kosztów produkcji z KPI, wykresem kolowym i tabela kategorii."
      }
    }
  }
} satisfies Meta<typeof ProductionCostsScreen>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <ScreenPreviewFrame>
      <ProductionCostsScreen />
    </ScreenPreviewFrame>
  )
};
