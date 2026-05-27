import type { Meta, StoryObj } from "@storybook/react";
import { atoms, StorySpec } from "./story-parts";

const meta = {
  title: "Atoms/MiniMonth",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: { component: `Mały kalendarz miesiąca z kropkami na dniach z wydarzeniami — używaj w sidebarach raportów i jako szybki nawigator daty obok dużego widoku. Dla wyboru daty w formularzu sięgnij po DatePicker.` },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Docs: Story = { render: () => <StorySpec name="MiniMonth" type="Atom"><atoms.MiniMonth /></StorySpec> };
