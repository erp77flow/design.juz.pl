import type { Meta, StoryObj } from "@storybook/react";
import { atoms, StorySpec } from "./story-parts";

const meta = {
  title: "Atoms/InputOTP",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: { component: `Input do kodów jednorazowych (logowanie 2FA, weryfikacja telefonu). Renderuj zawsze parzystą liczbę pól w grupach po 3-4 — łatwiej wpisać z głowy.` },
    },
  },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const Docs: Story = { render: () => <StorySpec name="InputOTP" type="Atom"><atoms.InputOTP /></StorySpec> };
