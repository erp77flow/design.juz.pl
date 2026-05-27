import type { Meta, StoryObj } from "@storybook/react";
import { ProductionOrdersListPattern } from "@/components/ds/production-orders-list";
import { ScreenPreviewFrame } from "./screen-preview-frame";

const meta = {
  title: "Screens/Orders/ProductionOrdersList",
  component: ProductionOrdersListPattern,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Wzorzec listy produkcyjnej dla Klient testowy S.A.: filtrowanie, sortowanie po nagłówkach, ukrywanie kolumn i boczny panel podglądu."
      }
    }
  }
} satisfies Meta<typeof ProductionOrdersListPattern>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <ScreenPreviewFrame>
      <ProductionOrdersListPattern />
    </ScreenPreviewFrame>
  )
};
