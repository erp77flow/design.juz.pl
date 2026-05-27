import type { Meta, StoryObj } from "@storybook/react";
import { atoms, StorySpec } from "./story-parts";

const meta = {
  title: "Atoms/Carousel",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: { component: `Przewijalny poziomo zestaw elementów ze strzałkami nawigacji — używaj dla galerii zdjęć produktu, kroków onboardingu lub karuzeli statystyk na pulpicie. Na małych listach (do 5 pozycji) preferuj zwykły grid.` },
    },
  },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const Docs: Story = { render: () => <StorySpec name="Carousel" type="Atom"><atoms.Carousel /></StorySpec> };
