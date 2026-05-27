import type { Meta, StoryObj } from "@storybook/react";
import { atoms, StorySpec } from "./story-parts";

const meta = {
  title: "Atoms/ScrollArea",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: { component: `Stylizowany scrollbar zgodny z designem juz.pl — używaj w kontenerach o stałej wysokości (lista komentarzy w panelu, lista plików w dialogu). Dla całych stron pozwól przeglądarce użyć natywnego scrolla.` },
    },
  },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const Docs: Story = { render: () => <StorySpec name="ScrollArea" type="Atom"><atoms.ScrollArea /></StorySpec> };
