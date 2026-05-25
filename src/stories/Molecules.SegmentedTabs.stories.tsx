import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Card } from "@/components/ui/card";
import { SegmentedTabs } from "@/components/ds/segmented-tabs";

const meta = {
  title: "Molecules/SegmentedTabs",
  component: SegmentedTabs,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Segmentowe zakładki do krótkich przełączników widoków i paneli ustawień. Bazują na atomie Tabs shadcn/Radix, używają tokenów juz.pl i mogą rozciągać się na pełną szerokość kontenera."
      }
    }
  }
} satisfies Meta<typeof SegmentedTabs>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultItems = ["Zarządzanie", "Wyszukiwanie", "Użytkownicy", "Podstawowe informacje"];
const compactItems = ["Lista", "Ogólne", "Historia"];

export const Default: Story = {
  args: {
    items: defaultItems,
    stretch: true
  },
  render: () => {
    const [active, setActive] = React.useState("Zarządzanie");

    return (
      <div className="w-full max-w-[760px]">
        <SegmentedTabs
          items={defaultItems}
          onValueChange={setActive}
          stretch
          value={active}
        />
        <Card className="mt-5 p-5">
          <p className="juz-label">Aktywny segment</p>
          <h3 className="mt-2 text-xl font-extrabold">{active}</h3>
        </Card>
      </div>
    );
  }
};

export const Compact: Story = {
  args: {
    items: compactItems
  },
  render: () => <SegmentedTabs items={compactItems} />
};
