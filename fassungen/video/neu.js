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

/* ── Der Film im Raum ───────────────────────────────────────────────────
   Safari auf dem iPhone startet einen Film von sich aus nur, wenn er
   stumm ist und `playsinline` trägt. Zwei Dinge standen dem hier im
   Weg, beide selbst gebaut:

   Erstens hat ein Zeitgeber das Videofeld nach 2,2 s auf `opacity: 0`
   gesetzt, falls bis dahin nichts lief. Ein weggeblendetes Feld gilt
   Safari als unsichtbar, und einen unsichtbaren Film startet es nicht
   mehr — auf einer langsamen Verbindung war der Film also jedes Mal
   ausgesperrt, bis jemand den Schirm berührte. Es wird jetzt gar nichts
   mehr weggeblendet. Darunter liegt ohnehin dasselbe Standbild; solange
   der Film nicht läuft, sieht man es durch das Videofeld hindurch als
   dessen Vorschaubild, und es sieht gleich aus.

   Zweitens reicht das Attribut `muted` im Quelltext nicht überall aus.
   WebKit prüft beim Start die Eigenschaft am Element, und die muss
   gesetzt sein, bevor `play()` gerufen wird. Dasselbe gilt für
   `playsInline`. Beides wird deshalb hier noch einmal von Hand gesetzt.

   Drittens: ein einziger Anlauf genügt nicht. Der Film wird bei jedem
   Ladeschritt neu angestossen und danach noch ein paar Mal in kurzem
   Abstand — WebKit nimmt `play()` oft erst an, wenn genug im Puffer
   liegt. Die Berührung bleibt als letzter Ausweg, aber sie sollte nie
   nötig sein. Im Stromsparmodus verweigert iOS den Start grundsätzlich;
   dann bleibt das Standbild stehen, und das ist der geplante Zustand,
   kein Fehlerbild. */

(function () {
  const film = document.querySelector('.raum-film');
  if (!film) return;
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  /* Vor jedem play(): WebKit liest die Eigenschaften, nicht die
     Attribute. */
  film.muted = true;
  film.defaultMuted = true;
  film.playsInline = true;
  film.setAttribute('playsinline', '');
  film.setAttribute('webkit-playsinline', '');

  const laeuft = () => film.currentTime > 0 && !film.paused && !film.ended;

  function anstossen() {
    if (laeuft()) return;
    film.muted = true;
    const p = film.play();
    if (p && typeof p.catch === 'function') p.catch(() => {});
  }

  /* Bei jedem Ladeschritt neu versuchen. */
  for (const art of ['loadedmetadata', 'loadeddata', 'canplay', 'canplaythrough', 'suspend'])
    film.addEventListener(art, anstossen);

  /* Und ein paar Mal kurz hintereinander: oft nimmt WebKit erst an,
     wenn genug im Puffer liegt. Danach ist Schluss — endloses Pochen
     kostet nur Strom. */
  let anlauf = 0;
  const takt = setInterval(() => {
    if (laeuft() || ++anlauf > 12) { clearInterval(takt); return; }
    anstossen();
  }, 400);

  /* Kommt der Schirm aus dem Hintergrund zurück, hält iOS den Film oft
     angehalten. */
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) anstossen();
  });

  /* Letzter Ausweg, falls iOS den Start rundheraus verweigert. */
  function beiBeruehrung() {
    anstossen();
    if (laeuft())
      for (const art of ['pointerdown', 'touchstart', 'scroll', 'keydown'])
        removeEventListener(art, beiBeruehrung);
  }
  for (const art of ['pointerdown', 'touchstart', 'scroll', 'keydown'])
    addEventListener(art, beiBeruehrung, { passive: true });

  anstossen();
})();

/* ── Der Vorhang ────────────────────────────────────────────────────────
   Er geht, sobald der Film wirklich das erste Bild zeigt — dadurch
   beginnt der Rauch für die Besucherin von vorn und nicht mittendrin.
   Zwei Grenzen: nach 2,2 s geht er auch ohne Film (niemand wartet auf
   eine Kulisse), und die CSS-Animation holt ihn nach 5 s weg, falls
   diese Datei gar nicht ankommt. */

(function () {
  const vorhang = document.querySelector('.vorhang');
  if (!vorhang) return;
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
    vorhang.remove();
    return;
  }

  const film = document.querySelector('.raum-film');
  let fort = false;

  function heben() {
    if (fort) return;
    fort = true;
    vorhang.classList.add('geht');
    /* Erst nach dem Ausblenden aus dem Weg räumen, sonst springt es. */
    vorhang.addEventListener('transitionend', () => vorhang.classList.add('fort'), { once: true });
    setTimeout(() => vorhang.classList.add('fort'), 1200);
    document.documentElement.dispatchEvent(new CustomEvent('vorhang-weg'));
  }

  if (film) {
    const laeuft = () => { if (film.currentTime > 0 && !film.paused) heben(); };
    film.addEventListener('playing', laeuft);
    film.addEventListener('timeupdate', laeuft);
  }
  /* Der Vorhang soll nicht länger stehen als nötig — auch dann nicht,
     wenn der Film hängt oder gar nicht kommt. */
  setTimeout(heben, 2200);
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

    /* Hinter dem Vorhang aufzubauen hiesse, den einen gestalteten
       Moment an eine schwarze Fläche zu verschenken. Also erst, wenn
       der Vorhang geht — und ohne Vorhang sofort. */
    const vorhang = document.querySelector('.vorhang');
    let begonnen = false;
    const anfangen = () => { if (begonnen) return; begonnen = true;
      requestAnimationFrame(() => requestAnimationFrame(() => {
      teile.forEach((el, i) => {
        setTimeout(() => el.classList.add('auftritt-da'), Math.floor(i / 3) * 90);
      });
    })); };
    if (vorhang && !vorhang.classList.contains('geht')) {
      wurzel.addEventListener('vorhang-weg', anfangen, { once: true });
      /* Nichts darf am Vorhang hängen bleiben, falls er anders geht. */
      setTimeout(anfangen, 2600);
    } else {
      anfangen();
    }
  } else {
    wurzel.classList.remove('vorlauf');
  }

  /* ── Der Rest beim Scrollen ──────────────────────────────────────── */

  if (ruhig || !('IntersectionObserver' in window)) return;

  /* Nicht die Bilder im Zug einzeln: die wandern, treten dem Beobachter
     nie richtig ins Bild und blieben unsichtbar stehen. Der Zug tritt
     als Ganzes ein. */
  const ZIELE = '.gross, .wand-titel, .belege p, .fach, .werke-bahn, ' +
                '.laden figure, .spruch, .abschluss, .spalten > div, .karte, ' +
                '.urteil-note, .urteil-satz, .kontakt-satz, .zeiten-karte';

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
