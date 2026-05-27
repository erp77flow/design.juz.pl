import type { Meta, StoryObj } from "@storybook/react";
import { atoms, StorySpec } from "./story-parts";

const meta = {
  title: "Atoms/MetricCard",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: { component: `Kafelek KPI z dużą liczbą, etykietą i opcjonalnym trendem ze strzałką — używaj w siatce na dashboardach (Przychód, Otwarte zlecenia, Konwersja). Trend pokazuj tylko jeśli porównanie ma sens (\`up\` zielony, \`down\` czerwony, \`flat\` szary).` },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Docs: Story = { render: () => <StorySpec name="MetricCard" type="Atom"><atoms.MetricCard /></StorySpec> };
