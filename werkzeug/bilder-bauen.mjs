/* Baut aus dem Rohmaterial in recherche/bilder/ die Fassungen, die die Seite
   ausliefert. Zuschnitt über Mittelpunkt und Höhe, Zielformat als Verhältnis.
   Rechnet in Chromium auf einem Canvas — kein Zusatzprogramm nötig.

   Aufruf:  node werkzeug/bilder-bauen.mjs                                  */
import pw from '/opt/node22/lib/node_modules/playwright/index.js';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';

const quelle = new URL('../recherche/bilder/', import.meta.url);
const ziel = new URL('../bilder/', import.meta.url);
mkdirSync(ziel, { recursive: true });

/* Zwei Regeln bestimmen jeden Zuschnitt hier, und beide sind hart:

   1. Kein erkennbares Gesicht. Ob für die Kundenfotos Einwilligungen
      vorliegen, weiß nur die Inhaberin — auf der alten Seite gestanden zu
      haben ist kein Nachweis. Bis das geklärt ist, zeigt die Seite Haar und
      sonst nichts. Das Kinderfoto, die Portraitaufnahme und drei weitere
      Bilder mit deutlich erkennbaren Personen liegen deshalb ungenutzt in
      recherche/bilder/.
   2. Kein Salonhintergrund. Föhne, Steckdosen, Kabel, Regale und Plakate
      sind das, was die Vorlagen dieser Bilder unbrauchbar macht. Der
      Ausschnitt geht so weit hinein, dass nur noch Haar im Bild ist.

   [Ausgabename, Quelldatei, Mitte x, Mitte y, Höhe (Anteil), Breite:Höhe,
    Zielbreite, Güte, ohne Hochrechnen]                                     */
const auftraege = [
  // Vollflächen. Eng genug für reines Haar heißt: der Ausschnitt ist kleiner
  // als die Fläche, die er füllen soll. Deshalb wird hier nie hochgerechnet —
  // die Seite legt die Bilder weich und unter einen Schleier, das trägt.
  ['flaeche-start',      'arbeit-02-balayage.jpg',        0.57, 0.60, 0.30, 1.20, 1400, 0.72, true],
  ['flaeche-start-hoch', 'arbeit-02-balayage.jpg',        0.56, 0.60, 0.38, 0.72,  700, 0.72, true],
  ['flaeche-farbe',      'arbeit-03-straehnen.jpg',       0.55, 0.30, 0.30, 1.20, 1400, 0.72, true, [1.05, 0.95, 0.99]],
  ['flaeche-farbe-hoch', 'arbeit-03-straehnen.jpg',       0.55, 0.32, 0.38, 0.72,  700, 0.72, true, [1.05, 0.95, 0.99]],
  ['flaeche-braut',      'arbeit-05-blond-locken.jpg',    0.54, 0.58, 0.30, 1.20, 1400, 0.72, true],
  ['flaeche-braut-hoch', 'arbeit-05-blond-locken.jpg',    0.52, 0.58, 0.38, 0.72,  700, 0.72, true],
  ['flaeche-salon',      'arbeit-10-lang-blond.jpg',      0.55, 0.52, 0.34, 1.20, 1400, 0.72, true],
  ['flaeche-salon-hoch', 'arbeit-10-lang-blond.jpg',      0.55, 0.55, 0.42, 0.72,  700, 0.72, true],
  ['flaeche-leistungen', 'arbeit-06-bob-blond.jpg',       0.50, 0.45, 0.32, 1.20, 1400, 0.72, true],
  ['flaeche-leistungen-hoch','arbeit-06-bob-blond.jpg',   0.50, 0.45, 0.40, 0.72,  700, 0.72, true],
  ['flaeche-termin',     'arbeit-08-ombre.jpg',           0.57, 0.52, 0.32, 1.20, 1400, 0.72, true],
  ['flaeche-termin-hoch','arbeit-08-ombre.jpg',           0.57, 0.55, 0.40, 0.72,  700, 0.72, true],

  // Arbeiten — hoch, 3:4, Haar füllt das Bild.
  ['arbeit-balayage',    'arbeit-02-balayage.jpg',        0.56, 0.58, 0.62, 0.75,  820, 0.82],
  ['arbeit-straehnen',   'arbeit-03-straehnen.jpg',       0.54, 0.40, 0.56, 0.75,  820, 0.82, false, [1.05, 0.95, 0.99]],
  ['arbeit-locken',      'arbeit-05-blond-locken.jpg',    0.50, 0.55, 0.62, 0.75,  820, 0.82],
  ['arbeit-bob',         'arbeit-06-bob-blond.jpg',       0.52, 0.47, 0.62, 0.75,  820, 0.82],
  ['arbeit-ombre',       'arbeit-08-ombre.jpg',           0.60, 0.58, 0.60, 0.75,  820, 0.82],
  ['arbeit-lang',        'arbeit-10-lang-blond.jpg',      0.58, 0.62, 0.60, 0.75,  820, 0.82],
  ['arbeit-kurz-blond',  'arbeit-07-kurzhaar-blond.jpg',  0.48, 0.62, 0.38, 0.75,  740, 0.82],
  ['arbeit-glatt',       'arbeit-09-lang-glatt.jpg',      0.56, 0.68, 0.54, 0.75,  820, 0.82],
  ['arbeit-perlen',      'arbeit-13-hochsteck-blumen.jpg',0.33, 0.48, 0.50, 0.75,  400, 0.84, true],
  ['arbeit-braut-perlen','arbeit-14-brautfrisur.jpg',     0.48, 0.36, 0.52, 0.75,  420, 0.84, true],
  ['arbeit-braut-schleier','arbeit-15-braut-schleier.jpg',0.58, 0.26, 0.23, 0.75,  240, 0.88, true],

  // Der Laden, so klein ausgeliefert, wie die Auflösung es hergibt. Hier ist
  // kein Gesicht im Bild — die Köpfe auf den Plakaten sind Produktwerbung.
  ['salon-raum',         'salon-stuehle-spiegel.jpg',     0.50, 0.50, 1.00, 1.34,  733, 0.84, true],
  ['salon-platz',        'salon-arbeitsplatz.jpg',        0.50, 0.50, 1.00, 1.33,  455, 0.86, true],
  ['salon-waschen',      'salon-waschbecken.jpg',         0.50, 0.50, 1.00, 1.33,  455, 0.86, true],
];

// Der Farbfächer zeigt pro Leistung ein Blatt. Die Farbe dieses Blattes wird
// aus dem Foto genau dieser Arbeit gemessen — einmal am Ansatz, einmal in der
// Länge. Das Blatt trägt also den echten Verlauf und keine erfundene Farbe.
// [Kennung, Quelldatei, Ansatz x/y, Länge x/y]
const tonproben = [
  ['farbe',      'arbeit-10-lang-blond.jpg',    0.58, 0.16, 0.50, 0.62],
  ['straehnen',  'arbeit-03-straehnen.jpg',     0.55, 0.16, 0.50, 0.66],
  ['balayage',   'arbeit-02-balayage.jpg',      0.50, 0.24, 0.60, 0.72],
  ['glossing',   'arbeit-06-bob-blond.jpg',     0.50, 0.28, 0.52, 0.62],
  ['dauerwelle', 'arbeit-05-blond-locken.jpg',  0.52, 0.30, 0.44, 0.66],
  ['keratin',    'arbeit-09-lang-glatt.jpg',    0.52, 0.24, 0.52, 0.66],
  ['hochsteck',  'arbeit-13-hochsteck-blumen.jpg', 0.28, 0.40, 0.22, 0.62],
  ['braut',      'arbeit-14-brautfrisur.jpg',   0.45, 0.22, 0.35, 0.52],
];

const alsDatenUri = (name) =>
  `data:image/jpeg;base64,${readFileSync(new URL(name, quelle)).toString('base64')}`;

const browser = await pw.chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await browser.newPage();
await page.goto('about:blank');

await page.evaluate(() => {
  window.laden = (uri) => new Promise((ok, weg) => {
    const b = new Image(); b.onload = () => ok(b); b.onerror = weg; b.src = uri;
  });
  // Zuschnitt aus Mittelpunkt, Höhe und Seitenverhältnis. Läuft nie über den
  // Bildrand hinaus: erst schieben, dann notfalls den Ausschnitt verkleinern.
  window.kasten = (bild, cx, cy, hAnteil, verhaeltnis) => {
    let h = Math.min(bild.height * hAnteil, bild.height);
    let b = h * verhaeltnis;
    if (b > bild.width) { b = bild.width; h = b / verhaeltnis; }
    let x = bild.width * cx - b / 2;
    let y = bild.height * cy - h / 2;
    x = Math.max(0, Math.min(x, bild.width - b));
    y = Math.max(0, Math.min(y, bild.height - h));
    return [Math.round(x), Math.round(y), Math.round(b), Math.round(h)];
  };
});

let gesamt = 0;
for (const [name, datei, cx, cy, hA, verh, breite, guete, ohneHoch, korr] of auftraege) {
  const daten = await page.evaluate(async ([uri, cx, cy, hA, verh, breite, guete, ohneHoch, korr]) => {
    const bild = await window.laden(uri);
    const [sx, sy, sb, sh] = window.kasten(bild, cx, cy, hA, verh);
    const zb = Math.min(breite, ohneHoch ? sb : sb * 2);
    const zh = Math.round(zb / verh);
    // In zwei Schritten verkleinern, das hält die Haarstruktur zusammen.
    let c = document.createElement('canvas'); c.width = sb; c.height = sh;
    c.getContext('2d').drawImage(bild, sx, sy, sb, sh, 0, 0, sb, sh);
    while (c.width > zb * 2) {
      const n = document.createElement('canvas');
      n.width = Math.round(c.width / 2); n.height = Math.round(c.height / 2);
      const g = n.getContext('2d'); g.imageSmoothingQuality = 'high';
      g.drawImage(c, 0, 0, n.width, n.height);
      c = n;
    }
    const aus = document.createElement('canvas'); aus.width = Math.round(zb); aus.height = zh;
    const g = aus.getContext('2d', { willReadFrequently: !!korr }); g.imageSmoothingQuality = 'high';
    g.drawImage(c, 0, 0, aus.width, aus.height);
    // Weißabgleich. Die Leuchtstoffröhren im Salon legen einen grünen Stich
    // über einige Aufnahmen; goldenes Haar sieht darunter olivfarben aus.
    // Das ist eine Korrektur am Licht, keine Schönung des Ergebnisses.
    if (korr) {
      const bd = g.getImageData(0, 0, aus.width, aus.height);
      const d = bd.data, [kr, kg, kb] = korr;
      for (let i = 0; i < d.length; i += 4) {
        d[i]     = Math.min(255, d[i]     * kr);
        d[i + 1] = Math.min(255, d[i + 1] * kg);
        d[i + 2] = Math.min(255, d[i + 2] * kb);
      }
      g.putImageData(bd, 0, 0);
    }
    return { uri: aus.toDataURL('image/webp', guete), b: aus.width, h: aus.height };
  }, [alsDatenUri(datei), cx, cy, hA, verh, breite, guete, ohneHoch, korr]);

  const roh = Buffer.from(daten.uri.split(',')[1], 'base64');
  writeFileSync(new URL(`${name}.webp`, ziel), roh);
  gesamt += roh.length;
  console.log(`  ${name}.webp`.padEnd(34) + `${daten.b}×${daten.h}`.padEnd(12) + `${Math.round(roh.length / 1024)} KB`);
}
console.log(`\n  Summe Bilder: ${Math.round(gesamt / 1024)} KB\n`);

// Echte Haartöne messen — der Farbfächer soll keine erfundenen Farben zeigen.
// Gemessen wird der Median über eine Probefläche, aber nur über Bildpunkte,
// die überhaupt Haar sein können: nicht ausgebrannt, nicht schwarz, warm im
// Ton. Damit fallen weiße Fliesen, Neonlicht und schwarze Umhänge heraus.
const toene = await page.evaluate(async (liste) => {
  const probe = (bild, cx, cy) => {
    const b = Math.round(bild.width * 0.16), h = Math.round(bild.height * 0.10);
    const c = document.createElement('canvas'); c.width = b; c.height = h;
    const g = c.getContext('2d', { willReadFrequently: true });
    g.drawImage(bild,
      Math.max(0, Math.min(Math.round(bild.width * cx - b / 2), bild.width - b)),
      Math.max(0, Math.min(Math.round(bild.height * cy - h / 2), bild.height - h)),
      b, h, 0, 0, b, h);
    const d = g.getImageData(0, 0, b, h).data;
    const gute = [];
    for (let i = 0; i < d.length; i += 4) {
      const [r, gr, bl] = [d[i], d[i + 1], d[i + 2]];
      const max = Math.max(r, gr, bl), min = Math.min(r, gr, bl);
      if (max > 246 || max < 18) continue;          // ausgebrannt oder schwarz
      if (r < bl) continue;                          // kühl — Fliese, Kittel, Regal
      gute.push([r, gr, bl, 0.299 * r + 0.587 * gr + 0.114 * bl, max - min]);
    }
    if (gute.length < 40) return null;
    gute.sort((x, y) => x[3] - y[3]);
    const m = gute[gute.length >> 1];
    return { r: m[0], g: m[1], b: m[2] };
  };
  const raus = [];
  for (const [name, uri, ax, ay, lx, ly] of liste) {
    const bild = await window.laden(uri);
    raus.push({ name, ansatz: probe(bild, ax, ay), laenge: probe(bild, lx, ly) });
  }
  return raus;
}, tonproben.map(([n, f, ax, ay, lx, ly]) => [n, alsDatenUri(f), ax, ay, lx, ly]));

const oklch = ({ r, g, b }) => {
  const f = (v) => { v /= 255; return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; };
  const [R, G, B] = [f(r), f(g), f(b)];
  const l = Math.cbrt(0.4122214708 * R + 0.5363325363 * G + 0.0514459929 * B);
  const m = Math.cbrt(0.2119034982 * R + 0.6806995451 * G + 0.1073969566 * B);
  const s = Math.cbrt(0.0883024619 * R + 0.2817188376 * G + 0.6299787005 * B);
  const L = 0.2104542553 * l + 0.7936177850 * m - 0.0040720468 * s;
  const A = 1.9779984951 * l - 2.4285922050 * m + 0.4505937099 * s;
  const Bb = 0.0259040371 * l + 0.7827717662 * m - 0.8086757660 * s;
  let H = (Math.atan2(Bb, A) * 180) / Math.PI; if (H < 0) H += 360;
  return { L: +(L * 100).toFixed(1), C: +Math.hypot(A, Bb).toFixed(3), H: +H.toFixed(1) };
};
const hex = (t) => '#' + [t.r, t.g, t.b].map((v) => v.toString(16).padStart(2, '0')).join('');
console.log('  Gemessene Haartöne je Leistung — Ansatz → Länge:');
for (const t of toene) {
  const zeile = (p) => (p ? `${hex(p)} oklch(${oklch(p).L}% ${oklch(p).C} ${oklch(p).H})` : '— zu wenig Haar in der Probe');
  console.log(`    ${t.name.padEnd(12)} Ansatz ${zeile(t.ansatz)}`);
  console.log(`    ${''.padEnd(12)} Länge  ${zeile(t.laenge)}`);
}
await browser.close();
