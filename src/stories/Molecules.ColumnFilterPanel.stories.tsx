import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ColumnFilterPanel } from "@/components/ds/data-table-molecules";
import { StorySpec } from "./story-parts";

const meta = {
  title: "Molecules/ColumnFilterPanel",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen"
  }
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Docs: Story = {
  render: () => {
    const [value, setValue] = React.useState("");
    const [applied, setApplied] = React.useState("Wklad markerówy A");
    const [open, setOpen] = React.useState(true);

    return (
      <StorySpec name="ColumnFilterPanel" type="Molecule">
        <div className="w-[960px] max-w-full overflow-hidden rounded-xl border bg-card shadow-juz-sm">
          {open ? (
            <ColumnFilterPanel
              label="Produkt / seria"
              onApply={() => setApplied(value || "Wszystkie serie")}
              onClear={() => {
                setValue("");
                setApplied("Wszystkie serie");
              }}
              onClose={() => setOpen(false)}
              onValueChange={setValue}
              value={value}
            />
          ) : (
            <div className="flex items-center justify-between gap-4 p-4">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-muted-foreground">Filtrowanie na kolumnie</p>
                <p className="mt-1 font-extrabold">Produkt / seria</p>
                <p className="mt-1 text-sm text-muted-foreground">Zastosowano: {applied}</p>
              </div>
              <button className="rounded-md border px-4 py-2 font-bold shadow-juz-xs" onClick={() => setOpen(true)} type="button">
                Otwórz filtr
              </button>
            </div>
          )}
        </div>
      </StorySpec>
    );
  }
};
