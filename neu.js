/* ═══════════════════════════════════════════════════════════════════════
   BaHaar's Styling Studio

   Zwei Blöcke, absichtlich getrennt. Der Wasserhahn steht nur auf der
   Startseite; Leiste, Menü, Uhr, Navigator und Merkzettel stehen auf
   jeder Seite. In einem Block nähme der Rücksprung „kein Hebel da"
   alles andere mit.
   ═══════════════════════════════════════════════════════════════════════ */

/* ── Der Wasserhahn am Becken ─────────────────────────────────────────
   Der Hebel steuert zweierlei: wie dicht das gezeichnete Wasser läuft
   und wie weit der Film steht.                                       */

(() => {
  'use strict';

  const BEREICH  = 76;     // Grad, um die sich der Hebel hebt
  const WEG      = 240;    // Pixel Zugweg von zu bis ganz auf
  const NACHLAUF = 0.13;   // wie träge der Film der Hand folgt
  const SCHRITT  = 0.07;   // eine Pfeiltaste

  const film   = document.getElementById('film');
  const bild   = document.getElementById('bild');
  const hebel  = document.getElementById('hebel');
  const strahl = document.getElementById('strahl');
  const wort   = document.getElementById('hahn-wort');
  if (!film || !hebel) return;

  let soll = 0;            // wohin der Hebel zeigt, 0..1
  let ist  = 0;            // wo der Film steht, läuft dem Soll nach
  let angefasst = false;
  let nassBild = null;

  const klemme = (v, a, b) => v < a ? a : v > b ? b : v;

  function wortFuer(v) {
    if (v < 0.02) return 'Hebel anheben';
    if (v > 0.97) return 'Ganz offen';
    return 'Läuft · ' + Math.round(v * 100) + ' %';
  }
  function textFuer(v) {
    if (v < 0.02) return 'zugedreht – das Haar ist trocken';
    if (v > 0.97) return 'ganz offen – das Haar ist nass';
    return Math.round(v * 100) + ' Prozent offen';
  }

  function zeigen() {
    hebel.style.setProperty('--dreh', (soll * BEREICH).toFixed(2) + 'deg');
    hebel.setAttribute('aria-valuenow', Math.round(soll * 100));
    hebel.setAttribute('aria-valuetext', textFuer(soll));
    if (wort) {
      wort.textContent = wortFuer(soll);
      wort.classList.toggle('offen', soll >= 0.02);
    }
  }

  function setzeSoll(v, vonHand) {
    soll = klemme(v, 0, 1);
    zeigen();
    if (vonHand) ersteBeruehrung();
  }

  /* ── Was der Film und das Wasser daraus machen ───────────────────────
     Der Film folgt nicht hart, sondern zieht nach: Wasser hat Trägheit,
     und ein Bild, das am Finger klebt, fühlt sich an wie ein
     Schieberegler und nicht wie eine Armatur.

     Ein Sprung kostet so viel, wie seit dem letzten Schlüsselbild liegt;
     die Datei hat deshalb alle vier Bilder eines. Gesprungen wird immer
     nur einmal gleichzeitig — wer schneller zieht, als der Browser
     springen kann, überschreibt das Ziel, statt eine Schlange
     anzulegen.                                                        */

  let springt = false;
  film.addEventListener('seeked', () => { springt = false; });

  function schleife() {
    const vorher = ist;
    ist += (soll - ist) * NACHLAUF;
    if (Math.abs(soll - ist) < 0.0004) ist = soll;

    if (ist !== vorher) {
      strahl.style.setProperty('--fluss', ist.toFixed(3));
      strahl.classList.toggle('laeuft', ist > 0.015);
      if (nassBild) nassBild.style.opacity = ist;
    }

    if (film.duration && !springt) {
      /* Nie auf die Dauer selbst springen: Ein Sprung dorthin meldet je
         nach Browser kein `seeked`, und dann steht der Hahn still. */
      const ziel = klemme(ist * (film.duration - 1 / 24), 0, film.duration);
      if (Math.abs(film.currentTime - ziel) > 0.012) {
        springt = true;
        film.currentTime = ziel;
      }
    }
    requestAnimationFrame(schleife);
  }
  requestAnimationFrame(schleife);

  /* ── Ziehen ──────────────────────────────────────────────────────────
     Gerechnet wird der zurückgelegte Weg entlang des Bogens, nicht der
     Winkel. Der Hebel ist am Telefon nur siebzig Pixel lang; über den
     Winkel gerechnet drehte ihn schon ein kurzer Wisch ganz auf. Über
     den Weg braucht es immer dieselben dreihundert Pixel — gleich, ob
     man ihn an der Spitze anfasst oder weit daneben.                  */

  let zeiger = null, letztX = 0, letztY = 0;

  /* Der Drehpunkt wird am Hahn gemessen, nicht am Hebel: Der Hebel ist
     gedreht, und `getBoundingClientRect` gibt dann das umschliessende
     Rechteck der gedrehten Fläche zurück — der Punkt wanderte mit dem
     Ausschlag davon. Der Hebel füllt den Hahn (`inset: 0`), das
     ungedrehte Rechteck ist also das des Hahns. */
  const arm = hebel.parentElement;
  function nabe() {
    const r = arm.getBoundingClientRect();
    return [r.left + r.width * 0.672, r.top + r.height * 0.2074];
  }

  hebel.addEventListener('pointerdown', (ev) => {
    zeiger = ev.pointerId;
    letztX = ev.clientX; letztY = ev.clientY;
    hebel.setPointerCapture(ev.pointerId);
    ersteBeruehrung();
    ev.preventDefault();
  });

  hebel.addEventListener('pointermove', (ev) => {
    if (ev.pointerId !== zeiger) return;
    const [cx, cy] = nabe();
    const rx = ev.clientX - cx, ry = ev.clientY - cy;
    const r = Math.hypot(rx, ry);
    if (r < 12) { letztX = ev.clientX; letztY = ev.clientY; return; }
    /* Der Anteil der Bewegung quer zum Arm — das ist der Bogenweg. */
    const quer = ((ev.clientX - letztX) * -ry + (ev.clientY - letztY) * rx) / r;
    letztX = ev.clientX; letztY = ev.clientY;
    setzeSoll(soll + quer / WEG, true);
  });

  const loslassen = (ev) => { if (ev.pointerId === zeiger) zeiger = null; };
  hebel.addEventListener('pointerup', loslassen);
  hebel.addEventListener('pointercancel', loslassen);

  hebel.addEventListener('keydown', (ev) => {
    const k = ev.key;
    let v = null;
    if (k === 'ArrowRight' || k === 'ArrowUp')        v = soll + SCHRITT;
    else if (k === 'ArrowLeft' || k === 'ArrowDown')  v = soll - SCHRITT;
    else if (k === 'PageUp')   v = soll + SCHRITT * 3;
    else if (k === 'PageDown') v = soll - SCHRITT * 3;
    else if (k === 'Home')     v = 0;
    else if (k === 'End')      v = 1;
    else if (k === ' ' || k === 'Enter') v = soll > 0.02 ? 0 : 0.75;
    if (v === null) return;
    ev.preventDefault();
    setzeSoll(v, true);
  });

  /* ── Laden ───────────────────────────────────────────────────────────
     Bis der Film da ist, steht sein erstes Bild als Standbild — und das
     erste Bild ist genau das, was ein zugedrehter Hahn zeigt: trockenes
     Haar. Wer mit gedrosselter Datenmenge unterwegs ist, lädt ihn erst
     beim Anfassen.                                                    */

  let geladen = false;
  const sparsam = navigator.connection && navigator.connection.saveData;

  function ladeFilm() {
    if (geladen) return;
    geladen = true;
    const schmal = window.matchMedia('(max-width: 43rem)').matches;
    film.src = schmal ? 'bilder/kopf-klein.mp4' : 'bilder/kopf.mp4';
    film.load();
    /* Auf iOS gibt ein pausiertes Video erst nach einer echten Berührung
       Bilder heraus. Einmal anspielen und sofort anhalten genügt. */
    const p = film.play();
    if (p && p.then) p.then(() => film.pause()).catch(() => {});
  }

  film.addEventListener('loadeddata', () => {
    film.pause();
    bild.classList.add('laeuft');
    if (!angefasst && !sparsam) vorfuehren();
  });
  film.addEventListener('error', rueckfall);

  /* Bleibt der Film aus, übernimmt ein zweites Standbild: Der Hebel
     blendet dann das nasse Haar über das trockene. */
  function rueckfall() {
    if (nassBild) return;
    nassBild = new Image();
    nassBild.src = 'bilder/kopf-nass.webp';
    nassBild.alt = '';
    nassBild.width = 720; nassBild.height = 880;
    nassBild.className = 'film-halt';
    nassBild.style.opacity = ist;
    nassBild.style.transition = 'none';
    bild.appendChild(nassBild);
  }

  function ersteBeruehrung() {
    if (angefasst) return;
    angefasst = true;
    hebel.classList.remove('wink');
    ladeFilm();
    setTimeout(() => { if (!bild.classList.contains('laeuft')) rueckfall(); }, 6000);
  }

  /* Einmal vormachen, wofür der Hebel da ist. Bricht ab, sobald jemand
     selbst anfasst, und bleibt bei prefers-reduced-motion ganz aus. */
  function vorfuehren() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    setTimeout(() => { if (!angefasst) { soll = 0.55; zeigen(); } }, 1100);
    setTimeout(() => { if (!angefasst) { soll = 0;    zeigen(); } }, 4600);
  }

  hebel.classList.add('wink');
  zeigen();

  if ('IntersectionObserver' in window && !sparsam) {
    const beobachter = new IntersectionObserver((e) => {
      for (const x of e) if (x.isIntersecting) { beobachter.disconnect(); ladeFilm(); }
    }, { rootMargin: '200px' });
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
