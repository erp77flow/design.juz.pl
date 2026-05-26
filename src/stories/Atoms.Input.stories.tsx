import type { Meta, StoryObj } from "@storybook/react";
import { atoms, StorySpec } from "./story-parts";
const meta = {
  title: "Atoms/Input",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: { component: `Tekstowy input formularza — używaj zawsze sparowany z \`Label\` (samo \`placeholder\` nie wystarczy dla dostępności). Dla liczb z lokalizacją PL użyj DecimalInput, dla telefonów/NIP-ów PrefixInput, dla input + ikona — InputGroup.` },
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
          "Showcase stanów inputa: default, z wartością, disabled i invalid. Stan błędu ustaw przez `aria-invalid` na inpucie — automatycznie pojawi się czerwone obramowanie z tokenu `--destructive`."
      }
    }
  },
  render: () => <StorySpec name="Input" type="Atom"><atoms.Input /></StorySpec>
};
