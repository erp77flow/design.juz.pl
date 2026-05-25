import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const monthData = [
  {
    label: "Maj",
    days: [
      ["Pon 23", ["Linia A 48", "Pakowanie 42", "Kontrola 30"]],
      ["Wt 24", ["Linia B 10", "Magazyn 8"]],
      ["Śr 25", ["Linia C 12", "Kontrola 7", "Wysyłka 15"]],
      ["Czw 26", []],
      ["Pt 27", ["Linia A 30", "Pakowanie 12", "Wysyłka 10"]],
      ["Sob 28", ["Utrzymanie 6"]],
      ["Nd 29", ["Kontrola 8", "Magazyn 6"]]
    ]
  },
  {
    label: "Czerwiec",
    days: [
      ["Pon 1", ["Linia A 22", "Pakowanie 18"]],
      ["Wt 2", ["Linia C 12", "Kontrola 4"]],
      ["Śr 3", ["Wysyłka 16"]],
      ["Czw 4", ["Linia B 30", "Magazyn 11"]],
      ["Pt 5", ["Pakowanie 20"]],
      ["Sob 6", []],
      ["Nd 7", []]
    ]
  },
  {
    label: "Lipiec",
    days: [
      ["Pon 6", ["Linia D 14", "Kontrola 10"]],
      ["Wt 7", ["Linia A 24"]],
      ["Śr 8", ["Pakowanie 9", "Wysyłka 6"]],
      ["Czw 9", ["Magazyn 12"]],
      ["Pt 10", ["Linia C 18"]],
      ["Sob 11", []],
      ["Nd 12", []]
    ]
  }
];

export function SocialCalendar() {
  const [monthIndex, setMonthIndex] = React.useState(0);
  const [filter, setFilter] = React.useState("Wszystkie");
  const filters = ["Wszystkie", "Linia A", "Pakowanie", "Kontrola", "Magazyn", "Wysyłka"];
  const month = monthData[monthIndex];
  const filteredDays = month.days.map(([day, items]) => {
    const itemList = items as string[];
    const filteredItems = filter === "Wszystkie" ? itemList : itemList.filter((item) => item.includes(filter));
    const total = filteredItems.reduce((sum, item) => sum + Number(item.split(" ").at(-1) ?? 0), 0);
    return { day: day as string, items: filteredItems, total };
  });
  const monthTotal = filteredDays.reduce((sum, day) => sum + day.total, 0);

  return (
    <section className="space-y-4">
      <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <h2 className="text-3xl font-extrabold">Kalendarz produkcji</h2>
          <p className="text-muted-foreground">{month.label} 2026 · {monthTotal} operacji po filtrze.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {monthData.map((item, index) => (
            <Button key={item.label} onClick={() => setMonthIndex(index)} variant={monthIndex === index ? "default" : "outline"}>
              {item.label}
            </Button>
          ))}
          {filters.map((item) => (
            <Button key={item} onClick={() => setFilter(item)} variant={filter === item ? "default" : "outline"}>
              {item}
            </Button>
          ))}
        </div>
      </div>
      <div className="grid gap-4 lg:grid-cols-7">
        {filteredDays.map(({ day, total, items }) => (
          <Card className="min-h-52 p-4" key={day}>
            <div className="flex items-start justify-between">
              <strong>{day}</strong>
              <Badge variant={total === 0 ? "neutral" : "default"}>{total} operacji</Badge>
            </div>
            <div className="mt-4 space-y-2">
              {items.length ? (
                items.map((item) => (
                  <div className="rounded-md bg-muted px-3 py-2 text-sm" key={item}>
                    {item}
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">Brak operacji</p>
              )}
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
