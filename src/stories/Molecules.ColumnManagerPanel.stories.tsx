import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ColumnManagerPanel } from "@/components/ds/data-table-molecules";
import { StorySpec } from "./story-parts";

const meta = {
  title: "Molecules/ColumnManagerPanel",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Panel zarządzania widocznością i kolejnością kolumn tabeli — otwieraj go z toolbara (`ColumnVisibilitySwitch`). Używaj wszędzie tam, gdzie tabela ma 8+ kolumn i różni użytkownicy potrzebują różnych zestawów."
      }
    }
  }
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const columns = [
  { key: "number", label: "Numer zamówienia" },
  { key: "status", label: "Status" },
  { key: "product", label: "Produkt" },
  { key: "client", label: "Klient" },
  { key: "deadline", label: "Termin" }
];

const defaultVisible = {
  number: true,
  status: true,
  product: true,
  client: true,
  deadline: true
};

export const Docs: Story = {
  render: () => {
    const [visible, setVisible] = React.useState<Record<string, boolean>>(defaultVisible);

    return (
      <StorySpec name="ColumnManagerPanel" type="Molecule">
        <div className="w-[360px] max-w-full overflow-hidden rounded-xl border bg-card shadow-juz-sm">
          <ColumnManagerPanel
            columns={columns}
            onReset={() => setVisible(defaultVisible)}
            onVisibleChange={(key, value) => setVisible((current) => ({ ...current, [key]: value }))}
            visible={visible}
          />
        </div>
      </StorySpec>
    );
  }
};
