import type { Meta, StoryObj } from "@storybook/react";
import { atoms, StorySpec } from "./story-parts";

const meta = {
  title: "Atoms/Breadcrumb",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: { component: `Ścieżka nawigacyjna pokazująca położenie w hierarchii (np. \`Klienci › Długopis S.A. › Edytuj\`). Używaj w nagłówkach ekranów rekordu i w głębokich widokach — pomiń, jeśli użytkownik wszedł z dashboardu jednym kliknięciem.` },
    },
  },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const Docs: Story = { render: () => <StorySpec name="Breadcrumb" type="Atom"><atoms.Breadcrumb /></StorySpec> };
