---
name: BaHaar's Styling Studio
description: Die Website als Farbkarte des Salons — weißer Grund, das Türkis der Regale, gemessene Haartöne.
colors:
  grund: "oklch(99% .004 200)"
  grund-tief: "oklch(95% .018 198)"
  feld: "oklch(97% .013 198)"
  karte: "oklch(100% 0 0)"
  glas: "oklch(99% .004 200 / .86)"
  glas-dicht: "oklch(99% .004 200 / .94)"
  glas-voll: "oklch(99% .004 200 / .98)"
  tinte: "oklch(26% .040 205)"
  tinte-leise: "oklch(40% .032 203)"
  tinte-still: "oklch(47% .026 202)"
  tinte-hell: "oklch(99% .004 200)"
  auf-tuerkis: "oklch(88% .030 200)"
  tuerkis: "oklch(48% .105 202)"
  tuerkis-hell: "oklch(66% .105 200)"
  tuerkis-blass: "oklch(93% .035 198)"
  tuerkis-tief: "oklch(38% .080 204)"
  haar-ansatz: "oklch(34% .045 55)"
  haar-bronze: "oklch(48% .070 58)"
  haar-karamell: "oklch(64% .095 64)"
  haar-hell: "oklch(78% .085 74)"
  papier: "oklch(98.5% .012 88)"
  papier-rand: "oklch(88% .018 85)"
  papier-tinte: "oklch(30% .025 60)"
  rose: "oklch(64% .095 8)"
  linie: "oklch(55% .025 200 / .28)"
  linie-hell: "oklch(60% .030 198 / .16)"
  linie-akzent: "oklch(48% .105 202 / .32)"
  linie-auf-tuerkis: "oklch(99% .004 200 / .24)"
  kante-hell: "oklch(30% .020 60 / .16)"
  kante-perle: "oklch(40% .050 60 / .35)"
  rollbalken: "oklch(80% .030 200)"
  rollbalken-hoch: "oklch(66% .055 200)"
  fremd-grund: "#ffffff"
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
  preis:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "1.9rem"
    lineHeight: 1
    fontFeature: "tabular-nums"
  marke:
    fontFamily: "Marcellus, Georgia, serif"
    fontSize: "1.25rem"
    fontWeight: 400
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
  blatt-spitz: "2.4rem 2.4rem .25rem .25rem"
  marke: ".2rem .8rem .8rem .2rem"
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
    backgroundColor: "{colors.tuerkis}"
    textColor: "{colors.tinte-hell}"
    typography: "{typography.label}"
    rounded: "{rounded.blatt-quer}"
    padding: ".95rem 1.7rem"
  knopf-voll-hover:
    backgroundColor: "{colors.tuerkis-hell}"
  knopf-leer:
    backgroundColor: "transparent"
    textColor: "{colors.tinte}"
    typography: "{typography.label}"
    rounded: "{rounded.blatt-quer}"
    padding: ".95rem 1.7rem"
  knopf-leer-hover:
    textColor: "{colors.tuerkis}"
  ruf:
    backgroundColor: "transparent"
    textColor: "{colors.tuerkis}"
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
    rounded: "{rounded.blatt-spitz}"
    padding: "0 0 2.2rem"
  merken:
    backgroundColor: "transparent"
    textColor: "{colors.tuerkis}"
    rounded: "4px"
    padding: ".22rem .5rem"
  merken-aktiv:
    backgroundColor: "{colors.tuerkis}"
    textColor: "{colors.tinte-hell}"
  navigator-marke:
    backgroundColor: "transparent"
    textColor: "{colors.tinte-leise}"
    typography: "{typography.label}"
    rounded: "{rounded.marke}"
    padding: ".45rem .85rem"
  navigator-marke-aktiv:
    backgroundColor: "oklch(48% .105 202 / .10)"
    textColor: "{colors.tuerkis}"
  schild:
    backgroundColor: "transparent"
    textColor: "{colors.tuerkis}"
    typography: "{typography.label}"
    rounded: "{rounded.pille}"
    padding: ".25rem .8rem"
  schildchen-tonleiter:
    backgroundColor: "{colors.papier}"
    textColor: "{colors.papier-tinte}"
    typography: "{typography.label}"
    rounded: "{rounded.pille}"
    padding: ".2rem .9rem"
  arbeit-kachel:
    backgroundColor: "{colors.feld}"
    rounded: "{rounded.blatt}"
    padding: "0"
---

# Gestaltungssystem: BaHaar's Styling Studio

## Overview

**Leitbild: „Die Papeterie des Salons"**

Die Seite ist die Farbkarte, die bei jeder Beratung aufgefächert auf dem Tisch
liegt. Der Laden ist hell: weiß gefliest, Tageslicht von der Perlacher Straße,
und an jeder Wand das Türkis der Moroccanoil-Regale — an der Wand gemessen,
nicht gewählt (oklch 61,3 % .053 200,8). Genau so ist die Seite gebaut: Weiß
als Grund, Türkis als Stimme. Die einzige warme Achse ist Haar; ihre vier
Stufen sind über die Arbeitsfotos des Salons gemessen und laufen vom dunklen
Ansatz zur hellen Spitze messbar ins Gelbe. Sie tragen keine Schrift mehr,
sondern nur noch das, was im Laden auch warm ist: die Fotos, die Blätter der
Farbkarte, die Bänder der Tonleiter.

Genau ein Abschnitt kippt um. Die Türkisbahn — „Perlacher Straße 2" mit
Öffnungszeiten, Anschrift und Erreichbarkeit — steht auf voller Fläche im
Regal-Türkis, die Schrift darauf hell. Das ist der Anker der Seite; davor und
danach steht wieder Weiß. Ein zweiter solcher Abschnitt wäre Dekor.

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
- Weißer Grund über die ganze Seite, genau eine Türkisfläche als Anker.
- Feste Stufen in vier Umbruchpunkten statt fließender `clamp()`-Werte.
- Bewegung ausschließlich `ease-out`, ausschließlich `transform` und `opacity`.
- Jeder Gestaltungswert steht als Token in `:root` — auch der Rollbalken.

## Colors

Eine helle Grundwelt in fast reinem Weiß mit einem Hauch Türkis (Farbton
198–205°), einer warmen Achse aus Haar (Farbton 55–88°), die keine Schrift
mehr trägt, und einer einzigen Ornamentfarbe.

### Primary

- **Türkis** (`{colors.tuerkis}`): die tragende Stimme. Preise, aktive
  Navigationsmarken, Verweise im Fließtext, der gefüllte Knopf, der Fokusrahmen,
  Textmarke und `accent-color`. Sie liegt bei 48 % Helligkeit, weil sie Schrift
  trägt und auf Weiß sicher über 4,5 : 1 kommen muss. **Türkis hell** ist
  ausschließlich Hover-Zustand des gefüllten Knopfs, **Türkis blass** die
  Beschriftung auf der Türkisfläche.
- **Türkis tief** (`{colors.tuerkis-tief}`): nur als Fläche, nur einmal — die
  Türkisbahn. Tief genug, dass helle Schrift darauf über 4,5 : 1 liegt.
- **Haar-Karamell**, **Haar-Bronze**, **Haar-Ansatz**, **Haar hell**: die
  Stufen der Haarachse. Sie tragen Verläufe und Materialien — die Niete des
  Fächers, die Bänder der Tonleiter, die Farbfelder der Blätter — nie Text.

### Secondary

- **Rosé** (`{colors.rose}`, Farbton 6–8°, gemessen an der Wand im Brautfoto):
  tritt an genau einer Achse auf, der des Brautstylings — als Punkt der
  Ablaufleiste und als Kante des gezogenen Brautblattes.

### Neutral

- **Grund** (`{colors.grund}`): Seitengrund überall, und zugleich die Farbe
  jedes Schleiers über einem Foto. Für die Schleier liegt der Grund in sechs
  festen Deckungsstufen bereit (`--grund-96`, `--grund-88`, `--grund-72`,
  `--grund-52`, `--grund-28`, `--grund-00`); sie sind ausgeschrieben, nicht
  relativ gerechnet, damit sie in jedem Browser gleich ankommen. **Grund tief**
  ist die tiefste Fläche: Fußzeile und Rollbalkenbahn.
- **Glas**, **Glas dicht**, **Glas voll**: derselbe Grund, nur durchlässig, für
  die Leisten, die über dem Inhalt liegen — Kopfzeile, Navigator und Lupe,
  Menü und Merkzettel. Drei Stufen, mehr braucht es nicht.
- **Feld**, **Karte**: die zwei Flächenstufen neben dem Grund. „Feld" ist eine
  Spur türkiser und setzt einen Abschnitt ab, „Karte" ist reines Weiß und hebt
  ein Bauteil heraus.
- **Tinte**, **Tinte leise**, **Tinte still**: die Textleiter auf hellem
  Grund, dunkles Petrol statt Grau — ein grauer Text macht eine helle Seite
  schmutzig. Fließtext ist „leise", Hervorhebung und Namen sind „Tinte",
  Nebenangaben wie Dauer und Zusatz sind „still".
- **Tinte hell** (`{colors.tinte-hell}`): die Gegenrichtung — helle Schrift auf
  Türkisflächen: der gefüllte Knopf, die gedrückte Merkmarke, die Türkisbahn.
  **Auf Türkis** ist die Nebenschrift dort.
- **Papier**, **Papier-Rand**, **Papier-Tinte**: die Kartonwelt. Eine Spur
  wärmer als der Grund, damit ein Blatt sich davon abhebt statt darin zu
  verschwinden. Nur für Bauteile, die tatsächlich Blatt sind — Fächerblätter,
  das Schildchen der Tonleiter.
- **Linie**, **Linie hell**, **Linie Akzent**: Hairlines auf hellem Grund.
  **Kante hell** ist dieselbe Rolle auf Papier, **Linie auf Türkis** dieselbe
  Rolle auf der Türkisbahn. Eine Linie ist immer 1 px und immer halbdurchsichtig.
- **Rollbalken** und **Rollbalken hoch**: der Griff des Rollbalkens im Ruhe-
  und im Hover-Zustand. Der Rollbalken ist Fläche der Seite und wird deshalb
  wie eine gestaltet.
- **Fremd-Grund** (`{colors.fremd-grund}`): der Grund des eingebetteten
  Buchungsfensters. Ein benannter Fremdkörper — er markiert die einzige Fläche
  der Seite, die wir nicht gestalten, statt sie unbenannt einzuschleusen.

### Named Rules

**Die Messregel.** Keine Farbe der Seite ist ausgedacht. Eine neue Farbe kommt
aus einem Foto und wird mit den Werkzeugen in `werkzeug/` gemessen, bevor sie in
`:root` steht. Prüftest: zu jedem Token lässt sich das Foto benennen, aus dem
es stammt.

**Die Ornamentregel.** Rosé ist niemals Textfarbe. Es erscheint als Punkt,
Kante oder Fläche, nie als Buchstabe. Dasselbe gilt seit dem hellen Grund für
die ganze Haarachse: Karamell, Bronze, Ansatz und Haar hell sind Material,
nicht Schrift.

**Die Regel der einen Stimme.** Auf dem weißen Grund spricht genau eine Farbe:
Türkis. Preise, Verweise und die aktive Marke tragen sie; sonst nichts. Wird
sie zur Fläche (gefüllter Knopf, gedrückte Merkmarke, Türkisbahn), steht der
Text darauf in „Tinte hell".

**Die Regel der einen Fläche.** Genau ein Abschnitt der Seite steht auf
Türkis. Auf der Fläche dreht sich alles mit: Schrift, Linien, Knöpfe. Ein
zweiter solcher Abschnitt macht aus dem Anker ein Muster.

**Die Ein-Wert-Regel.** Eine Rolle hat einen Wert. Zwei fast gleiche Fassungen
derselben Sache sind kein Feinschliff, sondern ein Fehler. Prüftest: kein
Gestaltungswert steht außerhalb von `:root`.

**Die Schleierregel.** Text steht nie direkt auf einem Foto — aber auf hellem
Grund verliert ein Foto seinen Körper, sobald man es zudeckt. Deshalb liegt der
Schleier nicht mehr gleichmäßig darüber, sondern als Blatt genau dort, wo Text
steht: waagrecht voll deckend über der Textspalte (`--grund-96` bis 44 %),
dann in vier Stufen auf null bis 78 %; senkrecht nur ein schmaler Saum in die
Abschnittsränder hinein, dazwischen offen. Das Bild selbst bekommt statt
`blur(1.5px)` nur noch `blur(.6px)` und etwas mehr Zeichnung
(`saturate(1.04) contrast(1.08)`), damit Haar Haar bleibt statt Nebel. Unter
60 rem entfällt der seitliche Verlauf ganz und wird durch eine gleichmäßige
Überlagerung ersetzt, weil er sonst genau in den Text greift.

**Die Regel des umschlossenen Kastens.** Über einem Foto endet eine Überschrift
dort, wo ihr letzter Buchstabe steht (`width: fit-content`, `max-width: 15ch`).
Ein Block, der bis zur Spaltenkante läuft, schiebt eine unsichtbare Zeile über
das Bild — und genau dort landet der Text, sobald jemand die Schrift größer
stellt. Gemessen: ohne diese Regel lag der Kasten der Startseiten-Überschrift
bei 184 → 1256 px, der Text nur bei 184 → 605 px.

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
- **Preis** (`--s-preis`, 1,9 rem, Archivo, Zeilenhöhe 1): die große Zahl. Sie
  steht an genau zwei Stellen — an der Fächertafel und am Merkzettel — und ist
  dort die Aussage, nicht die Überschrift darüber.
- **Vorspann** (400, 1,15→1,5 rem, Zeilenhöhe 1,5, „Tinte leise", max. 34ch):
  der Absatz direkt unter einem Titel.
- **Marke** (`--s-marke`, 1,25 rem, Marcellus): die Wortmarke in der Kopfzeile,
  mit gesperrtem Kapitälchen-Zusatz darunter.
- **Body** (400, 1→1,125 rem, Zeilenhöhe 1,62, Lesespalte 38 rem): Fließtext.
- **Klein** (`--s-klein`, 1 rem): Nebentext — Dauer, Zusatzangaben.
- **Mini / Label** (`--s-mini`, 0,8 rem, Marcellus SC, Laufweite 0,12–0,26 em):
  Knöpfe, Navigatormarken, Tafelkopf, Blattname, Schild, Schildchen der
  Tonleiter, Fußzeilenüberschriften. Eine Größe für alle Mikroschrift.
- **Zahl** (`.zahl`, Archivo, `tnum`, Laufweite 0,01 em): Preise, Zeiten,
  Dauern — immer gleich breit.

### Named Rules

**Die Zwei-Stufen-Regel unterhalb der Grundgröße.** Unter dem Fließtext gibt es
genau zwei Größen: `--s-klein` (1 rem, Nebentext) und `--s-mini` (0,8 rem, nur
gesperrte Kapitälchen). Weiter abgestuft wird über die Textfarbe, nicht über
die Größe. Fünf Mikrogrößen zwischen 0,62 und 0,76 rem sind genau daran
gescheitert und auf `--s-mini` zusammengelegt.

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
Fächerspanne, Tonleiter), 44 rem (Zeilenliste), 46 rem (Preistafel), 48 rem
(Hero-Mindesthöhe, Fächerspanne, Gruppenabstand), 58 rem (Handymenü), 60 rem
(Schleier), 64 rem (Fächerfeld), 72 rem (Gruppenabstand).

**Die Kopfregel.** Über einer Überschrift steht mehr Luft als darunter:
`.kopf` trägt `clamp(2.5rem, 5vw, 6rem)` nach unten, der Titel darin 1,5 rem.

**Die Hero-Regel.** Der erste Bildschirm (`.flaeche.hero`) hat eine eigene,
knappere Höhe als jeder andere Abschnitt: 3 rem Polster, ab 48 rem 4 rem und
`min-height: min(42rem, 76svh)`. Mit der normalen Abschnittspolsterung lag die
Tonleiter am Fuß erst bei 916 px und damit außerhalb jedes üblichen Fensters.
Der Inhalt wird per Flex senkrecht zentriert, nicht per Grid — ein Grid-Kind mit
eigener Höchstbreite zentriert sich in seiner Spur und rückt den Titel aus der
linken Flucht, in der er auf allen anderen Seiten steht.

**Die Zeilenregel.** Wiederholte Inhalte stehen als gezogene Zeile
(`.zeilenliste`: Begriffsspalte 14 rem, ab 44 rem 18 rem, Rest Beschreibung,
Hairline oben, beim letzten auch unten), nicht als Dreierreihe gleich hoher
Karten. Karten erzwingen gleiche Höhe bei ungleich langem Inhalt und hinterlassen
Totfläche. Unter 44 rem fällt die Zeile einspaltig zusammen.

**Die Rasterregel für Arbeiten.** Vier Spalten ab 40 rem, `grid-auto-flow: row
dense`, zwei große Kacheln zu je vier Feldern und acht kleine — genau sechzehn
Felder, ein volles Viereck ohne Loch. Sechs Spalten lassen zwei Felder leer, und
das sieht man.

**Die Randregel der Preisgruppen.** Ab 82 rem wandert der Gruppenkopf
(`.gruppe-kopf`: Ziffer, Name, Vorspann) in eine 16-rem-Spalte links neben die
Tafel, die Tafel selbst steht als `.tafel-koerper` daneben. Der Kopf darf dabei
nicht über alle Zeilen gespannt werden: ein Rasterkind, das alle Zeilen
überspannt, verteilt seine Höhe auf sie und reißt die Tafel um rund 200 px
auseinander. Deshalb zwei Kinder, zwei Spalten, fertig. Unter 82 rem steht der
Kopf wieder über der Tafel.

**Die Preistafelregel.** Die Spalten wandern nie (`1fr 6rem 6rem 5.5rem`), nur
ihr Inhalt wechselt; die Tafel ist auf 58 rem begrenzt und ab 46 rem auf 46 rem
eingezogen, damit das Auge nicht mehrere hundert Pixel leere Fläche vom Namen
zum Preis überqueren muss. Unter 46 rem fällt der Tafelkopf weg und jede Zahl
trägt ihre Beschriftung selbst über `attr(data-was)`.

**Bewegung.** Nur `ease-out`: `--kurve` (`cubic-bezier(.22,.61,.36,1)`) für
Zustände, `--kurve-weit` (`cubic-bezier(.16,.84,.44,1)`) für weite Wege. Dauern
sind 0,3 s / 0,5 s / 0,8 s. Animiert werden ausschließlich `transform` und
`opacity`. Hover-Effekte stehen hinter `@media (hover: hover) and (pointer: fine)`.
`prefers-reduced-motion` schaltet Einblendungen ganz ab und kappt alle Dauern.
Einblendungen (`.auf`) sind ohne JavaScript sichtbar: der Ausgangszustand ist
sichtbar, erst die Klasse `mitskript` am `<html>` schaltet sie scharf.

## Elevation & Depth

Das System ist überwiegend tonal: Tiefe entsteht durch die Flächenleiter
(Grund → Feld → Karte) und durch 1-px-Hairlines, nicht durch Schatten. Drei
Stufen reichen. Schatten treten nur dort auf, wo ein Gegenstand physisch über
einem anderen liegt — Kartonblatt über Karton, Blatt über Fläche, klebende
Leiste über der Seite. Auf hellem Grund sind sie weit und weich und im Petrol
getönt (`oklch(40–45% .04 200)`): ein grauer Schatten macht eine helle Seite
schmutzig, ein schwarzer macht sie hart.

### Schattenvokabular

Drei Stufen, alle mit Versatz und weichem Radius — ein Schein ohne Versatz wäre
Dekoration, kein Licht.

- **Flach** (`--schatten-flach`): `0 1px 2px` plus `0 3px 10px`, beide
  `oklch(45% .04 200 / .06)`. Bauteile, die nur eben aufliegen.
- **Blatt** (`--schatten-blatt`): `0 1px 3px / .10` plus `0 10px 26px / .13`.
  Das Fächerblatt im aufgefächerten Ruhezustand, die Niete.
- **Hoch** (`--schatten-hoch`): `0 2px 6px / .10` plus `0 20px 44px / .18`.
  Das gezogene Blatt und das Bild in der Lupe.
- **Band** (`--schatten-band`): `0 1px 4px oklch(40% .04 200 / .22)` — das
  gedruckte Papierschildchen auf der Tonleiter, der einzige Schatten, der auf
  Papier fällt.
- **Kante** (`0 0 0 1px var(--papier-rand)`): das geschlossene Fächerblatt. Ein
  gezeichneter Blattrand, kein Schatten.
- **Klebekante** (`0 1px 0 var(--linie)`): die gesetzte Kopfzeile. Eine Linie,
  kein Schlagschatten.

**Die Glasregel.** Alles, was klebt oder überlagert, ist getöntes Glas: der
Seitengrund mit 0,86–0,98 Deckung plus `backdrop-filter: blur(10–18px)`. Drei
Stufen als Token — `--glas` für die Kopfzeile im Fluss, `--glas-dicht` für
Navigator und Lupe, `--glas-voll` für Menü und Merkzettel.

**Die Flachregel.** Flächen ruhen flach. Ein Schatten ist entweder Material
(Karton, Metall) oder Zustand (gezogen, geöffnet) — nie Dekoration auf einer
Karte, die ohnehin schon eine Hairline hat.

## Shapes

Die Kantensprache kommt vom Farbkartenblatt. Vier benannte Bögen, alle dieselbe
Form in anderer Größe oder Lage:

- **Stehendes Blatt** (`--bogen-blatt`, `1.35rem 1.35rem .25rem .25rem`): oben
  rund, unten scharf. Karten (`.blatt`), Arbeitskacheln, Bilder in der Lupe.
- **Liegendes Blatt** (`--bogen-blatt-quer`, `.25rem 100px 100px .25rem`):
  dasselbe Blatt auf der Seite — rund an der Spitze, scharf an der Niete. Alle
  Knöpfe, die Telefonmarke.
- **Spitzes Blatt** (`--bogen-blatt-spitz`, `2.4rem 2.4rem .25rem .25rem`): das
  Blatt im Fächer. Derselbe Bogen größer, weil das Blatt höher ist als eine
  Karte und ein Radius mit der Höhe mitwachsen muss, um gleich zu wirken.
Daneben nur: 3 px (`--bogen-klein`, Fokusrahmen), 6 px (`--bogen`), 4 px
(Merkmarke) und `100px` für echte Pillen und Kreise (Menüknopf, Lupenknöpfe,
Schild, Schildchen der Tonleiter, Rollbalken).

Ränder sind immer 1 px und immer halbdurchsichtig. Ein einziges Muster steht als
SVG-Daten-URI bereit und wird sparsam eingesetzt: feine Strähnen
(`--muster-straehne`, Deckung 0,05).

**Die Eine-Kante-Regel.** Ein neues Bauteil bekommt einen der vier Blattbögen
oder eine echte Pille. Ein frei erfundener Radius ist ein Fehler.

## Components

### Knöpfe

Charakter: ein Kartonblatt auf der Seite — ruhig, breit gepolstert, mit
Kapitälchenbeschriftung.

- **Form:** liegendes Blatt (`{rounded.blatt-quer}`), Polster `.95rem 1.7rem`,
  Marcellus SC, 1 rem, Laufweite 0,12 em.
- **Voll** (`.knopf-voll`): Türkisfläche, Text in „Tinte hell". Hover: Türkis hell
  plus `translateY(-2px)`.
- **Leer** (`.knopf-leer`): transparent, Rand „Linie hell", Text „Tinte".
  Hover: Rand und Text auf Türkis, `translateY(-2px)`.
- **Gedrückt:** `translateY(0)` — der Knopf setzt sich auf.
- **Reihe:** `.knopfreihe`, `flex-wrap`, Lücke 1 rem.
- **Telefonmarke** (`.ruf`): dieselbe Form kleiner, Türkisrand, Türkistext,
  Inline-SVG-Hörer bei 1 em. Steht in der Kopfzeile auf jedem Bildschirm.

### Karten / Behälter

- **Ecken:** stehendes Blatt (`{rounded.blatt}`).
- **Grund:** „Karte" auf dem weißen Grund; die Kartonvariante nutzt „Papier" mit
  „Papier-Rand" und „Papier-Tinte".
- **Rand:** 1 px „Linie". **Schatten:** keiner im Ruhezustand.
- **Polster:** 1,5 / 2 / 2,25 rem nach Umbruchpunkt.

### Marken und Schalter

- **Merkmarke** (`.merken`): der Preis selbst ist der Schalter — kein Symbol
  daneben. Ruhezustand Türkistext auf transparent mit 4 px Radius; ein „+"
  erscheint bei Hover oben rechts. Gedrückt (`aria-pressed="true"`): Türkisfläche,
  Text in „Tinte hell", „✓" statt „+".
- **Schild** (`.schild`): Pille mit Türkisrand, Kapitälchen, vorangestellter
  Punkt aus `currentColor`. Ein Anhänger, kein Auszeichnungsstreifen über einer
  Überschrift.
- **Folgenummer** (`.folge`): Türkis, 0,62 em, vor der Gruppenüberschrift der
  Preisliste. Die Reihenfolge ist dort eine Aussage — gegliedert wird nach dem,
  was auf dem Stuhl zuerst passiert.

### Navigation

- **Kopfzeile:** klebend, transparent im Ruhezustand; ab dem ersten Scrollen
  trägt sie `.gesetzt` — getöntes Glas plus Hairline. Marke in Marcellus
  (`--s-marke`, 1,25 rem) mit gesperrtem Kapitälchen-Zusatz in Türkis darunter.
- **Wegweiser:** Archivo 1 rem, „Tinte leise", darunter eine Türkislinie, die aus
  der linken Kante aufzieht (`scaleX(0) → 1`). Die aktuelle Seite trägt sie
  dauerhaft und steht in „Tinte".
- **Handymenü** (unter 58 rem): Vollflächige Tafel von oben, Petrolglas,
  Einträge in Marcellus 1,35 rem, durch Hairlines getrennt; der Schalter
  verwandelt drei Striche in ein Kreuz (nur `transform` und `opacity`).
- **Navigator** (Leistungsseite): klebende Leiste über den Gruppen, Marken in
  der kleinen Blattform (`{rounded.marke}`), waagrecht rollbar mit `scroll-snap`,
  ohne sichtbaren Rollbalken. Weicht beim Runterscrollen nach oben aus
  (`translateY(-108%)`) und kommt beim Hochscrollen zurück; ein Anker mit Höhe 0
  davor liefert die Bezugsposition, weil ein klebendes Element seine
  Klebeposition meldet.
- **Rollbalken:** der eigene Rollbalken der Seite ist gestaltet, nicht
  überlassen: Griff in „Rollbalken" (Hover „Rollbalken hoch"), Bahn in „Grund
  tief", 11 px breit, Pille, 3 px Rand in der Bahnfarbe als Luft.

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

- **Blatt:** Papierfläche, spitze Blattform (`{rounded.blatt-spitz}`), oben ein
  Farbfeld über 38 % der Höhe — ein Verlauf aus zwei am Foto genau dieser Arbeit
  gemessenen Proben (`--ton-oben`, `--ton-unten`), darunter eine Trennlinie in
  „Kante hell". Im Ruhezustand tritt es zurück, indem es blasser wird
  (`saturate(.72) opacity(.88)`): auf hellem Grund weicht ein Blatt nicht durch
  Abdunkeln zurück, sondern durch Ausbleichen.
- **Name:** längs am Blatt (`writing-mode: vertical-rl`), Marcellus SC, nur auf
  dem gezogenen Blatt sichtbar; alle anderen tragen ihn im `aria-label`.
- **Gezogen:** `scale(1.05)`, volle Farbe, Türkiskante, weiter Schatten.
- **Auffächerung:** `--spanne` steht im Stylesheet (112°, 96° zwischen 30 und
  48 rem, 84° darunter) und wird von `seite.js` ausgelesen — der Winkel gehört
  zur Gestaltung, nicht zum Verhalten. Vor dem Auftauchen liegen die Blätter
  geschlossen aufeinander; bei `prefers-reduced-motion` stehen sie sofort offen.
- **Niete:** Messingkugel aus einem radialen Verlauf Türkis hell → Karamell →
  Ansatz, 1,75 rem.
- **Bedienung:** Reitermuster mit Pfeiltasten; `touch-action: pan-y`, damit
  senkrechtes Scrollen erhalten bleibt.

### Die Türkisbahn

Der eine Abschnitt, der umkippt: `.tuerkisbahn` auf der Startseite trägt
„Perlacher Straße 2" mit Öffnungszeiten, Anschrift und Erreichbarkeit.

- **Fläche:** `--tuerkis-tief` mit demselben Strähnenmuster wie die Fußzeile,
  nur in Weiß bei 0,10 Deckung (`--muster-straehne-hell`).
- **Schrift:** Überschriften und Verweise in „Tinte hell", Fließtext und Zahlen
  in „Auf Türkis", die Begriffsspalte in „Türkis blass".
- **Linien:** `--linie-auf-tuerkis`, dieselbe 1-px-Rolle wie sonst `--linie`.
- **Knöpfe drehen mit:** der gefüllte Knopf wird weiß mit türkisem Text, der
  leere bekommt eine helle Kante. Der Fokusrahmen ebenfalls hell.
- **Aufbau:** ab 64 rem stehen die drei Blöcke nebeneinander statt untereinander
  — eine leere rechte Hälfte in dieser Größe wirkt nicht ruhig, sondern
  unfertig. Darunter fällt die Bahn auf die gezogene Zeilenliste zurück.

### Die Tonleiter

Derselbe Fächer im geschlossenen Zustand: acht Bänder von der Kante gesehen, in
denselben acht gemessenen Tönen und nach Helligkeit sortiert, über die volle
Breite am Fuß des ersten Bildschirms (Höhe 3,4 rem, unter 30 rem 2,9 rem). Sie
ist ein Verweis: ein Antippen führt zur Farbkarte.

- **Band:** jedes beginnt oben im Grund und endet unten in „Feld" — das Foto
  darüber endet damit in einem Verlauf statt an einer harten Waagrechten, genau
  wie beim Schleier. Zwischen zwei Bändern steht eine 1-px-Innenlinie in
  „Kante hell".
- **Beschriftung:** ein gedrucktes Papierschildchen in der Mitte (Papier,
  Papier-Tinte, Pille, `--s-mini` mit 0,22 em Laufweite; unter 30 rem 0,14 em),
  weil der Ton darunter mal hell und mal dunkel ist.
- **Hover:** die Bänder dehnen sich (`scaleY(1.22)`, Ursprung unten) — nie die
  Höhe, das wäre eine Layout-Eigenschaft.

## Do's and Don'ts

### Do:

- **Do** jede neue Farbe aus einem Foto des Ladens messen und als Token in
  `:root` legen — `werkzeug/farben-messen.mjs` und `werkzeug/bilder-bauen.mjs`
  geben die Werte aus.
- **Do** jeden Gestaltungswert benennen, bevor er im Stylesheet steht: auch
  Rollbalken, Mikroschrift und der Grund eines fremden Fensters haben ein Token.
- **Do** für jedes neue Bauteil einen der vier Blattbögen nehmen
  (`--bogen-blatt`, `--bogen-blatt-quer`, `--bogen-blatt-spitz`) oder eine
  echte Pille.
- **Do** Abstände aus der Reihe `--r1` … `--r8` nehmen und Größensprünge in die
  vorhandenen Umbruchpunkte (40 / 64 / 88 rem) legen.
- **Do** Fotos vollflächig unter dem mehrstufigen Schleier einsetzen, den
  seitlichen Verlauf an beiden Seiten schließen und unter 60 rem auf
  gleichmäßige Überlagerung wechseln.
- **Do** wiederholte Inhalte als `.zeilenliste` setzen.
- **Do** Zahlen in Archivo mit `tabular-nums` setzen, damit Preise untereinander
  stehen.
- **Do** Hover hinter `@media (hover: hover) and (pointer: fine)` legen und
  `prefers-reduced-motion` bedienen.
- **Do** Einblendungen so bauen, dass der sichtbare Zustand der Ausgangszustand
  ist und erst `.mitskript` sie scharf schaltet.

### Don't:

- **Don't** Rosé als Textfarbe einsetzen — es ist Ornament, an genau einer Achse.
- **Don't** die Haarachse als Textfarbe einsetzen; Karamell, Bronze, Ansatz
  und Haar hell sind Material.
- **Don't** eine zweite, fast gleiche Fassung eines vorhandenen Tokens anlegen —
  es gibt eine helle Schrift auf Türkis, eine Trennlinie auf Papier, eine
  Mikroschriftgröße.
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
