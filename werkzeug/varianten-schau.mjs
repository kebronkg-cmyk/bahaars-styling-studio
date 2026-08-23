/* Die drei Farbstimmungen nebeneinander ansehen.

   Nimmt von jeder Seite denselben Ausschnitt in allen drei Paletten auf,
   damit man sie vergleichen kann, statt sie sich vorzustellen.

   Aufruf:  node werkzeug/varianten-schau.mjs [seite] [#anker]
   Setzt einen Server auf Port 8099 voraus.                              */
import pw from '/opt/node22/lib/node_modules/playwright/index.js';
const { chromium } = pw;

const seite = process.argv[2] || 'index.html';
const anker = process.argv[3] || null;
const ziel  = process.env.ZIEL || '/tmp/v';

const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
for (const stimmung of ['messing', 'asche', 'rose', 'nacht']) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  const fehler = [];
  page.on('pageerror', (e) => fehler.push('pageerror: ' + e));
  page.on('console', (m) => { if (m.type() === 'error') fehler.push('console: ' + m.text()); });
  await page.addInitScript((s) => { try { localStorage.setItem('bahaar-stimmung', s); } catch (e) {} }, stimmung);
  await page.goto(`http://localhost:8099/${seite}`, { waitUntil: 'networkidle' });
  await page.addStyleTag({ content: 'html { scroll-behavior: auto !important; }' });
  await page.evaluate(() => { for (const b of document.images) b.loading = 'eager'; });
  await page.evaluate(async () => {
    const h = document.documentElement.scrollHeight;
    for (let y = 0; y < h; y += Math.round(innerHeight * 0.6)) {
      window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 80));
    }
    window.scrollTo(0, h); await new Promise((r) => setTimeout(r, 300));
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(1200);
  if (anker) {
    await page.evaluate((a) => document.querySelector(a)?.scrollIntoView({ block: 'center' }), anker);
    await page.waitForTimeout(900);
  }
  const gesetzt = await page.evaluate(() => document.documentElement.dataset.palette || 'messing');
  const datei = `${ziel}-${stimmung}.png`;
  await page.screenshot({ path: datei, fullPage: !anker });
  console.log(`${stimmung.padEnd(8)} → ${datei}   gesetzt: ${gesetzt}` +
    (fehler.length ? '   ' + fehler.join(' | ') : ''));
  await page.close();
}
await browser.close();
