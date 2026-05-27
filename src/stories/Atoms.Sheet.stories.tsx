import type { Meta, StoryObj } from "@storybook/react";
import { atoms, StorySpec } from "./story-parts";

const meta = {
  title: "Atoms/Sheet",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: { component: `Panel wysuwany od krawędzi (prawo/lewo/góra/dół) — używaj dla rozszerzonych formularzy edycji bez opuszczania widoku listy i dla mobilnej nawigacji. Dla krótkich potwierdzeń wystarczy Dialog.` },
    },
  },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const Docs: Story = { render: () => <StorySpec name="Sheet" type="Atom"><atoms.Sheet /></StorySpec> };
