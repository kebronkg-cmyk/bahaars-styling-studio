/* ═══════════════════════════════════════════════════════════════════════
   BaHaar's Styling Studio — Verhalten

   Kein Fremdcode, kein Nachladen, nichts, was nach außen telefoniert.
   Jeder Teil prüft erst, ob es sein Element auf dieser Seite überhaupt gibt,
   und hält sonst still — dieselbe Datei läuft auf allen Seiten.
   ═══════════════════════════════════════════════════════════════════════ */

(() => {
  'use strict';

  const $  = (w, in_ = document) => in_.querySelector(w);
  const $$ = (w, in_ = document) => [...in_.querySelectorAll(w)];
  const ruhig = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Wer Daten zählt, soll sie nicht für Zierrat ausgeben. Ein Film wird
     an einer langsamen Leitung und im Sparmodus gar nicht erst geladen. */
  const langsameLeitung = () => {
    const l = navigator.connection || {};
    return l.saveData === true || ['slow-2g', '2g', '3g'].includes(l.effectiveType);
  };

  /* ── Drei Marken am <html>, und jede sagt etwas anderes ────────────────

     mitskript  Das Skript läuft. Damit greift alles, was ohne Skript nicht
                bedienbar wäre — die Ausklapp-Übersicht in der Kopfzeile
                etwa steht ohne Skript als schlichte Liste da.
     mitgsap    GSAP liegt vor. Damit gehört die Einblendung ihm; eine
                CSS-Überblendung daneben zöge am selben Wert.
     mitfahrt   Es wird choreografiert: die Bühne wird zwei Bildschirme
                hoch und klebt, die Abschnitte kommen erst beim Auftauchen.

     Der Unterschied ist die Rückfallebene. Fehlt GSAP oder ist Bewegung
     abbestellt, wird mitfahrt nicht gesetzt — dann steht die Seite genau
     so da wie ganz ohne Skript: alles sichtbar, nichts wartet auf ein
     Ereignis, das nicht kommt. Das ist der einzige Zustand, in dem eine
     Einblendung gefährlich wird: wenn sie nie ausgelöst wird, ist aus ihr
     verschwundener Inhalt geworden.                                       */

  const wurzel = document.documentElement;
  wurzel.classList.add('mitskript');

  const G = window.gsap, ST = window.ScrollTrigger;
  const choreografie = !!(G && ST) && !ruhig();
  if (G && ST) {
    G.registerPlugin(ST);
    wurzel.classList.add('mitgsap');
  }
  if (choreografie) wurzel.classList.add('mitfahrt');

  /* ── Kopfzeile ────────────────────────────────────────────────────────
     Sie weicht beim Runterscrollen nach oben aus und kommt beim
     Hochscrollen zurück. Der Grund ist eine Beschwerde, die stimmt: Eine
     Leiste, die dauerhaft über dem Bild steht, versperrt die Sicht — und
     auf einer Seite, deren erster Bildschirm ein Film ist, versperrt sie
     genau das, worum es geht.

     Wer runterscrollt, will nach unten sehen und braucht die Navigation
     nicht. Wer hochscrollt, sucht sie. Beim Hochscrollen kommt sie deshalb
     sofort zurück, egal wie weit unten man ist.

     Hysterese von 6 px: ohne sie flackert der Umschalter genau dann, wenn
     das sanfte Scrollen um den Schwellwert herum ausläuft. Und ein
     Mindestweg von 8 px, damit ein Zittern des Fingers sie nicht
     hin- und herspringen lässt.                                          */

  const kopfzeile = $('.kopfzeile');
  if (kopfzeile) {
    const AN = 26, AUS = 20, WEG = 8;
    let gesetzt = false, versteckt = false, zuletzt = window.scrollY;

    const pruefen = () => {
      const y = window.scrollY;
      const d = y - zuletzt;

      if (!gesetzt && y > AN) { gesetzt = true; kopfzeile.classList.add('gesetzt'); }
      else if (gesetzt && y < AUS) { gesetzt = false; kopfzeile.classList.remove('gesetzt'); }

      if (Math.abs(d) >= WEG) {
        /* Über dem ersten Bildschirmrand bleibt sie immer stehen: Dort ist
           sie noch nie im Weg, und ein Ausweichen sähe wie ein Zucken aus. */
        const runter = d > 0 && y > innerHeight * 0.6;
        if (runter !== versteckt) {
          versteckt = runter;
          kopfzeile.classList.toggle('weg', runter);
          /* Ein offenes Menü hält die Seite fest; dann gibt es kein
             Runterscrollen, und die Leiste muss nicht ausweichen. */
        }
        zuletzt = y;
      }
    };

    addEventListener('scroll', pruefen, { passive: true });
    pruefen();
  }

  /* ── Die Navigation ───────────────────────────────────────────────────
     Sie liegt über der ganzen Fläche, auf jedem Schirm — nicht nur am
     Telefon. Eine Leiste mit sieben Einträgen über einem Film versperrt
     genau das, worum es geht.

     Solange sie offen ist, wird der Hintergrund festgehalten: Ohne das
     scrollt die Seite unter ihr weg, und wer sie schließt, steht
     woanders als vorher.                                                */

  const menuknopf = $('.menuknopf');
  const wegweiser = $('.wegweiser');
  if (menuknopf && wegweiser) {
    let vorher = 0;

    const setzen = (offen) => {
      menuknopf.setAttribute('aria-expanded', String(offen));
      menuknopf.setAttribute('aria-label', offen ? 'Menü schließen' : 'Menü öffnen');
      wegweiser.classList.toggle('offen', offen);
      if (offen) {
        vorher = window.scrollY;
        document.body.style.cssText = `position:fixed;inset-inline:0;top:${-vorher}px;width:100%`;
      } else if (document.body.style.position === 'fixed') {
        document.body.style.cssText = '';
        window.scrollTo(0, vorher);
      }
    };

    menuknopf.addEventListener('click', () =>
      setzen(menuknopf.getAttribute('aria-expanded') !== 'true'));
    $$('a', wegweiser).forEach((a) => a.addEventListener('click', () => setzen(false)));
    addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && wegweiser.classList.contains('offen')) {
        setzen(false); menuknopf.focus();
      }
    });
  }

  /* ── Auftauchen beim Scrollen ──────────────────────────────────────────
     ScrollTrigger.batch statt eines eigenen Beobachters: Es sammelt alle
     Elemente ein, die im selben Wimpernschlag ins Bild kommen, und gibt
     sie als eine Gruppe weiter. Erst dadurch lässt sich staffeln — vorher
     stand an jedem Element ein von Hand eingetragener Verzug, und wer eins
     dazwischenschob, brachte die ganze Reihe durcheinander.

     Höchstens drei auf einmal. Vier gleichzeitig anlaufende Bewegungen
     kann das Auge nicht mehr einzeln verfolgen; es sieht dann nur noch,
     dass sich etwas bewegt, nicht mehr was. Der Rest kommt als nächste
     Gruppe, 90 ms später — nah genug, dass es eine Bewegung bleibt.

     Nach unten wird nicht zurückgesetzt. Wer zurückscrollt, will lesen,
     was er schon gesehen hat, und nicht dabei zusehen, wie es noch einmal
     erscheint.                                                            */

  const auftauchen = $$('.auf');
  if (auftauchen.length && choreografie) {
    G.set(auftauchen, { opacity: 0, y: 34 });

    ST.batch(auftauchen, {
      start: 'top 92%',
      interval: .09,
      batchMax: 3,
      onEnter: (gruppe) => G.to(gruppe, {
        opacity: 1, y: 0,
        duration: .7, stagger: .09,
        ease: 'power2.out',      /* Eintritt bremst aus — nie umgekehrt */
        overwrite: true
      })
    });

    /* Zwei Zustände, in denen niemand scrollt und trotzdem alles sichtbar
       sein muss: der Druck und die Ganzseiten-Aufnahme. Beide holen sich
       die Seite in einem Zug; was noch auf sein Auftauchen wartet, wäre
       darauf ein leerer Kasten. Und wer nach drei Sekunden nicht gescrollt
       hat, sieht ohnehin nur den ersten Bildschirm — für den kostet es
       nichts, den Rest freizugeben.                                       */
    const alleZeigen = () => {
      ST.getAll().forEach((t) => { if (auftauchen.includes(t.trigger)) t.kill(); });
      G.set(auftauchen, { opacity: 1, y: 0 });
    };
    let gescrollt = false;
    addEventListener('scroll', () => { gescrollt = true; }, { passive: true, once: true });
    setTimeout(() => { if (!gescrollt) alleZeigen(); }, 3000);
    addEventListener('beforeprint', alleZeigen);
  }

  /* ── Sprung auf einen Anker beim Laden ────────────────────────────────
     scroll-behavior: smooth gilt auch für den Sprung, den der Browser beim
     Laden selbst macht. Der läuft dann als Bewegung ab, während Schriften
     und Bilder das Layout noch verschieben — und bleibt auf halbem Weg
     stehen. Beim Laden wird deshalb hart gesprungen, weich bleibt es nur
     für das, was jemand selbst anklickt.                                 */

  if (location.hash.length > 1) {
    const ziel = document.getElementById(decodeURIComponent(location.hash.slice(1)));
    if (ziel) {
      const hin = () => ziel.scrollIntoView({ block: 'start', behavior: 'instant' });
      hin();
      addEventListener('load', () => requestAnimationFrame(hin), { once: true });
    }
  }

  /* ── Der Auftakt ───────────────────────────────────────────────────────
     Ein Raum aus drei Ebenen: die Querformataufnahme weit hinten, die
     Hochkantaufnahme als Tafel davor, der Text ganz vorn. Sie stehen auf
     verschiedenen Tiefen, und daraus entsteht die Tiefe von selbst — wer
     die Maus bewegt oder scrollt, sieht sie sich gegeneinander
     verschieben, weil sie verschieden weit weg sind.

     Gerechnet wird in Grad und Pixel, gesetzt werden CSS-Variablen, die
     im Stylesheet in transform landen. Keine Layout-Eigenschaft wird
     angefasst.

     Am Hochkantschirm gibt es den Raum nicht: Dort füllt die Tafel die
     Fläche, und ein Kippen wäre ein Wackeln.                            */

  const auftakt = $('.auftakt');
  if (auftakt && choreografie) {
    const raum  = $('.raum', auftakt);
    const fern  = $('.ebene-fern', auftakt);
    const tafel = $('.ebene-tafel', auftakt);

    G.from($$('.steig', auftakt), {
      opacity: 0, y: 26,
      duration: .85, stagger: .09,
      ease: 'power2.out'
    });

    const raeumlich = () => matchMedia('(orientation: landscape) and (min-width: 48rem)').matches;

    /* ── Kippen nach dem Zeiger ─────────────────────────────────────────
       Höchstens vier Grad. Mehr sieht nach Spielerei aus, und der Text
       steht darauf.

       Angeglichen mit einem eigenen Takt: Ein Zeigerereignis kommt
       hundertmal je Sekunde, gezeichnet wird sechzigmal. Ohne
       Angleichung ruckelt das Kippen, und bei jedem Ereignis eine
       Transformation zu setzen kostet mehr, als sie wert ist.          */
    if (matchMedia('(hover: hover) and (pointer: fine)').matches) {
      let zielX = 0, zielY = 0, istX = 0, istY = 0, laeuft = false;

      const malen = () => {
        istX += (zielX - istX) * .08;
        istY += (zielY - istY) * .08;
        raum.style.setProperty('--kipp-x', istX.toFixed(3) + 'deg');
        raum.style.setProperty('--kipp-y', istY.toFixed(3) + 'deg');
        if (Math.abs(zielX - istX) > .002 || Math.abs(zielY - istY) > .002) {
          requestAnimationFrame(malen);
        } else { laeuft = false; }
      };

      auftakt.addEventListener('pointermove', (e) => {
        if (!raeumlich()) return;
        const k = auftakt.getBoundingClientRect();
        zielY = ((e.clientX - k.left) / k.width  - .5) *  4;
        zielX = ((e.clientY - k.top)  / k.height - .5) * -4;
        if (!laeuft) { laeuft = true; requestAnimationFrame(malen); }
      });
      auftakt.addEventListener('pointerleave', () => {
        zielX = zielY = 0;
        if (!laeuft) { laeuft = true; requestAnimationFrame(malen); }
      });
    }

    /* ── Auseinanderziehen beim Scrollen ────────────────────────────────
       Die hintere Ebene zieht am langsamsten, die Tafel schneller, der
       Text am schnellsten — das ist dieselbe Bewegung, die man aus einem
       fahrenden Zug kennt. */
    G.timeline({
      scrollTrigger: { trigger: auftakt, start: 'top top', end: 'bottom top', scrub: .5 }
    })
      .fromTo(fern,  { '--fern-y': '0px' },  { '--fern-y': '60px',  ease: 'none' }, 0)
      .fromTo(tafel, { '--tafel-y': '0px' }, { '--tafel-y': '150px', ease: 'none' }, 0)
      .fromTo($('.auftakt-satz', auftakt), { y: 0 }, { y: 260, ease: 'none' }, 0);
  }

  /* ── Filme in einem Rahmen ────────────────────────────────────────────
     Dieselben Regeln wie im Auftakt, nur für Aufnahmen, die mitten auf
     einer Seite stehen: Geladen wird erst, wenn der Rahmen ins Bild
     kommt — ein Film weiter unten auf der Seite kostet sonst Daten für
     etwas, das niemand ansieht. Umgeblendet wird erst, wenn er läuft.
     Außerhalb des Bildes hält er an.                                    */

  $$('.rahmenfilm, .raumfilm').forEach((film) => {
    /* data-nur schränkt eine Aufnahme auf eine Ausrichtung ein: Der
       Hintergrundfilm im Auftakt wird am Hochkantschirm von der Tafel
       vollständig verdeckt, und drei Megabyte für etwas zu laden, das
       niemand sieht, wäre unhöflich. */
    if (film.dataset.nur && !matchMedia(`(orientation: ${film.dataset.nur})`).matches) return;
    if (!choreografie || langsameLeitung() || film.canPlayType('video/mp4') === '') return;
    const rahmen = film.closest('.filmrahmen, .auftakt') || film;

    ST.create({
      trigger: rahmen, start: 'top bottom', once: true,
      onEnter: () => {
        const abbrechen = () => { film.removeAttribute('src'); film.load(); };
        film.addEventListener('error', abbrechen, { once: true });
        film.addEventListener('canplay', () => {
          film.play()
            .then(() => G.to(film, { opacity: 1, duration: .9, ease: 'power2.out' }))
            .catch(abbrechen);
        }, { once: true });
        film.src = film.dataset.quelle;
        film.load();
      }
    });

    ST.create({
      trigger: rahmen, start: 'top bottom', end: 'bottom top',
      onToggle: (selbst) => {
        if (!film.src) return;
        if (selbst.isActive) film.play().catch(() => {});
        else film.pause();
      }
    });
  });

  /* ── Die Übersicht in der Kopfzeile ────────────────────────────────────
     „Leistungen & Preise" klappt neun Gruppen mit Ab-Preis auf. Damit sieht
     man in einem Blick, was es gibt und was es kostet, ohne die Seite zu
     wechseln.

     Ohne JavaScript gibt es den Knopf gar nicht — dann steht dort der
     gewöhnliche Verweis auf die Preisliste (siehe .nav-ohne-skript). Das
     Feld ist deshalb im Ausgangszustand [hidden] und wird hier freigegeben.  */

  $$('.navpunkt').forEach((punkt) => {
    const knopf = $('button', punkt);
    const feld  = $('.uebersicht', punkt);
    if (!knopf || !feld) return;
    feld.hidden = false;

    const zu = (zurueck) => {
      if (knopf.getAttribute('aria-expanded') !== 'true') return;
      knopf.setAttribute('aria-expanded', 'false');
      if (zurueck) knopf.focus();
    };
    const auf = () => knopf.setAttribute('aria-expanded', 'true');

    knopf.addEventListener('click', () => {
      knopf.getAttribute('aria-expanded') === 'true' ? zu(false) : auf();
    });

    /* Ein Klick daneben schließt. Der Vergleich läuft über den Punkt, nicht
       über das Feld: sonst zählt der Knopf selbst als „daneben" und der
       Klick würde gleichzeitig öffnen und schließen. */
    addEventListener('pointerdown', (e) => {
      if (!punkt.contains(e.target)) zu(false);
    });
    punkt.addEventListener('keydown', (e) => { if (e.key === 'Escape') zu(true); });

    /* Wandert der Tastaturfokus aus dem Punkt heraus, ist die Übersicht
       erledigt. focusout feuert vor focusin am neuen Ziel, deshalb erst im
       nächsten Takt prüfen. */
    punkt.addEventListener('focusout', () => {
      setTimeout(() => { if (!punkt.contains(document.activeElement)) zu(false); }, 0);
    });
  });

  /* ── Lupe für die Arbeiten ─────────────────────────────────────────── */

  const lupe = $('.lupe');
  if (lupe) {
    const kacheln = $$('.arbeit-kachel');
    const bild = $('img', lupe);
    const text = $('figcaption', lupe);
    let bei = 0;

    const zeigen = (i) => {
      bei = (i + kacheln.length) % kacheln.length;
      const k = kacheln[bei];
      const q = $('img', k);
      bild.src = q.src;
      bild.alt = q.alt;
      text.textContent = k.dataset.text || q.alt;
    };
    const auf = (i) => { zeigen(i); if (!lupe.open) lupe.showModal(); };

    kacheln.forEach((k, i) => k.addEventListener('click', () => auf(i)));
    $('.lupe-zu', lupe)?.addEventListener('click', () => lupe.close());
    $('.lupe-blaettern.vor', lupe)?.addEventListener('click', () => zeigen(bei + 1));
    $('.lupe-blaettern.zurueck', lupe)?.addEventListener('click', () => zeigen(bei - 1));
    lupe.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') { e.preventDefault(); zeigen(bei + 1); }
      if (e.key === 'ArrowLeft')  { e.preventDefault(); zeigen(bei - 1); }
    });
    // Klick auf die Fläche neben dem Bild schließt.
    lupe.addEventListener('click', (e) => { if (e.target === lupe) lupe.close(); });
  }

  /* ── Navigator über den Leistungsgruppen ───────────────────────────────
     Weicht beim Runterscrollen aus und kommt beim Hochscrollen zurück.

     Der Bezugspunkt ist der feste Anker davor, nicht der Navigator selbst:
     ein klebendes Element meldet über offsetTop seine Klebeposition und
     nicht die Stelle, an der es im Fluss steht.                           */

  const navigator_ = $('.navigator');
  if (navigator_) {
    const anker = $('.navigator-anker');
    const HYST = 6;
    let zuletzt = window.scrollY;
    let weg = false;

    addEventListener('scroll', () => {
      const y = window.scrollY;
      const ab = y - zuletzt;
      if (Math.abs(ab) < HYST) return;
      const startet = anker ? anker.offsetTop : 0;
      if (y <= startet + 40) { weg = false; }
      else if (ab > 0 && !weg) { weg = true; }
      else if (ab < 0 && weg)  { weg = false; }
      navigator_.classList.toggle('weg', weg);
      zuletzt = y;
    }, { passive: true });

    // Welche Gruppe steht gerade an?
    const streifen = $('ol', navigator_);
    const marken = $$('a[href^="#"]', navigator_);
    const ziele = marken.map((a) => document.getElementById(a.getAttribute('href').slice(1))).filter(Boolean);
    if (ziele.length && 'IntersectionObserver' in window) {
      const sichtbar = new Set();
      const b = new IntersectionObserver((eintraege) => {
        eintraege.forEach((e) => e.isIntersecting ? sichtbar.add(e.target) : sichtbar.delete(e.target));
        const oben = ziele.find((z) => sichtbar.has(z));
        marken.forEach((a, i) => a.setAttribute('aria-current', String(ziele[i] === oben)));
        const treffer = marken.find((a) => a.getAttribute('aria-current') === 'true');
        /* Die aktive Marke wandert in das Sichtfeld des Streifens — und
           zwar nur dort. scrollIntoView scrollt jeden scrollbaren Vorfahren
           mit, also auch die Seite: Ein Klick im Navigator löste damit zwei
           Bewegungen gleichzeitig aus, die zweite überschrieb das Ziel der
           ersten, und die Seite blieb weit über der Gruppe stehen. Gemessen:
           Sprung auf #umformen (offsetTop 1581) endete bei 628.           */
        if (treffer && streifen) {
          const links = treffer.offsetLeft - (streifen.clientWidth - treffer.offsetWidth) / 2;
          streifen.scrollTo({ left: Math.max(0, links), behavior: ruhig() ? 'auto' : 'smooth' });
        }
      }, { rootMargin: '-25% 0px -60% 0px' });
      ziele.forEach((z) => b.observe(z));
    }
  }

  /* ── Merkzettel ────────────────────────────────────────────────────────
     Kein Warenkorb, keine Zahlung, kein Server. Die Auswahl wird zu einem
     fertigen Text, den die Kundin selbst abschickt oder am Telefon vorliest.

     Gespeichert wird nur für die Dauer des Besuchs (sessionStorage) und nur
     das, was sie selbst angeklickt hat.                                    */

  const merkzettel = $('.merkzettel');
  if (merkzettel) {
    const SCHLUESSEL = 'bahaar-merkzettel';
    let zugetan = false;
    const liste  = $('ul', merkzettel);
    const zahl   = $('.merkzettel-zahl', merkzettel);
    const summe  = $('.summe', merkzettel);
    const kopf   = $('.merkzettel-kopf', merkzettel);
    let gemerkt = [];

    try { gemerkt = JSON.parse(sessionStorage.getItem(SCHLUESSEL) || '[]'); } catch { gemerkt = []; }

    const sichern = () => { try { sessionStorage.setItem(SCHLUESSEL, JSON.stringify(gemerkt)); } catch { /* egal */ } };

    /* Preise stehen als „59", „60–90" oder „ab 190" in den Daten. Für die
       Summe zählt die Untergrenze, und sobald eine Spanne dabei ist, sagt
       die Seite „ab" statt einen Preis zu behaupten, den niemand zugesagt
       hat.                                                                */
    const untergrenze = (p) => {
      const t = String(p).match(/\d+/);
      return t ? Number(t[0]) : 0;
    };
    const istSpanne = (p) => /[–-]|ab/.test(String(p));

    const dauerMinuten = (d) => {
      const t = String(d).match(/\d+/);
      return t ? Number(t[0]) : 0;
    };
    const alsDauer = (min) => {
      if (!min) return '';
      const s = Math.floor(min / 60), m = min % 60;
      if (!s) return `${m} Min.`;
      return m ? `${s} Std. ${m} Min.` : `${s} Std.`;
    };

    const zeichnen = () => {
      /* Ein einmal zugetaner Riegel bleibt zu, bis wieder etwas dazukommt. */
      merkzettel.classList.toggle('da', gemerkt.length > 0 && !zugetan);
      zahl.textContent = gemerkt.length;
      /* Die Ziffer links steht schon da — der Text wiederholt sie nicht.
         Zusammen gelesen ergibt es „1 Leistung gemerkt“. */
      kopf.textContent = gemerkt.length === 1 ? 'Leistung gemerkt' : 'Leistungen gemerkt';

      const preis = gemerkt.reduce((a, e) => a + untergrenze(e.preis), 0);
      const min   = gemerkt.reduce((a, e) => a + dauerMinuten(e.dauer), 0);
      const spanne = gemerkt.some((e) => istSpanne(e.preis));
      const teile = [];
      if (preis) teile.push(`${spanne ? 'ab ' : 'etwa '}${preis} €`);
      if (min)   teile.push(`ungefähr ${alsDauer(min)}`);
      summe.textContent = teile.join(' · ');

      // Der Riegel klebt unten am Bild — die Fußzeile braucht so viel Platz
      // darunter, wie er hoch ist, sonst verdeckt er sie.
      document.body.style.paddingBottom = merkzettel.classList.contains('da') ? `${merkzettel.offsetHeight}px` : '';

      const stueck = document.createDocumentFragment();
      gemerkt.forEach((e, i) => {
        const li = document.createElement('li');
        const was = document.createElement('span');
        was.textContent = e.laenge ? `${e.name} (${e.laenge})` : e.name;
        const pr = document.createElement('span');
        pr.className = 'preis zahl';
        pr.textContent = `${e.preis} €`;
        const weg = document.createElement('button');
        weg.type = 'button'; weg.className = 'weg';
        weg.setAttribute('aria-label', `${e.name} vom Merkzettel nehmen`);
        weg.innerHTML = '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" '
          + 'stroke-width="1.8" stroke-linecap="round" aria-hidden="true">'
          + '<path d="M5 5l10 10M15 5L5 15"/></svg>';
        weg.addEventListener('click', () => {
          gemerkt.splice(i, 1); sichern(); zeichnen(); knoepfeAbgleichen();
        });
        li.append(was, pr, weg);
        stueck.append(li);
      });
      liste.replaceChildren(stueck);
    };

    const kennung = (b) => `${b.dataset.name}|${b.dataset.laenge || ''}`;

    const knoepfeAbgleichen = () => {
      $$('.merken').forEach((b) => {
        const drin = gemerkt.some((e) => `${e.name}|${e.laenge || ''}` === kennung(b));
        b.setAttribute('aria-pressed', String(drin));
        b.setAttribute('aria-label', (drin ? 'Vom Merkzettel nehmen: ' : 'Auf den Merkzettel: ')
          + b.dataset.name + (b.dataset.laenge ? ` (${b.dataset.laenge})` : ''));
      });
    };

    $$('.merken').forEach((b) => {
      b.addEventListener('click', () => {
        const k = kennung(b);
        const bei = gemerkt.findIndex((e) => `${e.name}|${e.laenge || ''}` === k);
        if (bei >= 0) gemerkt.splice(bei, 1);
        else {
          gemerkt.push({
            name: b.dataset.name, laenge: b.dataset.laenge || '',
            preis: b.dataset.preis, dauer: b.dataset.dauer || '',
          });
          /* Etwas Neues holt den Riegel zurück. Zugemacht heißt „jetzt
             gerade nicht", nicht „nie wieder" — wer danach weitermerkt,
             will sehen, was er sammelt. Beim Wegnehmen bleibt er zu. */
          zugetan = false;
        }
        sichern(); zeichnen(); knoepfeAbgleichen();
      });
    });

    /* Aus der Auswahl einen Text bauen, den ein Mensch vorlesen kann. */
    const alsText = () => {
      const zeilen = ['Guten Tag, ich hätte gern einen Termin bei BaHaar’s Styling Studio.', ''];
      zeilen.push(gemerkt.length === 1 ? 'Ich interessiere mich für:' : 'Ich interessiere mich für folgende Leistungen:');
      gemerkt.forEach((e) => {
        zeilen.push(`· ${e.name}${e.laenge ? ` (${e.laenge})` : ''} — ${e.preis} €${e.dauer ? `, ${e.dauer}` : ''}`);
      });
      const preis = gemerkt.reduce((a, e) => a + untergrenze(e.preis), 0);
      const min   = gemerkt.reduce((a, e) => a + dauerMinuten(e.dauer), 0);
      const spanne = gemerkt.some((e) => istSpanne(e.preis));
      zeilen.push('');
      zeilen.push(`Zusammen ${spanne ? 'ab ' : 'etwa '}${preis} €${min ? `, ungefähr ${alsDauer(min)}` : ''}.`);
      zeilen.push('');
      zeilen.push('Mein Wunschtermin wäre: ');
      zeilen.push('Mein Name: ');
      return zeilen.join('\n');
    };

    /* Der Hauptweg führt ins Buchungsfenster, nicht ins E-Mail-Programm.
       Die Auswahl wird dabei mitgenommen: Sie steht schon in
       sessionStorage, und die Terminseite liest sie von dort und zeigt sie
       neben dem Buchungsfenster an. Übergeben wird nichts über die
       Adresse — eine Terminanfrage in einer URL steht in jedem
       Serverprotokoll und in jedem Verlauf. */
    $('.merkzettel-buchen', merkzettel)?.addEventListener('click', () => {
      try { sessionStorage.setItem('bahaar-merkzettel-mit', '1'); } catch (e) { /* privater Modus */ }
    });

    /* Zumachen. Der Riegel steht am unteren Rand und verdeckt dort einen
       Streifen der Seite; wer ihn gerade nicht braucht, muss ihn wegtun
       können, ohne die Auswahl zu verlieren. Beim nächsten Merken kommt
       er von selbst zurück. */
    $('.merkzettel-zu', merkzettel)?.addEventListener('click', () => {
      zugetan = true;
      merkzettel.classList.remove('da');
      document.body.style.paddingBottom = '';
    });

    const kopieren = $('.merkzettel-kopieren', merkzettel);
    kopieren?.addEventListener('click', async () => {
      const urtext = kopieren.textContent;
      try {
        await navigator.clipboard.writeText(alsText());
        kopieren.textContent = 'Kopiert';
      } catch {
        kopieren.textContent = 'Ging nicht';
      }
      setTimeout(() => { kopieren.textContent = urtext; }, 2200);
    });

    $('.merkzettel-leeren', merkzettel)?.addEventListener('click', () => {
      gemerkt = []; sichern(); zeichnen(); knoepfeAbgleichen();
    });

    const klappe = $('.merkzettel-klappe', merkzettel);
    const blatt  = $('.merkzettel-blatt', merkzettel);
    klappe?.addEventListener('click', () => {
      const offen = klappe.getAttribute('aria-expanded') === 'true';
      klappe.setAttribute('aria-expanded', String(!offen));
      blatt.hidden = offen;
      klappe.firstChild.textContent = offen ? 'Liste zeigen ' : 'Liste verbergen ';
      document.body.style.paddingBottom = `${merkzettel.offsetHeight}px`;
    });

    zeichnen(); knoepfeAbgleichen();
  }

  /* ── Die mitgebrachte Auswahl auf der Terminseite ──────────────────────
     Wer auf der Preisliste etwas gemerkt und dort „Termin buchen" gedrückt
     hat, sieht die Liste hier neben dem Buchungsfenster — zum Ablesen,
     nicht zum Übertragen: Das fremde Fenster nimmt nichts entgegen.     */

  const mitgebracht = $('.mitgebracht');
  if (mitgebracht) {
    let posten = [];
    try {
      if (sessionStorage.getItem('bahaar-merkzettel-mit')) {
        posten = JSON.parse(sessionStorage.getItem('bahaar-merkzettel') || '[]');
      }
    } catch (e) { /* privater Modus */ }

    if (posten.length) {
      const liste = $('ul', mitgebracht);
      const stueck = document.createDocumentFragment();
      let summe = 0;
      for (const e of posten) {
        const li = document.createElement('li');
        const was = document.createElement('span');
        was.textContent = e.laenge ? `${e.name} (${e.laenge})` : e.name;
        const preis = document.createElement('span');
        preis.textContent = `${e.preis} €`;
        li.append(was, preis);
        stueck.append(li);
        summe += Number(e.preis) || 0;
      }
      liste.replaceChildren(stueck);
      const fuss = document.createElement('li');
      fuss.className = 'summe';
      const wort = document.createElement('span'); wort.textContent = 'Zusammen etwa';
      const zahl = document.createElement('span'); zahl.textContent = `${summe} €`;
      fuss.append(wort, zahl);
      liste.append(fuss);
      mitgebracht.hidden = false;
    }
  }

  /* ── Öffnungszeiten: heute hervorheben, offen oder zu sagen ────────────
     Gerechnet wird in der Zeitzone des Ladens, nicht in der des Besuchers.  */

  const ZEITEN = [
    null,                    // Sonntag
    [10 * 60, 16 * 60],      // Montag
    [9 * 60, 19 * 60], [9 * 60, 19 * 60], [9 * 60, 19 * 60], [9 * 60, 19 * 60],
    [9 * 60, 16 * 60],       // Samstag
  ];
  const TAGE = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];

  const jetztInMuenchen = () => {
    const f = new Intl.DateTimeFormat('de-DE', {
      timeZone: 'Europe/Berlin', weekday: 'short', hour: '2-digit', minute: '2-digit', hour12: false,
    }).formatToParts(new Date());
    const teil = (t) => f.find((p) => p.type === t)?.value || '';
    const kurz = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];
    const tag = kurz.indexOf(teil('weekday').replace('.', '').slice(0, 2));
    return { tag: tag < 0 ? new Date().getDay() : tag, minute: Number(teil('hour')) * 60 + Number(teil('minute')) };
  };

  const zeitenlisten = $$('.zeiten');
  const stand = $$('.oeffnungsstand');
  if (zeitenlisten.length || stand.length) {
    const { tag, minute } = jetztInMuenchen();

    zeitenlisten.forEach((ul) => {
      $$('li', ul).forEach((li) => {
        const tage = (li.dataset.tage || '').split(',').map(Number);
        li.classList.toggle('heute', tage.includes(tag));
      });
    });

    const heute = ZEITEN[tag];
    let text, offen = false;
    if (heute && minute >= heute[0] && minute < heute[1]) {
      offen = true;
      text = `Jetzt geöffnet · bis ${String(Math.floor(heute[1] / 60)).padStart(2, '0')}:${String(heute[1] % 60).padStart(2, '0')} Uhr`;
    } else {
      // Nächsten Öffnungstag suchen — heute noch, sonst der nächste Tag.
      let versatz = (heute && minute < heute[0]) ? 0 : 1;
      while (versatz < 8 && !ZEITEN[(tag + versatz) % 7]) versatz++;
      const z = ZEITEN[(tag + versatz) % 7];
      const uhr = z ? `${String(Math.floor(z[0] / 60)).padStart(2, '0')}:${String(z[0] % 60).padStart(2, '0')}` : '';
      const wann = versatz === 0 ? 'heute' : versatz === 1 ? 'morgen' : `am ${TAGE[(tag + versatz) % 7]}`;
      text = z ? `Gerade geschlossen · öffnet ${wann} um ${uhr} Uhr` : 'Gerade geschlossen';
    }
    stand.forEach((el) => {
      el.textContent = text;
      el.dataset.offen = String(offen);
    });
  }

  /* ── Buchung: erst nach Zustimmung laden ──────────────────────────────
     Das Salonized-Fenster zieht Google Analytics, Tag Manager, Mixpanel,
     DoubleClick, Intercom und Datadog mit. Solange niemand darauf getippt
     hat, geht kein Datum dorthin.                                         */

  const buchung = $('.buchung');
  if (buchung) {
    $('.buchung-laden', buchung)?.addEventListener('click', () => {
      const rahmen = document.createElement('iframe');
      rahmen.src = buchung.dataset.quelle;
      rahmen.title = 'Online-Terminbuchung von Salonized';
      rahmen.loading = 'lazy';
      rahmen.referrerPolicy = 'no-referrer-when-downgrade';
      buchung.replaceChildren(rahmen);
    });
  }

  /* ── Die Stimmungswahl ────────────────────────────────────────────────
     Drei Paletten, alle aus dem eigenen Material gemessen. Gewechselt wird
     ein Attribut am <html>, mehr nicht — die Farben selbst stehen in
     stil.css. Die Wahl bleibt im Browser der Besucherin und verlässt ihn
     nicht; im Kopf jeder Seite steht ein winziges Skript, das sie noch vor
     dem ersten Bild setzt, sonst blitzt beim Seitenwechsel Messing auf.

     Der Wechsel läuft über die View-Transition, wo der Browser sie kann:
     ein einziger Schnitt über die ganze Seite ist ruhiger als hundert
     einzeln überblendende Farben — und billiger, weil der Browser zwei
     Standbilder überblendet statt jede Fläche neu zu zeichnen.            */

  const stimmungen = $$('.stimmung');
  if (stimmungen.length) {
    const FARBE = { nacht: '#140b06', tag: '#faf6f0', asche: '#f4f7fa', rose: '#fcf5f3' };

    const anzeigen = (name) => {
      stimmungen.forEach((k) => {
        k.setAttribute('aria-pressed', String(k.dataset.stimmung === name));
      });
    };

    const setzen = (name, weich) => {
      const tun = () => {
        if (name === 'nacht') delete document.documentElement.dataset.palette;
        else document.documentElement.dataset.palette = name;
        $('meta[name=theme-color]')?.setAttribute('content', FARBE[name]);
        anzeigen(name);
      };
      if (weich && !ruhig() && document.startViewTransition) document.startViewTransition(tun);
      else tun();
      try { localStorage.setItem('bahaar-stimmung', name); } catch (e) { /* privater Modus */ }
    };

    anzeigen(document.documentElement.dataset.palette || 'nacht');
    stimmungen.forEach((k) => {
      k.addEventListener('click', () => setzen(k.dataset.stimmung, true));
    });
  }

  /* ── Jahreszahl im Fuß ─────────────────────────────────────────────── */

  $$('.jahr').forEach((el) => { el.textContent = String(new Date().getFullYear()); });
})();
