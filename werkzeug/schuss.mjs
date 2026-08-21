/* Screenshots auf Desktop und Handy, dazu Konsolenfehler.

   Wichtig: erst durch die ganze Seite scrollen, damit alles, was beim
   Auftauchen eingeblendet wird, auch wirklich da ist. Ein Bild, auf dem ein
   Abschnitt fehlt, weil die Einblendung noch nicht lief, führt beim Ansehen
   sonst zu Reparaturen an Stellen, die gar nicht kaputt sind.

   Aufruf:  node werkzeug/schuss.mjs [pfad] [#abschnitt]
   Setzt voraus, dass im Projektordner ein Server auf Port 8099 läuft:
   python3 -m http.server 8099 &                                        */
import pw from '/opt/node22/lib/node_modules/playwright/index.js';
import { readFileSync } from 'node:fs';
const { chromium } = pw;

const seite = process.argv[2] || 'index.html';
const anker = process.argv[3] || null;
const ziel  = process.env.ZIEL || '/tmp/s';

const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
for (const [name, viewport] of [['desktop', { width: 1440, height: 1000 }],
                                ['handy',   { width: 390,  height: 844 }]]) {
  const page = await browser.newPage({ viewport });
  const fehler = [];
  page.on('pageerror', (e) => fehler.push('pageerror: ' + e));
  page.on('console', (m) => { if (m.type() === 'error') fehler.push('console: ' + m.text()); });
  page.on('requestfailed', (r) => fehler.push('fehlt: ' + r.url().split('/').pop()));

  await page.goto(`http://localhost:8099/${seite}`, { waitUntil: 'networkidle' });

  /* Einmal durchscrollen, damit jede Einblendung ausgelöst wird.
     Vorher das sanfte Scrollen abschalten: sonst startet jeder Schritt eine
     Bewegung, die der nächste sofort unterbricht — der Durchlauf kommt dann
     nie unten an, und auf dem Bild fehlt die halbe Seite. */
  await page.addStyleTag({ content: 'html { scroll-behavior: auto !important; }' });
  /* Ganzseiten-Aufnahmen malen Bilder, die noch faul geladen sind, als
     leeren Kasten. Das sah dreimal nach einem kaputten Bild aus, obwohl im
     Browser alles stand. Deshalb vor der Aufnahme alles scharf stellen und
     auf das Dekodieren warten. */
  await page.evaluate(() => { for (const b of document.images) b.loading = 'eager'; });
  await page.evaluate(async () => {
    const hoehe = document.documentElement.scrollHeight;
    for (let y = 0; y < hoehe; y += Math.round(innerHeight * 0.6)) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 90));
    }
    window.scrollTo(0, hoehe);
    await new Promise((r) => setTimeout(r, 400));
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(1400);

  if (anker) {
    await page.evaluate((a) => document.querySelector(a)?.scrollIntoView({ block: 'center' }), anker);
    await page.waitForTimeout(1400);
  }
  // Vor dem Auslösen prüfen, ob überhaupt etwas zu sehen ist. Ein Bild, auf
  // dem ein eingeblendeter Abschnitt fehlt, sieht aus wie ein Gestaltungs-
  // fehler und führt zu Reparaturen an heilen Stellen.
  const versteckt = await page.evaluate(() =>
    [...document.querySelectorAll('.auf')]
      .filter((el) => Number(getComputedStyle(el).opacity) < 0.5)
      .map((el) => el.id || el.className));
  if (versteckt.length) fehler.push(`unsichtbar: ${versteckt.join(', ')}`);

  const datei = `${ziel}-${name}.png`;
  await page.evaluate(() => Promise.all([...document.images].map((b) => b.decode().catch(() => {}))));
  await page.screenshot({ path: datei, fullPage: !anker });

  // Und nachsehen, ob die Datei die Maße hat, die sie haben soll.
  const kopf = readFileSync(datei);
  const [breit, hoch] = [kopf.readUInt32BE(16), kopf.readUInt32BE(20)];
  if (breit !== viewport.width) fehler.push(`Breite ${breit} statt ${viewport.width}`);

  console.log(`${name}: ${breit}×${hoch} — ${fehler.length ? fehler.join(' | ') : 'keine Beanstandung'}`);
  await page.close();
}
await browser.close();
