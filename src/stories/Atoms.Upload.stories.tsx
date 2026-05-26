import type { Meta, StoryObj } from "@storybook/react";
import { atoms, StorySpec } from "./story-parts";
const meta = {
  title: "Atoms/Upload",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: { component: `Strefa drag-and-drop z input-em plikowym i listą wybranych plików. Używaj dla wszystkich uploadów (załączniki do zlecenia, awatar, dokumenty PZ). Konfiguruj \`accept\` i \`maxSize\` zgodnie z typem dokumentu.` },
    },
  },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
export const Docs: Story = { render: () => <StorySpec name="Upload" type="Atom"><atoms.Upload /></StorySpec> };
