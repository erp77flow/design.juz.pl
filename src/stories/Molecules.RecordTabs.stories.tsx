import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Card } from "@/components/ui/card";
import { RecordTabs } from "@/components/ds/record-tabs";

const meta = {
  title: "Molecules/RecordTabs",
  component: RecordTabs,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Zakładki rekordu używane w ekranach podglądu zamówienia, firmy i innych rekordów. Bazują na atomie Tabs shadcn/Radix, ale definiują layout z dolną linią aktywnej zakładki, przewijaniem poziomym i opcjonalnymi badge."
      }
    }
  }
} satisfies Meta<typeof RecordTabs>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultItems = [
  { value: "Dane podstawowe", badge: "2/1" },
  "Produkt",
  "Pozycje zamówienia",
  "Tabele",
  "Materiał",
  "Karta pracy",
  { value: "Rozliczenie i faktura", badge: "2/1" },
  "Pliki",
  "Kontakt",
  "Historia"
];

const stickyItems = ["Dane podstawowe", "Kontakty", "Produkty", "Zamówienia", "Rozliczenia", "Komunikacja", "Pliki"];

export const Default: Story = {
  args: {
    items: defaultItems
  },
  render: () => {
    const [active, setActive] = React.useState("Dane podstawowe");

    return (
      <div className="w-full max-w-[1120px]">
        <RecordTabs
          items={defaultItems}
          onValueChange={setActive}
          value={active}
        />
        <Card className="mt-5 p-5">
          <p className="juz-label">Aktywna zakładka</p>
          <h3 className="mt-2 text-xl font-extrabold">{active}</h3>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            Ten komponent jest źródłem prawdy dla tabsów widocznych w rekordach. Ekrany nie powinny definiować własnych klas
            dla tego wariantu.
          </p>
        </Card>
      </div>
    );
  }
};

export const Sticky: Story = {
  args: {
    items: stickyItems,
    sticky: true
  },
  render: () => {
    const [active, setActive] = React.useState("Dane podstawowe");

    return (
      <div className="w-full max-w-[1120px]">
        <RecordTabs
          items={stickyItems}
          onValueChange={setActive}
          sticky
          value={active}
        />
        <Card className="mt-5 p-5">
          <p className="juz-label">Sticky variant</p>
          <h3 className="mt-2 text-xl font-extrabold">{active}</h3>
          <p className="mt-2 text-muted-foreground">Wariant do ekranów, gdzie zakładki zostają przyklejone nad treścią rekordu.</p>
        </Card>
      </div>
    );
  }
};
