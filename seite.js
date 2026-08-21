/* ═══════════════════════════════════════════════════════════════════════
   BaHaar's Styling Studio — Verhalten

   Kein Fremdcode, kein Nachladen, nichts, was nach außen telefoniert.
   Jeder Teil prüft erst, ob es sein Element auf dieser Seite überhaupt gibt,
   und hält sonst still — dieselbe Datei läuft auf allen Seiten.
   ═══════════════════════════════════════════════════════════════════════ */

(() => {
  'use strict';

  // Marke am <html>. Erst damit greifen die Einblendungen — ohne Skript
  // bleibt jeder Abschnitt sichtbar, statt auf ein Ereignis zu warten,
  // das nie kommt.
  document.documentElement.classList.add('mitskript');

  const $  = (w, in_ = document) => in_.querySelector(w);
  const $$ = (w, in_ = document) => [...in_.querySelectorAll(w)];
  const ruhig = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── Kopfzeile ────────────────────────────────────────────────────────
     Hysterese von 6 px: ohne sie flackert der Umschalter genau dann, wenn
     das sanfte Scrollen um den Schwellwert herum ausläuft.                */

  const kopfzeile = $('.kopfzeile');
  if (kopfzeile) {
    const AN = 26, AUS = 20;                 // 6 px Abstand dazwischen
    let gesetzt = false;
    const pruefen = () => {
      const y = window.scrollY;
      if (!gesetzt && y > AN) { gesetzt = true;  kopfzeile.classList.add('gesetzt'); }
      else if (gesetzt && y < AUS) { gesetzt = false; kopfzeile.classList.remove('gesetzt'); }
    };
    addEventListener('scroll', pruefen, { passive: true });
    pruefen();
  }

  /* ── Handymenü ─────────────────────────────────────────────────────── */

  const menuknopf = $('.menuknopf');
  const wegweiser = $('.wegweiser');
  if (menuknopf && wegweiser) {
    const zu = () => { menuknopf.setAttribute('aria-expanded', 'false'); wegweiser.classList.remove('offen'); };
    menuknopf.addEventListener('click', () => {
      const offen = menuknopf.getAttribute('aria-expanded') === 'true';
      menuknopf.setAttribute('aria-expanded', String(!offen));
      wegweiser.classList.toggle('offen', !offen);
    });
    $$('a', wegweiser).forEach((a) => a.addEventListener('click', zu));
    addEventListener('keydown', (e) => { if (e.key === 'Escape') zu(); });
  }

  /* ── Auftauchen beim Scrollen ──────────────────────────────────────────
     Bewusst über die gemessene Position statt über einen Beobachter. Ein
     IntersectionObserver hat einen Zustand, in dem er nie auslöst — etwa
     wenn die Seite in voller Höhe auf einmal gerendert wird oder direkt an
     einen Anker gesprungen wird. Dann bliebe der Abschnitt für immer auf
     Deckkraft 0, und aus einer Einblendung würde verschwundener Inhalt.

     Die Prüfung hier kennt diesen Zustand nicht: Sie läuft beim Start, bei
     jedem Scrollen, bei jeder Größenänderung und ein letztes Mal nach dem
     vollständigen Laden. Fertige Elemente fallen aus der Liste, am Ende
     kostet sie nichts mehr.                                               */

  const auftauchen = $$('.auf');
  if (auftauchen.length) {
    if (ruhig()) {
      auftauchen.forEach((el) => el.classList.add('da'));
    } else {
      let offen = auftauchen.slice();
      let geplant = false;

      const zeigen = (el, verzug) => {
        if (verzug) setTimeout(() => el.classList.add('da'), verzug);
        else el.classList.add('da');
      };

      const pruefen = () => {
        geplant = false;
        if (!offen.length) return;
        const grenze = window.innerHeight * 0.92;
        const bleibt = [];
        for (const el of offen) {
          const k = el.getBoundingClientRect();
          // Alles, was im Bild ist oder schon darüber liegt, wird gezeigt.
          if (k.top < grenze) zeigen(el, Number(el.dataset.verzug || 0));
          else bleibt.push(el);
        }
        offen = bleibt;
        if (!offen.length) abmelden();
      };

      const anstossen = () => {
        if (geplant) return;
        geplant = true;
        requestAnimationFrame(pruefen);
      };

      let gescrollt = false;
      const beiScroll = () => { gescrollt = true; anstossen(); };
      const abmelden = () => {
        removeEventListener('scroll', beiScroll);
        removeEventListener('resize', anstossen);
      };
      const alleZeigen = () => {
        offen.forEach((el) => el.classList.add('da'));
        offen = [];
        abmelden();
      };

      addEventListener('scroll', beiScroll, { passive: true });
      addEventListener('resize', anstossen, { passive: true });
      pruefen();
      // Nach dem vollständigen Laden noch einmal: bis dahin haben Bilder und
      // Schriften das Layout verschoben.
      addEventListener('load', anstossen);
      setTimeout(anstossen, 400);

      /* Wer nach drei Sekunden noch nicht gescrollt hat, sieht ohnehin nur
         den ersten Bildschirm — für den kostet es nichts, den Rest der Seite
         einzublenden. Wer gar nicht scrollen kann, gewinnt dabei alles:
         Ganzseiten-Aufnahmen, Druckansichten und Lesemodi holen sich die
         Seite in einem Zug und würden sonst leere Abschnitte abbilden. */
      setTimeout(() => { if (!gescrollt) alleZeigen(); }, 3000);
      addEventListener('beforeprint', alleZeigen);
    }
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

  /* ── Der Farbfächer ────────────────────────────────────────────────────
     Acht Blätter an einer Niete. Sie liegen geschlossen aufeinander und
     fächern auf, sobald der Abschnitt ins Bild kommt — das ist, was ein
     Fächer in echt tut, und es passiert genau einmal.

     Bedienung nach dem Reitermuster: Pfeiltasten wandern, Pos1 und Ende
     springen an die Enden, immer nur das gewählte Blatt liegt im Tabstopp. */

  const faecher = $('.faecher');
  if (faecher) {
    const blaetter = $$('.blatt-karte', faecher);
    const halter   = $$('.blatt-halter', faecher);
    const tafel    = $('.faecher-tafel');
    const felder   = tafel ? $$('[role="tabpanel"]', tafel) : [];

    /* Aufgefächert wird über den Winkel je Blatt. Wie weit der Fächer
       aufgeht, steht im Stylesheet (--spanne) und nicht hier: am schmalen
       Schirm muss er enger stehen, sonst läuft er über den Rand. Deshalb
       wird der Wert gelesen und bei jeder Größenänderung neu gerechnet. */
    const auffaechern = () => {
      const spanne = Number(getComputedStyle(faecher).getPropertyValue('--spanne')) || 112;
      const schritt = blaetter.length > 1 ? spanne / (blaetter.length - 1) : 0;
      halter.forEach((h, i) => {
        h.style.setProperty('--winkel', `${(-spanne / 2 + i * schritt).toFixed(2)}deg`);
        h.style.transitionDelay = ruhig() ? '0ms' : `${i * 45}ms`;
      });
    };
    auffaechern();
    let umbau;
    addEventListener('resize', () => { clearTimeout(umbau); umbau = setTimeout(auffaechern, 150); });

    const tafelbild = $('#tafelbild');

    const waehlen = (i, fokus = true) => {
      halter.forEach((h, k) => h.dataset.gewaehlt = String(k === i));
      blaetter.forEach((b, k) => {
        b.setAttribute('aria-selected', String(k === i));
        b.tabIndex = k === i ? 0 : -1;
      });
      felder.forEach((f) => { f.hidden = f.id !== blaetter[i].getAttribute('aria-controls'); });

      // Die Tafel zeigt die Arbeit, aus der die Farbe dieses Blattes stammt.
      const b = blaetter[i];
      if (tafelbild && b.dataset.bild) {
        tafelbild.src = b.dataset.bild;
        tafelbild.alt = b.dataset.alt || '';
      }
      if (tafel) {
        const h = halter[i];
        tafel.style.setProperty('--ton-oben',  h.style.getPropertyValue('--ton-oben'));
        tafel.style.setProperty('--ton-unten', h.style.getPropertyValue('--ton-unten'));
      }
      if (fokus) b.focus();
    };

    blaetter.forEach((b, i) => {
      b.addEventListener('click', () => waehlen(i, false));
      b.addEventListener('keydown', (e) => {
        const zug = { ArrowLeft: -1, ArrowUp: -1, ArrowRight: 1, ArrowDown: 1 }[e.key];
        if (zug) { e.preventDefault(); waehlen((i + zug + blaetter.length) % blaetter.length); }
        else if (e.key === 'Home') { e.preventDefault(); waehlen(0); }
        else if (e.key === 'End')  { e.preventDefault(); waehlen(blaetter.length - 1); }
      });
    });

    const oeffnen = () => faecher.classList.add('offen');
    if (ruhig() || !('IntersectionObserver' in window)) oeffnen();
    else {
      const b = new IntersectionObserver((e) => {
        if (e[0].isIntersecting) { oeffnen(); b.disconnect(); }
      }, { threshold: 0.3 });
      b.observe(faecher);
    }
  }

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
    const marken = $$('a[href^="#"]', navigator_);
    const ziele = marken.map((a) => document.getElementById(a.getAttribute('href').slice(1))).filter(Boolean);
    if (ziele.length && 'IntersectionObserver' in window) {
      const sichtbar = new Set();
      const b = new IntersectionObserver((eintraege) => {
        eintraege.forEach((e) => e.isIntersecting ? sichtbar.add(e.target) : sichtbar.delete(e.target));
        const oben = ziele.find((z) => sichtbar.has(z));
        marken.forEach((a, i) => a.setAttribute('aria-current', String(ziele[i] === oben)));
        const treffer = marken.find((a) => a.getAttribute('aria-current') === 'true');
        // Der Navigator scrollt die aktive Marke in sein Sichtfeld.
        if (treffer) treffer.scrollIntoView({ inline: 'nearest', block: 'nearest', behavior: ruhig() ? 'auto' : 'smooth' });
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
    const liste  = $('ul', merkzettel);
    const zahl   = $('.merkzettel-zahl', merkzettel);
    const summe  = $('.summe', merkzettel);
    const kopf   = $('.merkzettel-text .kopf', merkzettel);
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
      merkzettel.classList.toggle('da', gemerkt.length > 0);
      zahl.textContent = gemerkt.length;
      kopf.textContent = gemerkt.length === 1 ? 'Eine Leistung gemerkt' : `${gemerkt.length} Leistungen gemerkt`;

      const preis = gemerkt.reduce((a, e) => a + untergrenze(e.preis), 0);
      const min   = gemerkt.reduce((a, e) => a + dauerMinuten(e.dauer), 0);
      const spanne = gemerkt.some((e) => istSpanne(e.preis));
      const teile = [];
      if (preis) teile.push(`${spanne ? 'ab ' : 'etwa '}${preis} €`);
      if (min)   teile.push(`ungefähr ${alsDauer(min)}`);
      summe.textContent = teile.join(' · ');

      // Der Riegel klebt unten am Bild — die Fußzeile braucht so viel Platz
      // darunter, wie er hoch ist, sonst verdeckt er sie.
      document.body.style.paddingBottom = gemerkt.length ? `${merkzettel.offsetHeight}px` : '';

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
        else gemerkt.push({
          name: b.dataset.name, laenge: b.dataset.laenge || '',
          preis: b.dataset.preis, dauer: b.dataset.dauer || '',
        });
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

    $('.merkzettel-mail', merkzettel)?.addEventListener('click', (e) => {
      e.currentTarget.href = 'mailto:info@bahaarsstylingstudio.de'
        + '?subject=' + encodeURIComponent('Terminanfrage')
        + '&body=' + encodeURIComponent(alsText());
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

  /* ── Jahreszahl im Fuß ─────────────────────────────────────────────── */

  $$('.jahr').forEach((el) => { el.textContent = String(new Date().getFullYear()); });
})();
