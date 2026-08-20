# Arbeitsweise für dieses Projekt

Übernommen aus dem JaSuVi-Projekt — Konventionen, Vorlieben des Auftraggebers
und Fallen, die dort tatsächlich zugeschlagen haben.

## Sprache

Alles auf Deutsch: Oberfläche, Kommentare im Code, Commit-Nachrichten, Antworten.
Kein Modellname in Commits, PR-Texten oder Codekommentaren.

## Bauart

Statische Seite: HTML, CSS, Vanilla JS. **Kein Build-Schritt, keine Abhängigkeiten.**
Ausliefern über GitHub Pages, `.github/workflows/deploy-pages.yml` deployt bei
jedem Push. Nach dem Push die Live-URL abfragen, bis die Änderung wirklich
drin ist — erst dann als fertig melden.

Gestaltungswerte gehören als Token in `:root`, nie verstreut. Farben, Abstände,
Kurven, Muster (als SVG-Daten-URI) — alles an einer Stelle.

## Gestaltung: was der Auftraggeber will

- **Die Atmosphäre kommt aus dem Laden, nicht aus einer Vorlage.** Palette,
  Schrift und Bildsprache werden aus dem echten Ort abgeleitet: aus den Fotos,
  dem Material, dem Licht, der Kundschaft. Kein Farbschema aus einem früheren
  Projekt übernehmen — Gold auf Schwarz war die Antwort für ein japanisches
  Restaurant, nicht die Handschrift des Auftraggebers. Erst schauen, dann
  festlegen; die Leitfarbe hat einen Grund im Laden zu haben.
- **Kommt eine zweite Farbe dazu, tritt sie nur als Ornament auf**, nie als
  Textfarbe. Sonst kippt die einmal gesetzte Ordnung.
- **Vollflächige Fotohintergründe.** Bilder tragen ganze Abschnitte, nicht als
  Kachel daneben. Darüber ein mehrstufiger Schleier: von oben und unten in den
  Abschnittsrand hinein, seitlich dichter dort, wo Text steht. Der Schleier
  nimmt die Grundfarbe der Seite auf — hell wie dunkel. Am schmalen Schirm
  greift der seitliche Verlauf oft genau in den Text; dort gleichmäßig
  überlagern statt seitlich.
- **Eine eigene Idee pro Seite**, die es sonst nirgends gibt. Etwas Räumliches,
  das zum Laden gehört.
- **Zurückhaltung beim Ornament.** Wenige Einsätze, dafür an Stellen, wo sie
  inhaltlich etwas bedeuten. Lieber zu leise als zu laut — zurücknehmen ist
  schwerer als nachlegen.
- **Echte Inhalte.** Richtige Preise, richtige Öffnungszeiten, richtige Fotos.
  Nie Platzhalter, nie Blindtext, nie „hier Ihr Text".
- Impressum und Datenschutz als eigene Seite. Copyright in den Footer.
  Telefonnummer schon auf dem ersten Bildschirm.

## Struktur für Salon und Studio

Was hier den Platz der Speisekarte einnimmt:

- **Leistungen mit Preisen** als eigene Seite, nach Ablauf gegliedert statt
  alphabetisch — was zuerst passiert, steht zuerst. Nicht alles auf einmal
  sichtbar; ein Navigator über den Gruppen, der beim Runterscrollen ausweicht.
- **Termin statt Warenkorb.** Der Weg zum Termin ist das, was der Warenkorb
  beim Restaurant war: Auswahl sammeln, daraus einen fertigen Text bauen, den
  der Gast selbst per WhatsApp schickt oder am Telefon durchgibt. Kein Server,
  keine Zahlung. Falls ein Buchungsdienst im Einsatz ist, verlinken wir ihn —
  aber erst prüfen, was er wirklich ist (bei JaSuVi entpuppte sich der
  vermeintlich eigene Bestellshop als Lieferando-Ableger).
- **Vorher/Nachher oder Arbeiten** statt Galerie der Gerichte. Fotos anklickbar,
  aber ohne Symbol und ohne Beschriftung auf der Kachel.
- **Das Team** mit Gesichtern — bei Salons kaufen Leute die Person, nicht den
  Laden.

## Bewegung

- Nur `ease-out`-Kurven, kein Federn, kein Zurückschwingen.
- Nie Layout-Eigenschaften animieren — `transform` und `opacity`.
- Hover-Effekte hinter `@media (hover: hover) and (pointer: fine)`.
- `prefers-reduced-motion` immer bedienen. Was ruhend sinnlos aussieht
  (rieselnde Partikel), wird dort ganz abgeschaltet statt eingefroren.
- Dauern zwischen 0,3 s und 0,9 s. Endlosschleifen deutlich langsamer.
- **Tempo aus gemessenen Werten rechnen, nicht aus festen Dauern**, sobald die
  Strecke von Schriftgröße oder Inhalt abhängt.

## Prüfen statt behaupten

Vor jeder Fertigmeldung:

1. Screenshot auf 1440 px **und** 390 px, angeschaut — nicht nur erzeugt.
2. `node .claude/skills/impeccable/scripts/detect.mjs --json` muss `[]` liefern.
3. Konsolenfehler abfragen (`pageerror`), nicht hoffen.
4. Behauptungen über Geschwindigkeit, Richtung, Position **messen**. Im
   JaSuVi-Projekt stellte sich mehrfach heraus, dass die Vermutung falsch war
   und erst die Messung den echten Fehler zeigte.

Wenn etwas unklar ist — etwa welches Gericht auf einem Foto liegt — lieber
weglassen und nachfragen, als raten. Ein falsch beschriftetes Foto ist
schlimmer als ein unbeschriftetes.

## Fallen, die schon zugeschlagen haben

| Falle | Auflösung |
|---|---|
| `position: sticky` meldet beim Scrollen die Klebeposition — auch über `offsetTop` | Festen Anker davor setzen und dessen `offsetTop` nehmen |
| `setPointerCapture` lenkt das spätere `click`-Event auf das Capture-Ziel um | Gedrücktes Element beim `pointerdown` merken |
| `preserve-3d` löst sich schneidende Flächen nicht sauber auf | Getrennte 3D-Ebenen mit gleicher Perspektive stapeln |
| Richtungswechsel einer CSS-Animation springt mitten im Muster | Versatz selbst per `requestAnimationFrame` fortschreiben |
| Android-WebViews (u. a. WhatsApp) blasen Text auf → Laufschrift rast | `text-size-adjust: 100%` **und** Dauer aus gemessener Breite |
| `[hidden]` verliert gegen Klassen, die `display` setzen | `[hidden] { display: none !important; }` |
| Grid mit zwei Kindern erzeugt zwei Zeilen | `grid-area: 1 / 1` zum Stapeln |
| Scroll-Umschalter flackert beim sanften Auslaufen | 6 px Hysterese |
| Viele DOM-Zeilen einzeln einfügen ruckelt | `DocumentFragment` + `replaceChildren` |

## Zugänglichkeit

Jede klickbare Fläche braucht einen Namen — auch wenn sie bewusst unsichtbar
bleibt. Sichtbarer Fokusrahmen über `:focus-visible`. Dekoratives bekommt
`aria-hidden="true"`.
