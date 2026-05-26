import type { Meta, StoryObj } from "@storybook/react";
import { atoms, StorySpec } from "./story-parts";

const meta = {
  title: "Atoms/Logo",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: { component: `Logo juz.pl w wariantach mark/full i light/dark. Używaj \`mark\` w wąskich kontenerach (zwinięty sidebar, favicon-like miejsca), \`full\` w navbarach i strefach autoryzacji.` },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Docs: Story = { render: () => <StorySpec name="Logo" type="Atom"><atoms.Logo /></StorySpec> };
