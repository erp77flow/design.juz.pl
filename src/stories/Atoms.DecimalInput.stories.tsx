import type { Meta, StoryObj } from "@storybook/react";
import { atoms, StorySpec } from "./story-parts";
const meta = {
  title: "Atoms/DecimalInput",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: { component: `Input do liczb dziesiętnych z polską lokalizacją (separator dziesiętny przecinek, tysiące spacją) i opcjonalnym prefiksem/sufiksem. Używaj dla cen, wag, ilości — nie używaj zwykłego \`<Input type="number">\`, bo łamie formatowanie PL.` },
    },
  },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
export const Docs: Story = { render: () => <StorySpec name="DecimalInput" type="Atom"><atoms.DecimalInput /></StorySpec> };
