import type { Meta, StoryObj } from "@storybook/react";
import { atoms, StorySpec } from "./story-parts";
const meta = {
  title: "Atoms/Label",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: { component: `Etykieta pola formularza. Zawsze parametrem \`htmlFor\` połącz z \`id\` inputa — to klikalność etykiety i dostępność, nie tylko styl.` },
    },
  },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
export const Docs: Story = { render: () => <StorySpec name="Label" type="Atom"><atoms.Label /></StorySpec> };
