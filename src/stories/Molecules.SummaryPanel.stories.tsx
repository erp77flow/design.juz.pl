import type { Meta, StoryObj } from "@storybook/react";
import { SummaryPanel, SummaryRow } from "@/components/ds/summary-panel";
import { Badge } from "@/components/ui/badge";
import { StorySpec } from "./story-parts";

const meta = {
  title: "Molecules/SummaryPanel",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Prawy panel rekordu: tytuł w `juz-label` + `<dl>` z parami `SummaryRow`. Wartość po prawej, label po lewej w `text-muted-foreground`. Wrzuć `Badge` jako `value`, jeśli to status."
      }
    }
  }
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Docs: Story = {
  render: () => (
    <StorySpec name="SummaryPanel + SummaryRow" type="Molecule">
      <div className="max-w-sm">
        <SummaryPanel>
          <SummaryRow label="Sekcje wymagane" value="2 z 2" />
          <SummaryRow label="Sekcje opcjonalne" value="4 z 4" />
          <SummaryRow label="Adresy wysyłki" value="2 adresy" />
          <SummaryRow label="Status walidacji" value={<Badge variant="success">OK</Badge>} />
          <SummaryRow label="Ostatnia zmiana" />
        </SummaryPanel>
      </div>
    </StorySpec>
  )
};
