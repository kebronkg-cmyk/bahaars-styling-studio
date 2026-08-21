# Warum hier eine Regel abgeschaltet ist

`detector.ignoreRules` enthält **wide-tracking**. Das ist keine Bequemlichkeit,
sondern eine Eigenart der Schriftwahl:

Die Auszeichnungsschrift dieser Seite ist **Marcellus SC**. Bei dieser Schrift
sind die Kleinbuchstaben als **Kapitälchen** geschnitten — „die farbkarte"
erscheint also als DIE FARBKARTE in Versalhöhe der Kleinbuchstaben. Genau für
solche kurzen Versalzeilen lässt die Regel weite Laufweite ausdrücklich zu.

Der Prüfer sieht davon nichts. Er liest `text-transform: lowercase` und hält
`letter-spacing: .26em` deshalb für gesperrten Fließtext.

Betroffen sind ausschließlich kurze Auszeichnungen:
`.stempel`, `.knopf`, `.navigator a`, `.fusszeile h3`, `.ablauf .wann`,
`.blatt-name`, `.faecher-hinweis`. Kein Fließtext der Seite ist gesperrt.

Wird die Auszeichnungsschrift jemals gewechselt, gehört diese Zeile geprüft.
