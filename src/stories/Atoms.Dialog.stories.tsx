import type { Meta, StoryObj } from "@storybook/react";
import { expect, screen, userEvent } from "@storybook/test";
import { atoms, StorySpec } from "./story-parts";
const meta = {
  title: "Atoms/Dialog",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: { component: `Modal do formularzy i potwierdzeń wymagających kontekstu (edycja krótkiego rekordu, wybór z listy). Dla potwierdzeń destrukcyjnych użyj AlertDialog, dla bocznych paneli — Sheet lub Drawer.` },
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
          "Dialog domyślnie otwarty z przykładowym potwierdzeniem. Zawsze definiuj `DialogTitle` (a11y wymaga tytułu); jeśli wizualnie go nie chcesz, użyj klasy `sr-only`. Klawisz Escape i klik w tło zamykają dialog — w destrukcyjnych potwierdzeniach to zachowanie jest za luźne, użyj wtedy `AlertDialog`."
      }
    }
  },
  render: () => <StorySpec name="Dialog" type="Atom"><atoms.Dialog /></StorySpec>,
  play: async () => {
    await expect(screen.getByText("Usuńąć złeceńie?")).toBeVisible();
    await userEvent.click(screen.getByRole("button", { name: "Anuluj" }));
    await expect(screen.queryByText("Usuńąć złeceńie?")).not.toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "Otwórz dialog" }));
    await expect(screen.getByText("Usuńąć złeceńie?")).toBeVisible();
  }
};
