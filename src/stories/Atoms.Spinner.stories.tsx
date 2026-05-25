import type { Meta, StoryObj } from "@storybook/react";
import { atoms, StorySpec } from "./story-parts";
const meta = { title: "Atoms/Spinner", tags: ["autodocs"] } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
export const Docs: Story = { render: () => <StorySpec name="Spinner" type="Atom"><atoms.Spinner /></StorySpec> };
