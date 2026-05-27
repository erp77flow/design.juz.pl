import type { Meta, StoryObj } from "@storybook/react";
import { Building2, Truck } from "lucide-react";
import { InfoSection } from "@/components/ds/info-section";
import { RecordPageLayout } from "@/components/ds/record-page-layout";
import { SectionNav, type SectionNavEntry } from "@/components/ds/section-nav";
import { SummaryPanel, SummaryRow } from "@/components/ds/summary-panel";
import { StorySpec } from "./story-parts";

const items: SectionNavEntry[] = [
  { id: "sec-firma", label: "Dane firmy", icon: Building2, state: "Wymagane" },
  { id: "sec-wysylka", label: "Dane do wysyłki", icon: Truck, state: "Opcjonalne" }
];

const meta = {
  title: "Molecules/RecordPageLayout",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "3-kolumnowy shell dla stron rekordu (create/detail): `260px | 1fr | 340px` na xl, jedna kolumna poniżej. Lewy slot `nav` na `SectionNav`, środek na sekcje `InfoSection`, prawy `summary` na `SummaryPanel` lub mapę. Ustaw `columns=\"2\"` jeśli nie potrzebujesz prawego panelu."
      }
    }
  }
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Docs: Story = {
  render: () => (
    <StorySpec name="RecordPageLayout" type="Molecule">
      <RecordPageLayout
        nav={<SectionNav items={items} activeId="sec-firma" />}
        summary={
          <SummaryPanel>
            <SummaryRow label="Sekcje wymagane" value="1 z 1" />
            <SummaryRow label="Sekcje opcjonalne" value="0 z 1" />
            <SummaryRow label="Status walidacji" value="OK" />
          </SummaryPanel>
        }
      >
        <InfoSection icon={Building2} title="Dane firmy" required>
          <p className="text-sm text-muted-foreground">Treść sekcji.</p>
        </InfoSection>
        <InfoSection icon={Truck} title="Dane do wysyłki">
          <p className="text-sm text-muted-foreground">Druga sekcja.</p>
        </InfoSection>
      </RecordPageLayout>
    </StorySpec>
  )
};
