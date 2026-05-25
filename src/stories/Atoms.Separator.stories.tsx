import type { Meta, StoryObj } from "@storybook/react";
import { atoms, StorySpec } from "./story-parts";

const meta = { title: "Atoms/Separator", tags: ["autodocs"] } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const Docs: Story = { render: () => <StorySpec name="Separator" type="Atom"><atoms.Separator /></StorySpec> };
