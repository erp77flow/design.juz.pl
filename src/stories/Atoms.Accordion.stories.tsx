import type { Meta, StoryObj } from "@storybook/react";
import { atoms, StorySpec } from "./story-parts";
const meta = {
  title: "Atoms/Accordion",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: { component: `Składana lista sekcji do FAQ, formularzy z grupami opcjonalnymi lub bocznych paneli ustawień. Domyślnie zwija wszystkie sekcje oprócz aktywnej — użyj \`type="multiple"\` jeśli użytkownik może mieć kilka otwartych jednocześnie.` },
    },
  },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
export const Docs: Story = { render: () => <StorySpec name="Accordion" type="Atom"><atoms.Accordion /></StorySpec> };
