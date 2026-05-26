import type { Meta, StoryObj } from "@storybook/react";
import { atoms, StorySpec } from "./story-parts";

const meta = {
  title: "Atoms/Kbd",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: { component: `Etykieta skrótu klawiszowego (np. \`Ctrl+K\`) — używaj w podpowiedziach komend, w stopkach paletek i w tooltipach akcji o skrótach. Czysto wizualne — nie obsługuje samodzielnie zdarzeń klawiatury.` },
    },
  },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const Docs: Story = { render: () => <StorySpec name="Kbd" type="Atom"><atoms.Kbd /></StorySpec> };
