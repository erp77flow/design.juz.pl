import type { Meta, StoryObj } from "@storybook/react";
import { expect, screen, userEvent } from "@storybook/test";
import { atoms, StorySpec } from "./story-parts";
const meta = { title: "Atoms/Dialog", tags: ["autodocs"] } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
export const Docs: Story = {
  render: () => <StorySpec name="Dialog" type="Atom"><atoms.Dialog /></StorySpec>,
  play: async () => {
    await expect(screen.getByText("Usuńąć złeceńie?")).toBeVisible();
    await userEvent.click(screen.getByRole("button", { name: "Anuluj" }));
    await expect(screen.queryByText("Usuńąć złeceńie?")).not.toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "Otwórz dialog" }));
    await expect(screen.getByText("Usuńąć złeceńie?")).toBeVisible();
  }
};
