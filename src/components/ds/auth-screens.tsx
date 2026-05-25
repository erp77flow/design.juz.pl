import { AlertTriangle, ArrowRight, KeyRound, Lock, Mail, ShieldCheck, Ticket, User, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

function AuthShell({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <div className="grid min-h-[620px] overflow-hidden rounded-lg border bg-card shadow-juz-sm lg:grid-cols-[0.9fr_1.1fr]">
      <div className="flex flex-col justify-between bg-primary p-8 text-primary-foreground">
        <div className="flex items-center gap-3 text-2xl font-extrabold">
          <span className="grid size-11 place-items-center rounded-full bg-white/15"><Zap /></span>
          juz.pl
        </div>
        <div>
          <h2 className="max-w-md text-4xl font-extrabold leading-tight">Dołącz do juz.pl za darmo.</h2>
          <p className="mt-4 max-w-xl text-primary-foreground/80">Skracaj linki, planuj publikacje, analizuj wyniki i pracuj szybciej z jednym panelem.</p>
        </div>
      </div>
      <div className="grid place-items-center p-8">
        <Card className="w-full max-w-md border-0 p-0 shadow-none">
          <h1 className="text-3xl font-extrabold">{title}</h1>
          <p className="mt-2 text-muted-foreground">{subtitle}</p>
          <div className="mt-8 space-y-4">{children}</div>
        </Card>
      </div>
    </div>
  );
}

export function LoginScreen() {
  return (
    <AuthShell title="Zaloguj się" subtitle="Wróć do swojego panelu juz.pl.">
      <label className="block space-y-2">
        <span className="text-sm font-semibold text-muted-foreground">Adres e-mail</span>
        <div className="relative">
          <Mail className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
          <Input className="pl-12" placeholder="kontakt@firma.pl" />
        </div>
      </label>
      <label className="block space-y-2">
        <span className="text-sm font-semibold text-muted-foreground">Hasło</span>
        <div className="relative">
          <Lock className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
          <Input className="pl-12" placeholder="Wpisz hasło" type="password" />
        </div>
      </label>
      <div className="flex items-center justify-between gap-4 text-sm">
        <label className="flex items-center gap-2 font-semibold text-muted-foreground">
          <input className="size-4 rounded border-border accent-primary" type="checkbox" />
          Zapamietaj mnie
        </label>
        <button className="font-semibold text-primary">Nie pamietasz hasła?</button>
      </div>
      <Button className="w-full">Zaloguj <ArrowRight /></Button>
    </AuthShell>
  );
}

export function RegisterScreen() {
  return (
    <AuthShell title="Zarejestruj się" subtitle="Podaj dane, aby utworzyć konto.">
      <div className="flex items-start gap-3 rounded-lg border bg-primary-soft/45 p-4 text-primary">
        <span className="grid size-11 shrink-0 place-items-center rounded-md bg-card shadow-juz-sm">
          <Ticket className="size-5" />
        </span>
        <div>
          <p className="font-extrabold text-foreground">Kod zaproszenia</p>
          <p className="mt-1 text-sm leading-6 text-muted-foreground">
            Konto demo tworzymy z kodem zaproszenia, żeby pokazać wieloetapową rejestrację.
          </p>
        </div>
      </div>
      <label className="block space-y-2">
        <span className="text-sm font-semibold text-muted-foreground">Kod zaproszenia</span>
        <div className="relative">
          <Ticket className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
          <Input className="pl-12" placeholder="JUZ-START-2026" />
        </div>
      </label>
      <label className="block space-y-2">
        <span className="text-sm font-semibold text-muted-foreground">Pseudonim / nazwa</span>
        <div className="relative">
          <User className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
          <Input className="pl-12" placeholder="MarkerPro" />
        </div>
      </label>
      <label className="block space-y-2">
        <span className="text-sm font-semibold text-muted-foreground">Adres e-mail</span>
        <div className="relative">
          <Mail className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
          <Input className="pl-12" placeholder="kontakt@markerpro.pl" />
        </div>
      </label>
      <Button className="w-full">Utwórz konto <ArrowRight /></Button>
    </AuthShell>
  );
}

export function ResetPasswordScreen() {
  return (
    <AuthShell title="Przypomnij hasło" subtitle="Wyślemy link do ustawieńia nowego hasła.">
      <div className="flex items-start gap-3 rounded-lg border bg-primary-soft/45 p-4 text-primary">
        <span className="grid size-11 shrink-0 place-items-center rounded-md bg-card shadow-juz-sm">
          <Mail className="size-5" />
        </span>
        <div>
          <p className="font-extrabold text-foreground">Link resetujacy</p>
          <p className="mt-1 text-sm leading-6 text-muted-foreground">
            Podaj adres email przypisany do konta. Wyślemy jednorazowy link do zmiany hasła.
          </p>
        </div>
      </div>
      <label className="block space-y-2">
        <span className="text-sm font-semibold text-muted-foreground">Adres e-mail</span>
        <div className="relative">
          <Mail className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
          <Input className="pl-12" placeholder="kontakt@firma.pl" />
        </div>
      </label>
      <Button className="w-full">Wyślij link <ArrowRight /></Button>
    </AuthShell>
  );
}

export function NewPasswordScreen() {
  return (
    <AuthShell title="Ustaw nowe hasło" subtitle="Hasło powinno mieć minimum 8 znaków.">
      <div className="flex items-start gap-3 rounded-lg border bg-primary-soft/45 p-4 text-primary">
        <span className="grid size-11 shrink-0 place-items-center rounded-md bg-card shadow-juz-sm">
          <KeyRound className="size-5" />
        </span>
        <div>
          <p className="font-extrabold text-foreground">Nowe hasło do konta</p>
          <p className="mt-1 text-sm leading-6 text-muted-foreground">
            Użyj minimum 8 znaków, najlepiej z cyfrą i znakiem specjalnym.
          </p>
        </div>
      </div>
      <label className="block space-y-2">
        <span className="text-sm font-semibold text-muted-foreground">Nowe hasło</span>
        <div className="relative">
          <KeyRound className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
          <Input
            aria-describedby="new-password-error"
            aria-invalid="true"
            aria-label="Nowe hasło"
            className="border-destructive/55 pl-12 focus-visible:ring-destructive"
            defaultValue="demo123"
            type="password"
          />
        </div>
      </label>
      <label className="block space-y-2">
        <span className="text-sm font-semibold text-muted-foreground">Powtórz hasło</span>
        <div className="relative">
          <ShieldCheck className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
          <Input
            aria-describedby="new-password-error"
            aria-invalid="true"
            aria-label="Powtórz hasło"
            className="border-destructive/55 pl-12 focus-visible:ring-destructive"
            defaultValue="demo124"
            type="password"
          />
        </div>
      </label>
      <div id="new-password-error" className="flex gap-3 rounded-lg border border-destructive/25 bg-destructive-soft p-4 text-destructive">
        <AlertTriangle className="mt-0.5 size-5 shrink-0" />
        <div>
          <p className="font-extrabold">Hasła nie są zgodne</p>
          <p className="mt-1 text-sm leading-6">
            Wpisz takie samo hasło w obu polach. Hasło musi mieć co najmniej 8 znaków.
          </p>
        </div>
      </div>
      <Button className="w-full">Zapisz hasło <ShieldCheck /></Button>
    </AuthShell>
  );
}
