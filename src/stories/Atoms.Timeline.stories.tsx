import type { Meta, StoryObj } from "@storybook/react";
import { atoms, StorySpec } from "./story-parts";

const meta = {
  title: "Atoms/Timeline",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: { component: `Lista zdarzeń ułożona chronologicznie z pionową linią i kropkami — używaj w panelach historii rekordu (kto, kiedy, co zmienił). Dla terminarza z godzinami sięgnij po CalendarEventSection.` },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Docs: Story = { render: () => <StorySpec name="Timeline" type="Atom"><atoms.Timeline /></StorySpec> };
