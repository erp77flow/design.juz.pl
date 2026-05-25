import type { Meta, StoryObj } from "@storybook/react";
import { LoginScreen, NewPasswordScreen, RegisterScreen, ResetPasswordScreen } from "@/components/ds/auth-screens";

const meta = {
  title: "Screens/Auth",
  parameters: {
    layout: "fullscreen"
  }
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Login: Story = {
  render: () => (
    <div className="bg-background p-8">
      <LoginScreen />
    </div>
  )
};

export const Register: Story = {
  render: () => (
    <div className="bg-background p-8">
      <RegisterScreen />
    </div>
  )
};

export const ResetPassword: Story = {
  render: () => (
    <div className="bg-background p-8">
      <ResetPasswordScreen />
    </div>
  )
};

export const NewPassword: Story = {
  render: () => (
    <div className="bg-background p-8">
      <NewPasswordScreen />
    </div>
  )
};
