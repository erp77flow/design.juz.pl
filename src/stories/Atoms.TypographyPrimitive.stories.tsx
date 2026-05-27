import type { Meta, StoryObj } from "@storybook/react";
import { atoms, StorySpec } from "./story-parts";

const meta = {
  title: "Atoms/Typography",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: { component: `Atom typografii (\`h1\`-\`h6\`, \`body\`, \`lead\`, \`large\`, \`small\`, \`muted\`, \`caption\`, \`code\`) z gotowymi tokenami juz.pl. Używaj zamiast surowych klas tailwind — zachowujesz spójność wagi, leadingu i kontrastu w dark mode.` },
    },
  },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const Docs: Story = { render: () => <StorySpec name="Typography" type="Atom"><atoms.Typography /></StorySpec> };
