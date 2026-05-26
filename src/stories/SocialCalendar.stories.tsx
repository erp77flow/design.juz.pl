import type { Meta, StoryObj } from "@storybook/react";
import { SocialCalendar } from "@/components/ds/social-calendar";
import { ScreenPreviewFrame } from "./screen-preview-frame";

const meta = {
  title: "Patterns/SocialCalendar",
  component: SocialCalendar,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Kalendarz publikacji w social mediach z kafelkami postów per kanał (FB, IG, LI, TT) — wzorzec do zaadaptowania pod konkretną listę kanałów zespołu. Używaj jako referencji dla widoków marketingu/PR, nie jako gotowego komponentu produkcyjnego."
      }
    }
  }
} satisfies Meta<typeof SocialCalendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Month: Story = {
  render: () => (
    <ScreenPreviewFrame>
      <SocialCalendar />
    </ScreenPreviewFrame>
  )
};
