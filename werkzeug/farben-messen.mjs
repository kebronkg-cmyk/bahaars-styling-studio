/* Mittlere Farben aus Bildbereichen messen — damit die Palette aus dem Laden
   kommt und nicht aus der Vermutung.
   Aufruf: node werkzeug/farben-messen.mjs                                  */
import pw from '/opt/node22/lib/node_modules/playwright/index.js';
import { readFileSync } from 'node:fs';
const { chromium } = pw;

// Bild, Bereich in Anteilen (x, y, breite, höhe), Beschriftung
const proben = [
  ['arbeit-02-balayage.jpg',   0.42, 0.55, 0.22, 0.12, 'Balayage Mitte'],
  ['arbeit-02-balayage.jpg',   0.50, 0.78, 0.22, 0.10, 'Balayage Spitze'],
  ['arbeit-02-balayage.jpg',   0.42, 0.24, 0.16, 0.08, 'Balayage Ansatz'],
  ['arbeit-08-ombre.jpg',      0.40, 0.25, 0.22, 0.12, 'Ombré Ansatz'],
  ['arbeit-08-ombre.jpg',      0.45, 0.62, 0.22, 0.12, 'Ombré Länge'],
  ['arbeit-08-ombre.jpg',      0.52, 0.78, 0.18, 0.08, 'Ombré Spitze'],
  ['arbeit-05-blond-locken.jpg', 0.40, 0.45, 0.24, 0.16, 'Blond Locken'],
  ['arbeit-10-lang-blond.jpg', 0.40, 0.45, 0.24, 0.16, 'Lang blond'],
  ['arbeit-15-braut-schleier.jpg', 0.40, 0.22, 0.20, 0.14, 'Braut Haar dunkel'],
  ['arbeit-15-braut-schleier.jpg', 0.05, 0.05, 0.14, 0.20, 'Braut Wand rosé'],
  ['portrait-model.jpg',       0.45, 0.35, 0.22, 0.18, 'Portrait Haar'],
  ['portrait-model.jpg',       0.60, 0.05, 0.20, 0.12, 'Portrait Hintergrund'],
  ['salon-arbeitsplatz.jpg',   0.02, 0.28, 0.10, 0.22, 'Moroccanoil Regal'],
  ['salon-arbeitsplatz.jpg',   0.05, 0.18, 0.06, 0.06, 'Moroccanoil Karton'],
  ['salon-stuehle-spiegel.jpg',0.78, 0.12, 0.10, 0.10, 'Regal türkis rechts'],
  ['salon-waschbecken.jpg',    0.62, 0.30, 0.06, 0.10, 'Flasche türkis'],
];

const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await browser.newPage();
await page.goto('about:blank');

const ergebnis = await page.evaluate(async (liste) => {
  const raus = [];
  for (const [name, dataUri, x, y, b, h, titel] of liste) {
    const bild = new Image();
    await new Promise((ok, weg) => { bild.onload = ok; bild.onerror = weg; bild.src = dataUri; });
    const c = document.createElement('canvas');
    const sx = Math.round(bild.width * x),  sy = Math.round(bild.height * y);
    const sb = Math.round(bild.width * b),  sh = Math.round(bild.height * h);
    c.width = sb; c.height = sh;
    const ctx = c.getContext('2d', { willReadFrequently: true });
    ctx.drawImage(bild, sx, sy, sb, sh, 0, 0, sb, sh);
    const d = ctx.getImageData(0, 0, sb, sh).data;
    let r = 0, g = 0, bl = 0;
    for (let i = 0; i < d.length; i += 4) { r += d[i]; g += d[i + 1]; bl += d[i + 2]; }
    const n = d.length / 4;
    raus.push({ name, titel, r: Math.round(r / n), g: Math.round(g / n), b: Math.round(bl / n) });
  }
  return raus;
}, proben.map(([name, x, y, b, h, titel]) => {
  const roh = readFileSync(new URL(`../recherche/bilder/${name}`, import.meta.url));
  return [name, `data:image/jpeg;base64,${roh.toString('base64')}`, x, y, b, h, titel];
}));

const hex = ({ r, g, b }) => '#' + [r, g, b].map((v) => v.toString(16).padStart(2, '0')).join('');
const zuOklch = ({ r, g, b }) => {
  const f = (v) => { v /= 255; return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; };
  const [R, G, B] = [f(r), f(g), f(b)];
  const l = Math.cbrt(0.4122214708 * R + 0.5363325363 * G + 0.0514459929 * B);
  const m = Math.cbrt(0.2119034982 * R + 0.6806995451 * G + 0.1073969566 * B);
  const s = Math.cbrt(0.0883024619 * R + 0.2817188376 * G + 0.6299787005 * B);
  const L = 0.2104542553 * l + 0.7936177850 * m - 0.0040720468 * s;
  const A = 1.9779984951 * l - 2.4285922050 * m + 0.4505937099 * s;
  const Bb = 0.0259040371 * l + 0.7827717662 * m - 0.8086757660 * s;
  const C = Math.hypot(A, Bb);
  let H = (Math.atan2(Bb, A) * 180) / Math.PI; if (H < 0) H += 360;
  return `oklch(${(L * 100).toFixed(1)}% ${C.toFixed(3)} ${H.toFixed(1)})`;
};

for (const e of ergebnis) {
  console.log(`${e.titel.padEnd(24)} ${hex(e).padEnd(9)} ${zuOklch(e).padEnd(28)} ${e.name}`);
}
await browser.close();
