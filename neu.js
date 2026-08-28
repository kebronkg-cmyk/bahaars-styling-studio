/* ═══════════════════════════════════════════════════════════════════════
   BaHaar's Styling Studio — Auftakt

   Zwei Dinge passieren hier: Der Hahn dreht den Film, und der Öffnungs-
   stand rechnet sich aus der Uhr. Sonst nichts.
   ═══════════════════════════════════════════════════════════════════════ */

(() => {
  'use strict';

  /* ── Der Wasserhahn ──────────────────────────────────────────────────
     Das Ventil ist ein Drehrad. Gerechnet wird der Winkelunterschied
     zwischen zwei Zeigerpunkten und aufaddiert — nur so bleibt es gleich,
     ob man das Rad am Reifen anfasst oder weit außerhalb.

     Der Film folgt dem Rad nicht hart, sondern zieht nach. Wasser hat
     Trägheit; ein Bild, das exakt am Finger klebt, fühlt sich an wie ein
     Schieberegler und nicht wie eine Armatur.                          */

  const BEREICH = 300;      // Grad von zu bis ganz auf
  const NACHLAUF = 0.10;    // wie träge der Film dem Rad folgt
  const SCHRITT = 0.08;     // eine Pfeiltaste

  /* Die Wanderung des Strahls, am Film gemessen und geglättet: Versatz
     der Strahlmitte in Prozent der Bildbreite, 25 Stützstellen über die
     ganze Länge. Der Film wird gegenläufig geschoben, damit der Strahl
     unter der Düse stehen bleibt. */
  const STRAHL = [-4.91,-5.57,-5.89,-6.89,-6.85,-4.78,-1.68,0.26,-0.44,0.33,
                  1.8,2.34,4.19,5.11,6.55,8.07,7.1,8.42,6.1,7.09,9.31,9.21,
                  7.69,5.89,5.13];
  const ZOOM = 1.26;

  const film   = document.getElementById('film');
  const bild   = document.getElementById('bild');
  const ventil = document.getElementById('ventil');
  const rad    = ventil && ventil.querySelector('svg');
  const wort   = document.getElementById('hahn-wort');
  if (!film || !ventil) return;

  let soll = 0;          // wohin das Rad zeigt, 0..1
  let ist  = 0;          // wo der Film gerade steht, läuft dem Soll nach
  let angefasst = false;
  let nassBild = null;   // Rückfallebene, falls der Film ausbleibt

  const klemme = (v, a, b) => v < a ? a : v > b ? b : v;

  /* Zwischen den Stützstellen wird linear geblendet. */
  function versatz(v) {
    const x = klemme(v, 0, 1) * (STRAHL.length - 1);
    const i = Math.floor(x), r = x - i;
    const a = STRAHL[i], b = STRAHL[Math.min(i + 1, STRAHL.length - 1)];
    return a + (b - a) * r;
  }

  function wortFuer(v) {
    if (v < 0.02) return 'Griff drehen';
    if (v > 0.97) return 'Ganz offen';
    return 'Läuft · ' + Math.round(v * 100) + ' %';
  }
  function textFuer(v) {
    if (v < 0.02) return 'zugedreht – das Haar ist trocken';
    if (v > 0.97) return 'ganz offen – das Haar ist nass';
    return Math.round(v * 100) + ' Prozent offen';
  }

  function radZeigen() {
    ventil.style.setProperty('--dreh', (soll * BEREICH) + 'deg');
    ventil.setAttribute('aria-valuenow', Math.round(soll * 100));
    ventil.setAttribute('aria-valuetext', textFuer(soll));
    ventil.setAttribute('aria-label', soll > 0.02 ? 'Wasserhahn zudrehen' : 'Wasserhahn aufdrehen');
    if (wort) {
      wort.textContent = wortFuer(soll);
      wort.classList.toggle('offen', soll >= 0.02);
    }
  }

  function setzeSoll(v, vonHand) {
    soll = klemme(v, 0, 1);
    radZeigen();
    if (vonHand) ersteBeruehrung();
  }

  /* ── Der Film folgt ──────────────────────────────────────────────────
     Ein Sprung kostet so viel, wie seit dem letzten Schlüsselbild liegt;
     die Datei hat deshalb alle vier Bilder eines. Gesprungen wird immer
     nur einmal gleichzeitig: Wer schneller dreht, als der Browser
     springen kann, überschreibt das Ziel, statt eine Schlange anzulegen.
     Sonst läuft der Film der Hand hinterher.                           */

  let springt = false;
  film.addEventListener('seeked', () => { springt = false; });

  function schleife() {
    ist += (soll - ist) * NACHLAUF;
    if (Math.abs(soll - ist) < 0.0004) ist = soll;

    /* Der Ausgleich läuft mit dem Film, nicht mit dem Rad — sonst würde
       das Bild vorauseilen. Der Zoom multipliziert die Verschiebung mit,
       also wird sie vorher herausgerechnet. */
    bild.style.setProperty('--schub', (-versatz(ist) * ZOOM).toFixed(3) + '%');

    if (film.duration && !springt) {
      const ziel = klemme(ist * (film.duration - 1 / 24), 0, film.duration);
      if (Math.abs(film.currentTime - ziel) > 0.012) {
        springt = true;
        film.currentTime = ziel;
      }
    }
    if (nassBild) nassBild.style.opacity = ist;
    requestAnimationFrame(schleife);
  }
  requestAnimationFrame(schleife);

  /* ── Drehen mit Zeiger ───────────────────────────────────────────── */

  let zeiger = null, letzter = 0;

  function winkel(ev) {
    const r = ventil.getBoundingClientRect();
    const dx = ev.clientX - (r.left + r.width / 2);
    const dy = ev.clientY - (r.top + r.height / 2);
    if (Math.hypot(dx, dy) < 8) return null;   // zu nah an der Mitte
    return Math.atan2(dy, dx) * 180 / Math.PI;
  }

  ventil.addEventListener('pointerdown', (ev) => {
    const w = winkel(ev);
    if (w === null) return;
    zeiger = ev.pointerId;
    letzter = w;
    ventil.setPointerCapture(ev.pointerId);
    ersteBeruehrung();
    ev.preventDefault();
  });

  ventil.addEventListener('pointermove', (ev) => {
    if (ev.pointerId !== zeiger) return;
    const w = winkel(ev);
    if (w === null) return;
    let d = w - letzter;
    while (d > 180) d -= 360;                  // über die Naht hinweg
    while (d < -180) d += 360;
    letzter = w;
    setzeSoll(soll + d / BEREICH, true);
  });

  const loslassen = (ev) => { if (ev.pointerId === zeiger) zeiger = null; };
  ventil.addEventListener('pointerup', loslassen);
  ventil.addEventListener('pointercancel', loslassen);

  /* Ein Knopf löst bei Leertaste und Enter ein click aus. Ohne das
     Abfangen springt der Hahn zusätzlich zur Tastensteuerung. */
  ventil.addEventListener('click', (ev) => ev.preventDefault());

  ventil.addEventListener('keydown', (ev) => {
    const k = ev.key;
    let v = null;
    if (k === 'ArrowRight' || k === 'ArrowUp')        v = soll + SCHRITT;
    else if (k === 'ArrowLeft' || k === 'ArrowDown')  v = soll - SCHRITT;
    else if (k === 'PageUp')   v = soll + SCHRITT * 3;
    else if (k === 'PageDown') v = soll - SCHRITT * 3;
    else if (k === 'Home')     v = 0;
    else if (k === 'End')      v = 1;
    else if (k === ' ' || k === 'Enter') v = soll > 0.02 ? 0 : 0.8;
    if (v === null) return;
    ev.preventDefault();
    setzeSoll(v, true);
  });

  /* ── Der Film wird geladen, sobald die Bühne zu sehen ist ────────────
     Vorher steht das erste Bild da — und das erste Bild ist genau das,
     was ein zugedrehter Hahn zeigt: trockenes Haar, kein Wasser. Wer mit
     gedrosselter Datenmenge unterwegs ist, bekommt den Film erst beim
     Anfassen.                                                          */

  let geladen = false;
  const sparsam = navigator.connection && navigator.connection.saveData;

  function ladeFilm() {
    if (geladen) return;
    geladen = true;
    const schmal = window.matchMedia('(max-width: 43rem)').matches;
    film.src = schmal ? 'bilder/wasser-klein.mp4' : 'bilder/wasser.mp4';
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

  /* Bleibt der Film aus, übernimmt ein zweites Standbild: Das Ventil
     blendet dann das nasse Haar über das trockene. Die Bedienung bleibt
     dieselbe. */
  function rueckfall() {
    if (nassBild) return;
    nassBild = new Image();
    nassBild.src = 'bilder/wasser-nass.webp';
    nassBild.alt = '';
    nassBild.width = 720; nassBild.height = 1280;
    nassBild.className = 'wasser-halt';
    nassBild.style.opacity = ist;
    nassBild.style.transition = 'none';
    bild.appendChild(nassBild);
  }

  function ersteBeruehrung() {
    if (angefasst) return;
    angefasst = true;
    ventil.classList.remove('wink');
    ladeFilm();
    /* Kommt binnen sechs Sekunden kein Bild, bauen wir die Rückfallebene
       auf, statt die Besucherin an einem toten Rad drehen zu lassen. */
    setTimeout(() => { if (!bild.classList.contains('laeuft')) rueckfall(); }, 6000);
  }

  /* Einmal vormachen, wofür das Rad da ist: aufdrehen, kurz laufen
     lassen, zudrehen. Bricht sofort ab, sobald jemand selbst anfasst. */
  function vorfuehren() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    setTimeout(() => { if (!angefasst) { soll = 0.62; radZeigen(); } }, 900);
    setTimeout(() => { if (!angefasst) { soll = 0;    radZeigen(); } }, 4200);
  }

  ventil.classList.add('wink');
  radZeigen();

  /* Geladen wird, sobald die Bühne im Bild ist. */
  if ('IntersectionObserver' in window && !sparsam) {
    const beobachter = new IntersectionObserver((eintraege) => {
      for (const e of eintraege) {
        if (e.isIntersecting) { beobachter.disconnect(); ladeFilm(); }
      }
    }, { rootMargin: '200px' });
    beobachter.observe(bild);
  }

  /* ── Öffnungsstand ───────────────────────────────────────────────────
     Gerechnet wird immer nach der Uhr des Ladens, nicht nach der des
     Geräts: Wer aus einer anderen Zeitzone schaut, bekommt sonst eine
     falsche Auskunft.                                                  */

  const ZEITEN = {          // Wochentag 0 = Sonntag
    0: null,
    1: [10, 16],
    2: [9, 19], 3: [9, 19], 4: [9, 19], 5: [9, 19],
    6: [9, 16],
  };
  const TAGE = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];

  function ladenzeit() {
    const f = new Intl.DateTimeFormat('de-DE', {
      timeZone: 'Europe/Berlin', weekday: 'short', hour: '2-digit', minute: '2-digit', hour12: false,
    });
    const teile = {};
    for (const t of f.formatToParts(new Date())) teile[t.type] = t.value;
    const kurz = { 'So': 0, 'Mo': 1, 'Di': 2, 'Mi': 3, 'Do': 4, 'Fr': 5, 'Sa': 6 };
    const tag = kurz[teile.weekday.replace('.', '')];
    return { tag, stunden: Number(teile.hour) + Number(teile.minute) / 60 };
  }

  function uhr(h) {
    return String(h).padStart(2, '0') + ' Uhr';
  }

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

    if (heute && stunden < heute[0]) {
      el.textContent = 'Heute ab ' + uhr(heute[0]);
      return;
    }
    for (let i = 1; i <= 7; i++) {
      const t = (tag + i) % 7;
      if (ZEITEN[t]) {
        const wann = i === 1 ? 'Morgen' : TAGE[t];
        el.textContent = 'Geschlossen · ' + wann + ' ab ' + uhr(ZEITEN[t][0]);
        return;
      }
    }
  }

  standSetzen();
  setInterval(standSetzen, 60000);
})();
