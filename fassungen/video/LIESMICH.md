# Die Fassung mit dem Film

Stand von Commit `b86d438`: die Schere im türkisen Rauch als Film hinter der
ganzen Seite. Hier liegen die sechs Dateien, die sich für die Testfassung ohne
Film geändert haben, unverändert. Die Filmdateien selbst
(`bilder/schere-rauch.mp4`, `.webm`, `schere-rauch-standbild.webp`) liegen
weiter in `bilder/` und wurden nicht angefasst.

Zurück zum Film (aus der Projektwurzel):

```bash
cp fassungen/video/{index.html,neu.css,neu.js,leistungen.html,impressum.html,datenschutz.html} .
```

Danach committen und pushen, fertig. `favicon.svg` ist nie überschrieben
worden; die Kopie hier ist nur der Vollständigkeit halber da.

Die Dateien in diesem Ordner verweisen relativ auf `neu.css` und `bilder/` —
sie sind ein Archiv, keine lauffähige Seite an dieser Stelle.
