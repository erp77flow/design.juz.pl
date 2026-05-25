import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { DataTableToolbar } from "@/components/ds/data-table-molecules";
import { StorySpec } from "./story-parts";

const meta = {
  title: "Molecules/DataTableToolbar",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen"
  }
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Docs: Story = {
  render: () => {
    const [query, setQuery] = React.useState("");
    const [filtersOpen, setFiltersOpen] = React.useState(false);
    const [columnsOpen, setColumnsOpen] = React.useState(false);

    return (
      <StorySpec name="DataTableToolbar" type="Molecule">
        <div className="w-[960px] max-w-full rounded-xl border bg-card shadow-juz-sm">
          <DataTableToolbar
            columnsOpen={columnsOpen}
            filtersOpen={filtersOpen}
            onColumnsToggle={() => setColumnsOpen((value) => !value)}
            onFiltersToggle={() => setFiltersOpen((value) => !value)}
            onQueryChange={setQuery}
            query={query}
            searchPlaceholder="Szukaj zamówienia, produktu lub klienta..."
            visibleCount={7}
          />
        </div>
      </StorySpec>
    );
  }
};
