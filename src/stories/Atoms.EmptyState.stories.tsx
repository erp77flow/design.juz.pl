import type { Meta, StoryObj } from "@storybook/react";
import { atoms, StorySpec } from "./story-parts";

const meta = {
  title: "Atoms/EmptyState",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: { component: `Większy, wyśrodkowany pusty stan z ilustracją i dwoma akcjami — używaj na pełnych widokach (pusta tabela klientów, brak zleceń w miesiącu) jako wezwanie do dodania pierwszego rekordu. Dla mniejszych obszarów wybierz Empty.` },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Docs: Story = {
  render: () => <StorySpec name="EmptyState" type="Atom"><atoms.EmptyState /></StorySpec>
};
