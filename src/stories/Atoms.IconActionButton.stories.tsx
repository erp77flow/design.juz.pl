import type { Meta, StoryObj } from "@storybook/react";
import { atoms, StorySpec } from "./story-parts";

const meta = {
  title: "Atoms/IconActionButton",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: { component: `Kwadratowy przycisk wyłącznie z ikoną — używaj w toolbarach tabel, w wierszach (edycja/usuń/podgląd) i w nagłówkach kart. Zawsze podaj \`aria-label\`, inaczej czytniki ekranu nie odczytają akcji.` },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Docs: Story = {
  render: () => <StorySpec name="IconActionButton" type="Atom"><atoms.IconActionButton /></StorySpec>
};
