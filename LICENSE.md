# design.juz.pl Attribution License (v1.0)

Copyright (c) Alfabet sp. z o.o. (`https://www.alfabet.lu`)

Author: Rafał Mazur
Owner: Alfabet sp. z o.o.

---

## TL;DR

Możesz używać design.juz.pl w projektach **komercyjnych i niekomercyjnych**, modyfikować go i redystrybuować. W zamian wymagamy widocznej **atrybucji w stopce** wdrażanego produktu z linkiem do tego repo.

---

## 1. Przyznane prawa

Niniejszym udzielamy każdej osobie, która otrzyma kopię tego oprogramowania, dokumentacji, tokenów, komponentów, ekranów i stories (dalej: „Design System"), bezpłatnej, ogólnoświatowej, nieodwołalnej licencji na:

- **Używanie** Design Systemu w dowolnych projektach, w tym komercyjnych.
- **Modyfikowanie** komponentów, tokenów, stories i dokumentacji we własnych forkach lub kopiach.
- **Łączenie** z własnym lub cudzym kodem (dual-licensing własnych modyfikacji jest dozwolone).
- **Redystrybucję** kopii Design Systemu, w tym zmodyfikowanych wersji.
- **Subkomponowanie** wybranych części Design Systemu we własnym design systemie.

## 2. Warunek atrybucji (wymagany)

Każde publiczne wdrożenie (produkt SaaS, strona, aplikacja, dokumentacja, demo), które zawiera komponenty, tokeny lub układy z Design Systemu — także po modyfikacji — musi zawierać **widoczną atrybucję** w stopce strony lub w odpowiednim miejscu sekcji „O aplikacji" / „Credits".

Minimalna wymagana treść atrybucji:

```html
<footer>
  UI based on
  <a href="https://github.com/erp77flow/design.juz.pl"
     target="_blank" rel="noopener">design.juz.pl</a>
</footer>
```

Rozszerzona forma (rekomendowana w dokumentacji i README):

```txt
UI based on design.juz.pl
Author: Rafał Mazur
Owner: Alfabet sp. z o.o. — https://www.alfabet.lu
Repo: https://github.com/erp77flow/design.juz.pl
```

Atrybucja musi być:

- **Widoczna** dla użytkownika końcowego — nie wystarczy ukrycie w komentarzu HTML/JS.
- **Klikalna** — z hiperłączem do https://github.com/erp77flow/design.juz.pl (`rel="noopener"` jest OK).
- **Czytelna** — bez celowego ukrywania (`opacity:0`, `display:none`, `color: transparent` itp.).

W projektach typu CLI / SDK / library bez UI końcowego: wymagana atrybucja w `README.md` lub w dokumentacji wystawianej użytkownikom.

## 3. Atrybucja w kodzie źródłowym

W każdej kopii lub zmodyfikowanej wersji Design Systemu muszą pozostać:

- Plik `LICENSE.md` (lub równoważne odwołanie do niniejszej licencji).
- Informacja o autorze: **Rafał Mazur**.
- Informacja o właścicielu: **Alfabet sp. z o.o.** (`https://www.alfabet.lu`).

Nie wolno usuwać tych informacji z plików `LICENSE.md`, `README.md` ani z metadanych `package.json`.

## 4. Ograniczenia

- Nazwa **juz.pl**, znak graficzny juz.pl, logo juz.pl i identyfikacja marki pozostają wyłączną własnością Alfabet sp. z o.o.
- Nie wolno używać marki juz.pl, alfabet.lu ani imienia autora w sposób sugerujący sponsorowanie, partnerstwo lub poparcie konkretnego produktu bez pisemnej zgody Alfabet sp. z o.o.
- Nie wolno tworzyć produktu, który **podszywa się pod juz.pl** lub jest mylącą kopią usługi juz.pl.
- Nie wolno usuwać wymaganej atrybucji (sekcja 2) ani zaciemniać jej.

## 5. Brak gwarancji

Design System jest udostępniany „TAK JAK JEST", bez jakichkolwiek gwarancji wyraźnych lub dorozumianych — w tym gwarancji przydatności handlowej, przydatności do określonego celu, dokładności, jakości lub nienaruszania praw osób trzecich.

Autor i właściciel **nie ponoszą odpowiedzialności** za jakiekolwiek roszczenia, szkody lub inne zobowiązania wynikające z używania Design Systemu lub innych operacji z nim związanych — w tym z błędów w komponentach, niezgodności z WCAG w konkretnych warunkach, problemów z wydajnością lub utratą danych w aplikacjach pochodnych.

## 6. Wygasanie licencji

Naruszenie warunków atrybucji (sekcja 2) lub ograniczeń (sekcja 4) powoduje automatyczne wygaśnięcie udzielonej licencji. Możesz przywrócić licencję, jeżeli usuniesz naruszenie w ciągu 30 dni od pisemnego zawiadomienia.

## 7. Kontakt

Pytania licencyjne, pisemne zgody na rozszerzony zakres użycia lub komercyjne partnerstwo:

```txt
Alfabet sp. z o.o.
https://www.alfabet.lu
```

---

To jest oryginalna licencja produktu **design.juz.pl** w wersji 1.0 (2026-05-25). Wersja angielska jest tłumaczeniem informacyjnym — w przypadku rozbieżności wiążąca jest wersja polska.
