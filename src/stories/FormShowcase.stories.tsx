import type { Meta, StoryObj } from "@storybook/react";
import { FormShowcase } from "@/components/ds/form-showcase";

const meta = {
  title: "Molecules/FormShowcase",
  component: FormShowcase,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Referencyjny formularz z wszystkimi typami pól (text, select, multi, daty, upload, switch, walidacja) — używaj jako wzorca przy projektowaniu nowych formularzy. Kopiuj sekcje i grupowanie, nie cały komponent; każdy realny formularz ma własne pola i logikę walidacji."
      }
    }
  }
} satisfies Meta<typeof FormShowcase>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="bg-background p-8">
      <FormShowcase />
    </div>
  )
};
