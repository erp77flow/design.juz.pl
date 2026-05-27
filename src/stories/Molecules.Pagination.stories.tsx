import type { Meta, StoryObj } from "@storybook/react";
import { molecules, StorySpec } from "./story-parts";
const meta = {
  title: "Molecules/Pagination",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: { component: `Numerowana paginacja z prev/next i skokiem do strony — używaj pod każdą tabelą wraz z PageSizeControl. Dla nieskończonych list (chat, feed) lepsze infinite-scroll w komponencie listy.` },
    },
  },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
export const Docs: Story = { render: () => <StorySpec name="Pagination" type="Molecule"><molecules.Pagination /></StorySpec> };
