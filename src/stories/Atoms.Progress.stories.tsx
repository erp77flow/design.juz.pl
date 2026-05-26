import type { Meta, StoryObj } from "@storybook/react";
import { atoms, StorySpec } from "./story-parts";
const meta = {
  title: "Atoms/Progress",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: { component: `Liniowy pasek postępu (0-100%) — używaj dla zadań o znanej długości (upload, import, generowanie PDF). Dla nieokreślonego czasu — Spinner; dla wielu kroków — Stepper.` },
    },
  },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
export const Docs: Story = { render: () => <StorySpec name="Progress" type="Atom"><atoms.Progress /></StorySpec> };
