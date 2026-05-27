import type { Meta, StoryObj } from "@storybook/react";
import { TokenShowcase } from "@/components/ds/token-showcase";

const meta = {
  title: "Foundations/Tokens",
  component: TokenShowcase,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Tokeny i fundamenty design systemu — kolory, typografia, spacing, cienie, radii. Pierwszy przystanek przy onboardingu projektanta/dewelopera do DS juz.pl; w aplikacji nigdy nie używaj wartości hex bezpośrednio, tylko nazwane tokeny."
      }
    }
  }
} satisfies Meta<typeof TokenShowcase>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Tokens: Story = {
  render: () => (
    <div className="bg-background p-8">
      <TokenShowcase />
    </div>
  )
};
