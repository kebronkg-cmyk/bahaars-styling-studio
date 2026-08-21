# Vor dem Veröffentlichen zu klären

Die Seite ist fertig gebaut und läuft. Sieben Punkte kann nur die Inhaberin
beantworten. **Bis dahin sollte die Seite nicht öffentlich gehen** — die
ersten vier sind rechtlich, nicht kosmetisch.

## 1. Einwilligungen für die Kundenfotos

Die Arbeitsfotos stammen von der bisherigen Seite und zeigen Haare echter
Kundinnen und Kunden. Dass sie dort standen, ist kein Nachweis, dass es
zulässig war.

**Was diese Seite deshalb tut:** Jeder Zuschnitt geht so eng ins Haar hinein,
dass **kein Gesicht erkennbar** ist. Fünf Vorlagen mit deutlich erkennbaren
Personen — darunter das Foto eines Kindes und die Portraitaufnahme — liegen
ungenutzt in `recherche/bilder/`.

Liegen Einwilligungen vor, lassen sich weitere Bilder freischalten: Zuschnitt
in `werkzeug/bilder-bauen.mjs` eintragen, `node werkzeug/bilder-bauen.mjs`
laufen lassen.

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

## 6. Das Portrait

Die Seite zeigt **kein Bild von Bahar**, weil unklar ist, ob
`recherche/bilder/portrait-model.jpg` sie selbst oder ein Model zeigt. Ein
falsch beschriftetes Portrait wäre schlimmer als gar keines.

**Das ist die eine Aufnahme, die dieser Seite wirklich noch fehlt.** Bei
einem inhabergeführten Salon kaufen die Leute die Person. Eine Stunde bei
gutem Tageslicht am Fenster genügt; ein aktuelles Handy reicht.

Ebenso hilfreich wären: Bahars Hände bei der Arbeit, Werkzeug in Nahaufnahme,
der Laden ohne Kabel im Bild. Die drei vorhandenen Innenaufnahmen sind mit
höchstens 733 px so klein, dass sie nur in Briefmarkengröße scharf sind.

## 7. WhatsApp

Der Merkzettel auf der Preisliste baut aus der Auswahl einen fertigen Text.
Verschickt wird er per E-Mail oder am Telefon vorgelesen — **nicht** per
WhatsApp, weil 089 692 36 44 ein Festnetzanschluss ist und keine
Mobilnummer bekannt war.

Gibt es eine geschäftliche Mobilnummer mit WhatsApp, ist das ein Zweizeiler
in `seite.js` (bei `merkzettel-mail`).

---

## Was ohne Rückfrage schon geprüft ist

| | |
|---|---|
| Konsolenfehler | keine, auf allen sieben Seiten |
| Gestaltungsprüfer | `detect.mjs` meldet null Funde |
| Kontrast über Fotos | gemessen, alle Stellen über 4,5:1 bzw. 3:1 |
| Fremde Verbindungen | keine — gemessen, nicht behauptet |
| Waagrechter Überlauf | keiner bei 390 px |
| Tastaturbedienung | Farbfächer, Lupe, Menü, Merkzettel |
| Ohne JavaScript | alle Inhalte sichtbar |
| Schriften | selbst gehostet, 105 KB, nichts von Google |

## Auslieferung

`.github/workflows/deploy-pages.yml` veröffentlicht bei jedem Push auf
`main`. Solange die Arbeit auf dem Entwicklungszweig liegt, passiert nichts —
die Seite geht erst live, wenn der Zweig nach `main` übernommen wird.
