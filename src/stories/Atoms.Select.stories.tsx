import type { Meta, StoryObj } from "@storybook/react";
import { expect, screen, userEvent, within } from "@storybook/test";
import { atoms, StorySpec } from "./story-parts";
const meta = {
  title: "Atoms/Select",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: { component: `Pojedynczy select Radix z dropdownem stylowanym do juz.pl. Używaj dla 2-10 opcji bez wyszukiwania; dla dłuższych list — SearchableSelect, dla wielu wartości — MultiSelect, dla mobilnych formularzy — NativeSelect.` },
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
          "Trzy odmiany selecta obok siebie ułatwiają wybór: prosty (Radix) dla krótkiej listy, z wyszukiwarką dla 10+ opcji, multi dla tagów/ról. Wszystkie używają tego samego stylu triggera — wybór nie zmienia layoutu formularza."
      }
    }
  },
  render: () => (
    <StorySpec name="Select" type="Atom">
      <div className="grid gap-8 xl:grid-cols-3">
        <div>
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.12em] text-muted-foreground">Native select</p>
          <atoms.Select />
        </div>
        <div>
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.12em] text-muted-foreground">Searchable single</p>
          <atoms.SearchableSelect />
        </div>
        <div>
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.12em] text-muted-foreground">Multi select</p>
          <atoms.MultiSelect />
        </div>
      </div>
    </StorySpec>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("combobox", { name: "Linia produkcyjna" }));
    await userEvent.click(await screen.findByRole("option", { name: "Pakowanie" }));
    await expect(canvas.getByText("Wybrano: Pakowanie")).toBeVisible();
  }
};
