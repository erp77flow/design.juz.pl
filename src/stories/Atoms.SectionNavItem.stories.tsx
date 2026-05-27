import type { Meta, StoryObj } from "@storybook/react";
import { atoms, StorySpec } from "./story-parts";

const meta = {
  title: "Atoms/SectionNavItem",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: { component: `Element bocznej nawigacji po sekcjach formularza/rekordu (np. „Dane podstawowe”, „Pliki”, „Historia”). Stan \`active\` koloruje pasek boczny — używaj wraz z IntersectionObserver lub kontrolowanym stanem zakładki.` },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Docs: Story = { render: () => <StorySpec name="SectionNavItem" type="Atom"><atoms.SectionNavItem /></StorySpec> };
