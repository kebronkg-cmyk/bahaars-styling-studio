# Übergabe — BaHaar's Styling Studio

Diese Datei in eine neue Sitzung einfügen. Sie ersetzt das Gespräch, nicht
die Dateien: `CLAUDE.md` (Arbeitsweise, Fallen) und `ABNAHME.md` (offene
Punkte für den Auftraggeber) liegen im Projekt und gelten weiter. Hier steht
nur, was sonst verloren ginge.

## Zwei Fassungen — „Video" heisst: zurück zum Film

Seit dem 24.09.2026 läuft eine **Testfassung ohne Film**. Die Fassung mit dem
Film ist unverändert gesichert unter `fassungen/video/` (Stand `b86d438`).
Sagt der Auftraggeber **„Video"**, wird genau diese Fassung zurückgeholt:

```bash
cp fassungen/video/{index.html,neu.css,neu.js,leistungen.html,impressum.html,datenschutz.html} .
```

Die Filmdateien in `bilder/` sind nie angefasst worden. Ein Git-Tag
`video-fassung` liess sich über den Zugang der Sitzung nicht pushen, deshalb
der Ordner.

**Was die Testfassung ausmacht:**

- Auftakt: `bilder/grund-glanz.webp` (Petrol-Glanz mit Lichtband und
  Staub) vollflächig, davor `bilder/schere-frei.webp` — die Schere aus der
  Vorlage des Auftraggebers, mit einem Segmentierungsmodell (BiRefNet)
  freigestellt, echte Alphamaske. Schwebt langsam (14 s), kommt mit der
  ersten Auftrittsgruppe.
- Hinter der ganzen Seite `bilder/grund-wand.webp` (Pinselputz, auf L 30 %
  gesenkt), Abschnitte als Scheiben mit `--durch` .60–.86.
- Stimmen auf hellem Putz (`bilder/grund-licht.webp`): fünf **echte**
  5-Sterne-Bewertungen, wörtlich aus dem Treatwell-Eintrag (JSON-LD der
  Seite, gelesen am 24.09.2026), mit Vorname und Datum. Ersetzt den
  früheren Abschnitt „Urteil".
- Logo: `logo-siegel.svg` (Ring, kursives Bodoni-B, Umschrift in Mulish —
  alles als Pfade, keine Schrift nötig), `logo-zeichen.svg` für die Leiste,
  `logo-favicon.svg`. Siegel im Vorhang (Anfang) und im Fuss (Ende).
- Die drei Vorlagen wurden in OKLab auf den Farbwinkel der Seite gedreht:
  Glanz 201→198, heller Putz 192→195 (Buntheit ×0,7, L 88 %), Pinselputz
  209→200 (L 55→30 %, Kontrast der Pinselzüge ×1,25).
- Vorhang wartet nicht mehr auf den Film, sondern auf `decode()` des
  Glanzes: frühestens 1 s, spätestens 2 s (gemessen: 1,1 s).
- `--auf-buehne*` und die CSS zu `.auftritt-gross` fehlten in der
  Filmfassung, obwohl Markup und Skript sie benutzten — jetzt gesetzt.

Gemessen (kontrast3.mjs): alle Zeilen über der Grenze, Minimum 4,99:1
(Wortmarke kursiv, 390 px, Grossschrift). Detektor mit Parsern: 21 Hinweise,
die Filmfassung hatte 23 — die frühere Angabe `[]` kam aus dem Rückfallmodus
ohne Parser (`npm i --no-save htmlparser2 css-select css-tree domutils` im
Skill-Ordner, dann ist er vollständig).

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
