import type { Meta, StoryObj } from "@storybook/react";
import { expect, screen, userEvent, within } from "@storybook/test";
import { molecules, StorySpec } from "./story-parts";
const meta = {
  title: "Molecules/DropdownMenu",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: { component: `Menu rozwijane wyzwalane przyciskiem (typowo \`MoreHorizontal\` w wierszach, \`ChevronDown\` przy akcji głównej). Maksymalnie ~10 pozycji w 2-3 grupach oddzielonych Separatorem.` },
    },
  },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
export const Docs: Story = {
  render: () => <StorySpec name="DropdownMenu" type="Molecule"><molecules.DropdownMenu /></StorySpec>,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: /Akcje/ }));
    await userEvent.click(await screen.findByRole("menuitem", { name: /Duplikuj/ }));
    await expect(canvas.getByText(/Ostatnia akcja:/)).toBeVisible();
    await expect(canvas.getByText("Duplikuj")).toBeVisible();
  }
};
