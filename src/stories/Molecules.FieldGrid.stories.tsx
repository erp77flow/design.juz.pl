import type { Meta, StoryObj } from "@storybook/react";
import { Field, FieldGrid } from "@/components/ds/field-grid";
import { StorySpec } from "./story-parts";

const meta = {
  title: "Molecules/FieldGrid",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Para `<dl>` grid (1 / 2 / `columnsXl`) + element `Field` dla pary label–value. Idealne do podglądu rekordu (read-only). Użyj `mono` dla NIP, kodów, numerów. `value` puste → ukośnik `—` w kolorze muted."
      }
    }
  }
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Docs: Story = {
  render: () => (
    <StorySpec name="FieldGrid + Field" type="Molecule">
      <FieldGrid>
        <Field label="Pełna nazwa" value="Firma testowa sp. z o.o." />
        <Field label="NIP" value="5421234588" mono />
        <Field label="Skrót" value="FIRMA-TEST" />
        <Field label="Telefon" value="+48 85 555 22 22" mono />
        <Field label="Email" value="produkcja@firma-testowa.pl" />
        <Field label="Adres" value="ul. Przemysłowa 14" />
        <Field label="Kod pocztowy" value="15-421" mono />
        <Field label="Miasto" value="Białystok" />
        <Field label="Kraj" value="Polska" />
        <Field label="REGON" />
      </FieldGrid>
    </StorySpec>
  )
};
