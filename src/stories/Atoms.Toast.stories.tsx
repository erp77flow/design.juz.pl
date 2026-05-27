import type { Meta, StoryObj } from "@storybook/react";
import { atoms, StorySpec } from "./story-parts";

const meta = {
  title: "Atoms/Toast",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: { component: `Krótki, nieblokujący komunikat w rogu ekranu (zapisano, błąd sieci, kopiowanie). Wymaga \`<Toaster />\` w korzeniu aplikacji. Dla informacji wymagających akcji użyj AlertDialog, dla stałych komunikatów na stronie — Alert.` },
    },
  },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const Docs: Story = { render: () => <StorySpec name="Toast" type="Atom"><atoms.Toast /></StorySpec> };
