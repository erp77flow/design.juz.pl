import type { Meta, StoryObj } from "@storybook/react";
import { atoms, StorySpec } from "./story-parts";

const meta = {
  title: "Atoms/FieldDisplay",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: { component: `Para etykieta+wartość w trybie read-only — używaj w widokach rekordu zamiast inputów, kiedy tylko pokazujesz dane. Orientacja \`horizontal\` dla zwartych list, \`vertical\` dla siatki pól.` },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Docs: Story = {
  render: () => <StorySpec name="FieldDisplay" type="Atom"><atoms.FieldDisplay /></StorySpec>
};
