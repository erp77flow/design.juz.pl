import type { Meta, StoryObj } from "@storybook/react";
import { atoms, StorySpec } from "./story-parts";
const meta = {
  title: "Atoms/Card",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: { component: `Podstawowy kontener treści z subtelnym cieniem \`shadow-juz\` i obramowaniem. Używaj jako fundament wszystkich paneli, sekcji formularzy i kafelków dashboardu — większość bardziej wyspecjalizowanych komponentów (MetricCard, SummaryTile, AddressCard) jest na nim zbudowana.` },
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
          "Karta z podsekcjami `CardHeader/CardTitle/CardContent/CardFooter` — używaj tej struktury, zamiast wkładać ręcznie nagłówek do `CardContent`. Padding `p-6` jest wbudowany w sub-komponenty, nie dubluj go na `Card`."
      }
    }
  },
  render: () => <StorySpec name="Card" type="Atom"><atoms.Card /></StorySpec>
};
