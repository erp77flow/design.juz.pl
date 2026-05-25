import type { Meta, StoryObj } from "@storybook/react";
import { Card } from "@/components/ui/card";
import { HorizontalTimeline, PlainTimeline, VerticalTimeline } from "@/components/ds/timeline";

const meta = {
  title: "Patterns/Timeline",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen"
  }
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  render: () => (
    <div className="bg-background p-8">
      <Card className="p-6">
        <HorizontalTimeline />
      </Card>
    </div>
  )
};

export const Vertical: Story = {
  render: () => (
    <div className="max-w-xl bg-background p-8">
      <Card className="p-6">
        <VerticalTimeline />
      </Card>
    </div>
  )
};

export const PlainHistory: Story = {
  name: "Plain history",
  render: () => (
    <div className="max-w-xl bg-background p-8">
      <Card className="p-6">
        <PlainTimeline
          items={[
            { title: "Telefon: potwierdzono termin produkcji.", meta: "24.05.2026 · Monika Kamińska" },
            { title: "Email: przesłano plik etykiety.", meta: "24.05.2026 · Monika Kamińska" },
            { title: "Notatka: klient zaakceptował próbkę.", meta: "24.05.2026 · Monika Kamińska" }
          ]}
        />
      </Card>
    </div>
  )
};
