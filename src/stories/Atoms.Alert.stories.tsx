import type { Meta, StoryObj } from "@storybook/react";
import { atoms, StorySpec } from "./story-parts";
const meta = { title: "Atoms/Alert", tags: ["autodocs"] } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
export const Docs: Story = { render: () => <StorySpec name="Alert" type="Atom"><atoms.Alert /></StorySpec> };
