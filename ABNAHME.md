# Vor dem Veröffentlichen zu klären

Die Seite ist fertig gebaut und läuft. Sieben Punkte kann nur die Inhaberin
beantworten. **Bis dahin sollte die Seite nicht öffentlich gehen** — die
ersten vier sind rechtlich, nicht kosmetisch.

## 1. Einwilligungen für die Kundenfotos

Die Arbeitsfotos stammen von der bisherigen Seite und zeigen Haare echter
Kundinnen und Kunden. Dass sie dort standen, ist kein Nachweis, dass es
zulässig war.

**Was diese Seite deshalb tut:** Jeder Zuschnitt einer *Kundenarbeit* geht so
eng ins Haar hinein, dass **kein Gesicht erkennbar** ist. Das einzige Gesicht
auf der Seite ist das der Inhaberin — über ihr eigenes Bild entscheidet sie
selbst.

Fünf Vorlagen liegen ungenutzt in `recherche/bilder/`, teils wegen erkennbarer
Personen, teils weil das Haar darauf nicht sauber aussieht: der Kinderschnitt
(Kind erkennbar), das kurze graue Haar (Gesicht im Profil), die krause
Blondaufnahme, die Hochsteckfrisur mit Orangestich und die Braut mit Schleier
(Gesicht).

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

## 6. Das Portrait — erledigt, mit einer Bitte

Der Auftraggeber hat bestätigt, dass `recherche/bilder/portrait-model.jpg`
**Fakhria Tokhi selbst** zeigt. Das Bild trägt jetzt den ersten Bildschirm,
mit Namen und Meistertitel.

**Bitte gegenprüfen lassen.** Sie steht damit namentlich und mit Gesicht auf
einer öffentlichen Seite — das sollte sie selbst gesehen und gewollt haben,
bevor die Seite beworben wird.

**Eine bessere Aufnahme lohnt sich trotzdem.** Die Vorlage ist 624 × 1024 px
und gibt nicht mehr her; deshalb steht sie in einer Spalte von höchstens
23 rem statt vollflächig. Eine Stunde bei gutem Tageslicht am Fenster genügt,
ein aktuelles Handy reicht. Danach nur den Zuschnitt in
`werkzeug/bilder-bauen.mjs` austauschen.

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
| Erste Ladung Startseite | rund 400 KB |
| Gestaltungswerte | 45 Token in `:root`, kein Einzelwert im Stylesheet |

## Auslieferung

`.github/workflows/deploy-pages.yml` veröffentlicht bei jedem Push auf
`main`. Solange die Arbeit auf dem Entwicklungszweig liegt, passiert nichts —
die Seite geht erst live, wenn der Zweig nach `main` übernommen wird.
