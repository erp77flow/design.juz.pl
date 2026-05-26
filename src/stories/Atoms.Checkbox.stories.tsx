import type { Meta, StoryObj } from "@storybook/react";
import { atoms, StorySpec } from "./story-parts";
const meta = {
  title: "Atoms/Checkbox",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: { component: `Pojedynczy checkbox do flag boolean w formularzu i jako selektor wiersza w tabelach. Dla listy wzajemnie wykluczających się opcji użyj RadioGroup, dla ustawień on/off w panelu konfiguracji — Switch.` },
    },
  },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
export const Docs: Story = { render: () => <StorySpec name="Checkbox" type="Atom"><atoms.Checkbox /></StorySpec> };
