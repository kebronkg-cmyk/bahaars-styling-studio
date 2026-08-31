/* ═══════════════════════════════════════════════════════════════════════
   BaHaar's Styling Studio

   Zwei Blöcke, absichtlich getrennt. Der Wasserhahn steht nur auf der
   Startseite; Leiste, Menü, Uhr, Navigator und Merkzettel stehen auf
   jeder Seite. In einem Block nähme der Rücksprung „kein Hebel da"
   alles andere mit.
   ═══════════════════════════════════════════════════════════════════════ */

/* ── Der Wasserhahn am Becken ─────────────────────────────────────────
   Der Hebel ist ein Schalter: auf oder zu, nichts dazwischen. Offen
   läuft der Film in einer nahtlosen Schleife — nasses Haar unter
   laufendem Wasser. Vorher wurde der Film am Hebel entlanggespult; dabei
   stand die Frau bei jedem Halt still, und genau das sollte sie nicht.

   Der Film ist deshalb neu geschnitten: 2,32 s aus dem Ende der
   Aufnahme, das Ende in den Anfang geblendet. Gemessen ist die Naht
   1,28 gegen 1,01 bei einem gewöhnlichen Bildwechsel — man sieht sie
   nicht. Ohne Spulen braucht die Datei auch keine dichten
   Schlüsselbilder mehr: 312 kB statt 1,77 MB.                        */

(() => {
  'use strict';

  const BEREICH = 76;      // Grad, um die sich der Hebel hebt
  const ZUG     = 26;      // Pixel Bogenweg, ab denen ein Zug zählt
  const TIPP    = 8;       // darunter ist es kein Zug, sondern ein Tippen

  const film   = document.getElementById('film');
  const bild   = document.getElementById('bild');
  const hebel  = document.getElementById('hebel');
  const strahl = document.getElementById('strahl');
  const wort   = document.getElementById('hahn-wort');
  if (!film || !hebel) return;

  const ruhig = window.matchMedia('(prefers-reduced-motion: reduce)');
  const sparsam = navigator.connection && navigator.connection.saveData;

  let offen = false;
  let angefasst = false;
  let nassBild = null;

  /* ── Der Zustand ─────────────────────────────────────────────────── */

  function zeigen() {
    hebel.style.setProperty('--dreh', (offen ? BEREICH : 0) + 'deg');
    hebel.setAttribute('aria-checked', String(offen));
    hebel.setAttribute('aria-label',
      offen ? 'Wasser abdrehen' : 'Wasser aufdrehen');
    strahl.classList.toggle('laeuft', offen);
    bild.classList.toggle('nass', offen);
    /* Das Winken lädt zum Anfassen ein. Es hat nur Sinn, solange der
       Hahn zu ist — an einem offenen Hahn zuckt sonst der Hebel, ohne
       dass es etwas zu holen gäbe. */
    hebel.classList.toggle('wink', !offen && !angefasst);
    if (nassBild) nassBild.style.opacity = offen ? 1 : 0;
    if (wort) {
      wort.textContent = offen ? 'Wasser läuft' : 'Hebel anheben';
      wort.classList.toggle('offen', offen);
    }
  }

  function schalten(neu, vonHand) {
    if (vonHand) ersteBeruehrung();
    if (neu === offen) return;
    offen = neu;
    zeigen();
    spielen();
  }

  /* ── Der Film ────────────────────────────────────────────────────────
     Er wird erst geladen, wenn der Abschnitt ins Bild kommt, und er
     läuft nur, solange er offen und sichtbar ist. Ein Film, der hinter
     dem Bildrand weiterläuft, kostet Strom und bringt nichts.        */

  let geladen = false, imBild = false;

  function ladeFilm() {
    if (geladen) return;
    geladen = true;
    const schmal = window.matchMedia('(max-width: 43rem)').matches;
    film.src = schmal ? 'bilder/becken-lauf-klein.mp4' : 'bilder/becken-lauf.mp4';
    film.load();
  }

  function spielen() {
    if (!geladen) return;
    if (offen && imBild) {
      const p = film.play();
      if (p && p.catch) p.catch(() => {});
    } else {
      film.pause();
    }
  }

  film.addEventListener('loadeddata', () => { bild.classList.add('laeuft'); spielen(); });
  film.addEventListener('error', rueckfall);

  /* Bleibt der Film aus, übernimmt ein zweites Standbild: Der Hebel
     blendet dann das nasse Haar über das trockene. Ohne Bewegung, aber
     ohne Loch. */
  function rueckfall() {
    if (nassBild) return;
    nassBild = new Image();
    nassBild.src = 'bilder/kopf-nass.webp';
    nassBild.alt = '';
    nassBild.width = 720; nassBild.height = 880;
    nassBild.className = 'film-halt film-nass';
    nassBild.style.opacity = offen ? 1 : 0;
    bild.appendChild(nassBild);
  }

  function ersteBeruehrung() {
    if (angefasst) return;
    angefasst = true;
    hebel.classList.remove('wink');
    ladeFilm();
    setTimeout(() => { if (!bild.classList.contains('laeuft')) rueckfall(); }, 6000);
  }

  /* ── Ziehen und Tippen ───────────────────────────────────────────────
     Gerechnet wird der Weg entlang des Bogens, nicht der Winkel: Der
     Hebel ist am Telefon nur siebzig Pixel lang, über den Winkel drehte
     ihn schon ein kurzer Wisch. Wer kaum bewegt, hat getippt — dann
     kippt der Schalter um.

     Der Drehpunkt wird am Hahn gemessen, nicht am Hebel: Der Hebel ist
     gedreht, und `getBoundingClientRect` gibt dann das umschliessende
     Rechteck der gedrehten Fläche zurück.                            */

  const arm = hebel.parentElement;
  let zeiger = null, letztX = 0, letztY = 0, weg = 0, strecke = 0;

  function nabe() {
    const r = arm.getBoundingClientRect();
    return [r.left + r.width * 0.672, r.top + r.height * 0.2074];
  }

  hebel.addEventListener('pointerdown', (ev) => {
    zeiger = ev.pointerId;
    letztX = ev.clientX; letztY = ev.clientY;
    weg = 0; strecke = 0;
    hebel.setPointerCapture(ev.pointerId);
    ersteBeruehrung();
    ev.preventDefault();
  });

  hebel.addEventListener('pointermove', (ev) => {
    if (ev.pointerId !== zeiger) return;
    const [cx, cy] = nabe();
    const rx = ev.clientX - cx, ry = ev.clientY - cy;
    const r = Math.hypot(rx, ry);
    const dx = ev.clientX - letztX, dy = ev.clientY - letztY;
    letztX = ev.clientX; letztY = ev.clientY;
    strecke += Math.hypot(dx, dy);
    if (r < 12) return;
    weg += (dx * -ry + dy * rx) / r;   // der Anteil quer zum Arm
    if (weg >=  ZUG) { weg = 0; schalten(true,  true); }
    if (weg <= -ZUG) { weg = 0; schalten(false, true); }
  });

  /* `setPointerCapture` lenkt das spätere `click` auf das Capture-Ziel
     um. Deshalb wird hier selbst entschieden, was ein Tippen war. */
  const loslassen = (ev) => {
    if (ev.pointerId !== zeiger) return;
    zeiger = null;
    if (strecke < TIPP) schalten(!offen, true);
  };
  hebel.addEventListener('pointerup', loslassen);
  hebel.addEventListener('pointercancel', (ev) => { if (ev.pointerId === zeiger) zeiger = null; });

  hebel.addEventListener('keydown', (ev) => {
    const k = ev.key;
    let v = null;
    if (k === ' ' || k === 'Enter') v = !offen;
    else if (k === 'ArrowRight' || k === 'ArrowUp'   || k === 'End')  v = true;
    else if (k === 'ArrowLeft'  || k === 'ArrowDown' || k === 'Home') v = false;
    if (v === null) return;
    ev.preventDefault();
    schalten(v, true);
  });

  /* ── Von selbst ──────────────────────────────────────────────────────
     Kommt der Abschnitt ins Bild, dreht der Hahn nach kurzer Zeit von
     allein auf und bleibt offen — sonst stünde dort ein Standbild, und
     niemand sähe, dass hier Wasser läuft. Bei prefers-reduced-motion
     und im Datensparmodus bleibt er zu.                              */

  hebel.classList.add('wink');
  zeigen();

  if ('IntersectionObserver' in window) {
    const beobachter = new IntersectionObserver((eintraege) => {
      for (const e of eintraege) {
        imBild = e.isIntersecting;
        if (imBild && !geladen && !sparsam && !ruhig.matches) {
          ladeFilm();
          setTimeout(() => { if (!angefasst) schalten(true, false); }, 900);
        }
        spielen();
      }
    }, { rootMargin: '150px 0px', threshold: 0.01 });
    beobachter.observe(bild);
  }
})();

/* ── Leiste, Menü, Navigator, Uhr und Merkzettel ──────────────────────
   Alles, was auf jeder Seite steht.                                   */

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
