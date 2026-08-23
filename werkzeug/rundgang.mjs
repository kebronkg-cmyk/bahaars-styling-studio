/* Der Rundgang: prüft alle Seiten in allen Farbstimmungen und in den
   Rückfallebenen, und meldet nur, was nicht stimmt.

   Geprüft wird, was sich messen lässt:
     · Überlauf nach rechts bei 1440, 390 und 320
     · Konsolenfehler und fehlgeschlagene Anfragen
     · Ob nach dem Durchscrollen noch etwas unsichtbar geblieben ist
     · Ob die Bühne ohne GSAP und bei prefers-reduced-motion vollständig
       sichtbar dasteht statt halb eingeblendet

   Aufruf:  node werkzeug/rundgang.mjs      (Server auf 8099 vorausgesetzt) */
import pw from '/opt/node22/lib/node_modules/playwright/index.js';
const { chromium } = pw;

const seiten = ['index.html','leistungen.html','brautstyling.html','salon.html',
                'termin.html','impressum.html','datenschutz.html'];
const breiten = [[1440,900],[390,844],[320,720]];
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
let klagen = 0;

const durchlauf = async (seite, w, h, einrichten, name, dulden = /(?!)/) => {
  const page = await browser.newPage({ viewport: { width: w, height: h } });
  const fehler = [];
  page.on('pageerror', (e) => fehler.push('Skriptfehler: ' + e.message));
  page.on('console', (m) => { if (m.type() === 'error' && !dulden.test(m.text())) fehler.push('Konsole: ' + m.text()); });
  page.on('requestfailed', (r) => { if (!dulden.test(r.url())) fehler.push('fehlt: ' + r.url().split('/').pop()); });
  if (einrichten) await einrichten(page);
  await page.goto(`http://localhost:8099/${seite}`, { waitUntil: 'networkidle' });
  await page.addStyleTag({ content: 'html{scroll-behavior:auto!important}' });
  await page.evaluate(async () => {
    for (const b of document.images) b.loading = 'eager';
    const hoehe = document.documentElement.scrollHeight;
    for (let y = 0; y < hoehe; y += innerHeight * 0.6) {
      scrollTo(0, y); await new Promise((r) => setTimeout(r, 60));
    }
    scrollTo(0, hoehe); await new Promise((r) => setTimeout(r, 250)); scrollTo(0, 0);
  });
  await page.waitForTimeout(900);
  const befund = await page.evaluate(() => ({
    ueberlauf: document.documentElement.scrollWidth - innerWidth,
    unsichtbar: [...document.querySelectorAll('.auf')]
      .filter((e) => +getComputedStyle(e).opacity < .9)
      .map((e) => e.className).slice(0, 3),
    marken: document.documentElement.className
  }));
  const klage = [];
  if (befund.ueberlauf > 1) klage.push(`Überlauf ${befund.ueberlauf} px`);
  if (befund.unsichtbar.length) klage.push('unsichtbar: ' + befund.unsichtbar.join(', '));
  klage.push(...fehler);
  if (klage.length) { klagen++; console.log(`  ✗ ${name} ${seite} ${w}px — ${klage.join(' | ')}`); }
  await page.close();
};

for (const [w, h] of breiten) {
  for (const seite of seiten) await durchlauf(seite, w, h, null, 'normal');
}
for (const stimmung of ['asche','rose']) {
  for (const seite of seiten) {
    await durchlauf(seite, 1440, 900,
      (p) => p.addInitScript((s) => { try { localStorage.setItem('bahaar-stimmung', s); } catch (e) {} }, stimmung),
      stimmung);
  }
}
/* Rückfallebene 1: kein GSAP. Rückfallebene 2: Bewegung abbestellt. */
for (const seite of seiten) {
  await durchlauf(seite, 1440, 900,
    (p) => p.route('**/fremd/*.js', (r) => r.abort()), 'ohne GSAP',
    /fremd\/|ERR_FAILED/);   /* das Blockieren ist der Zweck dieses Durchlaufs */
}
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
  for (const seite of seiten) {
    const page = await ctx.newPage();
    const fehler = [];
    page.on('pageerror', (e) => fehler.push('Skriptfehler: ' + e.message));
    await page.goto(`http://localhost:8099/${seite}`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(500);
    const b = await page.evaluate(() => ({
      marken: document.documentElement.className,
      unsichtbar: [...document.querySelectorAll('.auf')].filter((e) => +getComputedStyle(e).opacity < .9).length
    }));
    const klage = [];
    if (b.marken.includes('mitfahrt')) klage.push('mitfahrt trotz abbestellter Bewegung');
    if (b.unsichtbar) klage.push(`${b.unsichtbar} Abschnitte unsichtbar`);
    klage.push(...fehler);
    if (klage.length) { klagen++; console.log(`  ✗ ruhig ${seite} — ${klage.join(' | ')}`); }
    await page.close();
  }
  await ctx.close();
}
await browser.close();
console.log(klagen ? `\n  ${klagen} Beanstandungen.` : '\n  Rundgang ohne Beanstandung.');
