import type { Meta, StoryObj } from "@storybook/react";
import { molecules, StorySpec } from "./story-parts";
const meta = { title: "Molecules/CollapsibleMenuItem", tags: ["autodocs"] } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
export const Docs: Story = { render: () => <StorySpec name="CollapsibleMenuItem" type="Molecule"><molecules.CollapsibleMenuItem /></StorySpec> };
