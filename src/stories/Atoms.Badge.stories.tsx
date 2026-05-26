import type { Meta, StoryObj } from "@storybook/react";
import { atoms, StorySpec } from "./story-parts";
const meta = {
  title: "Atoms/Badge",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: { component: `Etykieta statusu lub liczby przy elemencie listy. \`default\` to kolor neutralny marki, warianty semantyczne (\`success\`, \`warning\`, \`destructive\`, \`info\`) odpowiadają stanom procesów; \`outline\` i \`neutral\` dla taksonomii (tagi, kategorie). Nie używaj Badge jako przycisku — to ozdoba, nie akcja.` },
    },
  },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
export const Docs: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Wszystkie warianty obok siebie — porównaj tonacje, żeby wybrać semantycznie poprawny: `success` zarezerwuj dla pozytywnych statusów (np. „Zapłacone”), `warning` dla wymagających uwagi, `destructive` dla błędów/zablokowanych."
      }
    }
  },
  render: () => <StorySpec name="Badge" type="Atom"><atoms.Badge /></StorySpec>
};
