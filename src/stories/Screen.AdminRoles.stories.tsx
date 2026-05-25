import type { Meta, StoryObj } from "@storybook/react";
import { RolesPermissionsScreen } from "@/components/ds/enterprise-screens";
import { ScreenPreviewFrame } from "./screen-preview-frame";

const meta = {
  title: "Screens/Admin/RolesPermissions",
  component: RolesPermissionsScreen,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Ekran roli i uprawnien: lewy modul, zakladki, lista grup i macierz przelacznikow w stylu juz.pl."
      }
    }
  }
} satisfies Meta<typeof RolesPermissionsScreen>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <ScreenPreviewFrame>
      <RolesPermissionsScreen />
    </ScreenPreviewFrame>
  )
};

