import type { Meta, StoryObj } from "@storybook/react";
import { atoms, StorySpec } from "./story-parts";

const meta = {
  title: "Atoms/MetaTile",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: { component: `Pozioma para ikona-etykieta-wartość — używaj w paskach meta nad zawartością rekordu (np. „Status: W toku”, „Termin: 28.05”) gdzie liczy się szybki skan, nie edycja.` },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Docs: Story = { render: () => <StorySpec name="MetaTile" type="Atom"><atoms.MetaTile /></StorySpec> };
