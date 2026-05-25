import { Zap } from "lucide-react";

export function JuzLogo() {
  return (
    <div className="flex items-center gap-3" aria-label="juz.pl">
      <span className="grid size-12 place-items-center rounded-full bg-primary text-primary-foreground shadow-juz">
        <Zap className="size-7" strokeWidth={2.7} />
      </span>
      <span className="text-4xl font-extrabold tracking-normal text-foreground">
        juz<span className="text-primary">.pl</span>
      </span>
    </div>
  );
}
