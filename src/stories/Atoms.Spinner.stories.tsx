import type { Meta, StoryObj } from "@storybook/react";
import { atoms, StorySpec } from "./story-parts";
const meta = {
  title: "Atoms/Spinner",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: { component: `Obracające się kółko ładowania — używaj dla krótkich (do ~2s) operacji o nieokreślonym progresie i wewnątrz przycisków (\`isLoading\` w Button). Dla dłuższego ładowania kontenerów wybierz Skeleton.` },
    },
  },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
export const Docs: Story = { render: () => <StorySpec name="Spinner" type="Atom"><atoms.Spinner /></StorySpec> };
