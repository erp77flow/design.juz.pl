import type { Meta, StoryObj } from "@storybook/react";
import { atoms, StorySpec } from "./story-parts";
const meta = {
  title: "Atoms/Textarea",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: { component: `Wielo-liniowy input do dłuższych tekstów (notatki, opisy, komentarze). Ustaw \`rows\` zgodnie z oczekiwaną długością — auto-resize nie jest domyślny.` },
    },
  },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
export const Docs: Story = { render: () => <StorySpec name="Textarea" type="Atom"><atoms.Textarea /></StorySpec> };
