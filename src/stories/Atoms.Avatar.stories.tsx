import type { Meta, StoryObj } from "@storybook/react";
import { atoms, StorySpec } from "./story-parts";
const meta = {
  title: "Atoms/Avatar",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: { component: `Awatar użytkownika lub firmy — używaj w listach kontaktów, w nawigacji (ProfileMenu), przy autorach komentarzy i w komórkach tabel ludzi. Zawsze podaj \`AvatarFallback\` z inicjałami, bo zdjęcie może się nie załadować.` },
    },
  },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
export const Docs: Story = { render: () => <StorySpec name="Avatar" type="Atom"><atoms.Avatar /></StorySpec> };
