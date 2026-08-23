# BaHaar's Styling Studio — Website

Arbeitsbereich für die neue Website des Friseursalons
**BaHaar's Styling Studio**, Perlacher Straße 2, 81539 München-Giesing.

## Stand

Die Seite ist gebaut und läuft: sieben Seiten, ein Gestaltungssystem, eigene
Messwerkzeuge. **Vor der Veröffentlichung bitte `ABNAHME.md` durchgehen** —
dort stehen sieben Punkte, die nur die Inhaberin beantworten kann, vier davon
rechtlich.

## Was hier schon liegt

| | |
|---|---|
| `CLAUDE.md` | Arbeitsweise, Vorlieben des Auftraggebers und Fallen aus dem Vorprojekt. Wird automatisch geladen. |
| `recherche/bestand.md` | Kontakt, Öffnungszeiten, Impressumsdaten, Leistungen, Buchungssystem |
| `recherche/preise.md` | Vollständige Preisliste der bestehenden Seite |
| `recherche/bilder-befund.md` | **Zuerst lesen.** Warum das vorhandene Bildmaterial die gewünschten Hintergründe nicht trägt |
| `recherche/bilder/` | 24 Bilder von der alten Seite, größte verfügbare Fassung |
| `.claude/skills/` | Design- und Animations-Skills |
| `.github/workflows/` | Auslieferung nach GitHub Pages bei jedem Push auf `main` |
| **`ABNAHME.md`** | **Vor dem Veröffentlichen lesen.** Offene Punkte für die Inhaberin |
| `PRODUCT.md` | Produktwahrheit: Nutzerinnen, Leistungen, Marke, offene Fragen |
| `DESIGN.md` | Das Gestaltungssystem, wie es tatsächlich gebaut ist |
| `index.html` … | Die sieben Seiten |
| `stil.css` | Gesamtes Gestaltungssystem, alle Werte als Token in `:root`. Neu geschrieben; die vorige Fassung liegt in der Git-Geschichte |
| `seite.js` | Gesamtes Verhalten |
| `fremd/` | GSAP 3.15.0 und ScrollTrigger, im Projekt statt von einem fremden Server. Herkunft und Lizenz in `fremd/HERKUNFT.md` |
| `bilder/`, `schrift/` | Ausgelieferte Bilder und Schriften, beide erzeugt |
| `werkzeug/` | Messwerkzeuge: Screenshots, Kontrast, Bildzuschnitte, Farben, Schriften |

## Werkzeuge

Alles rechnet in Chromium über Playwright — kein Zusatzprogramm nötig.

```bash
python3 -m http.server 8099 &

node werkzeug/schuss.mjs index.html       # Screenshots 1440 + 390, Konsolenfehler
node werkzeug/rundgang.mjs               # alle Seiten × 3 Breiten × 3 Stimmungen × 2 Rückfallebenen
node werkzeug/varianten-schau.mjs        # dieselbe Stelle in allen drei Farbstimmungen
node werkzeug/kontrast-messen.mjs *.html  # echter Kontrast über den Fotoflächen
node werkzeug/bilder-bauen.mjs            # Zuschnitte neu erzeugen, Haartöne messen
node werkzeug/farben-messen.mjs           # Farben aus den Rohfotos lesen
node werkzeug/schriften-holen.mjs         # Schriften laden und zuschneiden

node .claude/skills/impeccable/scripts/detect.mjs --json *.html stil.css
```

`werkzeug/schuss.mjs` scrollt vor dem Bild einmal durch die ganze Seite. Ohne
das fehlen alle Abschnitte, die beim Auftauchen eingeblendet werden — und man
repariert Stellen, die gar nicht kaputt sind.

## Vorschau

```bash
python3 -m http.server 8099 &
node werkzeug/schuss.mjs index.html
```
