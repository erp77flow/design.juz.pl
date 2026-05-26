import type { Meta, StoryObj } from "@storybook/react";
import { molecules, StorySpec } from "./story-parts";
const meta = {
  title: "Molecules/Header",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: { component: `Nagłówek aplikacji z logo, wyszukiwarką globalną i profilem. Używaj w połączeniu z \`AppSidebar\` w pełnoekranowych szablonach — sam Header nie zapewnia nawigacji, tylko top-bar.` },
    },
  },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
export const Docs: Story = { render: () => <StorySpec name="Header" type="Molecule"><molecules.Header /></StorySpec> };
