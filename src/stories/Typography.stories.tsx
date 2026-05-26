import type { Meta, StoryObj } from "@storybook/react";
import { TypographyScale } from "@/components/ds/typography-scale";

const meta = {
  title: "Foundations/Typography",
  component: TypographyScale,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Pełna skala typograficzna juz.pl (od `h1` do `caption`) z przykładami użycia — punkt odniesienia przy projektowaniu nowych nagłówków i bloków treści. W produkcji używaj komponentu `Typography` lub klas tailwind opartych na tokenach, nie hardkoduj rozmiarów."
      }
    }
  }
} satisfies Meta<typeof TypographyScale>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Scale: Story = {
  render: () => (
    <div className="bg-background p-8">
      <TypographyScale />
    </div>
  )
};
