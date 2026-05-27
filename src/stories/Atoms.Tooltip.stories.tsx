import type { Meta, StoryObj } from "@storybook/react";
import { atoms, StorySpec } from "./story-parts";
const meta = {
  title: "Atoms/Tooltip",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: { component: `Mała etykieta po najechaniu/focusie — używaj wyłącznie dla wyjaśnień ikon i skrótów, nigdy dla krytycznej informacji (na dotyku niewidoczna). Wymaga \`TooltipProvider\` w drzewie, najlepiej raz w korzeniu aplikacji.` },
    },
  },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
export const Docs: Story = { render: () => <StorySpec name="Tooltip" type="Atom"><atoms.Tooltip /></StorySpec> };
