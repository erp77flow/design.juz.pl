import type { Meta, StoryObj } from "@storybook/react";
import { ClientDetailPattern } from "@/components/ds/client-detail";
import { ScreenPreviewFrame } from "./screen-preview-frame";

const meta = {
  title: "Screens/Records/ClientDetail",
  component: ClientDetailPattern,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Wzorzec podglądu rekordu klienta Klient testowy S.A.: header firmy, KPI, zakładki, lewy spis sekcji, pola danych i prawy panel pomocniczy."
      }
    }
  }
} satisfies Meta<typeof ClientDetailPattern>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <ScreenPreviewFrame>
      <ClientDetailPattern />
    </ScreenPreviewFrame>
  )
};
