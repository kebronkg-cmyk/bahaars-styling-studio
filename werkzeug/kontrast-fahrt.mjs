/* Misst den Kontrast im Auftakt an fünf Stellen der Kamerafahrt.

   werkzeug/kontrast-messen.mjs misst bei Scrollstand null. Der Auftakt fährt
   aber: Bild, Licht und Schleier ändern sich mit dem Scrollen, und die
   ungünstigste Stelle liegt irgendwo in der Mitte. Eine Messung am Anfang
   sagt darüber nichts.

   Aufruf:  node werkzeug/kontrast-fahrt.mjs                                */
import pw from '/opt/node22/lib/node_modules/playwright/index.js';

const leuchte = (r, g, b) => {
  const f = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; };
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
};
const verhaeltnis = (a, b) => { const [h, d] = a > b ? [a, b] : [b, a]; return (h + 0.05) / (d + 0.05); };

const browser = await pw.chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
let schlecht = 0;

for (const [geraet, viewport] of [['desktop', { width: 1440, height: 1000 }],
                                  ['handy',   { width: 390,  height: 844 }]]) {
  const page = await browser.newPage({ viewport });
    /* Die Farbstimmung kommt über die Umgebung: STIMMUNG=nacht node …
       Ohne Angabe gilt Messing. Gemessen werden muss jede einzeln — ein
       Grenzwert, der in Messing hält, sagt über Nacht gar nichts. */
    if (process.env.STIMMUNG) {
      await page.addInitScript((s) => {
        try { localStorage.setItem('bahaar-stimmung', s); } catch (e) {}
      }, process.env.STIMMUNG);
    }
  await page.goto('http://localhost:8099/index.html', { waitUntil: 'networkidle' });
  await page.addStyleTag({ content: 'html { scroll-behavior: auto !important; }' });
  await page.waitForTimeout(900);

  const weg = await page.evaluate(() => {
    const r = document.querySelector('.auftakt-rolle');
    return r ? r.getBoundingClientRect().height - innerHeight : 0;
  });
  const marken = weg > 0 ? [0, .25, .5, .75, 1] : [0];

  for (const q of marken) {
    await page.evaluate((y) => window.scrollTo(0, y), Math.round(weg * q));
    // Die Angleichung braucht Zeit, bis sie angekommen ist.
    await page.waitForTimeout(2600);

    const stellen = await page.evaluate(() => {
      const platte = document.createElement('canvas');
      platte.width = platte.height = 1;
      const stift = platte.getContext('2d', { willReadFrequently: true });
      const alsRgb = (farbe) => {
        stift.clearRect(0, 0, 1, 1); stift.fillStyle = farbe; stift.fillRect(0, 0, 1, 1);
        const [r, g, b] = stift.getImageData(0, 0, 1, 1).data; return [r, g, b];
      };
      const raus = [];
      for (const el of document.querySelectorAll('.buehne h1, .buehne p, .buehne a, .buehne span')) {
        if (el.closest('.kamera, .auftakt-schleier, .staub')) continue;
        const text = (el.textContent || '').trim();
        if (text.length < 3) continue;
        const eigen = [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim().length > 2);
        if (!eigen) continue;
        const cs = getComputedStyle(el);
        // Ausgeblendete Textstufen zählen nicht.
        if (parseFloat(cs.opacity) < 0.5) continue;
        const k = el.getBoundingClientRect();
        if (k.width < 4 || k.height < 4 || k.bottom < 0 || k.top > innerHeight) continue;
        raus.push({ text: text.slice(0, 40), farbe: alsRgb(cs.color),
          x: Math.round(k.left), y: Math.round(k.top),
          b: Math.round(k.width), h: Math.round(k.height),
          groesse: parseFloat(cs.fontSize), fett: Number(cs.fontWeight) >= 600 });
      }
      return raus;
    });
    if (!stellen.length) continue;

    // Ohne Text malen, damit nur der Untergrund gemessen wird.
    await page.addStyleTag({ content: '.buehne * { color: transparent !important; }' });
    await page.waitForTimeout(200);
    const bild = await page.screenshot({ clip: { x: 0, y: 0, width: viewport.width, height: viewport.height } });

    const gemessen = await page.evaluate(async ([b64, stellen]) => {
      const q = new Image();
      await new Promise((ok) => { q.onload = ok; q.src = 'data:image/png;base64,' + b64; });
      const c = document.createElement('canvas');
      c.width = q.width; c.height = q.height;
      const g = c.getContext('2d', { willReadFrequently: true });
      g.drawImage(q, 0, 0);
      const d = g.getImageData(0, 0, c.width, c.height).data;
      const L = (r, gr, b) => {
        const f = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; };
        return 0.2126 * f(r) + 0.7152 * f(gr) + 0.0722 * f(b);
      };
      return stellen.map((s) => {
        const werte = [];
        const ex = Math.round(s.b * 0.12), ey = Math.round(s.h * 0.22);
        for (let y = Math.max(0, s.y + ey); y < Math.min(s.y + s.h - ey, c.height); y += 2)
          for (let x = Math.max(0, s.x + ex); x < Math.min(s.x + s.b - ex, c.width); x += 3) {
            const i = (y * c.width + x) * 4;
            werte.push(L(d[i], d[i + 1], d[i + 2]));
          }
        if (!werte.length) return { ...s, hell: 0, dunkel: 0, mitte: 0 };
        werte.sort((a, b) => a - b);
        const bei = (t) => werte[Math.min(werte.length - 1, Math.floor(t * werte.length))];
        return { ...s, dunkel: bei(0.05), hell: bei(0.95), mitte: bei(0.5) };
      });
    }, [bild.toString('base64'), stellen]);

    for (const s of gemessen) {
      const Lt = leuchte(s.farbe[0], s.farbe[1], s.farbe[2]);
      const untergrund = Lt > s.mitte ? s.hell : s.dunkel;
      const k = verhaeltnis(Lt, untergrund);
      const gross = s.groesse >= 24 || (s.groesse >= 18.66 && s.fett);
      const noetig = gross ? 3.0 : 4.5;
      if (k < noetig) {
        schlecht++;
        console.log(`  ✕ ${geraet} bei ${(q * 100).toFixed(0)} %  ${k.toFixed(2)}:1 (nötig ${noetig})  ${Math.round(s.groesse)}px  „${s.text}"`);
      }
    }
    // Textfarbe wieder freigeben für die nächste Marke.
    await page.evaluate(() => {
      for (const el of document.querySelectorAll('style')) {
        if (el.textContent.includes('.buehne * { color: transparent')) el.remove();
      }
    });
  }
  await page.close();
}
await browser.close();
console.log(schlecht ? `\n  ${schlecht} Stelle(n) auf der Fahrt unter dem Grenzwert.`
                     : '\n  Alle Stellen auf der ganzen Fahrt über dem Grenzwert.');
