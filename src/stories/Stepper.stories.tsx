import type { Meta, StoryObj } from "@storybook/react";
import { Card } from "@/components/ui/card";
import { Stepper } from "@/components/ds/stepper";

const meta = {
  title: "Patterns/Stepper",
  component: Stepper,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Pełen wzorzec wieloetapowego stepperka (kreator publikacji) — używaj dla onboardingu, kreatorów dokumentów i procesów wymagających kontekstu krok po kroku. Wrapuj w `Card` żeby oddzielić wizualnie od reszty widoku. Dla krótkich (2-3 ekranów) formularzy wystarczy `Tabs`."
      }
    }
  }
} satisfies Meta<typeof Stepper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PublicationFlow: Story = {
  render: () => (
    <div className="bg-background p-8">
      <Card className="p-6">
        <Stepper />
      </Card>
    </div>
  )
};
