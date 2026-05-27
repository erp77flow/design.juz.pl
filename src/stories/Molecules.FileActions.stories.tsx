import type { Meta, StoryObj } from "@storybook/react";
import { molecules, StorySpec } from "./story-parts";
const meta = {
  title: "Molecules/FileActions",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: { component: `Wiersz akcji nad/przy załączniku (podgląd, pobierz, kopiuj link, usuń). Używaj w listach plików rekordu i w panelach edycji wiadomości — zachowuje spójność z tym co użytkownik zna z chmury (Drive, OneDrive).` },
    },
  },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
export const Docs: Story = { render: () => <StorySpec name="FileActions" type="Molecule"><molecules.FileActions /></StorySpec> };
