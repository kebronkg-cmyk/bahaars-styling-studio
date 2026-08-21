/* Screenshots auf Desktop und Handy, dazu Konsolenfehler.

   Wichtig: erst durch die ganze Seite scrollen, damit alles, was beim
   Auftauchen eingeblendet wird, auch wirklich da ist. Ein Bild, auf dem ein
   Abschnitt fehlt, weil die Einblendung noch nicht lief, führt beim Ansehen
   sonst zu Reparaturen an Stellen, die gar nicht kaputt sind.

   Aufruf:  node werkzeug/schuss.mjs [pfad] [#abschnitt]
   Setzt voraus, dass im Projektordner ein Server auf Port 8099 läuft:
   python3 -m http.server 8099 &                                        */
import pw from '/opt/node22/lib/node_modules/playwright/index.js';
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

  // Einmal durchscrollen, damit jede Einblendung ausgelöst wird.
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
  await page.screenshot({ path: `${ziel}-${name}.png`, fullPage: !anker });
  console.log(`${name}: ${fehler.length ? fehler.join(' | ') : 'keine Konsolenfehler'}`);
  await page.close();
}
await browser.close();
