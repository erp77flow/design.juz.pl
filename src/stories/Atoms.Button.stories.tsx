import type { Meta, StoryObj } from "@storybook/react";
import { atoms, StorySpec } from "./story-parts";
const meta = {
  title: "Atoms/Button",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: { component: `Podstawowy przycisk akcji. Używaj \`default\` dla akcji głównej w widoku, \`secondary\` dla akcji obok, \`ghost\` lub \`outline\` dla akcji drugorzędnych w toolbarach. Warianty semantyczne (\`success\`, \`warning\`, \`destructive\`) zarezerwuj dla operacji o tym znaczeniu, \`link\` gdy element ma być wizualnie linkiem, ale logicznie pozostać \`<button>\`.` },
    },
  },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
export const Docs: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Pełen przegląd najczęściej używanych wariantów (`default`, `outline`, `ghost`, `destructive`, `icon`). Pokazuje też przykład ikony z lewej — kiedy łączysz ikonę z etykietą, zachowaj odstęp `gap-2` (jest wbudowany w `Button`)."
      }
    }
  },
  render: () => <StorySpec name="Button" type="Atom"><atoms.Button /></StorySpec>
};
