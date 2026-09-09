/* ═══════════════════════════════════════════════════════════════════════
   BaHaar's Styling Studio

   Leiste, Menü, Öffnungsstand, der Navigator der Preisliste und der
   Merkzettel. Mehr Verhalten hat die Seite nicht.
   ═══════════════════════════════════════════════════════════════════════ */
(() => {
  'use strict';

  /* ── Die Leiste und das Menü ─────────────────────────────────────────
     Die Leiste weicht beim Runterscrollen aus und kommt beim Hochscrollen
     zurück; der Navigator der Preisliste fährt mit. Sechs Pixel Hysterese,
     sonst flackert das beim sanften Auslaufen.                         */

  const leiste    = document.querySelector('.leiste');
  const klapp     = document.getElementById('klapp');
  const wege      = document.getElementById('wege');

  function menue(auf) {
    if (!klapp || !wege) return;
    wege.classList.toggle('auf', auf);
    klapp.setAttribute('aria-expanded', String(auf));
    klapp.setAttribute('aria-label', auf ? 'Menü schliessen' : 'Menü öffnen');
  }
  if (klapp && wege) {
    klapp.addEventListener('click', () =>
      menue(klapp.getAttribute('aria-expanded') !== 'true'));
    wege.addEventListener('click', (e) => { if (e.target.closest('a')) menue(false); });
    addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && klapp.getAttribute('aria-expanded') === 'true') {
        menue(false); klapp.focus();
      }
    });
  }

  /* Über der schwarzen Bühne trägt die Leiste keine Fläche. Umgeschaltet
     wird an der Unterkante des Auftakts, minus der eigenen Höhe — sonst
     wechselte sie die Farbe, während sie noch über dem Film steht. */
  const buehne = document.querySelector('.auftakt');
  if (leiste && buehne) {
    const buehnenstand = () => {
      const grenze = buehne.offsetHeight - leiste.offsetHeight - 8;
      leiste.classList.toggle('leiste-buehne', window.scrollY < grenze);
    };
    buehnenstand();
    addEventListener('scroll', buehnenstand, { passive: true });
    addEventListener('resize', buehnenstand);
  }

  if (leiste) {
    let letzt = window.scrollY, weg = false;
    const setzen = (w) => {
      weg = w;
      leiste.classList.toggle('weg', w);
      if (w) menue(false);
    };
    addEventListener('scroll', () => {
      const y = window.scrollY;
      if (Math.abs(y - letzt) < 6) return;
      const runter = y > letzt;
      letzt = y;
      if (runter && y > 140 && !weg) setzen(true);
      else if (!runter && weg) setzen(false);
    }, { passive: true });
  }

  /* ── Öffnungsstand ───────────────────────────────────────────────────
     Gerechnet wird nach der Uhr des Ladens, nicht nach der des Geräts. */

  const ZEITEN = { 0: null, 1: [10, 16], 2: [9, 19], 3: [9, 19], 4: [9, 19], 5: [9, 19], 6: [9, 16] };
  const TAGE = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];

  function ladenzeit() {
    const f = new Intl.DateTimeFormat('de-DE', {
      timeZone: 'Europe/Berlin', weekday: 'short', hour: '2-digit', minute: '2-digit', hour12: false,
    });
    const t = {};
    for (const teil of f.formatToParts(new Date())) t[teil.type] = teil.value;
    const kurz = { 'So': 0, 'Mo': 1, 'Di': 2, 'Mi': 3, 'Do': 4, 'Fr': 5, 'Sa': 6 };
    return { tag: kurz[t.weekday.replace('.', '')],
             stunden: Number(t.hour) + Number(t.minute) / 60 };
  }
  const uhr = (h) => String(h).padStart(2, '0') + ' Uhr';

  /* Der Stand steht an mehreren Stellen — im Auftakt und beim Kontakt.
     Deshalb über alle `.stand` laufen, nicht über eine Kennung. */
  function standText() {
    const { tag, stunden } = ladenzeit();
    const heute = ZEITEN[tag];
    if (heute && stunden >= heute[0] && stunden < heute[1])
      return ['Jetzt geöffnet · bis ' + uhr(heute[1]), true];
    if (heute && stunden < heute[0]) return ['Heute ab ' + uhr(heute[0]), false];
    for (let i = 1; i <= 7; i++) {
      const t = (tag + i) % 7;
      if (ZEITEN[t])
        return ['Geschlossen · ' + (i === 1 ? 'Morgen' : TAGE[t]) + ' ab ' + uhr(ZEITEN[t][0]), false];
    }
    return ['', false];
  }

  function standSetzen() {
    const [text, offen] = standText();
    for (const el of document.querySelectorAll('.stand')) {
      el.textContent = text;
      el.classList.toggle('offen', offen);
    }
  }
  standSetzen();
  setInterval(standSetzen, 60000);
})();

/* ── Der Film im Auftakt ────────────────────────────────────────────────
   Safari auf dem iPhone startet einen Film von sich aus nur, wenn er
   stumm ist, `playsinline` trägt — und der Stromsparmodus aus ist. Im
   Stromsparmodus verweigert es den Start grundsätzlich, egal wie das
   Video ausgezeichnet ist. Deshalb: erst selbst anstossen, und wenn das
   abgelehnt wird, beim ersten Antippen oder Scrollen noch einmal. Kommt
   er nie, bleibt das Standbild stehen — das ist kein Fehlerbild,
   sondern der geplante Zustand. */

(function () {
  const film = document.querySelector('.auftakt-film');
  if (!film) return;
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  let versucht = false;
  function anstossen() {
    const p = film.play();
    if (p && typeof p.catch === 'function') p.catch(() => {});
  }
  function beiBeruehrung() {
    if (versucht) return;
    versucht = true;
    anstossen();
    for (const art of ['pointerdown', 'touchstart', 'scroll', 'keydown'])
      removeEventListener(art, beiBeruehrung);
  }

  anstossen();
  film.addEventListener('canplay', anstossen, { once: true });
  for (const art of ['pointerdown', 'touchstart', 'scroll', 'keydown'])
    addEventListener(art, beiBeruehrung, { passive: true, once: false });
})();

/* ── Der Auftritt ───────────────────────────────────────────────────────
   Ein einziger gestalteter Moment: der Auftakt baut sich beim Laden auf,
   aus der Unschärfe heraus, in Gruppen zu dritt. Alles Weitere kommt
   beim Scrollen nach — aber leiser und ohne Unschärfe, damit es dem
   Auftakt nicht die Bühne nimmt.

   Die Klassen setzt in beiden Fällen das Skript. Ohne Skript steht die
   Seite vollständig da; die Klasse `vorlauf` im Kopf der Seite nimmt
   sich nach 1,6 s selbst zurück, falls diese Datei gar nicht ankommt. */

(function () {
  const ruhig = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const wurzel = document.documentElement;

  /* ── Der Auftakt ─────────────────────────────────────────────────── */

  const satz = document.querySelector('.auftakt-satz');
  if (satz && !ruhig) {
    const teile = [...satz.children];
    for (const el of teile) el.classList.add('auftritt-gross');
    wurzel.classList.remove('vorlauf');
    requestAnimationFrame(() => requestAnimationFrame(() => {
      teile.forEach((el, i) => {
        setTimeout(() => el.classList.add('auftritt-da'), Math.floor(i / 3) * 90);
      });
    }));
  } else {
    wurzel.classList.remove('vorlauf');
  }

  /* ── Der Rest beim Scrollen ──────────────────────────────────────── */

  if (ruhig || !('IntersectionObserver' in window)) return;

  const ZIELE = '.gross, .wand-titel, .belege p, .fach, .werke img, ' +
                '.raeume img, .spruch, .abschluss, .spalten > div, .karte';

  /* Nichts aus einem geschlossenen Fach: was `display: none` trägt,
     meldet der Beobachter nie — es bliebe beim Aufklappen unsichtbar
     stehen. Und nichts aus dem Auftakt, der hat seinen eigenen Auftritt. */
  const stuecke = [...document.querySelectorAll(ZIELE)]
    .filter((el) => !el.closest('.auftakt') && !el.closest('.fach-inhalt'));
  if (!stuecke.length) return;

  for (const el of stuecke) el.classList.add('auftritt');

  const beob = new IntersectionObserver((eintraege) => {
    const dran = eintraege.filter((e) => e.isIntersecting).map((e) => e.target);
    dran.forEach((el, i) => {
      setTimeout(() => el.classList.add('auftritt-da'), Math.floor(i / 3) * 90);
      beob.unobserve(el);
    });
  }, { rootMargin: '0px 0px -10% 0px' });

  for (const el of stuecke) beob.observe(el);
})();
