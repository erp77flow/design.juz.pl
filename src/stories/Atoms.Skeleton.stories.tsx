import type { Meta, StoryObj } from "@storybook/react";
import { atoms, StorySpec } from "./story-parts";
const meta = {
  title: "Atoms/Skeleton",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: { component: `Szary placeholder w kształcie zawartości, którą zaraz załadujesz — używaj zamiast Spinnera dla list, tabel i kart, gdy znasz układ z góry. Lepsza ocena czasu ładowania niż obracające się kółko.` },
    },
  },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
export const Docs: Story = { render: () => <StorySpec name="Skeleton" type="Atom"><atoms.Skeleton /></StorySpec> };
