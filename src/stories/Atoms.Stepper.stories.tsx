import type { Meta, StoryObj } from "@storybook/react";
import { atoms, StorySpec } from "./story-parts";

const meta = { title: "Atoms/Stepper", tags: ["autodocs"] } satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Docs: Story = { render: () => <StorySpec name="Stepper" type="Atom"><atoms.Stepper /></StorySpec> };
