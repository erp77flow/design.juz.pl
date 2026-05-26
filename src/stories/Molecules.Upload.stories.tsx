import type { Meta, StoryObj } from "@storybook/react";
import { molecules, StorySpec } from "./story-parts";
const meta = {
  title: "Molecules/Upload",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: { component: `Pełna molekuła uploadu z drag-and-drop, listą plików, paskami progresu i obsługą błędów walidacji. Używaj jako kompletne pole uploadu w formularzu — bazowy atom Upload daje tylko strefę drop.` },
    },
  },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
export const Docs: Story = { render: () => <StorySpec name="Upload" type="Molecule"><molecules.Upload /></StorySpec> };
