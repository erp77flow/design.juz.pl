import type { Meta, StoryObj } from "@storybook/react";
import { atoms, StorySpec } from "./story-parts";

const meta = {
  title: "Atoms/Slider",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: { component: `Suwak do wyboru wartości z zakresu (procenty, opacity, wagi). Używaj kiedy dokładność nie jest krytyczna; dla precyzyjnych liczb daj DecimalInput, najlepiej obok.` },
    },
  },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const Docs: Story = { render: () => <StorySpec name="Slider" type="Atom"><atoms.Slider /></StorySpec> };
