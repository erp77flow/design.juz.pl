import type { Meta, StoryObj } from "@storybook/react";
import { OrderDetailScreen } from "@/components/ds/enterprise-screens";
import { ScreenPreviewFrame } from "./screen-preview-frame";

const meta = {
  title: "Screens/Orders/OrderDetail",
  component: OrderDetailScreen,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Pełny ekran rekordu zamówienia: nagłówek, meta dane, stepper, zakładki, sekcje, formularze, tabele i panel notatek."
      }
    }
  }
} satisfies Meta<typeof OrderDetailScreen>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BasicData: Story = {
  render: () => (
    <ScreenPreviewFrame>
      <OrderDetailScreen mode="basic" />
    </ScreenPreviewFrame>
  )
};

export const ShippingEdit: Story = {
  render: () => (
    <ScreenPreviewFrame>
      <OrderDetailScreen mode="shipping" />
    </ScreenPreviewFrame>
  )
};

export const Billing: Story = {
  render: () => (
    <ScreenPreviewFrame>
      <OrderDetailScreen mode="billing" />
    </ScreenPreviewFrame>
  )
};

