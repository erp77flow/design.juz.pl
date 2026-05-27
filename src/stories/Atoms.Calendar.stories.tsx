import type { Meta, StoryObj } from "@storybook/react";
import { atoms, StorySpec } from "./story-parts";
const meta = {
  title: "Atoms/Calendar",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: { component: `Pojedynczy kalendarz miesięczny do wyboru daty — używaj wewnątrz Popover (DatePicker, DateRangeInput), nie bezpośrednio w treści. Lokalizacja PL przez \`date-fns/locale/pl\`.` },
    },
  },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
export const Docs: Story = { render: () => <StorySpec name="Calendar" type="Atom"><atoms.Calendar /></StorySpec> };
