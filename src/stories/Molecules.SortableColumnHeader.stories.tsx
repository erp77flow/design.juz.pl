import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { SortableColumnHeader } from "@/components/ds/data-table-molecules";
import { StorySpec } from "./story-parts";

const meta = {
  title: "Molecules/SortableColumnHeader",
  tags: ["autodocs"]
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Docs: Story = {
  render: () => {
    const [direction, setDirection] = React.useState<"asc" | "desc">("asc");
    const [filtered, setFiltered] = React.useState(false);

    return (
      <StorySpec name="SortableColumnHeader" type="Molecule">
        <div className="rounded-lg border bg-muted/40 p-6">
          <SortableColumnHeader
            active
            direction={direction}
            filtered={filtered}
            label="Status"
            onAsc={() => setDirection("asc")}
            onDesc={() => setDirection("desc")}
            onFilter={() => setFiltered((value) => !value)}
          />
        </div>
      </StorySpec>
    );
  }
};
