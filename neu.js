/* ═══════════════════════════════════════════════════════════════════════
   BaHaar's Styling Studio — Auftakt

   Der Hebel steuert zweierlei: wie dicht das gezeichnete Wasser läuft
   und wie weit der Film steht. Sonst passiert hier nur noch die Uhr.
   ═══════════════════════════════════════════════════════════════════════ */

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

  function nabe() {
    const r = hebel.getBoundingClientRect();
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

  function standSetzen() {
    const el = document.getElementById('stand');
    if (!el) return;
    const { tag, stunden } = ladenzeit();
    const heute = ZEITEN[tag];
    if (heute && stunden >= heute[0] && stunden < heute[1]) {
      el.textContent = 'Jetzt geöffnet · bis ' + uhr(heute[1]);
      el.classList.add('offen');
      return;
    }
    el.classList.remove('offen');
    if (heute && stunden < heute[0]) { el.textContent = 'Heute ab ' + uhr(heute[0]); return; }
    for (let i = 1; i <= 7; i++) {
      const t = (tag + i) % 7;
      if (ZEITEN[t]) {
        el.textContent = 'Geschlossen · ' + (i === 1 ? 'Morgen' : TAGE[t]) + ' ab ' + uhr(ZEITEN[t][0]);
        return;
      }
    }
  }
  standSetzen();
  setInterval(standSetzen, 60000);
})();
