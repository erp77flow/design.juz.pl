import type { Meta, StoryObj } from "@storybook/react";
import { atoms, StorySpec } from "./story-parts";

const meta = {
  title: "Atoms/Menubar",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: { component: `Pasek menu typu desktopowego (Plik / Edycja / Widok) — używaj wyłącznie w aplikacjach z dużą liczbą akcji globalnych. Dla zwykłych webowych nawigacji wystarczy Navbar + DropdownMenu.` },
    },
  },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const Docs: Story = { render: () => <StorySpec name="Menubar" type="Atom"><atoms.Menubar /></StorySpec> };
