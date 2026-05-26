import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within } from "@storybook/test";
import { atoms, StorySpec } from "./story-parts";
const meta = {
  title: "Atoms/Switch",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: { component: `Przełącznik on/off dla ustawień stosowanych natychmiast (włącz powiadomienia, tryb ciemny). Dla wartości potwierdzanych przyciskiem Zapisz użyj Checkbox — semantycznie nie jest to „live”.` },
    },
  },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
export const Docs: Story = {
  render: () => <StorySpec name="Switch" type="Atom"><atoms.Switch /></StorySpec>,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const switchControl = canvas.getByRole("switch");
    await expect(switchControl).toHaveAttribute("aria-checked", "true");
    await userEvent.click(switchControl);
    await expect(switchControl).toHaveAttribute("aria-checked", "false");
    await expect(canvas.getByText("Automatyzacja wylaczona")).toBeVisible();
  }
};
