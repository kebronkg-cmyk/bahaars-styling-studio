/* Misst den echten Kontrast von Text über Fotoflächen.

   Vor Fotos hilft kein Farbwert aus dem Stylesheet: was hinter dem Text
   liegt, entscheidet erst das Bild plus der Schleier darüber. Dieses
   Werkzeug malt die Seite, liest die Bildpunkte hinter jeder Textzeile aus
   und rechnet den Kontrast gegen die tatsächliche Textfarbe.

   Gemeldet wird der ungünstigste Punkt, nicht der Durchschnitt — ein heller
   Fleck genau hinter einem Buchstaben ist der Fall, der auffällt.

   Aufruf:  node werkzeug/kontrast-messen.mjs [seite ...]                   */
import pw from '/opt/node22/lib/node_modules/playwright/index.js';

const seiten = process.argv.slice(2);
if (!seiten.length) seiten.push('index.html');

const leuchte = (r, g, b) => {
  const f = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; };
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
};
const verhaeltnis = (a, b) => {
  const [h, d] = a > b ? [a, b] : [b, a];
  return (h + 0.05) / (d + 0.05);
};

const browser = await pw.chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
let schlecht = 0;

for (const seite of seiten) {
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
    await page.goto(`http://localhost:8099/${seite}`, { waitUntil: 'networkidle' });
    await page.evaluate(async () => {
      const h = document.documentElement.scrollHeight;
      for (let y = 0; y < h; y += 500) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 60)); }
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(1200);

    // Alle Textknoten über einer Fotofläche einsammeln, mit Kasten und Farbe.
    const stellen = await page.evaluate(() => {
      /* Die Textfarbe muss über die Leinwand gehen. getComputedStyle gibt
         bei einer oklch-Angabe genau diese zurück — „oklch(0.945 0.014 78)".
         Wer daraus die drei Zahlen als Rot, Grün und Blau liest, bekommt ein
         fast schwarzes Blau und damit einen Kontrastwert, der nichts mit dem
         zu tun hat, was auf dem Schirm steht. */
      const platte = document.createElement('canvas');
      platte.width = platte.height = 1;
      const stift = platte.getContext('2d', { willReadFrequently: true });
      const alsRgb = (farbe) => {
        stift.clearRect(0, 0, 1, 1);
        stift.fillStyle = farbe;
        stift.fillRect(0, 0, 1, 1);
        const [r, g, b] = stift.getImageData(0, 0, 1, 1).data;
        return [r, g, b];
      };
      const raus = [];
      for (const flaeche of document.querySelectorAll('.flaeche, .auftakt')) {
        const felder = flaeche.querySelectorAll('h1, h2, h3, p, a, span, li');
        for (const el of felder) {
          if (el.closest('.bild, .schleier, .buehne, .auftakt-schleier')) continue;
          const text = (el.textContent || '').trim();
          if (text.length < 3) continue;
          // Nur Elemente, die den Text selbst tragen, nicht deren Eltern.
          const eigen = [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim().length > 2);
          if (!eigen) continue;
          const k = el.getBoundingClientRect();
          if (k.width < 4 || k.height < 4) continue;
          if (k.bottom < 0 || k.top > innerHeight) continue;
          raus.push({
            text: text.slice(0, 44),
            farbe: alsRgb(getComputedStyle(el).color),
            x: Math.round(k.left), y: Math.round(k.top),
            b: Math.round(k.width), h: Math.round(k.height),
            groesse: parseFloat(getComputedStyle(el).fontSize),
            fett: Number(getComputedStyle(el).fontWeight) >= 600,
          });
        }
      }
      return raus;
    });

    if (!stellen.length) { await page.close(); continue; }

    // Die Seite einmal ohne Text malen, damit nur der Untergrund gemessen
    // wird. Ausgelesen wird im Browser: die Bildpunkte einer ganzen Seite
    // einzeln durch die Werkzeugbrücke zu schicken dauert Minuten.
    await page.addStyleTag({ content: '.flaeche *, .auftakt * { color: transparent !important; }' });
    await page.waitForTimeout(250);
    const bild = await page.screenshot({
      clip: { x: 0, y: 0, width: viewport.width, height: Math.min(viewport.height, 1600) },
    });

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
        /* Nur der innere Kern des Kastens wird gemessen. Bei einem runden
           Knopf liegen die Ecken des Rechtecks außerhalb der Pille; dort
           scheint die dunkle Seite durch und würde als Untergrund gezählt,
           obwohl dort gar kein Buchstabe steht. */
        const ex = Math.round(s.b * 0.12), ey = Math.round(s.h * 0.22);
        const y0 = Math.max(0, s.y + ey), x0 = Math.max(0, s.x + ex);
        const y1 = Math.min(s.y + s.h - ey, c.height), x1 = Math.min(s.x + s.b - ex, c.width);
        for (let y = y0; y < y1; y += 2) {
          for (let x = x0; x < x1; x += 3) {
            const i = (y * c.width + x) * 4;
            werte.push(L(d[i], d[i + 1], d[i + 2]));
          }
        }
        if (!werte.length) return { ...s, hell: 0, dunkel: 0, mitte: 0 };
        werte.sort((a, b) => a - b);
        const bei = (t) => werte[Math.min(werte.length - 1, Math.floor(t * werte.length))];
        // Nicht der einzelne hellste Bildpunkt, sondern das obere und untere
        // Zwanzigstel: ein Streulicht irgendwo im Kasten ist kein Untergrund,
        // eine helle Strähne quer durch die Zeile schon.
        return { ...s, dunkel: bei(0.05), hell: bei(0.95), mitte: bei(0.5) };
      });
    }, [bild.toString('base64'), stellen]);

    for (const s of gemessen) {
      const Lt = leuchte(s.farbe[0], s.farbe[1], s.farbe[2]);
      // Heller Text ist durch einen hellen Untergrund gefährdet, dunkler durch
      // einen dunklen. Welcher Fall vorliegt, entscheidet die Mitte.
      const untergrund = Lt > s.mitte ? s.hell : s.dunkel;
      const k = verhaeltnis(Lt, untergrund);
      const gross = s.groesse >= 24 || (s.groesse >= 18.66 && s.fett);
      const noetig = gross ? 3.0 : 4.5;
      if (k < noetig) {
        schlecht++;
        console.log(`  ✕ ${seite} ${geraet}  ${k.toFixed(2)}:1 (nötig ${noetig})  ${Math.round(s.groesse)}px  „${s.text}"`);
      }
    }
    await page.close();
  }
}
await browser.close();
console.log(schlecht ? `\n  ${schlecht} Stelle(n) unter dem Grenzwert.` : '\n  Alle gemessenen Stellen über dem Grenzwert.');
