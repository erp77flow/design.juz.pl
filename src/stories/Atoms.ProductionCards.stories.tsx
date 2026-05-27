import type { Meta, StoryObj } from "@storybook/react";
import { MachineLoadCard, ProductionTaskCard } from "@/components/ds/production-screens";
import { StorySpec } from "./story-parts";

const meta = {
  title: "Atoms/ProductionCards",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Małe karty produkcyjne używane w kalendarzach, Gantt, tablicach operatora i widokach stanowisk."
      }
    }
  }
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const TaskCard: Story = {
  render: () => (
    <StorySpec name="ProductionTaskCard" type="Atom">
      <div className="max-w-[320px]">
        <ProductionTaskCard
          code="ZP/00092"
          progress={60}
          time="09:40 - 12:00"
          title="Marker permanent czarny"
        />
      </div>
    </StorySpec>
  )
};

export const MachineLoad: Story = {
  render: () => (
    <StorySpec name="MachineLoadCard" type="Atom">
      <div className="max-w-[360px]">
        <MachineLoadCard model="Długopis Classic" name="Linia A" time="6h 35m / 8h" value={82} />
      </div>
    </StorySpec>
  )
};
