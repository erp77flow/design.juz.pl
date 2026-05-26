import type { Meta, StoryObj } from "@storybook/react";
import { molecules, StorySpec } from "./story-parts";
const meta = {
  title: "Molecules/ContextMenu",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: { component: `Menu prawego przycisku myszy nad elementem (wiersz tabeli, plik, wydarzenie). Powinien zawierać te same akcje co ActionButtons w wierszu — zaawansowani użytkownicy oczekują obu ścieżek.` },
    },
  },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
export const Docs: Story = { render: () => <StorySpec name="ContextMenu" type="Molecule"><molecules.ContextMenu /></StorySpec> };
