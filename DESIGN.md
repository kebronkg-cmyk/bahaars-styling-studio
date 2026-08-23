---
name: BaHaar's Styling Studio
description: Die Meisterin und ihre Arbeit — warmes Papierweiß, Espresso als Gegenpol, Messing aus dem Haar gemessen.
colors:
  grund: "oklch(97.5% .009 84)"
  grund-warm: "oklch(94.5% .015 82)"
  karte: "oklch(99.2% .005 86)"
  glas: "oklch(97.5% .009 84 / .86)"
  glas-dicht: "oklch(97.5% .009 84 / .94)"
  glas-voll: "oklch(97.5% .009 84 / .98)"
  espresso: "oklch(24% .026 55)"
  espresso-92: "oklch(19% .022 52 / .92)"
  espresso-70: "oklch(19% .022 52 / .70)"
  auf-espresso: "oklch(83% .020 76)"
  linie-auf-espresso: "oklch(97% .010 84 / .20)"
  tinte: "oklch(28% .028 58)"
  tinte-leise: "oklch(43% .026 60)"
  tinte-still: "oklch(53% .022 62)"
  tinte-hell: "oklch(97% .010 84)"
  messing: "oklch(45% .085 60)"
  messing-hell: "oklch(72% .095 68)"
  messing-blass: "oklch(92% .030 78)"
  haar-bronze: "oklch(48% .070 58)"
  rose: "oklch(64% .095 8)"
  linie: "oklch(58% .022 66 / .30)"
  linie-hell: "oklch(64% .026 70 / .17)"
  linie-akzent: "oklch(45% .085 60 / .32)"
  rollbalken: "oklch(82% .022 80)"
  rollbalken-hoch: "oklch(66% .055 66)"
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
    backgroundColor: "{colors.messing}"
    textColor: "{colors.tinte-hell}"
    typography: "{typography.label}"
    rounded: "{rounded.blatt-quer}"
    padding: ".95rem 1.7rem"
  knopf-voll-hover:
    backgroundColor: "{colors.messing-hell}"
  knopf-leer:
    backgroundColor: "transparent"
    textColor: "{colors.tinte}"
    typography: "{typography.label}"
    rounded: "{rounded.blatt-quer}"
    padding: ".95rem 1.7rem"
  knopf-leer-hover:
    textColor: "{colors.messing}"
  ruf:
    backgroundColor: "transparent"
    textColor: "{colors.messing}"
    rounded: "{rounded.blatt-quer}"
    padding: ".5rem .95rem"
  blatt:
    backgroundColor: "{colors.karte}"
    textColor: "{colors.tinte}"
    rounded: "{rounded.blatt}"
    padding: "1.5rem → 2rem → 2.25rem"
  merken:
    backgroundColor: "transparent"
    textColor: "{colors.messing}"
    rounded: "4px"
    padding: ".22rem .5rem"
  merken-aktiv:
    backgroundColor: "{colors.messing}"
    textColor: "{colors.tinte-hell}"
  navigator-marke:
    backgroundColor: "transparent"
    textColor: "{colors.tinte-leise}"
    typography: "{typography.label}"
    rounded: "{rounded.marke}"
    padding: ".45rem .85rem"
  navigator-marke-aktiv:
    backgroundColor: "oklch(45% .085 60 / .10)"
    textColor: "{colors.messing}"
  schild:
    backgroundColor: "transparent"
    textColor: "{colors.messing}"
    typography: "{typography.label}"
    rounded: "{rounded.pille}"
    padding: ".25rem .8rem"
  arbeit-kachel:
    backgroundColor: "{colors.grund-warm}"
    rounded: "{rounded.blatt}"
    padding: "0"
  portrait:
    backgroundColor: "transparent"
    textColor: "{colors.tinte-hell}"
    rounded: "{rounded.blatt}"
    padding: "0"
  leistungskarte:
    backgroundColor: "transparent"
    textColor: "{colors.tinte}"
    rounded: "{rounded.blatt}"
    padding: "0"
  tonfleck:
    backgroundColor: "linear-gradient(to right, var(--ton-oben), var(--ton-unten))"
    rounded: "{rounded.klein}"
    padding: "0"
---

# Gestaltungssystem: BaHaar's Styling Studio

## Overview

**Leitbild: „Die Meisterin und ihre Arbeit"**

Ein inhabergeführter Salon verkauft eine Person, keinen Laden. Die Seite
spricht deshalb in der ersten Person — „Seit zwanzig Jahren stehe ich selbst
am Stuhl" — und zeigt danach die Arbeit: fünfzehn Aufnahmen aus dem Alltag,
jede in ihrem eigenen Seitenverhältnis, keine beschnitten.

Der Auftakt ist hell und scrollgesteuert: Über zwei Bildschirmhöhen klebt
die Bühne fest, die Kamera fährt heran, drei Aufnahmen lösen einander ab.
Nichts davon läuft auf einer Uhr — wer nicht scrollt, sieht ein Standbild.
Darüber liegt ein Schleier in der Grundfarbe, dicht über der Textspalte und
offen in der Lücke zwischen Text und Terminkarte. Das Espresso, das hier
vorher stand, trägt jetzt die Fußzeile: am Anfang war es zu schwer, am Ende
schließt es die Seite ab.

Die Palette ist aus dem Material gemessen. Über das Portrait der Inhaberin
und alle Arbeitsfotos hinweg liegt die warme Achse geschlossen im Farbtonband
47–88°, Schwerpunkt 60°: Espresso unten (L 24–36 %), Karamell in der Mitte
(L 50–62 %, C bis .10), warmes Licht oben (L 87–95 %). Ein kalter Ton kam in
keiner Messung vor. Grund ist warmes Papierweiß aus diesen Lichtern, Messing
die Leitfarbe aus dem Karamell im Haar.

Die Kopfzeile trägt drei Dinge: wohin es geht, wie man anruft, und den
Termin. „Leistungen & Preise" klappt eine Übersicht auf — neun Gruppen mit
Ab-Preis, damit man in einem Blick sieht, was es gibt und was es kostet, ohne
die Seite zu wechseln. Der Termin ist der einzige gefüllte Knopf der Leiste,
und im ersten Bildschirm steht die Terminkarte: erst der Öffnungsstand, dann
Online-Buchung und Telefonnummer. Sichtbar, ohne zu drängen.

**Was in dieser Fassung gefallen ist, und warum**

- *Das Türkis der Moroccanoil-Regale.* Gemessen, aber die Markenfarbe eines
  Lieferanten — nicht die Handschrift dieses Salons. Prüftest: Würde die
  Farbe verschwinden, wenn der Laden den Lieferanten wechselt?
- *Der Farbfächer und die Tonleiter.* Originell, und beide standen dort, wo
  die Besucherin wissen will, wer schneidet und was es kostet. Geblieben ist
  die Tonprobe neben dem Preis.
- *Die engen Haarausschnitte.* Sie waren die Antwort auf fehlende
  Einwilligungen. Der Auftraggeber hat bestätigt, dass alle Abgebildeten
  einverstanden sind — seitdem steht jedes Bild in voller Aufnahme.
- *Die Fotobänder unter einem Schleier auf den Unterseiten.* Von der Arbeit
  blieb dort nur Struktur übrig. Jetzt steht das Bild neben dem Text, ganz.
- *Die vierte Aufnahme des Auftakts* (`arbeit-10-lang-blond`). Sie war das
  erste, was jemand von diesem Salon sah — und zeigte ausgerechnet krause
  Flusen, einen fahlen Ton und einen Fussel auf dem Umhang. Bei einem
  Friseur ist das Foto das Produkt. Drei saubere Aufnahmen sind besser als
  vier, von denen eine schadet.
- *Die eigene Scroll-Schleife.* Sie funktionierte, aber jede Marke stand als
  ausgerechnete Rampe im Code. Jetzt trägt GSAP ScrollTrigger die Fahrt, und
  die Choreografie liest sich als Reihe von Marken.

**Key Characteristics:**

- Gemessene Farben statt gewählter — und gemessen wird am eigenen Material,
  nicht an der Wandfarbe eines Lieferanten (`werkzeug/palette-messen.mjs`).
- Ein einziges Gesicht auf der Seite: das der Inhaberin. Sie entscheidet über
  ihr eigenes Bild; für Kundenfotos liegt keine Einwilligung vor, deshalb
  zeigen die Arbeitsfotos Haar und sonst nichts.
- Eine einzige Kantensprache, das Farbkartenblatt: oben rund, unten scharf.
- Feste Stufen in vier Umbruchpunkten statt fließender `clamp()`-Werte.
- Bewegung ausschließlich `ease-out`, ausschließlich `transform` und `opacity`.
- Jeder Gestaltungswert steht als Token in `:root` — auch der Rollbalken.

## Colors

Eine warme Welt: Papierweiß als Grund, Espresso als Gegenpol, Messing als
Stimme. Alle drei liegen im gemessenen Band 47–88°.

### Primary

- **Messing** (`{colors.messing}`): die tragende Stimme. Preise, aktive
  Navigationsmarken, Verweise im Fließtext, der gefüllte Knopf, der
  Fokusrahmen, Textmarke und `accent-color`. Sie liegt bei 45 % Helligkeit,
  weil sie Schrift trägt und auf dem Grund sicher über 4,5 : 1 kommen muss.
  **Messing hell** ist dieselbe Stimme auf Espresso, **Messing blass** die
  Beschriftung darauf.
- **Espresso** (`{colors.espresso}`): die dunkle Seite,
  aus dem Portrait gemessen — das Regal aus dunklem Holz, der Lederstuhl,
  ihre Kleidung. Espresso trägt genau einen Abschnitt, den Auftakt.
- **Haar-Bronze** (`{colors.haar-bronze}`): die eine Stufe der gemessenen
  Haarachse, die als Token bleibt — sie trägt den Verlauf der Ablaufleiste im
  Brautstyling. Die übrigen Stufen stehen nicht mehr in `:root`, weil jede
  Tonprobe ihre eigenen zwei gemessenen Werte für genau diese Arbeit trägt.
  Material, nie Text.

### Secondary

- **Rosé** (`{colors.rose}`, Farbton 8°, gemessen an der Wand im Brautfoto):
  tritt an genau einer Achse auf, der des Brautstylings — als Punkt der
  Ablaufleiste und als Kante des gezogenen Brautblattes.

### Neutral

- **Grund** (`{colors.grund}`): warmes Papierweiß, Seitengrund überall, und
  zugleich die Farbe jedes Schleiers über einem Foto. Für die Schleier liegt
  er in sechs festen Deckungsstufen bereit (`--grund-96` … `--grund-00`);
  ausgeschrieben, nicht relativ gerechnet, damit sie überall gleich ankommen.
- **Grund warm** (`{colors.grund-warm}`): die abgesetzte Fläche. Die
  Abschnitte wechseln zwischen Grund und Grund-warm, damit nie zwei gleiche
  Flächen aneinanderstoßen.
- **Glas**, **Glas dicht**, **Glas voll**: derselbe Grund, nur durchlässig,
  für die Leisten über dem Inhalt — Kopfzeile, Navigator und Lupe, Menü und
  Merkzettel.
- **Karte**: die hellste Fläche, für Bauteile, die sich abheben sollen.
- **Tinte**, **Tinte leise**, **Tinte still**: die Textleiter, dunkles Braun
  statt Grau — ein grauer Text macht eine warme Seite schmutzig. Fließtext ist
  „leise", Hervorhebung und Namen sind „Tinte", Nebenangaben sind „still".
  Über einer Fotobahn rückt „still" auf „Tinte" hoch (siehe Schleierregel).
- **Tinte hell** und **Auf Espresso**: die Gegenrichtung — Schrift auf der
  dunklen Fläche.
- **Linie**, **Linie hell**, **Linie Akzent**, **Linie auf Espresso**:
  Hairlines. Eine Linie ist immer 1 px und immer halbdurchsichtig.
- **Espresso 92** und **Espresso 70**: die zwei Stufen des Verlaufs unter der
  Portraitbeschriftung. Ausgeschrieben statt im Verlauf hingeschrieben, damit
  kein Gestaltungswert außerhalb von `:root` steht.
- **Rollbalken** und **Rollbalken hoch**: der Griff im Ruhe- und im
  Hover-Zustand. Der Rollbalken ist Fläche der Seite und wird wie eine
  gestaltet.
- **Fremd-Grund** (`{colors.fremd-grund}`): der Grund des eingebetteten
  Buchungsfensters. Ein benannter Fremdkörper — er markiert die einzige
  Fläche, die wir nicht gestalten, statt sie unbenannt einzuschleusen.

### Farbvarianten

Drei Stimmungen aus demselben Laden, umgeschaltet über `data-palette` am
`<html>`. Ohne Attribut gilt Messing. Verändert werden ausschließlich
Farbtoken — Abstände, Kurven, Schriftgrößen und Muster-Geometrie bleiben in
allen drei gleich, sonst wären es drei Seiten statt einer Seite in drei
Stimmungen.

| Variante | Grund | Tief | Leitfarbe | Woher gemessen |
|---|---|---|---|---|
| **Messing** (Vorgabe) | `oklch(97.5% .009 84)` | `oklch(24% .026 55)` | `oklch(45% .085 60)` | Karamell im Haar, dunkles Holz im Portrait |
| **Asche** | `oklch(97.5% .005 250)` | `oklch(23% .030 254)` | `oklch(45% .052 250)` | Schattenseiten von `arbeit-06` (`oklch(24,4% .045 254)`) und `arbeit-04` (`oklch(22,3% .020 303)`) |
| **Rosé** | `oklch(97.5% .008 40)` | `oklch(23% .038 18)` | `oklch(45% .095 24)` | Brautbilder: `arbeit-15` (`oklch(65,5% .051 6)`), `arbeit-13` (`oklch(41,8% .122 20)`) |
| **Nacht** | `oklch(16% .018 52)` | `oklch(11% .016 50)` | `oklch(78% .085 70)` | dieselbe Stelle im Portrait wie Espresso, nur ihr tiefster Punkt: das Regal aus dunklem Holz (L 14–18 %, Farbton 50–55°) |

**Nacht ist keine Umkehrung.** Vier Dinge drehen sich nicht einfach mit:

1. *Die Leitfarbe wandert von L 45 auf L 78.* Messing bei 45 % trägt Schrift
   auf Papierweiß; auf einem Grund bei 16 % trägt sie nichts mehr. Es ist
   dieselbe Farbe, von der anderen Seite gesehen.
2. *Die Espresso-Fläche geht nicht nach oben, sondern noch tiefer* (L 11 %).
   Sie ist der Anker der Seite; auf einer dunklen Seite ankert man nach
   unten.
3. *Das Strähnenmuster wechselt von dunklen auf helle Striche.* Ein dunkles
   Muster auf dunklem Grund ist kein feines Muster, sondern keines.
4. *Der Schleier über dem Auftakt verdunkelt, statt aufzuhellen* — und genau
   dadurch wird die Bühne zum ersten Mal das, was sie sein will: Licht und
   Staub sind endlich zu sehen, weil sie hell sind und zum ersten Mal etwas
   Dunkles hinter sich haben.

**Zwei Token mussten dafür entzweit werden.** Nacht hat aufgedeckt, dass
zwei Namen je zwei gegensätzliche Aufgaben trugen — in den hellen Stimmungen
fiel das nicht auf, weil beide Aufgaben denselben Wert wollten:

| vorher | jetzt | Aufgabe |
|---|---|---|
| `--messing-blass` | `--messing-blass` | Beschriftung **auf** der Espresso-Fläche — immer hell |
| | `--messing-fahl` | blasse Füllung **unter** Messing-Schrift — muss sich von der Leitfarbe absetzen |
| `--tinte-hell` | `--tinte-hell` | Schrift **auf** der dunklen Fläche — immer hell |
| | `--auf-messing` | Schrift **auf** der Messing-Füllung — in Nacht dunkel |

Prüftest für so ein Token: Lässt sich sein Name mit „auf X" oder „unter X"
ergänzen, und sind X in zwei Stimmungen verschieden hell? Dann sind es zwei
Token.

Auch die Varianten stehen unter der Eigentumsregel: Asche kommt aus den
kühlen Schatten in den eigenen Arbeitsfotos, Rosé aus den eigenen
Brautbildern. Keine der drei ist von einem Regal abgelesen.

Die Ornamentfarbe wandert mit: In Messing und Asche ist sie Rosé, in Rosé
ist sie das Karamell — die zweite Farbe muss sich von der Leitfarbe lösen,
sonst sieht man sie nicht als zweite.

**Der Umschalter** steht im Fuß: vier Proben, jede halb Grund und halb
Leitfarbe *ihrer eigenen* Palette, nicht der gerade gültigen — sonst zeigt er
viermal dasselbe. Die Wahl liegt in `localStorage` (`bahaar-stimmung`) und
wird im Kopf jeder Seite von einem winzigen Skript noch vor dem ersten Bild
gesetzt; ohne das blitzt beim Seitenwechsel Messing auf. Gewechselt wird über
`document.startViewTransition`, wo der Browser das kann: ein Schnitt über die
ganze Seite ist ruhiger als hundert einzeln überblendende Farben.

### Named Rules

**Die Messregel.** Keine Farbe der Seite ist ausgedacht. Eine neue Farbe kommt
aus einem Foto und wird gemessen, bevor sie in `:root` steht. Prüftest: zu
jedem Token lässt sich das Foto benennen, aus dem es stammt.

**Die Eigentumsregel.** Gemessen reicht nicht — die Farbe muss dem Laden
gehören. Ein Produktregal, ein Plakat, eine Verpackung tragen die Marke ihres
Herstellers ins Bild. Prüftest: Würde diese Farbe verschwinden, wenn der Salon
den Lieferanten wechselt? Dann ist sie nicht seine Handschrift.

**Die Ornamentregel.** Rosé ist niemals Textfarbe. Dasselbe gilt für die
ganze Haarachse: Karamell, Bronze, Ansatz und Haar hell sind Material.

**Die Regel der einen Stimme.** Auf dem Grund spricht genau eine Farbe:
Messing. Wird sie zur Fläche, steht der Text darauf in „Tinte hell".

**Die Regel der einen Fläche.** Genau ein Abschnitt der Seite steht auf
Espresso: der Auftakt. Auf der Fläche dreht sich alles mit — Schrift, Linien,
Knöpfe, Fokusrahmen, und solange nicht gescrollt ist auch die Kopfzeile. Ein
zweiter solcher Abschnitt macht aus dem Auftakt ein Muster.

**Die Ein-Wert-Regel.** Eine Rolle hat einen Wert. Prüftest: kein
Gestaltungswert steht außerhalb von `:root`.

**Die Schleierregel.** Text steht nie direkt auf einem Foto — aber auf hellem
Grund verliert ein Foto seinen Körper, sobald man es zudeckt. Der Schleier
liegt deshalb als Blatt genau dort, wo Text steht: waagrecht voll deckend über
der Textspalte (`--grund-96` bis 44 %), dann in vier Stufen auf null bis 78 %;
senkrecht nur ein schmaler Saum in die Abschnittsränder. Das Bild bekommt
`blur(.6px)` und etwas mehr Zeichnung. Unter 60 rem entfällt der seitliche
Verlauf und wird durch eine gleichmäßige Überlagerung ersetzt. Über einer
Fotobahn geht das Kleingedruckte zwei Stufen hoch auf „Tinte" — gemessen kam
es sonst auf 3,78 : 1.

**Die Regel des umschlossenen Kastens.** Über einem Foto endet eine
Überschrift dort, wo ihr letzter Buchstabe steht (`width: fit-content`,
`max-width: 15ch`). Ein Block, der bis zur Spaltenkante läuft, schiebt eine
unsichtbare Zeile über das Bild — und genau dort landet der Text, sobald
jemand die Schrift größer stellt.

**Die Auflösungsregel.** Kein Bild wird über seine Vorlage hinaus gezogen.
Das Portrait ist 624×1024 und steht deshalb in einer Spalte von höchstens
23 rem statt vollflächig; die Kopfbänder brauchen bei 1,9 : 1 einen
Ausschnitt von 737 px Höhe, damit sie ohne Hochrechnen 1400 px breit werden.
Ein Bild, das kleiner bleibt, sieht besser aus als eines, das gezogen wurde.

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
  steht an genau zwei Stellen — an der Leistungskarte und am Merkzettel — und ist
  dort die Aussage, nicht die Überschrift darüber.
- **Vorspann** (400, 1,15→1,5 rem, Zeilenhöhe 1,5, „Tinte leise", max. 34ch):
  der Absatz direkt unter einem Titel.
- **Marke** (`--s-marke`, 1,25 rem, Marcellus): die Wortmarke in der Kopfzeile,
  mit gesperrtem Kapitälchen-Zusatz darunter.
- **Body** (400, 1→1,125 rem, Zeilenhöhe 1,62, Lesespalte 38 rem): Fließtext.
- **Klein** (`--s-klein`, 1 rem): Nebentext — Dauer, Zusatzangaben.
- **Mini / Label** (`--s-mini`, 0,8 rem, Marcellus SC, Laufweite 0,12–0,26 em):
  Knöpfe, Navigatormarken, Tafelkopf, Blattname, Schild, Schildchen der
  Tonproben, Fußzeilenüberschriften. Eine Größe für alle Mikroschrift.
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
Kartenraster), 44 rem (Zeilenliste), 46 rem (Preistafel), 48 rem
(Gruppenabstand), 58 rem (Handymenü), 60 rem
(Schleier), 62 rem (Auftakt), 64 rem (Kartenraster), 72 rem (Gruppenabstand).

**Die Kopfregel.** Über einer Überschrift steht mehr Luft als darunter:
`.kopf` trägt `clamp(2.5rem, 5vw, 6rem)` nach unten, der Titel darin 1,5 rem.

**Die Auftaktregel.** Der erste Bildschirm zeigt die Person, nicht das
Material. Bei einem inhabergeführten Salon kaufen die Leute die Person — jede
ausgezeichnete Salonseite macht das so. Die vorige Fassung zeigte einen
abstrakten Haarausschnitt unter einem Schleier, und wer den Laden führt,
erfuhr man erst nach fünf Bildschirmen.

**Die Flächenfolge.** Kein Abschnitt grenzt an einen gleichfarbigen. Der
Wechsel läuft Espresso → Grund → Grund-warm → Grund → Grund-warm → Grund. Wo
zwei gleiche Flächen aneinanderstießen, verschwand die Trennung und zwei
Abschnitte lasen sich als einer.

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

**Der Bewegungscharakter ist „Premium"**: 350–600 ms, ausbremsende Kurven,
kein Überschwingen. Das deckt sich mit der Hausregel — kein Federn, kein
Zurückschwingen. Daraus folgen drei Konstanten für die ganze Seite:

| | |
|---|---|
| Signaturkurve | `power2.out` (GSAP) bzw. `--kurve` (CSS) |
| Dauern | 0,3 s schnell · 0,55 s Standard · 0,8 s weit |
| Eintrittsmuster | 18 px von unten, ausbremsend, gestaffelt zu dritt |

Richtungsregel: **Auftritt bremst aus, Abgang beschleunigt.** Andersherum
sieht es aus, als würde etwas weggezogen und dann hingeworfen. Deshalb geht
die erste Textstufe der Bühne mit `power2.in` und die zweite kommt mit
`power2.out`.

**Drei Marken am `<html>`, und jede sagt etwas anderes.** Der Unterschied ist
die Rückfallebene:

- `mitskript` — das Skript läuft. Damit greift alles, was ohne Skript nicht
  bedienbar wäre, etwa die Ausklapp-Übersicht in der Kopfzeile.
- `mitgsap` — GSAP liegt vor. Dann gehört die Einblendung ihm allein; eine
  CSS-Überblendung daneben zöge am selben Wert.
- `mitfahrt` — es wird choreografiert: die Bühne wird zwei Bildschirme hoch
  und klebt, die Abschnitte kommen erst beim Auftauchen.

Fehlt GSAP oder ist Bewegung abbestellt, wird `mitfahrt` nicht gesetzt — dann
steht die Seite da wie ganz ohne Skript: alles sichtbar, nichts wartet auf ein
Ereignis, das nicht kommt. Das ist der einzige Zustand, in dem eine
Einblendung gefährlich wird: Löst sie nie aus, ist aus ihr verschwundener
Inhalt geworden.

### Der Glasrand

Eine Lichtkante auf den beiden Flächen, die wirklich Glas sind: der
Terminkarte über dem Auftaktfoto und der Kopfzeile, sobald sie klebt. Oben
und unten hell, in der Mitte nichts — so, wie Licht über eine gebogene Kante
läuft.

Gemacht aus einem Rahmen von 1,4 px, den zwei übereinandergelegte Masken aus
einer vollen Fläche herausschneiden (`mask-composite: exclude`). Ein
gewöhnlicher `border` kann das nicht: Er ist ringsum gleich hell.

Zwei Dinge hängen daran:

- `border-radius: inherit` — die Kante muss die Form ihres Elements
  annehmen, und die Formen dieser Seite sind Blattformen mit vier
  verschiedenen Ecken.
- **Die Kante ist ein Token, kein festes Weiß** (`--glanz-stark`,
  `--glanz-leise`). Weiß auf Papierweiß ist keine Kante. In den hellen
  Stimmungen ist sie die Tinte selbst, sehr schwach; erst in Nacht wird sie
  das weiße Licht, als das solche Effekte üblicherweise gedacht sind.

Zeigt ein Browser keine Maskenverrechnung, fehlt genau diese Kante und sonst
nichts — die Fläche darunter steht unverändert.

**Die Falle, die dabei zuschlug:** `.kopfzeile.gesetzt { position: relative }`
für den Bezugsrahmen des `::before` — und damit war `position: sticky` aus
`.kopfzeile` überschrieben, denn zwei Klassen schlagen eine. Die Kopfzeile
scrollte auf allen vier Stimmungen weg. `sticky` ist selbst schon ein
Bezugsrahmen; die Zeile war überflüssig.

### Die zweistimmige Schlagzeile

In einem langen Titel steht selten alles gleich wichtig da. „Seit zwanzig
Jahren" ist Beiwerk, „stehe ich selbst am Stuhl" ist der Satz. Die leise
Hälfte steht in `<em>` und tritt eine Tonstufe zurück (`.zweistimmig em`,
`--tinte-leise`); der Blick landet dort, wo der Satz beginnt.

- Kursiv wird sie ausdrücklich **nicht**. `<em>` steht hier für die Betonung,
  die es in der Vorlesesoftware auch wirklich gibt, nicht für Schrägstellung.
- Die leise Stufe ist „Tinte leise", nicht „Tinte still": Auf einer
  Schlagzeile über einem Foto muss auch das Beiwerk noch tragen.
- Vier Einsätze auf der ganzen Website. Auf jedem Titel wäre es ein Muster
  statt einer Betonung.

### Wenn eine Aufnahme nicht überall taugt

Der Auftraggeber hat ein Standbild aus einem eigenen Video geliefert
(1366×768): die Schere auf der weißen Ablage, dahinter der Stuhl und der
Raum in weicher Unschärfe. Es ist die einzige Aufnahme im Bestand, die den
Laden aus Augenhöhe zeigt — und trotzdem kann sie nicht die Bühne tragen.

Gemessen statt geschätzt. Kantenenergie bei gleicher Breite (1200 px):

| Aufnahme | Vorlage | Kantenenergie |
|---|---|---|
| Standbild mit Schere | 1366×768 | 68 |
| `arbeit-09` (Auftakt 1) | 1500×2000 | 239 |
| `arbeit-05` (Auftakt 2) | 1500×2000 | 304 |
| `salon-stuehle-spiegel` | 733×549 | 103 |

Dazu die Größenrechnung: Die Bühne braucht bei 1440 px und Kamerastand 1,12
eine Bildbreite von 1613 px. Das Standbild müsste also 18 % hochgerechnet
werden — und zeigt schon bei 100 % die Matschkanten einer Videokompression.

Sein Platz ist der Kopf der Salonseite bei 1100 px: unter seiner Vorlage,
in der Darstellung rund 385 px breit. Dort ist von der Weichheit nichts
mehr zu sehen, und die Aufnahme leistet, was keine andere leistet.

**Und der Rahmen gibt nicht mehr das Format vor.** `.bildstreifen img`
erzwang `aspect-ratio: 4/3`; einer 16:9-Aufnahme schnitt das beide Seiten
ab, und dort lagen die Spitzen der Schere. `.bildstreifen.breit` nimmt das
Format der Aufnahme.

## Elevation & Depth

Das System ist überwiegend tonal: Tiefe entsteht durch die Flächenleiter
(Grund → Feld → Karte) und durch 1-px-Hairlines, nicht durch Schatten. Drei
Stufen reichen. Schatten treten nur dort auf, wo ein Gegenstand physisch über
einem anderen liegt — Kartonblatt über Karton, Blatt über Fläche, klebende
Leiste über der Seite. Auf hellem Grund sind sie weit und weich und im Petrol
getönt (`oklch(40–45% .04 200)`): ein grauer Schatten macht eine helle Seite
schmutzig, ein schwarzer macht sie hart.

### Schattenvokabular

Zwei Stufen, beide mit Versatz und weichem Radius — ein Schein ohne Versatz
wäre Dekoration, kein Licht. Eine dritte war da und ist beim Aufräumen
gefallen, weil kein Bauteil sie brauchte.

- **Flach** (`--schatten-flach`): `0 1px 2px` plus `0 3px 10px`, beide
  `oklch(38% .04 60 / .07)`. Bildkacheln der Leistungskarten, Bildstreifen.
- **Hoch** (`--schatten-hoch`): `0 2px 6px / .11` plus `0 20px 44px / .20`.
  Das Portrait im Auftakt und das Bild in der Lupe.
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
Daneben nur: 3 px (`--bogen-klein`, Fokusrahmen), 6 px (`--bogen`), 4 px
(Merkmarke) und `100px` für echte Pillen und Kreise (Menüknopf, Lupenknöpfe,
Schild, Schildchen, Rollbalken).

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
- **Voll** (`.knopf-voll`): Messingfläche, Text in „Tinte hell". Hover: Messing hell
  plus `translateY(-2px)`.
- **Leer** (`.knopf-leer`): transparent, Rand „Linie hell", Text „Tinte".
  Hover: Rand und Text auf Messing, `translateY(-2px)`.
- **Gedrückt:** `translateY(0)` — der Knopf setzt sich auf.
- **Reihe:** `.knopfreihe`, `flex-wrap`, Lücke 1 rem.
- **Telefonmarke** (`.ruf`): dieselbe Form kleiner, Messingrand, Messingtext,
  Inline-SVG-Hörer bei 1 em. Steht in der Kopfzeile auf jedem Bildschirm.

### Karten / Behälter

- **Ecken:** stehendes Blatt (`{rounded.blatt}`).
- **Grund:** „Karte" auf dem weißen Grund; die Kartonvariante nutzt „Papier" mit
  „Papier-Rand" und „Papier-Tinte".
- **Rand:** 1 px „Linie". **Schatten:** keiner im Ruhezustand.
- **Polster:** 1,5 / 2 / 2,25 rem nach Umbruchpunkt.

### Marken und Schalter

- **Merkmarke** (`.merken`): der Preis selbst ist der Schalter — kein Symbol
  daneben. Ruhezustand Messingtext auf transparent mit 4 px Radius; ein „+"
  erscheint bei Hover oben rechts. Gedrückt (`aria-pressed="true"`): Messingfläche,
  Text in „Tinte hell", „✓" statt „+".
- **Schild** (`.schild`): Pille mit Messingrand, Kapitälchen, vorangestellter
  Punkt aus `currentColor`. Ein Anhänger, kein Auszeichnungsstreifen über einer
  Überschrift.
- **Folgenummer** (`.folge`): Messing, 0,62 em, vor der Gruppenüberschrift der
  Preisliste. Die Reihenfolge ist dort eine Aussage — gegliedert wird nach dem,
  was auf dem Stuhl zuerst passiert.

### Navigation

- **Kopfzeile:** klebend, transparent im Ruhezustand; ab dem ersten Scrollen
  trägt sie `.gesetzt` — getöntes Glas plus Hairline. Marke in Marcellus
  (`--s-marke`, 1,25 rem) mit gesperrtem Kapitälchen-Zusatz in Messing darunter.
- **Wegweiser:** Archivo 1 rem, „Tinte leise", darunter eine Messinglinie, die aus
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

### Der Auftakt: eine Kamerafahrt über Standbilder

Über zwei Bildschirmhöhen (`.auftakt-rolle`, `height: 200svh`) klebt die
Bühne oben fest und fährt: die Kamera zieht heran, drei Aufnahmen lösen
einander ab, Licht und Dunst ziehen mit.

Gefahren wird über eine **GSAP-Zeitleiste von hundert Einheiten**, an einen
`ScrollTrigger` mit `scrub: .6` gehängt. Hundert, damit jede Marke sich als
Prozentzahl der Strecke liest: die zweite Aufnahme setzt bei 23 ein, die
dritte bei 56, der Text wechselt zwischen 38 und 58.

- **Warum zwei Bildschirme und nicht sechs.** Wer hier landet, sucht meistens
  eine Telefonnummer. Die Terminkarte steht deshalb vom ersten Moment an im
  Bild und bleibt über die ganze Fahrt sichtbar.
- **Warum nicht mehr von Hand.** Vorher lag hier eine eigene Schleife, die
  den Scrollfortschritt anglich (lerp `.075`) und in jedem Bild ein Dutzend
  Variablen neu rechnete. Das lief — aber jede Marke stand als ausgerechnete
  Rampe im Code, und wer eine Aufnahme dazwischenschob, musste alle Fenster
  nachrechnen. `scrub` übernimmt die Angleichung, geschwindigkeitsabhängig;
  die Choreografie steht dafür als Reihe von Marken da statt als Rechnung.
- **Nur `transform` und `opacity`**, und GSAP schreibt sie direkt aufs
  Element statt über CSS-Variablen. Keine Layout-Eigenschaft wird angefasst.
- **Isolierung.** `isolation: isolate` auf der Bühne trennt den Stapel ab,
  `will-change: transform` hält die Kamera auf einer eigenen Ebene.
- **Ruhend und ohne GSAP** fällt die Rolle auf einen Bildschirm zusammen:
  eine Aufnahme, kein Kleben, kein Staub, keine zweite Textstufe. Die Marke
  `.mitfahrt` wird dann gar nicht erst gesetzt — die Seite steht da wie ganz
  ohne Skript, alles sichtbar, nichts wartet auf ein Ereignis.

**Drei Fehler, die die Umstellung ans Licht gebracht hat.**

1. *Zwei `set` an derselben Stelle.* Der Ausgangszustand stand als
   `F.set(alle, 0).set(erste, 1)` in der Zeitleiste. Beim Rückwärtslesen
   laufen gleichzeitige Anweisungen in umgekehrter Reihenfolge ab: Wer bis
   unten scrollte und wieder hochkam, sah eine leere Bühne. Der
   Ausgangszustand gehört außerhalb der Zeitleiste.
2. *Die Kamera fuhr in die falsche Richtung.* `scale` lief von 1,09 auf
   1,00 — also von nah nach weit, entgegen dem eigenen Kommentar. Am Ende
   der Fahrt kamen dadurch die Ränder der Aufnahme ins Bild: Föhnarm,
   Bodenfliesen, eine türkise Sprühflasche. Jetzt 1,02 → 1,12.
3. *Das Fenster im Schleier lag hinter der Karte.* Der seitliche Verlauf war
   erst bei 76–88 % ganz offen; bei 1440 px liegt die Terminkarte bei
   70–92 %. Vom Foto war auf dem ersten Bildschirm praktisch nichts zu
   sehen. Gemessen: längste Titelzeile endet bei 55 %, Karte beginnt bei
   70 % — das Fenster öffnet jetzt ab 60 % und ist ab 68 % ganz auf.

**Die Einblendungen** laufen über `ScrollTrigger.batch` mit `batchMax: 3` und
`stagger: .09`. Höchstens drei auf einmal: Vier gleichzeitig anlaufende
Bewegungen kann das Auge nicht mehr einzeln verfolgen. Nach unten wird nicht
zurückgesetzt — wer zurückscrollt, will lesen, nicht zusehen.

**Was die Vorlage vorgab und was daraus wurde.** Die Vorlage verlangt
`filter: blur()` auf den Dunstebenen und `mix-blend-mode: screen`, dazu eine
Partikel-Leinwand. Gemessen wurde, was das kostet — beim Scrollen, gegen die
62 Bilder je Sekunde, die jede andere Seite dieser Website erreicht:

| Aufbau | Bilder je Sekunde |
|---|---|
| mit Weichzeichner und Mischung | 8 |
| ohne Weichzeichner | 20 |
| ohne beides | 43 |
| Endstand, zwei Dunstebenen | 46 |

Der Weichzeichner über eine halbe Bildschirmfläche wird in jedem Frame neu
gerechnet. Ein Verlauf mit genug Stufen sieht genauso aus und kostet nichts;
die Warnung, ohne `screen` erschienen solche Ebenen als Blöcke, gilt für
deckende Verläufe — diese laufen auf transparent aus. Die Partikel-Leinwand
kostete für sich 9 statt 59 Bilder je Sekunde, und zwar unabhängig von ihrer
Größe: 1440×900, 360×225 und 2×2 lagen alle bei acht bis neun. An ihrer
Stelle stehen sechzehn winzige Ebenen, die nur `transform` und `opacity`
bewegen.

**Zwei Fallen, die hier zugeschlagen haben.** Das `<picture>` erbt die globale
Regel `height: auto`; das `<img>` darin rechnet seine 100 % dann gegen null,
und am Handy blieb das untere Drittel der Bühne leer. Und die Textstufen
überschnitten sich anfangs: bei halber Fahrt standen beide bei rund 40 %
Deckung übereinander. Jetzt ist die erste bei 50 % ganz weg, bevor die zweite
kommt.

**Gemessen wird die Fahrt, nicht der Anfang.** `werkzeug/kontrast-fahrt.mjs`
misst den Kontrast an fünf Stellen zwischen 0 und 100 %, weil Bild, Licht und
Schleier sich mitbewegen.

**Was der Wechsel auf GSAP an Tempo gebracht hat: nichts.** Die Fahrt lief
vorher bei 46, jetzt bei 45–48 Bildern je Sekunde — im Rauschen. Gemessen
wurde auch, woran das liegt, und die naheliegende Vermutung war falsch: Nicht
das Bewegen der Lichtebene kostet (stillgestellt 48, bewegt 46, kleiner 45,
mit nur einem Verlauf 46 — alles dasselbe), sondern dass sie überhaupt im
Stapel liegt. Mit `display: none` springt die Fahrt auf 57–60. Der Preis ist
die Bildsprache selbst: mehrere durchscheinende Vollflächen übereinander.
Dieser Rechner zeichnet ohne Grafikkarte (SwiftShader); auf einem Gerät mit
Kompositor im Chip fällt genau diese Arbeit weg.

Ein Gewinn steht trotzdem im Code: Eine Aufnahme, die vollständig verdeckt
ist, wird jetzt auf null gesetzt statt deckend liegenzubleiben.

### Die Übersicht in der Kopfzeile

`.navpunkt` mit `<button aria-expanded>` und `.uebersicht`. Neun Gruppen mit
Ab-Preis in drei Spalten. Escape schließt und gibt den Fokus zurück, ein Klick
daneben schließt, ein Fokuswechsel nach draußen schließt.

Ohne JavaScript gibt es den Knopf nicht (`display: none`, erst `.mitskript`
zeigt ihn) — dann steht dort der gewöhnliche Verweis auf die Preisliste.

Der Selektor ist `button[aria-expanded='true'] ~ .uebersicht`, nicht `+`:
zwischen Knopf und Feld steht der Verweis für den Fall ohne Skript.

Die Textfarbe des Termin-Knopfs steht in `.kopfzeile .knopf-termin`, weil
`.wegweiser a` spezifischer ist als `.knopf-voll` und ihn sonst in Messing auf
Messing färbte — gemessen 1,1∶1.

### Die Werkschau

Fünfzehn Aufnahmen in Spalten (`columns: 2 / 3 / 4`), `break-inside: avoid`.
Ein Raster aus gleich hohen Kacheln hätte jede zweite beschnitten; hier laufen
die Spalten und die Bilder behalten ihre Form.

### Vollbild

Ein Foto in seinem eigenen Seitenverhältnis, mit `--bogen-blatt` und
`--schatten-flach`. Der Ersatz für die Fotobahnen unter einem Schleier.

### Die abgesetzte Bahn

`.warm` trägt `--grund-warm` plus das Strähnenmuster. Jeder zweite Abschnitt
steht darauf, damit nie zwei gleiche Gründe aneinanderstoßen.

## Do's and Don'ts

### Do:

- **Do** jede neue Farbe aus einem Foto des Ladens messen und als Token in
  `:root` legen — `werkzeug/farben-messen.mjs` und `werkzeug/bilder-bauen.mjs`
  geben die Werte aus.
- **Do** jeden Gestaltungswert benennen, bevor er im Stylesheet steht: auch
  Rollbalken, Mikroschrift und der Grund eines fremden Fensters haben ein Token.
- **Do** für jedes neue Bauteil einen der vier Blattbögen nehmen
  (`--bogen-blatt`, `--bogen-blatt-quer`) oder eine
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
  es gibt eine helle Schrift auf Messing, eine Trennlinie auf Papier, eine
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
