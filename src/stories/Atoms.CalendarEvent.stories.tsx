import type { Meta, StoryObj } from "@storybook/react";
import { CalendarEvent } from "@/components/ds/calendar-event";
import { atoms, StoryCanvas, StorySpec } from "./story-parts";

const meta = {
  title: "Atoms/CalendarEvent",
  component: CalendarEvent,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen"
  },
  argTypes: {
    eventId: { control: "number", description: "Identyfikator wydarzenia przekazywany do onClick." },
    status: {
      control: "select",
      options: ["new", "planned", "progress", "done", "warning", "blocked"],
      description: "Status wydarzenia sterujący kolorem i badge."
    },
    title: { control: "text", description: "Główny tytuł wydarzenia." },
    startTime: { control: "text", description: "Godzina rozpoczęcia." },
    endTime: { control: "text", description: "Godzina zakończenia." },
    station: { control: "text", description: "Stanowisko, profil lub kanał publikacji." },
    owner: { control: "text", description: "Osoba odpowiedzialna." },
    description: { control: "text", description: "Krótki opis pomocniczy." },
    isActive: { control: "boolean", description: "Wizualne zaznaczenie aktywnego wydarzenia." },
    onClick: { action: "clicked", description: "Akcja kliknięcia wydarzenia." }
  }
} satisfies Meta<typeof CalendarEvent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Docs: Story = {
  args: {
    eventId: 2405,
    status: "new",
    title: "DLG-2405",
    startTime: "10:00",
    endTime: "11:20",
    station: "Stanowisko 3",
    owner: "Kamil",
    description: "Długopis żelowy niebieski",
    isActive: true
  },
  render: () => <StorySpec name="CalendarEvent" type="Atom"><atoms.CalendarEvent /></StorySpec>
};

export const Statuses: Story = {
  args: {
    eventId: 2406,
    status: "planned",
    title: "EV-2406",
    startTime: "09:00",
    endTime: "10:40",
    station: "Linia 1",
    owner: "Operator",
    description: "Seria markerów premium",
    isActive: false
  },
  render: () => (
    <StoryCanvas>
      <div className="grid max-w-5xl gap-4 md:grid-cols-2 xl:grid-cols-3">
        {(["new", "planned", "progress", "done", "warning", "blocked"] as const).map((status, index) => (
          <CalendarEvent
            description="Seria markerów premium"
            endTime={`${10 + index}:40`}
            key={status}
            owner="Operator"
            startTime={`${9 + index}:00`}
            station={`Linia ${index + 1}`}
            status={status}
            title={`EV-${2400 + index}`}
          />
        ))}
      </div>
    </StoryCanvas>
  )
};
