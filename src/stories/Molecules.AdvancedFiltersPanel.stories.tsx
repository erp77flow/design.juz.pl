import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within } from "@storybook/test";
import { molecules, StorySpec } from "./story-parts";

const meta = {
  title: "Molecules/AdvancedFiltersPanel",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Rozbudowany panel filtrowania tabel: zakresy dat, pola tekstowe, selecty, czyszczenie, anulowanie i zastosowanie filtrów."
      }
    }
  }
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Docs: Story = {
  render: () => (
    <StorySpec name="AdvancedFiltersPanel" type="Molecule">
      <molecules.AdvancedFiltersPanel />
    </StorySpec>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByLabelText("Nr dokumentu"), "ZP/00042");
    await userEvent.click(canvas.getByRole("button", { name: /Filtruj/ }));
    await expect(canvas.getByText("Aktywne: 1")).toBeVisible();
  }
};
