import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within } from "@storybook/test";
import { DataList } from "@/components/ds/data-list";

const meta = {
  title: "Patterns/DataList",
  component: DataList,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen"
  }
} satisfies Meta<typeof DataList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LinksList: Story = {
  render: () => (
    <div className="bg-background p-8">
      <DataList />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: /Pokaż filtry/ }));
    await expect(canvas.getByText("Filtry zaawansowane")).toBeVisible();
    await userEvent.click(canvas.getAllByRole("button", { name: /kolumny/i })[0]);
    await expect(canvas.getByText("Zarządzaj kolumnami")).toBeVisible();
    await userEvent.selectOptions(canvas.getByLabelText("Wyników na stronie"), "20");
    await expect(
      canvas.getByText((_, element) => element?.textContent === "Pokazano 1-12 z 12 wyników")
    ).toBeVisible();
  }
};
