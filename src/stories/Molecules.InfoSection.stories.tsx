import type { Meta, StoryObj } from "@storybook/react";
import { Building2, Pencil } from "lucide-react";
import { InfoSection } from "@/components/ds/info-section";
import { Button } from "@/components/ui/button";
import { StorySpec } from "./story-parts";

const meta = {
  title: "Molecules/InfoSection",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Sekcja Card z ikoną w `bg-primary-soft`, tytułem, opcjonalnym badge 'wymagane' i toolbarem. Używana w **NewClient** i **ClientDetail** wzorcach jako pojedyncza sekcja formularza/podglądu — każda sekcja to jedna karta."
      }
    }
  }
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Docs: Story = {
  render: () => (
    <StorySpec name="InfoSection" type="Molecule">
      <div className="space-y-4">
        <InfoSection
          icon={Building2}
          title="Dane firmy"
          required
          toolbar={
            <Button size="sm" variant="outline">
              <Pencil /> Edytuj
            </Button>
          }
        >
          <p className="text-sm text-muted-foreground">
            Tu trafiają pola formularza albo podgląd wartości — to zawartość sekcji.
          </p>
        </InfoSection>
      </div>
    </StorySpec>
  )
};
