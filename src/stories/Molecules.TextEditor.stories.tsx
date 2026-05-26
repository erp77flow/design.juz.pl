import type { Meta, StoryObj } from "@storybook/react";
import { molecules, StorySpec } from "./story-parts";
const meta = {
  title: "Molecules/TextEditor",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: { component: `Edytor WYSIWYG dla pól typu opis/notatka — pasek narzędzi z bold/italic/listy/linki. Używaj dla treści formatowanych (oferta, opis produktu); dla zwykłych notatek wystarczy Textarea.` },
    },
  },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
export const Docs: Story = { render: () => <StorySpec name="TextEditor" type="Molecule"><molecules.TextEditor /></StorySpec> };
