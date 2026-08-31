# BaHaar's Styling Studio — Website

Die Website des Friseursalons **BaHaar's Styling Studio**,
Perlacher Straße 2, 81539 München-Giesing.

Live: <https://kebronkg-cmyk.github.io/bahaars-styling-studio/>

## Bauart

Statische Seite: HTML, CSS, Vanilla JS. **Kein Build-Schritt, keine
Abhängigkeiten, keine fremden Server.** Jeder Push auf `main` liefert über
`.github/workflows/deploy-pages.yml` nach GitHub Pages aus.

## Was hier liegt

| | |
|---|---|
| `index.html` | Startseite: Auftakt, Becken, Preise im Überblick, Brautstyling, Arbeiten, Der Laden, Kontakt |
| `leistungen.html` | Vollständige Preisliste mit Navigator und Merkzettel |
| `impressum.html`, `datenschutz.html` | Rechtliches |
| `neu.css` | Gesamtes Gestaltungssystem, alle Werte als Token in `:root` |
| `neu.js` | Zwei Blöcke: der Wasserhahn am Becken, und Leiste/Menü/Uhr/Navigator/Merkzettel |
| `bilder/`, `schrift/` | Ausgelieferte Bilder, Filme und Schriften — alle erzeugt |
| `recherche/` | Vorlagen und Notizen: Bestand, Preisliste, Bildbefund, Originalfotos |
| `CLAUDE.md` | Arbeitsweise, Vorlieben des Auftraggebers, Fallen aus dem Vorprojekt |
| `PRODUCT.md` | Produktwahrheit: Nutzerinnen, Leistungen, Marke |
| `ABNAHME.md` | Offene Punkte, die nur die Inhaberin beantworten kann |

## Der Abschnitt am Becken

Der Hebel des Wasserhahns ist ein Schalter: auf oder zu. Offen wird das Haar
Stück für Stück nasser — das ist der echte Verlauf aus der Aufnahme, sieben
Sekunden von trocken bis nass (`becken-nass.mp4`). Ist er durch, übernimmt
eine nahtlose Schleife (`becken-lauf.mp4`). Zugedreht hält der Film an und
behält, wie nass das Haar geworden ist.

Der Strahl selbst sind zwei Aufnahmen echten Wassers auf schwarzem Grund
(`wasser-strahl.webp`, `wasser-krone.webp`), mit `mix-blend-mode: screen`
darübergelegt. Der Median beider Bilder liegt bei 0, deshalb bleibt kein
grauer Schleier stehen.

Zwei Fallen dabei, beide im Stylesheet vermerkt: `transform` oder `z-index`
auf dem Strahlkasten macht eine eigene Ebene auf und nimmt dem Wasser den
Hintergrund zum Mischen. Und Keyframes dürfen niemals `opacity` anfassen —
eine laufende Animation schlägt den deklarierten Wert, und die Krone stand
dadurch auch bei zugedrehtem Hahn im Bild.

## Prüfen

```bash
python3 -m http.server 8899 &
node .claude/skills/impeccable/scripts/detect.mjs --json     # muss [] liefern
```

Vor jeder Fertigmeldung zusätzlich: Screenshot bei 1440 **und** 390 anschauen,
`pageerror` abfragen, und jede Behauptung über Größe, Tempo oder Position
messen statt schätzen. Das Vorgehen steht in `CLAUDE.md`.
