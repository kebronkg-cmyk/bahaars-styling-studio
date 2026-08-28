/* ═══════════════════════════════════════════════════════════════════════
   BaHaar's Styling Studio — Auftakt

   Zwei Dinge passieren hier: Der Hahn dreht den Film, und der Öffnungs-
   stand rechnet sich aus der Uhr. Sonst nichts.
   ═══════════════════════════════════════════════════════════════════════ */

(() => {
  'use strict';

  /* ── Der Hahn ────────────────────────────────────────────────────────
     Der Griff ist ein Drehregler: Gedreht wird um seine eigene Mitte,
     gerechnet wird der Winkelunterschied zwischen zwei Zeigerpunkten und
     aufaddiert. Das ist der einzige Weg, bei dem es gleich bleibt, ob man
     den Griff am Rand oder weit außerhalb anfasst.                     */

  const BEREICH = 160;          // Grad von zu bis ganz offen
  const SCHRITT = 0.06;         // eine Pfeiltaste
  const film   = document.getElementById('film');
  const griff  = document.getElementById('griff');
  const kreuz  = document.getElementById('kreuz');
  const skala  = document.getElementById('skala');
  const wort   = document.getElementById('hahn-wort');
  const tafel  = document.querySelector('.wasser');

  if (!film || !griff) return;

  let wert = 0;                 // 0 = zu, 1 = ganz offen
  let angefasst = false;
  let nassBild = null;          // Rückfallebene, falls der Film ausbleibt

  /* Die Skala wird über ihre eigene Länge gefüllt statt über einen
     geschätzten Wert — die Bogenlänge kennt nur der Browser. */
  const skalaLaenge = skala.getTotalLength();
  skala.style.strokeDasharray = skalaLaenge;
  skala.style.strokeDashoffset = skalaLaenge;

  const klemme = (v, min, max) => v < min ? min : v > max ? max : v;

  function wortFuer(v) {
    if (v < 0.02) return 'Wasserhahn aufdrehen';
    if (v > 0.97) return 'Ganz offen';
    return 'Läuft · ' + Math.round(v * 100) + ' %';
  }

  function textFuer(v) {
    if (v < 0.02) return 'zugedreht – das Haar ist trocken';
    if (v > 0.97) return 'ganz offen – das Haar ist nass';
    return Math.round(v * 100) + ' Prozent offen';
  }

  function zeichne() {
    kreuz.style.transform = 'rotate(' + (wert * BEREICH) + 'deg)';
    skala.style.strokeDashoffset = skalaLaenge * (1 - wert);
    griff.setAttribute('aria-valuenow', Math.round(wert * 100));
    griff.setAttribute('aria-valuetext', textFuer(wert));
    if (wort) {
      wort.textContent = wortFuer(wert);
      wort.classList.toggle('offen', wert >= 0.02);
    }
    if (nassBild) nassBild.style.opacity = wert;
  }

  /* ── Den Film spulen ─────────────────────────────────────────────────
     Ein Sprung kostet so viel, wie zwischen zwei Schlüsselbildern liegt.
     Die Datei ist deshalb mit einem Schlüsselbild alle vier Bilder
     gepackt.

     Gesprungen wird immer nur einmal gleichzeitig. Wer schneller dreht,
     als der Browser springen kann, überschreibt das Ziel, statt eine
     Warteschlange anzulegen — sonst läuft der Film der Hand hinterher.
     Das zuletzt gewünschte Ziel darf dabei nie verloren gehen: Es bleibt
     in `ziel` stehen, bis es wirklich gesetzt wurde.                   */

  let ziel = null;          // gewünschte Stelle, noch nicht angesprungen
  let springt = false;      // ein Sprung ist gerade unterwegs

  function spulen() {
    if (springt || ziel === null || !film.duration) return;
    const z = ziel;
    ziel = null;
    if (Math.abs(film.currentTime - z) < 0.008) return;
    springt = true;
    film.currentTime = z;
  }

  /* Nie auf die Dauer selbst springen: Das letzte Bild endet dort, ein
     Sprung dorthin meldet je nach Browser kein `seeked` — und dann steht
     der Hahn still. Ein Bild davor ist die letzte sichere Stelle. */
  function letzteStelle() {
    return Math.max(0, film.duration - 1 / 24);
  }

  film.addEventListener('seeked', () => { springt = false; spulen(); });

  function setzeWert(v) {
    wert = klemme(v, 0, 1);
    zeichne();
    if (film.duration) { ziel = wert * letzteStelle(); spulen(); }
  }

  /* ── Drehen mit Zeiger ───────────────────────────────────────────── */

  let letzterWinkel = 0;
  let zeiger = null;

  function winkel(ev) {
    const r = griff.getBoundingClientRect();
    const dx = ev.clientX - (r.left + r.width / 2);
    const dy = ev.clientY - (r.top + r.height / 2);
    if (Math.hypot(dx, dy) < 10) return null;   // zu nah an der Mitte
    return Math.atan2(dy, dx) * 180 / Math.PI;
  }

  griff.addEventListener('pointerdown', (ev) => {
    const w = winkel(ev);
    if (w === null) return;
    zeiger = ev.pointerId;
    letzterWinkel = w;
    griff.setPointerCapture(ev.pointerId);
    ersteBeruehrung();
    ev.preventDefault();
  });

  griff.addEventListener('pointermove', (ev) => {
    if (ev.pointerId !== zeiger) return;
    const w = winkel(ev);
    if (w === null) return;
    let d = w - letzterWinkel;
    while (d > 180) d -= 360;                   // über die Naht hinweg
    while (d < -180) d += 360;
    letzterWinkel = w;
    setzeWert(wert + d / BEREICH);
  });

  function loslassen(ev) {
    if (ev.pointerId !== zeiger) return;
    zeiger = null;
  }
  griff.addEventListener('pointerup', loslassen);
  griff.addEventListener('pointercancel', loslassen);

  /* ── Drehen mit der Tastatur ─────────────────────────────────────── */

  griff.addEventListener('keydown', (ev) => {
    const k = ev.key;
    let v = null;
    if (k === 'ArrowRight' || k === 'ArrowUp')   v = wert + SCHRITT;
    else if (k === 'ArrowLeft' || k === 'ArrowDown') v = wert - SCHRITT;
    else if (k === 'PageUp')   v = wert + SCHRITT * 3;
    else if (k === 'PageDown') v = wert - SCHRITT * 3;
    else if (k === 'Home')     v = 0;
    else if (k === 'End')      v = 1;
    if (v === null) return;
    ev.preventDefault();
    ersteBeruehrung();
    setzeWert(v);
  });

  /* ── Der Film wird geladen, sobald jemand ihn braucht ────────────────
     Vorher steht das erste Bild als Standbild da — und das erste Bild
     ist genau das, was ein zugedrehter Hahn zeigt. Wer nie anfasst, lädt
     keine zwei Megabyte.                                               */

  let geladen = false;

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
    tafel.classList.add('laeuft');
    ziel = wert * letzteStelle();
    spulen();
  });

  film.addEventListener('error', rueckfall);

  /* Bleibt der Film aus, übernimmt ein zweites Standbild: Der Hahn blendet
     dann das nasse Haar über das trockene. Die Bedienung bleibt dieselbe. */
  function rueckfall() {
    if (nassBild) return;
    nassBild = new Image();
    nassBild.src = 'bilder/wasser-nass.webp';
    nassBild.alt = '';
    nassBild.width = 720; nassBild.height = 1280;
    nassBild.className = 'wasser-halt';
    nassBild.style.opacity = wert;
    nassBild.style.transition = 'none';
    tafel.appendChild(nassBild);
  }

  function ersteBeruehrung() {
    if (!angefasst) {
      angefasst = true;
      griff.classList.remove('wink');
      ladeFilm();
      /* Kommt binnen sechs Sekunden kein Bild, bauen wir die Rückfallebene
         auf, statt die Besucherin an einem toten Griff drehen zu lassen. */
      setTimeout(() => { if (!tafel.classList.contains('laeuft')) rueckfall(); }, 6000);
    }
  }

  griff.classList.add('wink');
  zeichne();

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
