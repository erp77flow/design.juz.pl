import type { Meta, StoryObj } from "@storybook/react";
import { molecules, StorySpec } from "./story-parts";
const meta = {
  title: "Molecules/Combobox",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: { component: `Input do wyszukiwania połączony z listą opcji — używaj kiedy użytkownik powinien wpisać dowolny tekst lub wybrać ze słownika (np. miasto, kategoria z dopisaniem nowej). Dla zamkniętej listy bez free-text sięgnij po SearchableSelect.` },
    },
  },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
export const Docs: Story = { render: () => <StorySpec name="Combobox" type="Molecule"><molecules.Combobox /></StorySpec> };
