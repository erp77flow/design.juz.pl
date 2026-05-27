import type { Meta, StoryObj } from "@storybook/react";
import { atoms, StorySpec } from "./story-parts";

const meta = {
  title: "Atoms/InputGroup",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: { component: `Wrapper na input z lewym i/lub prawym dodatkiem (ikona wyszukiwarki, jednostka „kg”, przycisk „Wyczyść”). Używaj zamiast ręcznego pozycjonowania ikony absolute — zachowuje poprawny focus ring i wysokość.` },
    },
  },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const Docs: Story = { render: () => <StorySpec name="InputGroup" type="Atom"><atoms.InputGroup /></StorySpec> };
