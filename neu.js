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
  const navigator_ = document.getElementById('navigator');
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

  if (leiste) {
    let letzt = window.scrollY, weg = false;
    const setzen = (w) => {
      weg = w;
      leiste.classList.toggle('weg', w);
      if (navigator_) navigator_.classList.toggle('weg', w);
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

  /* ── Der Navigator der Preisliste ────────────────────────────────────
     Er hebt die Gruppe hervor, deren Anfang zuletzt unter der Leiste
     durchgelaufen ist. Gerechnet wird aus den Rechtecken, nicht mit
     einem Beobachter je Gruppe: Die Gruppen sind unterschiedlich hoch,
     und dann meldet der Beobachter zwei gleichzeitig.                 */

  if (navigator_) {
    const wegweiser = [...navigator_.querySelectorAll('a')];
    const ziele = wegweiser
      .map((a) => ({ a, ziel: document.querySelector(a.getAttribute('href')) }))
      .filter((x) => x.ziel);

    let steht = null, geplant = false;
    function markieren() {
      geplant = false;
      const grenze = (leiste ? leiste.offsetHeight : 0) + navigator_.offsetHeight + 24;
      let treffer = ziele[0];
      for (const x of ziele) if (x.ziel.getBoundingClientRect().top <= grenze) treffer = x;
      if (treffer === steht) return;
      steht = treffer;
      for (const x of ziele)
        if (x === treffer) x.a.setAttribute('aria-current', 'location');
        else x.a.removeAttribute('aria-current');
      // Den gewählten Weg in die Sicht schieben, ohne die Seite zu bewegen
      const b = treffer.a.getBoundingClientRect();
      const k = navigator_.querySelector('.navigator-bahn').getBoundingClientRect();
      if (b.left < k.left + 8 || b.right > k.right - 8)
        navigator_.querySelector('.navigator-bahn')
          .scrollBy({ left: b.left - k.left - 24, behavior: 'smooth' });
    }
    addEventListener('scroll', () => {
      if (!geplant) { geplant = true; requestAnimationFrame(markieren); }
    }, { passive: true });
    markieren();
  }

  /* ── Der Merkzettel ──────────────────────────────────────────────────
     Kein Warenkorb: Aus der Auswahl wird ein fertiger Text. Abgeschickt
     wird er von der Kundin selbst, per E-Mail oder am Telefon. Gemerkt
     wird nur im eigenen Browser und nur bis der Tab zugeht.           */

  const merk = document.getElementById('merk');
  if (merk) {
    const haken = [...document.querySelectorAll('.posten input[type="checkbox"]')];
    const zahl  = document.getElementById('merk-zahl');
    const wort  = document.getElementById('merk-wort');
    const summe = document.getElementById('merk-summe');
    const mail  = document.getElementById('merk-mail');
    const LAGER = 'bahaar-merkzettel';

    const entziffern = (t) => (t.match(/\d+/g) || []).map(Number);
    const euro = (n) => n.toLocaleString('de-DE') + ' €';

    function sichern(namen) {
      try { sessionStorage.setItem(LAGER, JSON.stringify(namen)); } catch (e) { /* egal */ }
    }
    function holen() {
      try { return JSON.parse(sessionStorage.getItem(LAGER) || '[]'); } catch (e) { return []; }
    }

    function rechnen() {
      const gewaehlt = haken.filter((h) => h.checked);
      merk.hidden = gewaehlt.length === 0;
      if (!gewaehlt.length) { sichern([]); return; }

      let von = 0, bis = 0;
      const zeilen = [];
      for (const h of gewaehlt) {
        const p = entziffern(h.dataset.preis);
        von += p[0] || 0;
        bis += p.length > 1 ? p[1] : (p[0] || 0);
        zeilen.push('· ' + h.dataset.name + ' (' + h.dataset.preis + ')');
      }
      zahl.textContent = gewaehlt.length;
      wort.textContent = gewaehlt.length === 1 ? 'Leistung' : 'Leistungen';
      summe.textContent = von === bis ? euro(von) : euro(von) + ' – ' + euro(bis);

      const text = 'Guten Tag,\n\nich möchte gern einen Termin für:\n\n'
        + zeilen.join('\n')
        + '\n\nRichtwert: ' + summe.textContent
        + '\n\nWann ginge es bei Ihnen? Ich bin erreichbar unter:\n\n\n'
        + 'Viele Grüße\n';
      mail.href = 'mailto:info@bahaarsstylingstudio.de'
        + '?subject=' + encodeURIComponent('Terminanfrage')
        + '&body=' + encodeURIComponent(text);
      sichern(gewaehlt.map((h) => h.dataset.name));
    }

    const gemerkt = new Set(holen());
    if (gemerkt.size) for (const h of haken) if (gemerkt.has(h.dataset.name)) h.checked = true;

    for (const h of haken) h.addEventListener('change', rechnen);
    document.getElementById('merk-leeren').addEventListener('click', () => {
      for (const h of haken) h.checked = false;
      rechnen();
    });
    rechnen();
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
