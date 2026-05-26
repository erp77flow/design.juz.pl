import type { Meta, StoryObj } from "@storybook/react";
import { atoms, StorySpec } from "./story-parts";

const meta = {
  title: "Atoms/HoverCard",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: { component: `Karta z dodatkowymi informacjami pojawiająca się po najechaniu (np. szczegóły kontaktu z \`@wzmianki\`). Używaj wyłącznie dla treści pomocniczych — nie chowaj w niej krytycznej informacji, bo na dotyku jest niedostępna.` },
    },
  },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const Docs: Story = { render: () => <StorySpec name="HoverCard" type="Atom"><atoms.HoverCard /></StorySpec> };
