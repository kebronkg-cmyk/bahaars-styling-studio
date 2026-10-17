/* ═══════════════════════════════════════════════════════════════════════
   BaHaar's Styling Studio — Fassung „Himmel"
   Das Öffnen des Buschs, die Leiste, der Öffnungsstand und die Auftritte.
   Ohne dieses Skript steht alles da: der Busch geschlossen, die Leiste
   fest, die Abschnitte sichtbar.
   ═══════════════════════════════════════════════════════════════════════ */
(() => {
  'use strict';
  const ruhig = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const klemm = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
  const aus = (t) => 1 - Math.pow(1 - t, 3);              // bremst aus

  /* ── Öffnungsstand, nach der Uhr des Ladens ──────────────────────── */
  const ZEITEN = { 0: null, 1: [10, 16], 2: [9, 19], 3: [9, 19], 4: [9, 19], 5: [9, 19], 6: [9, 16] };
  const TAGE = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];
  function jetzt() {
    const f = new Intl.DateTimeFormat('de-DE', { timeZone: 'Europe/Berlin', weekday: 'short', hour: '2-digit', minute: '2-digit', hour12: false });
    const t = {}; for (const p of f.formatToParts(new Date())) t[p.type] = p.value;
    const k = { So: 0, Mo: 1, Di: 2, Mi: 3, Do: 4, Fr: 5, Sa: 6 };
    return { tag: k[t.weekday.replace('.', '')], h: Number(t.hour) + Number(t.minute) / 60 };
  }
  function stand() {
    const { tag, h } = jetzt(); const heute = ZEITEN[tag];
    if (heute && h >= heute[0] && h < heute[1]) return ['Jetzt geöffnet · bis ' + heute[1] + ' Uhr', true];
    if (heute && h < heute[0]) return ['Heute ab ' + heute[0] + ' Uhr geöffnet', false];
    for (let i = 1; i <= 7; i++) { const t = (tag + i) % 7; if (ZEITEN[t]) return ['Geschlossen · ' + (i === 1 ? 'morgen' : TAGE[t]) + ' ab ' + ZEITEN[t][0] + ' Uhr', false]; }
    return ['', false];
  }
  function standSetzen() {
    const [text, offen] = stand();
    for (const el of document.querySelectorAll('[data-stand]')) { el.textContent = text; el.classList.toggle('offen', offen); }
    /* Die Orchidee am Kontakt ist offen, wenn der Salon offen ist. */
    for (const b of document.querySelectorAll('.stand-bluete')) b.classList.toggle('offen', offen);
  }
  standSetzen(); setInterval(standSetzen, 60000);

  /* ── Die Leiste ───────────────────────────────────────────────────── */
  const leiste = document.getElementById('leiste');
  const auftakt = document.getElementById('auftakt');
  let letzt = scrollY, weg = false;
  function leisteSetzen() {
    const y = scrollY;
    const grenze = auftakt ? auftakt.offsetHeight - leiste.offsetHeight : 10;
    leiste.classList.toggle('ueber', y > grenze);
    if (Math.abs(y - letzt) < 6) return;
    const runter = y > letzt; letzt = y;
    if (runter && y > 160 && !weg) { weg = true; leiste.classList.add('weg'); }
    else if (!runter && weg) { weg = false; leiste.classList.remove('weg'); }
  }
  if (leiste) { leisteSetzen(); addEventListener('scroll', leisteSetzen, { passive: true }); }

  /* ── Das Öffnen ──────────────────────────────────────────────────────
     Die Bühne klebt, solange der Auftakt durchläuft. Der Weg dorthin ist
     die Höhe des Auftakts minus einen Bildschirm; über ihn läuft --auf
     von 0 bis 1, ausgebremst. Gerechnet wird nur bei Bewegung. */
  if (auftakt && !ruhig) {
    let laeuft = false, letzterWert = -1;
    function rechne() {
      laeuft = false;
      const weg = auftakt.offsetHeight - innerHeight;
      const p = weg > 0 ? klemm(scrollY / weg) : 0;
      const w = Math.round(aus(p) * 1e4) / 1e4;
      if (w !== letzterWert) { auftakt.style.setProperty('--auf', w); letzterWert = w; }
    }
    const anstossen = () => { if (!laeuft) { laeuft = true; requestAnimationFrame(rechne); } };
    addEventListener('scroll', anstossen, { passive: true });
    addEventListener('resize', anstossen);
    anstossen();
  }

  /* ── Auftritte: Überschrift, Text, Bild — gestaffelt, einmal ───────── */
  if (!ruhig && 'IntersectionObserver' in window) {
    const ZIELE = 'main section:not(.auftakt) h2, main section:not(.auftakt) .lead, .arbeiten-kopf p, .abzug, .preise-kopf > *, .gruppe, .lose, .braut-satz, .stimme-haupt, .ecke, .laden-lead, .laden-bild, .laden-kachel, .fakten > div, .spruch, .kontakt-satz, .kontakt-bild, .kontakt-wege > *';
    const els = [...document.querySelectorAll(ZIELE)];
    for (const el of els) el.classList.add('tritt');
    const beob = new IntersectionObserver((eintraege) => {
      const neu = eintraege.filter((e) => e.isIntersecting).map((e) => e.target);
      neu.forEach((el, i) => { setTimeout(() => el.classList.add('da'), i * 80); beob.unobserve(el); });
    }, { rootMargin: '0px 0px -8% 0px' });
    for (const el of els) beob.observe(el);
  }
})();
