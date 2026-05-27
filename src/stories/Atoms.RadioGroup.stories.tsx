import type { Meta, StoryObj } from "@storybook/react";
import { atoms, StorySpec } from "./story-parts";

const meta = {
  title: "Atoms/RadioGroup",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: { component: `Grupa wzajemnie wykluczających się opcji (wybór jednej wartości). Używaj dla 2-6 opcji widocznych jednocześnie — przy większej liczbie lepszy Select.` },
    },
  },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const Docs: Story = { render: () => <StorySpec name="RadioGroup" type="Atom"><atoms.RadioGroup /></StorySpec> };
