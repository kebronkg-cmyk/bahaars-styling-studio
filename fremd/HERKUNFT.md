# Was in diesem Ordner liegt und warum

Fremder Code, der **im Projekt liegt statt von einem fremden Server geladen zu
werden**. Die Fußzeile dieser Seite sagt „Diese Seite lädt nichts von fremden
Servern", und die Datenschutzerklärung sagt dasselbe. Beides bleibt damit wahr.

## gsap.min.js, ScrollTrigger.min.js

- **Version:** GSAP 3.15.0
- **Bezogen über:** `npm pack gsap@latest`, Dateien aus `package/dist/`
- **Lizenz:** Standard „no charge"-Lizenz, https://gsap.com/standard-license
  Für eine Website wie diese kostenlos und ohne Namensnennungspflicht.
- **Wofür:** Die Kamerafahrt im Auftakt (ScrollTrigger mit `scrub`) und die
  Einblendungen beim Auftauchen.

## Wenn eine neue Version nötig wird

    cd /tmp && npm pack gsap@latest
    tar xzf gsap-*.tgz
    cp package/dist/gsap.min.js package/dist/ScrollTrigger.min.js <projekt>/fremd/

Danach die Version hier eintragen und die Seite durchmessen — vor allem
`werkzeug/kontrast-fahrt.mjs` und die Bildrate beim Scrollen.
