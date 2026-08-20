/* Screenshots auf Desktop und Handy, dazu Konsolenfehler.
   Aufruf:  node werkzeug/schuss.mjs [pfad] [#abschnitt]
   Setzt voraus, dass im Projektordner ein Server auf Port 8099 läuft:
   python3 -m http.server 8099 &                                        */
import pw from '/opt/node22/lib/node_modules/playwright/index.js';
const { chromium } = pw;

const seite = process.argv[2] || 'index.html';
const anker = process.argv[3] || null;
const ziel = 'schuss';

const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
for (const [name, viewport] of [['desktop', { width: 1440, height: 1000 }],
                                ['handy',   { width: 390,  height: 844 }]]) {
  const page = await browser.newPage({ viewport });
  const fehler = [];
  page.on('pageerror', (e) => fehler.push(String(e)));
  await page.goto(`http://localhost:8099/${seite}`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);
  if (anker) {
    await page.evaluate((a) => document.querySelector(a)?.scrollIntoView({ block: 'center' }), anker);
    await page.waitForTimeout(1400);
  }
  await page.screenshot({ path: `${ziel}-${name}.png`, fullPage: !anker });
  console.log(`${name}: ${fehler.length ? fehler.join(' | ') : 'keine Konsolenfehler'}`);
  await page.close();
}
await browser.close();
