# BaHaar's Styling Studio — Website

Arbeitsbereich für die neue Website des Friseursalons
**BaHaar's Styling Studio**, Perlacher Straße 2, 81539 München-Giesing.

## Was hier schon liegt

| | |
|---|---|
| `CLAUDE.md` | Arbeitsweise, Vorlieben des Auftraggebers und Fallen aus dem Vorprojekt. Wird automatisch geladen. |
| `recherche/bestand.md` | Kontakt, Öffnungszeiten, Impressumsdaten, Leistungen, Buchungssystem |
| `recherche/preise.md` | Vollständige Preisliste der bestehenden Seite |
| `recherche/bilder-befund.md` | **Zuerst lesen.** Warum das vorhandene Bildmaterial die gewünschten Hintergründe nicht trägt |
| `recherche/bilder/` | 24 Bilder von der alten Seite, größte verfügbare Fassung |
| `.claude/skills/` | Design- und Animations-Skills |
| `werkzeug/schuss.mjs` | Screenshots Desktop + Handy inkl. Konsolenfehler |
| `.github/workflows/` | Auslieferung nach GitHub Pages bei jedem Push auf `main` |

## Erste Schritte

1. `recherche/bilder-befund.md` lesen — die Bildfrage entscheidet die Gestaltung.
2. Mit der Inhaberin klären: aktuelle Preise, Preise fürs neue Kosmetikstudio,
   Einwilligungen für die Kundenfotos, neue Aufnahmen.
3. Prüfen, ob sich das Salonized-Widget einbetten lässt oder nur verlinken.

## Vorschau

```bash
python3 -m http.server 8099 &
node werkzeug/schuss.mjs index.html
```
