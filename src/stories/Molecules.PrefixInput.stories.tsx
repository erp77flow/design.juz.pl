import type { Meta, StoryObj } from "@storybook/react";
import { molecules, StorySpec } from "./story-parts";
const meta = {
  title: "Molecules/PrefixInput",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: { component: `Input z stałym prefiksem (np. \`+48\` dla telefonu, \`PL\` dla NIP, \`https://\` dla URL). Wartością modelu jest tylko część bez prefiksu — uważaj przy walidacji po stronie back-endu.` },
    },
  },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
export const Docs: Story = { render: () => <StorySpec name="PrefixInput" type="Molecule"><molecules.PrefixInput /></StorySpec> };
