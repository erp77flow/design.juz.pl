import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Building2, ClipboardList, CreditCard, FileText, Tag, Truck } from "lucide-react";
import { SectionNav, type SectionNavEntry } from "@/components/ds/section-nav";
import { StorySpec } from "./story-parts";

const items: SectionNavEntry[] = [
  { id: "sec-firma", label: "Dane firmy", icon: Building2, state: "Wymagane" },
  { id: "sec-wysylka", label: "Dane do wysyłki", icon: Truck, state: "Opcjonalne" },
  { id: "sec-handlowa", label: "Sekcja handlowa", icon: CreditCard, state: "Opcjonalne" },
  { id: "sec-rejestrowe", label: "Dane rejestrowe", icon: ClipboardList, state: "Opcjonalne" },
  { id: "sec-ksef", label: "KSeF", icon: FileText, state: "Opcjonalne" },
  { id: "sec-typ", label: "Typ firmy", icon: Tag, state: "Opcjonalne" }
];

const meta = {
  title: "Molecules/SectionNav",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Lewy sticky sidebar z listą sekcji formularza/podglądu. Po kliknięciu woła `onSelect(id)` — strona scrolluje do kotwicy. Aktywna pozycja ma fioletowy pasek po lewej i `bg-primary-soft`."
      }
    }
  }
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Docs: Story = {
  render: () => {
    const [active, setActive] = React.useState("sec-firma");
    return (
      <StorySpec name="SectionNav" type="Molecule">
        <div className="max-w-xs">
          <SectionNav items={items} activeId={active} onSelect={setActive} />
        </div>
      </StorySpec>
    );
  }
};
