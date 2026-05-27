import type { Meta, StoryObj } from "@storybook/react";
import { molecules, StorySpec } from "./story-parts";
const meta = {
  title: "Molecules/Tabs",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: { component: `Bardziej rozbudowana wersja Tabs z gotowym layoutem nagłówka i zawartości — używaj w panelach ustawień i w widokach z 3-7 sekcjami. Dla zakładek rekordu z badge i sticky — RecordTabs.` },
    },
  },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
export const Docs: Story = { render: () => <StorySpec name="Tabs" type="Molecule"><molecules.Tabs /></StorySpec> };
