import type { Meta, StoryObj } from "@storybook/react";
import { expect, screen, userEvent } from "@storybook/test";
import { atoms, StorySpec } from "./story-parts";

const meta = {
  title: "Atoms/AlertDialog",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: { component: `Modal blokujący do potwierdzania akcji destrukcyjnych (usuwanie, anulowanie zlecenia, zatwierdzenie nieodwracalnej zmiany). Wymaga świadomego kliknięcia użytkownika — nie zamyka się po kliknięciu w tło. Do zwykłych formularzy w oknie użyj Dialog.` },
    },
  },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const Docs: Story = {
  render: () => <StorySpec name="AlertDialog" type="Atom"><atoms.AlertDialog /></StorySpec>,
  play: async () => {
    await expect(screen.getByText("Potwierdź usunięcie partii")).toBeVisible();
    await userEvent.click(screen.getByRole("button", { name: "Anuluj" }));
    await expect(screen.queryByText("Potwierdź usunięcie partii")).not.toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "Usuń partię" }));
    await expect(screen.getByText("Potwierdź usunięcie partii")).toBeVisible();
  }
};
