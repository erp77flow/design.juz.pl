import type { Meta, StoryObj } from "@storybook/react";
import { NewClientPattern } from "@/components/ds/new-client";
import { ScreenPreviewFrame } from "./screen-preview-frame";

const meta = {
  title: "Screens/Records/NewClient",
  component: NewClientPattern,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Wzorzec dodawania rekordu firmy: header ze szkicem i akcją zapisu, lewy spis sekcji, sekcja Dane firmy w trybie podgląd/edycja, adresy wysyłki (lista, edytor, domyślny), sekcja handlowa, dane rejestrowe z GUS/VIES, KSeF, role i typ firmy oraz prawy panel z mapą i podsumowaniem walidacji."
      }
    }
  }
} satisfies Meta<typeof NewClientPattern>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <ScreenPreviewFrame>
      <NewClientPattern />
    </ScreenPreviewFrame>
  )
};
