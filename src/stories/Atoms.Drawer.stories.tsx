import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within } from "@storybook/test";
import { atoms, StorySpec } from "./story-parts";
const meta = {
  title: "Atoms/Drawer",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: { component: `Wysuwany panel z dołu ekranu (na desktopie też można od strony) — używaj na mobilnym do akcji kontekstowych zamiast Dialog, bo lepiej działa kciukiem. Na desktopie z reguły wybierz Sheet.` },
    },
  },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
export const Docs: Story = {
  render: () => <StorySpec name="Drawer" type="Atom"><atoms.Drawer /></StorySpec>,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByLabelText("Drawer")).toBeVisible();
    await userEvent.click(canvas.getByRole("button", { name: "Zamknij drawer" }));
    await expect(canvas.getByText("Drawer zamkniety.")).toBeVisible();
    await userEvent.click(canvas.getByRole("button", { name: /Otwórz drawer/ }));
    await expect(canvas.getByLabelText("Drawer")).toBeVisible();
  }
};
