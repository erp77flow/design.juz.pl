import type { Meta, StoryObj } from "@storybook/react";
import { atoms, StorySpec } from "./story-parts";
const meta = {
  title: "Atoms/Chart",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: { component: `Niski poziom wrappera recharts z tokenami juz.pl — używaj tylko wtedy, gdy potrzebujesz nietypowego typu wykresu. W większości przypadków sięgnij po BarChart, LineChart lub DonutChart, które mają gotowe presety.` },
    },
  },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
export const Docs: Story = { render: () => <StorySpec name="Chart" type="Atom"><atoms.Chart /></StorySpec> };
