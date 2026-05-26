import type { Meta, StoryObj } from "@storybook/react";
import { atoms, StorySpec } from "./story-parts";

const meta = {
  title: "Atoms/AspectRatio",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: { component: `Wrapper utrzymujący stały stosunek boków zawartości — używaj dla obrazów, embedów wideo, podglądów PDF i miniatur kart, żeby uniknąć layout shiftu w trakcie ładowania.` },
    },
  },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const Docs: Story = { render: () => <StorySpec name="AspectRatio" type="Atom"><atoms.AspectRatio /></StorySpec> };
