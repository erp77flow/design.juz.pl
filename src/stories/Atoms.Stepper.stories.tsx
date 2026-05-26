import type { Meta, StoryObj } from "@storybook/react";
import { atoms, StorySpec } from "./story-parts";

const meta = {
  title: "Atoms/Stepper",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: { component: `Wizualizacja kroków procesu (kreator, status zlecenia, wieloetapowy formularz). Pokazuj zarówno przeszłe (zakończone), bieżący jak i przyszłe kroki — użytkownik musi widzieć ile jeszcze zostało.` },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Docs: Story = { render: () => <StorySpec name="Stepper" type="Atom"><atoms.Stepper /></StorySpec> };
