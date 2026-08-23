# Vor dem Veröffentlichen zu klären

Die Seite ist fertig gebaut und läuft. Sieben Punkte kann nur die Inhaberin
beantworten. **Bis dahin sollte die Seite nicht öffentlich gehen** — die
ersten vier sind rechtlich, nicht kosmetisch.

## 1. Einwilligungen für die Kundenfotos — bestätigt

Der Auftraggeber hat bestätigt: **alle abgebildeten Personen sind mit der
Veröffentlichung einverstanden.** Damit zeigt die Seite die Arbeitsfotos in
voller Aufnahme statt nur enge Haarausschnitte — fünfzehn Arbeiten, jede in
ihrem eigenen Seitenverhältnis.

**Bitte einmal schriftlich absichern.** Bei den Aufnahmen von Kundinnen und
Kunden, dem Kind und der Braut sollte die Einwilligung dokumentiert sein
(formlos genügt, aber schriftlich). Bei dem Kind ist die Einwilligung der
Sorgeberechtigten nötig. Wer sie später zurückzieht, hat darauf Anspruch;
das Bild ist dann aus `bilder/` und aus der Werkschau in `index.html` zu
entfernen.

## 2. Sind die Preise noch aktuell?

Alle Preise auf `leistungen.html` sind wörtlich von der alten Seite
übernommen (Stand 20.08.2026, siehe `recherche/preise.md`). Beim
Vorgängerprojekt stellte sich heraus, dass solche Listen über ein Jahr alt
waren. **Bitte einmal durchgehen.**

## 3. Die Steuernummer im Impressum

Auf der alten Seite steht `148/156/01115` unter der Überschrift
„Umsatzsteuer-Identifikationsnummer". Das ist dem Format nach eine
**Steuernummer**, keine USt-IdNr. — eine USt-IdNr. sieht aus wie
`DE123456789`.

Das ist kein Schönheitsfehler: Eine Steuernummer muss nicht ins Impressum und
gehört dort auch nicht hin, und eine falsch beschriftete Angabe ist
abmahnfähig. Bitte prüfen:

- Gibt es eine echte USt-IdNr.? Dann diese eintragen.
- Wenn nicht: Der ganze Abschnitt „Umsatzsteuer" kann in `impressum.html`
  ersatzlos entfallen.

## 4. Verbraucherschlichtung

In `impressum.html` steht der übliche Satz: nicht bereit und nicht
verpflichtet, an einem Streitbeilegungsverfahren teilzunehmen. Das ist für
einen Betrieb dieser Größe der Normalfall — es ist aber eine Aussage über die
eigene Absicht. Kurz bestätigen.

*(Die früher übliche Verlinkung der EU-Streitschlichtungsplattform fehlt
bewusst: Die Plattform wurde im Juli 2025 eingestellt.)*

## 5. Preise fürs Kosmetikstudio

Für „BaHaar's Kosmetikstudio" nebenan gibt es noch keine Preise.
`salon.html` sagt das offen und verweist aufs Telefon, statt Zahlen zu
erfinden. Sobald die Preise feststehen, gehören sie in `leistungen.html` als
zehnte Gruppe.

## 6. Die Texte sprechen jetzt in Ihrer Stimme

Die Seite ist von der dritten Person in die erste gewechselt: „Ich heiße
Fakhria Tokhi", „Vor jeder Farbe sehe ich mir die Kopfhaut an". Das liest
sich besser, aber es legt Ihnen Worte in den Mund.

**Bitte einmal durchlesen und freigeben** — vor allem den ersten Bildschirm,
den Abschnitt „Wer hier schneidet" auf der Startseite und den Abschnitt
„Bahar" auf der Salonseite. Was nicht stimmt, ändere ich.

Ihr Portrait steht mit Namen und Meistertitel auf der Startseite und auf der
Salonseite. Die Vorlage ist 624 × 1024 px und gibt nicht mehr her; eine
Stunde bei Tageslicht am Fenster würde die Seite spürbar heben.

## 7. WhatsApp

Der Merkzettel auf der Preisliste baut aus der Auswahl einen fertigen Text.
Verschickt wird er per E-Mail oder am Telefon vorgelesen — **nicht** per
WhatsApp, weil 089 692 36 44 ein Festnetzanschluss ist und keine
Mobilnummer bekannt war.

Gibt es eine geschäftliche Mobilnummer mit WhatsApp, ist das ein Zweizeiler
in `seite.js` (bei `merkzettel-mail`).

---

## Was ohne Rückfrage schon geprüft ist

Nichts davon ist geschätzt. Die Werkzeuge dafür liegen in `werkzeug/` und
lassen sich jederzeit erneut laufen lassen.

| | |
|---|---|
| Konsolenfehler | keine, auf allen sieben Seiten |
| Gestaltungsprüfer | `detect.mjs` meldet null Funde |
| Kontrast über Fotos | an den tatsächlichen Bildpunkten hinter jeder Textzeile gemessen, alle Stellen über 4,5:1 bzw. 3:1 |
| Fremde Verbindungen | vor dem Klick auf das Buchungsfenster: null |
| Waagrechter Überlauf | keiner bei 1440, 390 und 320 px |
| Tastaturbedienung | Farbfächer (Pfeiltasten, Pos1, Ende), Lupe, Menü, Merkzettel |
| Ohne JavaScript | jeder Abschnitt sichtbar |
| Ganzseiten- und Druckansicht | nichts bleibt eingeblendet stehen |
| Schriften | selbst gehostet, 105 KB zugeschnitten, nichts von Google |
| Erste Ladung Startseite | rund 400 KB ohne Film, rund 1,8 MB mit |
| Die Filme | vom eigenen Server, ohne Ton, ohne Bedienleiste; im Sparmodus gar nicht geladen. Startseite 1,4 MB, Salonseite 3,6 MB und erst beim Auftauchen |
| Gestaltungswerte | 45 Token in `:root`, kein Einzelwert im Stylesheet |
| Farbstimmungen | alle vier auf allen sieben Seiten geprüft, Kontrast in jeder einzeln gemessen und über dem Grenzwert |
| Rückfallebenen | ohne GSAP und bei abbestellter Bewegung steht jede Seite vollständig sichtbar da |
| Bewegungsbibliothek | GSAP 3.15.0, im Projekt statt von einem CDN — die Zusage „nichts von fremden Servern" bleibt wahr |
| Rundgang | `werkzeug/rundgang.mjs`: 7 Seiten × 3 Breiten × 4 Stimmungen × 2 Rückfallebenen, ohne Beanstandung |

## 8. Die vier Farbstimmungen — welche soll die Vorgabe sein?

Am Fuß jeder Seite stehen jetzt vier Stimmungen zur Wahl. Alle vier sind aus
Ihrem eigenen Bildmaterial gemessen, keine ist ausgedacht:

- **Messing** (steht derzeit als Vorgabe): warmes Papierweiß, Espresso,
  Messing. Gemessen am Karamell im Haar und am dunklen Holz in Ihrem
  Portrait.
- **Asche**: dieselbe Seite in Kühl. Gemessen an den Schattenseiten der
  blonden Arbeiten.
- **Rosé**: warm und weich. Gemessen an den Brautbildern.
- **Nacht**: dieselbe Seite bei ausgeschaltetem Licht. Gemessen am selben
  Portrait, nur an seiner tiefsten Stelle — dem dunklen Holzregal hinter
  Ihnen. Hier trägt das Foto den ganzen ersten Bildschirm; es ist die
  Fassung, die am meisten nach Abendtermin aussieht.

**Was wir von Ihnen brauchen:** Welche soll die Besucherin sehen, wenn sie
zum ersten Mal kommt? Oder sollen die anderen ganz weg? Der Umschalter ist
bewusst klein und steht unten — er soll eine Möglichkeit sein, keine
Aufforderung.

Zum Ansehen genügt ein Klick unten im Fuß; die Wahl bleibt dann in Ihrem
Browser, bis Sie sie ändern.

## 9. Die beiden Filme — bitte einmal selbst ansehen

**Wie sie aussehen, konnte ich nicht prüfen**: Der Browser, mit dem ich
hier messe, ist ohne die lizenzpflichtigen Codecs gebaut und kann H.264
nicht abspielen. Alles Übrige ist geprüft — dass sie geladen werden, dass
sie umblenden, dass die Standbilder einspringen, wenn etwas schiefgeht,
dass sie stehenbleiben, wenn niemand hinsieht.

**Der Auftakt** zeigt die Hochkantaufnahme (726 × 1266). Am Telefon füllt
sie die Fläche; am Schreibtisch steht sie als Säule in der Mitte, in ihrem
eigenen Format. Sie auf die volle Breite zu ziehen hieße, sie auf das
Doppelte ihrer Vorlage zu vergrößern — dann wäre sie unscharf.

**Die Salonseite** zeigt die erste Aufnahme (1920 × 1080) am Kopf der
Seite, dort wo der Laden das Thema ist.

**Was Sie sich ansehen sollten:**

1. Sitzt der Ausschnitt der Säule am Schreibtisch? Sie ist so hoch wie der
   Bildschirm und entsprechend schmal.
2. Fällt der Sprung am Ende auf? Der Auftaktfilm dauert 4 Sekunden.
3. Tragen die Zeilen darüber überall?

**Zwei Kleinigkeiten an der neuen Datei**, beide ohne Folgen für den
Betrieb, aber erwähnenswert: Sie hat eine Tonspur (die Seite spielt
stumm ab, der Ton kostet nur ein paar Kilobyte), und ihr Inhalts-
verzeichnis steht am Dateiende statt am Anfang. Dadurch muss der Browser
sie ganz laden, bevor er anfangen kann — bei 1,4 MB fällt das kaum auf.
Wer in Canva exportiert, kann das nicht beeinflussen.

## Auslieferung

`.github/workflows/deploy-pages.yml` veröffentlicht bei jedem Push auf
`main`. Solange die Arbeit auf dem Entwicklungszweig liegt, passiert nichts —
die Seite geht erst live, wenn der Zweig nach `main` übernommen wird.
