---
name: BaHaar's Styling Studio
description: Die Website als Farbkarte des Salons — Petrolgrund, gemessene Haartöne, Bauteile aus Karton.
colors:
  grund: "oklch(17.5% .028 205)"
  grund-tief: "oklch(12.5% .022 207)"
  feld: "oklch(22.5% .032 203)"
  karte: "oklch(26.5% .030 202)"
  karte-hoch: "oklch(31% .030 201)"
  tinte: "oklch(94.5% .014 78)"
  tinte-leise: "oklch(79% .018 76)"
  tinte-still: "oklch(66% .018 74)"
  ansatz: "oklch(34% .045 55)"
  bronze: "oklch(48% .070 58)"
  karamell: "oklch(64% .095 64)"
  honig: "oklch(80% .115 74)"
  honig-hell: "oklch(88% .075 78)"
  papier: "oklch(94% .016 82)"
  papier-rand: "oklch(86% .022 80)"
  papier-tinte: "oklch(28% .022 60)"
  papier-leise: "oklch(46% .022 62)"
  rose: "oklch(80% .052 8)"
  linie: "oklch(42% .030 200 / .55)"
  linie-hell: "oklch(62% .040 198 / .34)"
  linie-honig: "oklch(80% .115 74 / .30)"
typography:
  display:
    fontFamily: "Marcellus, Georgia, serif"
    fontSize: "2.9rem → 4.2rem → 5.2rem → 6rem"
    fontWeight: 400
    lineHeight: 0.95
    letterSpacing: "-.018em"
  headline:
    fontFamily: "Marcellus, Georgia, serif"
    fontSize: "2.1rem → 2.8rem → 3.4rem → 4rem"
    fontWeight: 400
    lineHeight: 1.02
    letterSpacing: "-.008em"
  title:
    fontFamily: "Marcellus, Georgia, serif"
    fontSize: "1.5rem → 1.85rem → 2rem → 2.2rem"
    fontWeight: 400
    lineHeight: 1.14
  vorspann:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "1.15rem → 1.3rem → 1.4rem → 1.5rem"
    fontWeight: 400
    lineHeight: 1.5
  body:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "1rem → 1.0625rem → 1.125rem"
    fontWeight: 400
    lineHeight: 1.62
    fontFeature: "tabular-nums"
  klein:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "1rem"
    lineHeight: 1.62
  label:
    fontFamily: "Marcellus SC, Georgia, serif"
    fontSize: ".8rem"
    fontWeight: 400
    letterSpacing: ".12em–.26em"
rounded:
  klein: "3px"
  standard: "6px"
  blatt: "1.35rem 1.35rem .25rem .25rem"
  blatt-quer: ".25rem 100px 100px .25rem"
  pille: "100px"
spacing:
  r1: ".5rem"
  r2: "1rem"
  r3: "1.5rem"
  r4: "2.5rem"
  r5: "4rem"
  r6: "6rem"
  r7: "9rem"
  r8: "13rem"
  rand: "1.25rem → 2.5rem → 4.5rem"
  breite: "76rem"
  breite-text: "38rem"
components:
  knopf-voll:
    backgroundColor: "{colors.honig}"
    textColor: "oklch(20% .04 60)"
    typography: "{typography.label}"
    rounded: "{rounded.blatt-quer}"
    padding: ".95rem 1.7rem"
  knopf-voll-hover:
    backgroundColor: "{colors.honig-hell}"
  knopf-leer:
    backgroundColor: "transparent"
    textColor: "{colors.tinte}"
    typography: "{typography.label}"
    rounded: "{rounded.blatt-quer}"
    padding: ".95rem 1.7rem"
  knopf-leer-hover:
    textColor: "{colors.honig}"
  ruf:
    backgroundColor: "transparent"
    textColor: "{colors.honig}"
    rounded: "{rounded.blatt-quer}"
    padding: ".5rem .95rem"
  blatt:
    backgroundColor: "{colors.karte}"
    textColor: "{colors.tinte}"
    rounded: "{rounded.blatt}"
    padding: "1.5rem → 2rem → 2.25rem"
  blatt-karte:
    backgroundColor: "{colors.papier}"
    textColor: "{colors.papier-tinte}"
    rounded: "2.4rem 2.4rem .25rem .25rem"
    padding: "0 0 2.2rem"
  merken:
    backgroundColor: "transparent"
    textColor: "{colors.honig}"
    rounded: "4px"
    padding: ".22rem .5rem"
  merken-aktiv:
    backgroundColor: "{colors.honig}"
    textColor: "oklch(22% .04 60)"
  navigator-marke:
    backgroundColor: "transparent"
    textColor: "{colors.tinte-leise}"
    typography: "{typography.label}"
    rounded: ".2rem .8rem .8rem .2rem"
    padding: ".45rem .85rem"
  navigator-marke-aktiv:
    backgroundColor: "oklch(80% .115 74 / .09)"
    textColor: "{colors.honig}"
  schild:
    backgroundColor: "transparent"
    textColor: "{colors.honig}"
    typography: "{typography.label}"
    rounded: "{rounded.pille}"
    padding: ".25rem .8rem"
  arbeit-kachel:
    backgroundColor: "{colors.feld}"
    rounded: "{rounded.blatt}"
    padding: "0"
---

# Gestaltungssystem: BaHaar's Styling Studio

## Overview

**Leitbild: „Die Papeterie des Salons"**

Die Seite ist die Farbkarte, die bei jeder Beratung aufgefächert auf dem Tisch
liegt. Der Grund ist das Petrol der Moroccanoil-Regale, die im Laden jede Wand
belegen — an der Wand gemessen, nicht gewählt, und für den Bildschirm auf
Tintendichte gebracht. Darauf liegen Bauteile aus Karton: Papierweiß, feine
Kante, Farbfeld an der Spitze. Die einzige warme Achse ist Haar; ihre fünf
Stufen sind über die Arbeitsfotos des Salons gemessen und laufen vom dunklen
Ansatz zur hellen Spitze messbar ins Gelbe.

Die Dichte ist ruhig und großzügig: viel Grund, wenige Akzente, keine
Kartenwand. Wo andere Salonseiten eine Dreierreihe gleich hoher Kacheln
stellen, steht hier eine gezogene Zeilenliste. Bilder tragen ganze Abschnitte
vollflächig unter einem mehrstufigen Schleier, statt als Kachel danebenzuliegen.
Ornament tritt selten und nur dort auf, wo es inhaltlich etwas bedeutet.

Bestätigt abgelehnt: der Baukasten-Hero mit Vollbild, Serifenschrift und
Goldrand, und ebenso die weiße Minimal-Antwort darauf. Ebenfalls abgelehnt:
Farbschemata aus fremden Projekten — jede Farbe dieser Seite hat einen Beleg im
Laden.

**Key Characteristics:**

- Gemessene Farben statt gewählter: jeder Ton stammt aus einem Foto des Ladens
  oder einer echten Arbeit (`werkzeug/farben-messen.mjs`, `werkzeug/bilder-bauen.mjs`).
- Eine einzige Kantensprache, das Farbkartenblatt: oben rund, unten scharf.
- Petrolgrund über die ganze Seite, Papierweiß nur für Bauteile, die Karton sind.
- Feste Stufen in vier Umbruchpunkten statt fließender `clamp()`-Werte.
- Bewegung ausschließlich `ease-out`, ausschließlich `transform` und `opacity`.

## Colors

Eine kalte Grundwelt in Petrol (Farbton 198–207°) mit genau einer warmen Achse
(Farbton 55–82°) und einer einzigen Ornamentfarbe.

### Primary

- **Honig** (`{colors.honig}`): die tragende warme Stimme. Preise, aktive
  Navigationsmarken, Verweise im Fließtext, der gefüllte Knopf, der Fokusrahmen,
  Textmarke und `accent-color`. Ihre helle Schwester **Honig hell** ist
  ausschließlich Hover-Zustand des gefüllten Knopfs.
- **Karamell**, **Bronze**, **Ansatz**: die dunkleren Stufen derselben
  Haarachse. Sie tragen Verläufe und Materialien — die Niete des Fächers, die
  Bänder der Tonleiter — nie Fließtext.

### Secondary

- **Rosé** (`{colors.rose}`, Farbton 6–8°, gemessen an der Wand im Brautfoto):
  tritt an genau einer Achse auf, der des Brautstylings — als Punkt der
  Ablaufleiste und als Kante des gezogenen Brautblattes.

### Neutral

- **Grund** (`{colors.grund}`): Seitengrund überall, und zugleich die Farbe
  jedes Schleiers über einem Foto. **Grund tief** liegt darunter: Fußzeile,
  Rollbalkenbahn, Textfarbe auf dem gefüllten Knopf.
- **Feld**, **Karte**, **Karte hoch**: die drei Flächenstufen über dem Grund.
  Höher heißt näher; es gibt keine vierte Stufe.
- **Tinte**, **Tinte leise**, **Tinte still**: die Textleiter. Fließtext ist
  „leise", Hervorhebung und Namen sind „Tinte", Nebenangaben wie Dauer und
  Zusatz sind „still".
- **Papier**, **Papier-Rand**, **Papier-Tinte**, **Papier-Leise**: die
  Kartonwelt. Nur für Bauteile, die tatsächlich Blatt sind — Fächerblätter,
  das Schildchen der Tonleiter.
- **Linie**, **Linie hell**, **Linie honig**: Hairlines. Eine Linie ist immer
  1 px und immer halbdurchsichtig.

### Named Rules

**Die Messregel.** Keine Farbe der Seite ist ausgedacht. Eine neue Farbe kommt
aus einem Foto und wird mit den Werkzeugen in `werkzeug/` gemessen, bevor sie in
`:root` steht. Prüftest: zu jedem Token lässt sich das Foto benennen, aus dem
es stammt.

**Die Ornamentregel.** Rosé ist niemals Textfarbe. Es erscheint als Punkt,
Kante oder Fläche, nie als Buchstabe. Kommt eine dritte Farbe hinzu, gilt für
sie dasselbe.

**Die Regel der einen warmen Stimme.** Auf dunklem Grund spricht genau eine
warme Farbe: Honig. Preise, Verweise und die aktive Marke tragen sie; sonst
nichts. Wird sie zur Fläche (gefüllter Knopf, gedrückte Merkmarke), steht der
Text darauf in einem dunklen Braunton, nie in Weiß.

**Die Schleierregel.** Text steht nie direkt auf einem Foto. Über jedem Bild
liegt ein zweifacher Verlauf in der Grundfarbe: senkrecht in die Abschnittsränder
hinein, waagrecht dichter dort, wo Text steht. Unter 60 rem entfällt der
seitliche Verlauf und wird durch eine gleichmäßige Überlagerung ersetzt, weil
er sonst genau in den Text greift.

## Typography

**Titelschrift:** Marcellus (Rückfall Georgia, serif)
**Fließschrift:** Archivo (Rückfall system-ui, sans-serif), variabel 100–900
**Auszeichnung:** Marcellus SC (Rückfall Georgia, serif) — Kapitälchen

**Charakter:** Eine geprägte, klassizistische Antiqua für alles Benannte, eine
sachliche Grotesk mit Tabellenziffern für alles Gezählte. Die Kapitälchen sind
der Stempel auf dem Kartonblatt: kurz, weit gestellt, nie als Fließtext.
Alle drei Schriften liegen im Projekt (`schrift/`, 105 KB, auf den benötigten
Zeichenvorrat zugeschnitten) — kein Nachladen von fremden Servern.

### Hierarchie

- **Display** (`.titel-gross`, 400, 2,9→6 rem, Zeilenhöhe 0,95): der Seitentitel
  im ersten Bildschirm, einmal pro Seite.
- **Headline** (`.titel`, 400, 2,1→4 rem, Zeilenhöhe 1,02): Abschnittsüberschrift.
- **Title** (`.titel-klein`, 400, 1,5→2,2 rem, Zeilenhöhe 1,14): Unterabschnitt,
  Begriff in der Zeilenliste, Rechtstext-`h2`.
- **Vorspann** (400, 1,15→1,5 rem, Zeilenhöhe 1,5, „Tinte leise", max. 34ch):
  der Absatz direkt unter einem Titel.
- **Body** (400, 1→1,125 rem, Zeilenhöhe 1,62, Lesespalte 38 rem): Fließtext.
- **Label** (Marcellus SC, 0,72–0,8 rem, Laufweite 0,12–0,26 em): Knöpfe,
  Navigatormarken, Tafelkopf, Blattname, Schild, Fußzeilenüberschriften.
- **Zahl** (`.zahl`, Archivo, `tnum`, Laufweite 0,01 em): Preise, Zeiten,
  Dauern — immer gleich breit.

### Named Rules

**Die Zwei-Stufen-Regel unterhalb der Grundgröße.** Unter dem Fließtext gibt es
genau zwei Größen: `--s-klein` (1 rem, Nebentext) und `--s-mini` (0,8 rem, nur
gesperrte Kapitälchen). Weiter abgestuft wird über die Textfarbe, nicht über
die Größe.

**Die Stufenregel.** Schriftgrößen sind feste Werte in vier Umbruchpunkten
(Grundzustand, 40 rem, 64 rem, 88 rem), nicht `clamp()`. Feste Werte kann jeder
Browser und jedes Prüfwerkzeug ausrechnen.

**Die Kapitälchenregel.** Weite Laufweite (≥ 0,12 em) gehört ausschließlich
Marcellus SC und ausschließlich kurzen Auszeichnungen. Kein Fließtext dieser
Seite ist gesperrt. Wird die Auszeichnungsschrift gewechselt, gehört diese
Regel geprüft — und mit ihr die abgeschaltete Prüferregel `wide-tracking`
(Begründung in `.impeccable/LIESMICH.md`).

**Die Trennregel.** Deutsche Zusammensetzungen werden in Anzeigengröße breiter
als ein 320-px-Schirm. Überschriften tragen deshalb `overflow-wrap: break-word`,
unter 30 rem zusätzlich `hyphens: auto`; das greift, weil `lang="de"` am `<html>`
steht.

## Layout

Ein einspaltiges Grundraster: Bahn (`--rand`) mal Satzbreite (76 rem), zentriert.
Fließtext bekommt eine eigene, schmalere Lesespalte (38 rem); Nebenangaben werden
zusätzlich in `ch` begrenzt (34ch Vorspann, 44ch Ablauftext, 52ch Zeilenliste).

Abstände laufen über eine einzige Vierer-Reihe `--r1` … `--r8` (0,5 / 1 / 1,5 /
2,5 / 4 / 6 / 9 / 13 rem). Seitenrand, Abschnittshöhe und Kartenpolsterung
wachsen in drei Sprüngen mit:

| | Grundzustand | ≥ 40 rem | ≥ 64 rem | ≥ 88 rem |
|---|---|---|---|---|
| Seitenrand | 1,25 rem | 2,5 rem | 4,5 rem | — |
| Abschnitt (oben/unten) | 4,5 rem | 6,5 rem | 9 rem | 11 rem |
| Abschnitt eng | 3,5 rem | 4,5 rem | 6 rem | 7 rem |
| Kartenpolster | 1,5 rem | 2 rem | 2,25 rem | — |

Weitere Umbruchpunkte im Bestand: 22,5 rem (Buchungstor), 30 rem (Silbentrennung,
Fächerspanne, Tonleiter), 44/46/48 rem (Preistafel, Gruppenabstand), 58 rem
(Handymenü), 60 rem (Schleier), 64 rem (Fächerfeld).

**Die Kopfregel.** Über einer Überschrift steht mehr Luft als darunter:
`.kopf` trägt `clamp(2.5rem, 5vw, 6rem)` nach unten, der Titel darin 1,5 rem.

**Die Zeilenregel.** Wiederholte Inhalte stehen als gezogene Zeile
(`.zeilenliste`: 14 rem Begriffsspalte, Rest Beschreibung, Hairline oben, beim
letzten auch unten), nicht als Dreierreihe gleich hoher Karten. Karten erzwingen
gleiche Höhe bei ungleich langem Inhalt und hinterlassen Totfläche.

**Die Rasterregel für Arbeiten.** Vier Spalten ab 40 rem, `grid-auto-flow: row
dense`, zwei große Kacheln zu je vier Feldern und acht kleine — genau sechzehn
Felder, ein volles Viereck ohne Loch. Sechs Spalten lassen zwei Felder leer, und
das sieht man.

**Die Preistafelregel.** Die Spalten wandern nie (`1fr 6rem 6rem 5.5rem`), nur
ihr Inhalt wechselt; die Tafel ist auf 58 rem begrenzt, damit das Auge nicht
700 px leere Fläche vom Namen zum Preis überqueren muss. Unter 46 rem fällt der
Tafelkopf weg und jede Zahl trägt ihre Beschriftung selbst über `attr(data-was)`.

**Bewegung.** Nur `ease-out`: `--kurve` (`cubic-bezier(.22,.61,.36,1)`) für
Zustände, `--kurve-weit` (`cubic-bezier(.16,.84,.44,1)`) für weite Wege. Dauern
sind 0,3 s / 0,5 s / 0,8 s. Animiert werden ausschließlich `transform` und
`opacity`. Hover-Effekte stehen hinter `@media (hover: hover) and (pointer: fine)`.
`prefers-reduced-motion` schaltet Einblendungen ganz ab und kappt alle Dauern.
Einblendungen (`.auf`) sind ohne JavaScript sichtbar: der Ausgangszustand ist
sichtbar, erst die Klasse `mitskript` am `<html>` schaltet sie scharf.

## Elevation & Depth

Das System ist überwiegend tonal: Tiefe entsteht durch die Flächenleiter
(Grund → Feld → Karte → Karte hoch) und durch 1-px-Hairlines, nicht durch
Schatten. Schatten treten nur dort auf, wo ein Gegenstand physisch über einem
anderen liegt — Kartonblatt über Karton, Bild über Verdunkelung, klebende Leiste
über der Seite. Sie sind weich, weit und in Petrol getönt (`oklch(5–10% .02 205)`),
nie schwarz und nie versetzt.

### Schattenvokabular

- **Kante** (`0 0 0 1px var(--papier-rand)`): das geschlossene Fächerblatt. Ein
  gezeichneter Blattrand, kein Schatten.
- **Blatt liegend** (`0 0 0 1px var(--papier-rand), 0 10px 26px oklch(9% .02 205 / .42)`):
  Fächerblatt im aufgefächerten Ruhezustand.
- **Blatt gezogen** (`0 0 0 1px var(--honig), 0 18px 40px oklch(8% .02 205 / .6)`):
  das gewählte Blatt; auf der Brautachse steht statt Honig `var(--rose)`.
- **Niete** (`0 0 0 1px var(--linie-honig), 0 6px 18px oklch(10% .02 205 / .5)`):
  der Messingnagel unter dem Fächer.
- **Lupe** (`0 30px 80px oklch(5% .02 205 / .7)`): das Bild im Dialog.
- **Klebekante** (`0 1px 0 var(--linie)`): die gesetzte Kopfzeile. Eine Linie,
  kein Schlagschatten.

**Die Glasregel.** Alles, was klebt oder überlagert, ist getöntes Glas:
Petrolgrund mit 0,90–0,98 Deckung plus `backdrop-filter: blur(10–18px)`.
Kopfzeile 14 px, Navigator 14 px, Handymenü 18 px, Lupe 10 px.

**Die Flachregel.** Flächen ruhen flach. Ein Schatten ist entweder Material
(Karton, Metall) oder Zustand (gezogen, geöffnet) — nie Dekoration auf einer
Karte, die ohnehin schon eine Hairline hat.

## Shapes

Die Kantensprache kommt vom Farbkartenblatt und hat genau zwei Formen, die
alles tragen:

- **Stehendes Blatt** (`--bogen-blatt`, `1.35rem 1.35rem .25rem .25rem`): oben
  rund, unten scharf. Karten (`.blatt`), Arbeitskacheln, Bilder in der Lupe.
- **Liegendes Blatt** (`--bogen-blatt-quer`, `.25rem 100px 100px .25rem`):
  dasselbe Blatt auf der Seite — rund an der Spitze, scharf an der Niete. Alle
  Knöpfe, die Telefonmarke. Die Navigatormarke ist die verkleinerte Variante
  (`.2rem .8rem .8rem .2rem`).

Daneben nur: 3 px (`--bogen-klein`, Fokusrahmen), 6 px (`--bogen`), 4 px
(Merkmarke), `100px` für echte Pillen und Kreise (Menüknopf, Lupenknöpfe,
Schild, Schildchen der Tonleiter, Rollbalken). Das Fächerblatt selbst trägt
einen größeren Bogen derselben Form (`2.4rem 2.4rem .25rem .25rem`), weil es
höher ist als eine Karte.

Ränder sind immer 1 px und immer halbdurchsichtig. Zwei Muster als SVG-Daten-URI
stehen bereit und werden sparsam eingesetzt: feine Strähnen (`--muster-straehne`,
Deckung 0,05) und das gestanzte Loch der Niete (`--muster-raster`, Deckung 0,07).

**Die Eine-Kante-Regel.** Ein neues Bauteil bekommt eine der beiden Blattformen
oder eine echte Pille. Ein frei erfundener Radius ist ein Fehler.

## Components

### Knöpfe

Charakter: ein Kartonblatt auf der Seite — ruhig, breit gepolstert, mit
Kapitälchenbeschriftung.

- **Form:** liegendes Blatt (`{rounded.blatt-quer}`), Polster `.95rem 1.7rem`,
  Marcellus SC, 1 rem, Laufweite 0,12 em.
- **Voll** (`.knopf-voll`): Honigfläche, dunkelbrauner Text. Hover: Honig hell
  plus `translateY(-2px)`.
- **Leer** (`.knopf-leer`): transparent, Rand „Linie hell", Text „Tinte".
  Hover: Rand und Text auf Honig, `translateY(-2px)`.
- **Gedrückt:** `translateY(0)` — der Knopf setzt sich auf.
- **Reihe:** `.knopfreihe`, `flex-wrap`, Lücke 1 rem.
- **Telefonmarke** (`.ruf`): dieselbe Form kleiner, Honigrand, Honigtext,
  Inline-SVG-Hörer bei 1 em. Steht in der Kopfzeile auf jedem Bildschirm.

### Karten / Behälter

- **Ecken:** stehendes Blatt (`{rounded.blatt}`).
- **Grund:** „Karte" auf Petrolgrund; die Kartonvariante nutzt „Papier" mit
  „Papier-Rand" und „Papier-Tinte".
- **Rand:** 1 px „Linie". **Schatten:** keiner im Ruhezustand.
- **Polster:** 1,5 / 2 / 2,25 rem nach Umbruchpunkt.

### Marken und Schalter

- **Merkmarke** (`.merken`): der Preis selbst ist der Schalter — kein Symbol
  daneben. Ruhezustand Honigtext auf transparent mit 4 px Radius; ein „+"
  erscheint bei Hover oben rechts. Gedrückt (`aria-pressed="true"`): Honigfläche,
  dunkelbrauner Text, „✓" statt „+".
- **Schild** (`.schild`): Pille mit Honigrand, Kapitälchen, vorangestellter
  Punkt aus `currentColor`. Ein Anhänger, kein Auszeichnungsstreifen über einer
  Überschrift.
- **Folgenummer** (`.folge`): Honig, 0,62 em, vor der Gruppenüberschrift der
  Preisliste. Die Reihenfolge ist dort eine Aussage — gegliedert wird nach dem,
  was auf dem Stuhl zuerst passiert.

### Navigation

- **Kopfzeile:** klebend, transparent im Ruhezustand; ab dem ersten Scrollen
  trägt sie `.gesetzt` — getöntes Glas plus Hairline. Marke in Marcellus 1,25 rem
  mit gesperrtem Kapitälchen-Zusatz in Honig darunter.
- **Wegweiser:** Archivo 1 rem, „Tinte leise", darunter eine Honiglinie, die aus
  der linken Kante aufzieht (`scaleX(0) → 1`). Die aktuelle Seite trägt sie
  dauerhaft und steht in „Tinte".
- **Handymenü** (unter 58 rem): Vollflächige Tafel von oben, Petrolglas,
  Einträge in Marcellus 1,35 rem, durch Hairlines getrennt; der Schalter
  verwandelt drei Striche in ein Kreuz (nur `transform` und `opacity`).
- **Navigator** (Leistungsseite): klebende Leiste über den Gruppen, waagrecht
  rollbar mit `scroll-snap`, ohne sichtbaren Rollbalken. Weicht beim
  Runterscrollen nach oben aus (`translateY(-108%)`) und kommt beim Hochscrollen
  zurück; ein Anker mit Höhe 0 davor liefert die Bezugsposition, weil ein
  klebendes Element seine Klebeposition meldet.

### Bilder

- **Arbeitskachel:** Blattform, `overflow: hidden`, Seitenverhältnis 3/4
  (große Kacheln 1/1, ab 40 rem 3/4). Bild leicht entsättigt (0,94); bei Hover
  wächst es auf 1,05 und sättigt auf 1,04. Keine Beschriftung und kein Symbol
  auf der Kachel.
- **Lupe** (`<dialog>`): Petrolglas mit 0,93 Deckung, Bild in Blattform mit
  weitem Schatten, Bildunterschrift darunter zentriert. Das Aussehen hängt an
  `[open]`, der Übergang an `allow-discrete` und `@starting-style` — sonst liegt
  der geschlossene Dialog unsichtbar über der Seite und schluckt jeden Klick.

### Der Farbfächer (Signatur)

Die eine Idee, die es sonst nirgends gibt. Acht Kartonblätter sitzen auf
derselben Niete am unteren Rand und sind von dort aufgefächert; gedreht wird
ausschließlich über `transform` um `transform-origin: 50% 100%`.

- **Blatt:** Papierfläche, Blattform mit großem Bogen, oben ein Farbfeld über
  38 % der Höhe — ein Verlauf aus zwei am Foto genau dieser Arbeit gemessenen
  Proben (`--ton-oben`, `--ton-unten`). Im Ruhezustand leicht abgedunkelt
  (`brightness(.9) saturate(.94)`).
- **Name:** längs am Blatt (`writing-mode: vertical-rl`), Marcellus SC, nur auf
  dem gezogenen Blatt sichtbar; alle anderen tragen ihn im `aria-label`.
- **Gezogen:** `scale(1.05)`, volle Farbe, Honigkante, weiter Schatten.
- **Auffächerung:** `--spanne` steht im Stylesheet (112°, 96° zwischen 30 und
  48 rem, 84° darunter) und wird von `seite.js` ausgelesen — der Winkel gehört
  zur Gestaltung, nicht zum Verhalten. Vor dem Auftauchen liegen die Blätter
  geschlossen aufeinander; bei `prefers-reduced-motion` stehen sie sofort offen.
- **Niete:** Messingkugel aus einem radialen Verlauf Honig hell → Karamell →
  Ansatz, 1,75 rem.
- **Bedienung:** Reitermuster mit Pfeiltasten; `touch-action: pan-y`, damit
  senkrechtes Scrollen erhalten bleibt.

### Die Tonleiter

Derselbe Fächer im geschlossenen Zustand: acht Bänder von der Kante gesehen, in
denselben acht gemessenen Tönen, über die volle Breite am Fuß des ersten
Bildschirms. Jedes Band beginnt oben im Grund und endet unten in „Feld", damit
das Foto in einen Verlauf endet statt an einer Kante. Die Beschriftung sitzt auf
einem gedruckten Papierschildchen in der Mitte, weil der Ton darunter mal hell,
mal dunkel ist. Hover dehnt die Bänder (`scaleY(1.22)`) — nie die Höhe, das wäre
eine Layout-Eigenschaft.

## Do's and Don'ts

### Do:

- **Do** jede neue Farbe aus einem Foto des Ladens messen und als Token in
  `:root` legen — `werkzeug/farben-messen.mjs` und `werkzeug/bilder-bauen.mjs`
  geben die Werte aus.
- **Do** für jedes neue Bauteil eine der beiden Blattformen nehmen
  (`--bogen-blatt` stehend, `--bogen-blatt-quer` liegend) oder eine echte Pille.
- **Do** Abstände aus der Reihe `--r1` … `--r8` nehmen und Größensprünge in die
  vorhandenen Umbruchpunkte (40 / 64 / 88 rem) legen.
- **Do** Fotos vollflächig unter dem mehrstufigen Schleier einsetzen und unter
  60 rem auf gleichmäßige Überlagerung wechseln.
- **Do** wiederholte Inhalte als `.zeilenliste` setzen.
- **Do** Zahlen in Archivo mit `tabular-nums` setzen, damit Preise untereinander
  stehen.
- **Do** Hover hinter `@media (hover: hover) and (pointer: fine)` legen und
  `prefers-reduced-motion` bedienen.
- **Do** Einblendungen so bauen, dass der sichtbare Zustand der Ausgangszustand
  ist und erst `.mitskript` sie scharf schaltet.

### Don't:

- **Don't** Rosé als Textfarbe einsetzen — es ist Ornament, an genau einer Achse.
- **Don't** Honig als Fläche mit weißem Text kombinieren; darauf steht ein
  dunkler Braunton (`oklch(20–22% .04 60)`).
- **Don't** Fließtext sperren. Weite Laufweite gehört ausschließlich kurzen
  Marcellus-SC-Auszeichnungen.
- **Don't** `clamp()` für Schriftgrößen, Seitenrand oder Abschnittshöhe
  einführen; diese Werte sind bewusst feste Stufen.
- **Don't** Dreierreihen gleich hoher Karten bauen.
- **Don't** Layout-Eigenschaften animieren (Höhe, Breite, `top`) — nur
  `transform` und `opacity`.
- **Don't** federnde oder zurückschwingende Kurven verwenden; es gibt nur die
  beiden `ease-out`-Kurven und die drei Dauern 0,3 / 0,5 / 0,8 s.
- **Don't** harte, versetzte oder schwarze Schlagschatten setzen; Schatten sind
  weit, weich und in Petrol getönt.
- **Don't** Schriften von fremden Servern nachladen — sie liegen in `schrift/`.
- **Don't** Symbole aus einer Zeichenschrift verwenden; Symbole sind Inline-SVG
  mit `currentColor` und `stroke-width: 1.7`.
- **Don't** eine gesperrte Kleinzeile über eine große Überschrift setzen. Im
  ersten Bildschirm stehen Adresse und Öffnungsstand bewusst darunter.
