import type { Meta, StoryObj } from "@storybook/react";
import { molecules, StorySpec } from "./story-parts";
const meta = {
  title: "Molecules/ProfileMenu",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: { component: `Avatar użytkownika rozwijający menu z profilem, ustawieniami, trybem ciemnym i wylogowaniem. Używaj w prawym górnym rogu Navbara — to standardowe miejsce, do którego użytkownik wraca odruchowo.` },
    },
  },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
export const Docs: Story = { render: () => <StorySpec name="ProfileMenu" type="Molecule"><molecules.ProfileMenu /></StorySpec> };
