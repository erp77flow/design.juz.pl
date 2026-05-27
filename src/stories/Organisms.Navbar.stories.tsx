import type { Meta, StoryObj } from "@storybook/react";
import { ChevronDown } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { JuzLogo } from "@/components/ds/logo";

const meta = {
  title: "Organisms/Navbar",
  component: Navbar,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Górny pasek aplikacji: logo + opcjonalny breadcrumb, slot `nav` na główną nawigację (dropdowny menu), centralne pole wyszukiwania, slot końcowy + powiadomienia i menu profilu."
      }
    }
  }
} satisfies Meta<typeof Navbar>;

export default meta;
type Story = StoryObj<typeof meta>;

const baseProps = {
  logo: <JuzLogo />,
  user: {
    name: "Imię Nazwisko",
    email: "uzytkownik@juz.pl",
    role: "Administrator"
  },
  notifications: 3,
  onLogout: () => {},
  onProfile: () => {},
  onSettings: () => {}
} as const;

export const Default: Story = {
  args: baseProps,
  render: () => <Navbar {...baseProps} breadcrumbs={[{ label: "juz.pl", href: "/" }, { label: "Dashboard" }]} />
};

export const WithNav: Story = {
  args: baseProps,
  render: () => (
    <Navbar
      {...baseProps}
      nav={
        <ul className="flex items-center gap-1">
          {["Główne", "Sprzedaż", "Produkcja", "Raporty"].map((label, i) => (
            <li key={label}>
              <button
                aria-haspopup="menu"
                className="inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-semibold text-foreground hover:bg-primary-soft hover:text-primary focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
                type="button"
                aria-current={i === 0 ? "page" : undefined}
              >
                {label}
                <ChevronDown className="size-3.5 opacity-70" aria-hidden />
              </button>
            </li>
          ))}
        </ul>
      }
    />
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Slot `nav` siedzi między logo a polem wyszukiwania, ukryty na mobile (`md:flex`). Wyszukiwanie nadal flex-1 — auto-skraca się gdy nawigacja zajmuje miejsce."
      }
    }
  }
};
