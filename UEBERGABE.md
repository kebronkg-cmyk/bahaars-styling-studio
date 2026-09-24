# Übergabe — BaHaar's Styling Studio

Diese Datei in eine neue Sitzung einfügen. Sie ersetzt das Gespräch, nicht
die Dateien: `CLAUDE.md` (Arbeitsweise, Fallen) und `ABNAHME.md` (offene
Punkte für den Auftraggeber) liegen im Projekt und gelten weiter. Hier steht
nur, was sonst verloren ginge.

## Fassungen — alle jederzeit abrufbar

Jede Fassung liegt **vollständig und lauffähig** in ihrem eigenen Ordner,
mit eigenen Kopien aller Bilder, Schriften und Skripte. Keine hängt an einer
anderen oder an der Hauptseite. Übersicht: `fassungen/index.html`.

| Fassung | Ordner | Live |
|---|---|---|
| Hell (neu) | `fassungen/hell/` | https://kebronkg-cmyk.github.io/bahaars-styling-studio/fassungen/hell/ |
| Dunkel, ohne Film | `fassungen/dunkel/` | …/fassungen/dunkel/ |
| Mit Film | `fassungen/video/` | …/fassungen/video/ |

Die **Hauptseite** (Wurzel) ist derzeit die dunkle Fassung. Alle Fassungen
tragen `noindex` und verlinken ihre Marke auf die eigene `index.html`.

Eine Fassung zur Hauptseite machen (Beispiel „Video"):

```bash
cp -r fassungen/video/. .
sed -i '/<meta name="robots" content="noindex">/d' index.html leistungen.html impressum.html datenschutz.html
```

Eine neue Fassung aus einem Git-Stand ablegen:
`python3 recherche/fassung.py <commit> <name> <titel>` — sammelt alle
Verweise aus HTML und CSS und kopiert genau das, was die Seite braucht.

Ein Git-Tag liess sich über den Zugang der Sitzung nicht pushen, deshalb
Ordner.

**Was die Testfassung ausmacht (Stand 24.09.2026, helle Fassung):**

- **Hell.** Grund `--grund` L 96,5 %, Schrift Petrol in drei Stufen
  (`--schrift`, `-leise`, `-still`). Akzent getrennt: `--akzent` (das
  Türkis des Ladenschilds) nur für Flächen und Zeichen, `--akzent-schrift`
  (L 45 %) für Verweise. Gefüllter Knopf: tiefes Petrol, helle Schrift.
  Die alten dunklen Namen (`--auf-tiefe`, `--nacht`, `--lagune` …) gibt es
  nicht mehr — sie trugen zwei Aufgaben.
- **Hintergründe selbst gerechnet** — keine fremden Bildrechte.
  `recherche/straehne.py` (Linienintegral-Faltung über ein Wirbelfeld):
  gekämmte Strähnen, das eigene Material eines Friseurs.
  - Auftakt: `straehne-glanz-quer.webp` (2000 × 1250) und `-hoch.webp`
    (1000 × 1800) per `<picture>` — jeder Zuschnitt für sein Format.
  - Wand hinter allem: `straehne-wand.webp` (L 95 %), Scheiben `--durch`
    .22–.82.
  - Stimmen: `straehne-aqua.webp`. Fuss als dunkler Anker:
    `straehne-tief.webp`, dort sind die Schrifttokens lokal hell gesetzt.
  - Die Pinterest-Vorlagen sind aus dem Repository entfernt.
- **Schrift der Überschriften:** Gilda Display, Kursive aus Rosarivo, beide
  unter dem Familiennamen `'Gilda Display'` (OFL, `schrift/`). Fraunces war
  kurz drin und flog wieder raus: der Detektor führt sie als Modeschrift
  generischer Seiten.
- Auftakt: freigestellte Schere (`schere-frei.webp`, BiRefNet-Maske) vor
  dem Glanz, schwebt langsam. **Herkunft der Schere-Vorlage offen**
  (ABNAHME Punkt 9).
- Stimmen: fünf echte 5-Sterne-Bewertungen aus dem Treatwell-Eintrag,
  wörtlich, gelesen am 24.09.2026.
- Logo: `logo-siegel.svg` (dunkel, für hellen Grund), `logo-siegel-hell.svg`
  (Fuss), `logo-zeichen.svg`, `logo-favicon.svg` — B aus der Rosarivo-Kursive,
  Umschrift Mulish, alles als Pfade. Erzeugt mit `recherche/`-Skripten nicht
  nötig; die SVGs sind fertig.

Gemessen (kontrast3.mjs, 1440 und 390): alles über der Grenze, schwächste
Zeile 5,6:1. Detektor mit Parsern: 22 Hinweise, alle aus Mustern, die schon
in der Filmfassung standen (Filmfassung: 23). Die frühere Angabe `[]` kam aus
dem Rückfallmodus ohne Parser (`npm i --no-save htmlparser2 css-select
css-tree domutils` im Skill-Ordner).

## Stand

- Repo `kebronkg-cmyk/bahaars-styling-studio`, Zweig `main` = Zweig
  `claude/shared-conversation-link-spku8d`, Commit `815d25e`.
- Live: https://kebronkg-cmyk.github.io/bahaars-styling-studio/
  (`.github/workflows/deploy-pages.yml`, feuert bei Push auf `main`, ist nach
  ~30 s drin). Ich habe bisher jeweils auf **beide** Zweige gepusht.
- Statische Seite: `index.html`, `leistungen.html`, `impressum.html`,
  `datenschutz.html`, `neu.css`, `neu.js`. Kein Build, keine Abhängigkeiten.
- Alles auf Deutsch, auch Commits und Codekommentare. Kein Modellname darin.

## Was beim Fertigmelden zu tun ist

1. `node .claude/skills/impeccable/scripts/detect.mjs --json` muss `[]` liefern.
2. Gesamtansicht **zuerst ansehen** (`ueberblick.mjs`), 1440 und 390.
3. Kontrast auf allen vier Seiten in beiden Breiten (`kontrast3.mjs`).
   Für alles über dem Film zusätzlich `bewegtkontrast.mjs` — ein einzelnes
   Filmbild sagt bei bewegtem Grund nichts.
4. Funktionsprüfungen (siehe `.claude/pruefung/LIESMICH.md`).
5. Nach dem Push die Live-Dateien per md5 vergleichen, erst dann melden.

## Teuer erarbeitete Fakten — nicht neu herleiten

**Der Film.** Vorlage: `vorlagen/schere-rauch-quelle.mp4`, 960 × 960, 8 s,
24 fps (das ist die einzige Kopie, sie lag vorher nur im Upload-Ordner der
Sitzung). Ausgeliefert wird 1440 × 1440, CRF 24, Sättigung `eq=saturation=1.16`
in der Datei gebacken, 5 s Schleife mit 2 s Überblendung aus Sekunde 0–7:

```
[0:v]scale=1440:1440:flags=lanczos,eq=saturation=1.16,split=3[a][b][c];
[a]trim=2:5,setpts=PTS-STARTPTS,fps=24[mid];
[b]trim=5:7,setpts=PTS-STARTPTS,fps=24[tail];
[c]trim=0:2,setpts=PTS-STARTPTS,fps=24[head];
[tail][head]xfade=transition=fade:duration=2:offset=0[x];
[mid][x]concat=n=2:v=1:a=0,fps=24[v]
```
`xfade` braucht `fps=24` **hinter jedem** `trim`/`setpts`, sonst bricht es ab.

- Die Rauchdichte steigt in der Vorlage monoton 37 → 46 und fällt nie zurück.
  Deshalb war die alte 7-s-Schleife an der Naht ein Absturz um 20 %. Das
  gewählte Fenster hält die Änderung bei 7,8 %/s statt 23,5 %/s.
- Die Schere ist zwischen Sekunde 2 und 5 am klarsten und wird danach vom
  Rauch zugedeckt (Helligkeit 97 → 76).
- **Schärfe ist ausgereizt.** Gegen die ideal hochgezogene Vorlage liegt die
  ausgelieferte Fassung bei Abstand 0,795; jedes Nachschärfen vergrössert ihn
  (0,842 bei der mildesten Stufe) — das wäre erfundene Kante. 1920 px bringen
  nur auf Retina 2,3 % und kosten dort, wo 1:1 abgebildet wird, 1,9 %. Ein
  CSS-`filter` auf dem Videofeld kostet **nichts** (gemessen, gleiche Datei).
  Echte Schärfe bräuchte eine höher aufgelöste Aufnahme.
- Über dem Film liegt stehendes Korn (`.raum-korn`, `mix-blend-mode: overlay`,
  `opacity: .28`). `overlay` lässt Schwarz schwarz; `screen` kippt die Tiefe
  ins Graue — geprüft und verworfen. Kostet keine Bildrate.

**Der Autostart auf dem iPhone.** Zwei Dinge sind Pflicht, beide schon drin:
Das Videofeld darf **nie** `opacity: 0` bekommen — Safari hält es dann für
unsichtbar und startet gar nicht mehr; das war zweimal die Ursache dafür, dass
erst eine Berührung den Film anwarf. Und `muted`, `defaultMuted`, `playsInline`
müssen als **Eigenschaften** am Element gesetzt sein, bevor `play()` läuft, das
Attribut allein reicht nicht. Im Stromsparmodus verweigert iOS jeden Autostart
— dagegen hilft nichts, dann steht das Standbild, und das ist der geplante
Zustand.

**Der Auftakt.** Das Metall der Schere steckt bei 1440 px fast vollständig in
der mittleren Zone der Breite; links und rechts ist die Aufnahme leer. Deshalb
steht die Schrift ab 62rem links an der Kante — mittig steht sie zwangsläufig
auf der Schere, egal wie licht der Schleier ist. Am schmalen Schirm füllt die
Schere die Breite, dort hilft nur die Höhe (Block tief, Abstände eng).
Der Schatten hinter dem Textblock ist ein **senkrechtes Band mit Maske nach
rechts** — ohne Maske steht eine sichtbare Kante quer im Rauch, mit Ellipse
reicht der Radius an den Enden der breiten Zeile nicht.

**Farbe.** `--lagune: oklch(80% .136 193)` ist aus dem Rauch gemessen (stärkstes
Hundertstel: L 84 %, C .143) — kräftiger geht nicht, ohne den Bezug zum Film zu
verlieren. Türkis wird nur auf dem gefüllten Knopf zur Fläche; sonst Strich,
Zeichen oder Zeile.

**Der Rauch auf der Seite.** `--durch` je Abschnitt steuert, wieviel Film
durchkommt. Der Film schwankt an einem Bildpunkt um 20,8 sRGB-Stufen; sichtbar
wird Bewegung ab etwa 2 Stufen, also ab `--durch` ≈ .90. Stand: .86 allgemein,
.83 Band, .84 Werk, .90 Fuss und Recht.

## Wo ich zuletzt Fehler gemacht habe

Damit sie nicht wiederkommen — alle behoben, aber sie zeigen das Muster:

- Zweimal am Schleier gedreht, obwohl die **Anordnung** das Problem war.
- Mit `opacity: 0` den Abspielknopf versteckt und damit den Film ausgesperrt.
- Kontrast an einem einzelnen Filmbild gemessen und für bewiesen gehalten.
- Beim Messen den Textblock samt seinem Schatten versteckt und dann den
  nackten Film gemessen.
- `oklch()` aus `getComputedStyle` als RGB gelesen.
- Zwei verschiedene Videodateien verglichen und den Unterschied für einen
  Rendering-Effekt gehalten.
- Mehrfach doppelte Selektoren erzeugt (`.kontakt`, `.wortmarke`, `.braut`,
  `.braut-satz`) — die zweite gewinnt, die erste sieht im Quelltext richtig
  aus. Vor dem Benennen `grep`, nach dem Einfügen `uniq -d` über die
  Selektoren.
- `.kontakt a` (zwei Stufen) hat die Schrift auf `.knopf` überschrieben — der
  Knopf stand leer da. Elternselektor ausnehmen, nicht `!important`.

## Offen

- `ABNAHME.md` Punkt 5: Öffnungszeiten. Die eigene Seite des Salons
  (bahaarsstylingstudio.de) bestätigt die hier verwendeten Zeiten; **Treatwell
  und die Branchenverzeichnisse weichen ab** und sollten vom Auftraggeber
  angeglichen werden. Dringlichster Punkt, weil bei Treatwell gebucht wird.
- `ABNAHME.md` Punkt 6: Die Note 4,8 / über 90 stammt von **Treatwell**. Der
  Bewertungsabschnitt ist nach dem Vorbild einer Google-Tafel gebaut und
  verlinkt dorthin, nennt die Zahl aber bewusst **ohne Quelle**. Sobald die
  echten Google-Zahlen vorliegen, „aus N Google-Bewertungen" eintragen.
- Restliche Punkte in `ABNAHME.md` (Steuernummer, Bildfreigaben, Schlichtung,
  Preise, Telefonnummer, Kosmetikpreise).
- Die Bewertung steht dreimal auf der Startseite (Ecke im Auftakt, Band,
  eigener Abschnitt). Bewusst so gelassen — beim Auftraggeber nachfragen, ob
  das Band-Feld raus soll.
