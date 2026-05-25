import type { Meta, StoryObj } from "@storybook/react";
import { Collapsible } from "@/components/ui/collapsible";
import { atoms, StoryCanvas, StorySpec } from "./story-parts";

const meta = {
  title: "Atoms/Collapsible",
  component: Collapsible,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen"
  },
  argTypes: {
    trigger: { control: "text", description: "Widoczny nagłówek/trigger sekcji." },
    children: { control: "text", description: "Zawartość rozwijanej sekcji." },
    defaultOpen: { control: "boolean", description: "Domyślny stan otwarcia dla wariantu uncontrolled." },
    open: { control: "boolean", description: "Kontrolowany stan otwarcia." },
    disabled: { control: "boolean", description: "Blokada rozwijania sekcji." },
    onOpenChange: { action: "open changed", description: "Callback po zmianie stanu." }
  }
} satisfies Meta<typeof Collapsible>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Docs: Story = {
  args: {
    trigger: "Zaawansowane ustawienia linii",
    children: "Limity serii, priorytet i rezerwacja stanowiska.",
    defaultOpen: true,
    disabled: false
  },
  render: () => <StorySpec name="Collapsible" type="Atom"><atoms.Collapsible /></StorySpec>
};

export const Group: Story = {
  args: {
    trigger: "Dane publikacji",
    children: "Kanał, data publikacji, kampania i klient.",
    defaultOpen: true,
    disabled: false
  },
  render: () => (
    <StoryCanvas>
      <div className="max-w-2xl space-y-3">
        <Collapsible defaultOpen trigger="Dane publikacji">
          Kanał, data publikacji, kampania i klient.
        </Collapsible>
        <Collapsible trigger="Ustawienia UTM">
          Parametry kampanii, medium, source i content.
        </Collapsible>
        <Collapsible disabled trigger="Sekcja zablokowana">
          Ta sekcja jest niedostępna dla obecnej roli.
        </Collapsible>
      </div>
    </StoryCanvas>
  )
};
