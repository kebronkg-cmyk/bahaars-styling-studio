# Baut die Fassung „Himmel" für BaHaar's Styling Studio.
# Aufruf: python3 bau.py <zielordner> <preise.json>
import sys, json, html, random
sys.path.insert(0, '.')

Z = sys.argv[1]
PREISE = json.load(open(sys.argv[2], encoding='utf8'))
TW = 'https://www.treatwell.de/ort/bahaars-styling-studio/'
TEL = 'tel:+49896923644'
TEL_ZEIGE = '089&nbsp;692&nbsp;36&nbsp;44'
ROUTE = 'https://www.google.com/maps/search/?api=1&amp;query=Perlacher+Stra%C3%9Fe+2%2C+81539+M%C3%BCnchen'
GOOGLE = 'https://www.google.com/search?q=BaHaar%27s+Styling+Studio+Perlacher+Stra%C3%9Fe+2+81539+M%C3%BCnchen'
e = lambda s: html.escape(s, quote=False).replace(' ', '&nbsp;')

# ── Der Orchideenbusch ───────────────────────────────────────────────
# Echte Aufnahmen blauer Orchideen (Pixabay), freigestellt und auf einen
# Blauton gebracht (veredeln.py). Nichts davon wird grösser gezeigt, als
# es aufgenommen wurde. Beim Laden kommen die Rispen aus der Unschärfe,
# beim Scrollen öffnet sich der Busch über den Abzügen.
def blume(klasse, name, w, h, prio=False):
    p = ' fetchpriority="high"' if prio else ''
    return f'<img class="blume {klasse}" src="bilder/orchidee-{name}.webp" alt="" width="{w}" height="{h}" decoding="async"{p} aria-hidden="true">'

# Die Orchidee am Kontakt: offen, wenn der Salon offen ist, sonst Knospe.
def kontakt_bluete():
    return ('<span class="stand-bluete" aria-hidden="true">'
            '<img class="sb-knospe" src="bilder/orchidee-knospe.webp" alt="" width="87" height="77" loading="lazy">'
            '<img class="sb-bluete" src="bilder/orchidee-bluete.webp" alt="" width="408" height="486" loading="lazy">'
            '</span>')

STERN = '<svg viewBox="0 0 20 19" aria-hidden="true" focusable="false"><path d="M10 0l2.47 6.18 6.65.4-5.12 4.26 1.66 6.46L10 13.7l-5.66 3.6 1.66-6.46L.88 6.58l6.65-.4z"/></svg>'

def kopf(titel, beschreibung, aktiv=''):
    def a(href, text, key):
        cur = ' aria-current="page"' if key == aktiv else ''
        return f'<a href="{href}"{cur}>{text}</a>'
    start = '' if aktiv == 'start' else 'index.html'
    return f'''<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="utf-8">
<meta name="robots" content="noindex">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{titel}</title>
<meta name="description" content="{beschreibung}">
<link rel="icon" href="logo-favicon.svg" type="image/svg+xml">
<link rel="preload" href="schrift/WorkSans.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="himmel.css">
<script>document.documentElement.classList.add('js')</script>
</head>
<body>
<a class="sprung" href="#inhalt">Zum Inhalt springen</a>
<header class="leiste" id="leiste">
  <a class="marke" href="index.html" aria-label="BaHaar&rsquo;s Styling Studio, zur Startseite">
    <img src="logo-zeichen.svg" alt="" width="28" height="28">
    <span>BaHaar&rsquo;s</span>
  </a>
  <nav class="wege" aria-label="Hauptmen&uuml;">
    {a(start + '#preise', 'Preise', 'p')}
    {a(start + '#arbeiten', 'Arbeiten', 'a')}
    {a(start + '#braut', 'Braut', 'b')}
    {a(start + '#kontakt', 'Kontakt', 'k')}
  </nav>
  <a class="leiste-tel" href="{TEL}">{TEL_ZEIGE}</a>
  <a class="knopf knopf-klein" href="{TW}" target="_blank" rel="noopener">Termin buchen</a>
</header>
'''

FUSS = f'''<footer class="fuss">
  <div class="fuss-spalten">
    <div>
      <p class="fuss-erst">Perlacher Stra&szlig;e 2</p>
      <p>81539 M&uuml;nchen-Giesing</p>
      <p><a href="{ROUTE}" target="_blank" rel="noopener">Route planen</a></p>
    </div>
    <div>
      <p class="fuss-erst">Montag 10&ndash;16 Uhr</p>
      <p>Dienstag bis Freitag 9&ndash;19 Uhr</p>
      <p>Samstag 9&ndash;16 Uhr</p>
    </div>
    <div>
      <p class="fuss-erst"><a href="{TEL}">{TEL_ZEIGE}</a></p>
      <p><a href="{TW}" target="_blank" rel="noopener">Termin bei Treatwell</a></p>
      <p><a href="https://www.instagram.com/bahaarsstylingstudio" target="_blank" rel="noopener">@bahaarsstylingstudio</a></p>
    </div>
    <div>
      <p class="fuss-erst"><a href="index.html#preise">Preise</a></p>
      <p><a href="impressum.html">Impressum</a></p>
      <p><a href="datenschutz.html">Datenschutz</a></p>
    </div>
  </div>
  <div class="fuss-wort" aria-hidden="true">
    <img src="logo-siegel-hell.svg" alt="" width="200" height="200" loading="lazy">
    <span>BaHaar&rsquo;s</span>
  </div>
  <p class="fuss-recht">&copy; 2026 BaHaar&rsquo;s Styling Studio &middot; Friseurmeisterin in M&uuml;nchen-Giesing &middot; Orchideen-Fotos: Pixabay &middot; Seide und Str&auml;hnen gerechnet</p>
</footer>
<script src="himmel.js" defer></script>
</body>
</html>
'''

# ── Arbeiten: Bild, Name, eine Angabe aus der Preisliste ─────────────
REIHE = [
    ('arbeit-balayage', 1000, 1333, 'Balayage', '190&ndash;230&nbsp;&euro;', 'Lange Haare mit Balayage, von hinten', True),
    ('arbeit-locken', 1000, 1333, 'Locken', 'F&ouml;hnen ab 30&nbsp;&euro;', 'Blonde Locken, gef&ouml;hnt', False),
    ('arbeit-glatt', 1000, 1195, 'Lang und glatt', 'Schnitt ab 45&nbsp;&euro;', 'Lange glatte Haare mit Stufen', False),
    ('arbeit-straehnen', 1000, 1339, 'Str&auml;hnen', 'ab 69&nbsp;&euro;', 'Str&auml;hnen in mittellangem Haar', False),
    ('arbeit-bob', 1000, 1333, 'Bob', 'Schnitt &amp; F&ouml;hnen ab 59&nbsp;&euro;', 'Kurzer blonder Bob mit Locken', False),
    ('arbeit-flecht', 1000, 1000, 'Geflochten', 'f&uuml;r Anl&auml;sse', 'Eingeflochtene Z&ouml;pfe am Oberkopf', False),
    ('arbeit-kind', 1000, 1333, 'Kinder', 'Jungen 25&nbsp;&euro;', 'Kinderhaarschnitt, Junge', False),
]

def reihe():
    out = []
    for name, w, h, titel, angabe, alt, gehoben in REIHE:
        k = ' gehoben' if gehoben else ''
        out.append(f'''      <figure class="abzug{k}">
        <img src="bilder/{name}.webp" alt="{alt}" width="{w}" height="{h}" loading="lazy" decoding="async">
        <figcaption><span>{titel}</span><span>{angabe}</span></figcaption>
      </figure>''')
    return '\n'.join(out)

def karte():
    spalten = []
    for g in PREISE:
        zeilen = []
        zwei = bool(g['spalten'][1])
        for name, zusatz, p1, p2 in g['posten']:
            preis = e(p1) if not p2 else f'{e(p1).replace("&nbsp;€","")} / {e(p2)}'
            z = f'<em>{e(zusatz)}</em>' if zusatz else ''
            zeilen.append(f'<li><span class="posten">{e(name)}{z}</span><span class="preis">{preis}</span></li>')
        hinweis = f'<p class="gruppe-hinweis">{e(g["spalten"][0])} / {e(g["spalten"][1])}</p>' if zwei else ''
        spalten.append(f'''      <section class="gruppe" aria-labelledby="g-{g["id"]}">
        <h3 id="g-{g["id"]}">{e(g["name"])}</h3>{hinweis}
        <ul>{"".join(zeilen)}</ul>
      </section>''')
    return '\n'.join(spalten)

STIMMEN = [
    ('Lechner', '21. Juli 2026', '2026-07-21', '[&hellip;] Wurde &uuml;berzeugt mutiger zu Ver&auml;nderungen - passend zu meinem Typ - zu sein und mich &uuml;berraschen zu lassen. Habe es nicht bereut.'),
    ('Maria', '6. September 2026', '2026-09-06', 'Termin online, netter Empfang, sch&ouml;ne Hochsteckfrisur und Kaffee gratis. Top!'),
    ('Johanna', '27. Juli 2026', '2026-07-27', '[&hellip;] Ich hab zwischendurch auch andere Friseurinnen ausprobiert, aber zu diesem gehe ich doch am Liebsten.'),
    ('Julius', '24. August 2026', '2026-08-24', 'Heute bei Maria, hat genau so geschnitten wie ich wollte, alles super!'),
]

def ecken():
    out = []
    for i, (wer, wann, iso, text) in enumerate(STIMMEN):
        out.append(f'''    <figure class="glas ecke ecke-{i+1}">
      <blockquote><p>&bdquo;{text}&ldquo;</p></blockquote>
      <figcaption><span class="sterne" role="img" aria-label="5 von 5 Sternen">{STERN*5}</span><span>{wer} &middot; <time datetime="{iso}">{wann}</time> &middot; Treatwell</span></figcaption>
    </figure>''')
    return '\n'.join(out)

INDEX = kopf('BaHaar&rsquo;s Styling Studio &mdash; Friseurmeisterin in M&uuml;nchen-Giesing',
             'Friseursalon an der Perlacher Stra&szlig;e 2 in M&uuml;nchen-Giesing. Bahar ist Friseurmeisterin und arbeitet seit zwanzig Jahren in M&uuml;nchen. Schnitt, Farbe, Str&auml;hnen, Brautstyling &mdash; mit und ohne Termin. Telefon 089 692 36 44.',
             'start') + f'''
<main id="inhalt">

<!-- ══ Auftakt ═══════════════════════════════════════════════════════════
     „Bahār" heisst Frühling. Ein Busch blauer Orchideen steht um einen
     Abzug echter Arbeit. Die Bühne bleibt stehen, während man scrollt,
     und der Busch öffnet sich: die Rispen weichen zur Seite, die nächste
     Blüte zieht an der Kamera vorbei, der Abzug tritt vor.              -->
<section class="auftakt" id="auftakt">
 <div class="buehne">
  {blume('b-krone', 'strauss', 731, 488, True)}
  <figure class="abzug-gross">
    <img src="bilder/arbeit-braut-perlen.webp" alt="Brautfrisur: gelockte Hochsteckfrisur mit Perlenranke" width="899" height="1750" fetchpriority="high" decoding="async">
  </figure>
  {blume('b-links', 'rispe', 982, 1369, True)}
  {blume('b-rechts', 'bogen', 1000, 455)}
  {blume('b-zweig', 'zweig', 552, 401)}
  {blume('b-nah', 'rispe', 982, 1369)}
  <h1 class="auftakt-titel">Bahar hei&szlig;t<br>Fr&uuml;hling.</h1>
  <div class="auftakt-satz">
    <p><strong class="auftakt-ort">Ihr Salon in Giesing.</strong> Friseurmeisterin, seit zwanzig Jahren in M&uuml;nchen. Schnitt, Farbe, Str&auml;hnen und Brautstyling &mdash; mit und ohne Termin.</p>
    <p class="glas glas-chip"><span class="stand" data-stand></span></p>
  </div>
 </div>
</section>

<!-- ══ Arbeiten ══════════════════════════════════════════════════════════
     Eine Reihe Abzüge auf einer Höhe, einer gehoben. Unter jedem Bild der
     Name und eine Angabe aus der Preisliste.                            -->
<section class="arbeiten" id="arbeiten">
  <div class="arbeiten-kopf">
    <h2>Aus dem Salon</h2>
    <p>Aufnahmen aus der Perlacher Stra&szlig;e. Keine Katalogbilder &mdash; im Hintergrund steht der Laden, in dem sie entstanden sind.</p>
    <p class="arbeiten-notiz">Balayage ist hier die gefragteste Technik: das Licht kommt aus den Spitzen, nicht vom Ansatz.</p>
  </div>
  <div class="reihe">
{reihe()}
  </div>
</section>

<!-- ══ Preise ════════════════════════════════════════════════════════════
     Gesetzt wie eine gute Speisekarte: vollständig, Name links, Preis
     rechts, nur Luft dazwischen. Wo zwei Preise stehen, gilt der erste
     für kurzes und mittleres, der zweite für langes Haar.               -->
<section class="preise" id="preise">
  <div class="preise-kopf">
    <h2>Was es kostet</h2>
    <p>Spannen statt Festpreise, weil L&auml;nge und Aufwand z&auml;hlen. Beratung und Kopfhautanalyse geh&ouml;ren zu jeder Farbe dazu.</p>
    <a class="knopf" href="{TW}" target="_blank" rel="noopener">Termin buchen</a>
  </div>
  <div class="karte">
{karte()}
  </div>
</section>

<!-- ══ Braut ═════════════════════════════════════════════════════════════
     Drei Brautarbeiten, lose gesetzt, mit Luft dazwischen.             -->
<section class="braut" id="braut">
  <h2>Brautstyling</h2>
  <figure class="lose lose-1">
    <figcaption class="lose-name">Perlenranke</figcaption>
    <img src="bilder/arbeit-braut-perlen.webp" alt="Gelockte Brautfrisur mit Perlenranke" width="899" height="1750" loading="lazy" decoding="async">
    <figcaption class="lose-satz">Locken, von Hand gelegt, eine Ranke aus Perlen hindurch.</figcaption>
  </figure>
  <figure class="lose lose-2">
    <figcaption class="lose-name">Mit Schleier</figcaption>
    <img src="bilder/arbeit-braut-schleier.webp" alt="Brautfrisur mit Schleier" width="550" height="977" loading="lazy" decoding="async">
    <figcaption class="lose-satz">Der Schleier sitzt, wo die Frisur ihn tr&auml;gt.</figcaption>
  </figure>
  <p class="braut-satz">Haar und Make-up aus einer Hand: ein Termin, eine Person, 390 bis 600&nbsp;&euro; gesamt.</p>
  <figure class="lose lose-3">
    <figcaption class="lose-name">Hochgesteckt</figcaption>
    <img class="lose-bluete" src="bilder/orchidee-bluete.webp" alt="" width="408" height="486" loading="lazy" decoding="async" aria-hidden="true">
    <img src="bilder/arbeit-braut.webp" alt="Hochsteckfrisur mit Perlenranke im gelockten Haar" width="898" height="1198" loading="lazy" decoding="async">
    <figcaption class="lose-satz">Niemand sieht das fertige Bild zum ersten Mal am Hochzeitsmorgen.</figcaption>
  </figure>
  <p class="braut-knopf"><a class="knopf" href="{TW}" target="_blank" rel="noopener">Probetermin buchen</a></p>
</section>

<!-- ══ Stimmen ═══════════════════════════════════════════════════════════
     Ein Feld aus schimmernden Strähnen. Die Hauptstimme gross in der
     Mitte, vier weitere als Glastafeln in den Ecken. Alles wörtlich aus
     dem Treatwell-Eintrag; Kürzungen ohne Umformulierung.               -->
<section class="stimmen" id="stimmen" aria-labelledby="stimmen-titel">
  <h2 class="nurlesen" id="stimmen-titel">Bewertungen</h2>
  <figure class="stimme-haupt">
    <blockquote><p>&bdquo;Eine Friseurin mit viel K&ouml;nnen und einem guten Gef&uuml;hl, welcher Schnitt zu einem passt.&ldquo;</p></blockquote>
    <figcaption>Horst &middot; <time datetime="2026-09-02">2. September 2026</time> &middot; 4,8 von 5 aus &uuml;ber 90 Bewertungen bei Treatwell</figcaption>
  </figure>
{ecken()}
  <p class="stimmen-wege"><a class="knopf knopf-glas" href="{TW}" target="_blank" rel="noopener">Alle Bewertungen lesen</a> <a class="verweis" href="{GOOGLE}" target="_blank" rel="noopener">Selbst eine schreiben</a></p>
</section>

<!-- ══ Der Laden ═════════════════════════════════════════════════════════ -->
<section class="laden" id="laden">
  <h2>Perlacher Stra&szlig;e&nbsp;2</h2>
  <p class="laden-lead">Ein inhabergef&uuml;hrter Salon in Giesing. Kein Kettenbetrieb, keine Nummer, die aufgerufen wird &mdash; wer hier schneidet, steht auch morgen wieder da.</p>
  <div class="laden-mosaik">
    <figure class="laden-bild">
      <img src="bilder/laden-front.webp" alt="Der Eingang an der Perlacher Stra&szlig;e mit dem t&uuml;rkisen Schild" width="830" height="548" loading="lazy" decoding="async">
      <p class="laden-papier">Das t&uuml;rkise Schild &uuml;ber der T&uuml;r hat den Ton dieser Seite vorgegeben. Drinnen: zwei Pl&auml;tze, ein Waschplatz, und an guten Tagen ein freier Stuhl ohne Termin.</p>
    </figure>
    <div class="laden-kachel">
      <img src="logo-siegel-hell.svg" alt="" width="200" height="200" loading="lazy">
    </div>
  </div>
  <blockquote class="spruch"><p>Sch&ouml;nheit beginnt in dem Moment, in dem du beschlie&szlig;t, du selbst zu sein.</p><footer>Coco Chanel</footer></blockquote>
</section>

<!-- ══ Kontakt ═══════════════════════════════════════════════════════════
     Ein Satz, ein Bild, zwei Wege. Die Orchidee daneben ist offen, wenn
     der Salon offen ist, und eine Knospe, wenn er zu hat.               -->
<section class="kontakt" id="kontakt">
  <p class="kontakt-satz">Termine bei Treatwell, rund um die Uhr &mdash; oder Sie rufen an und sprechen mit Bahar.</p>
  <figure class="kontakt-bild">
    <img src="bilder/laden-raum.webp" alt="Blick in den Salon" width="1170" height="548" loading="lazy" decoding="async">
  </figure>
  <div class="kontakt-wege">
    <div class="kontakt-stand">
      {kontakt_bluete()}
      <p><strong class="stand" data-stand></strong></p>
    </div>
    <p class="kontakt-frage">Lieber gleich?</p>
    <p><a class="verweis" href="{TEL}">{TEL_ZEIGE}</a></p>
    <p><a class="verweis" href="{TW}" target="_blank" rel="noopener">Termin bei Treatwell</a></p>
    <p class="kontakt-ort">Perlacher Stra&szlig;e 2, 81539 M&uuml;nchen &middot; <a href="{ROUTE}" target="_blank" rel="noopener">Route</a></p>
    <dl class="zeiten">
      <div><dt>Montag</dt><dd>10:00&ndash;16:00</dd></div>
      <div><dt>Dienstag&ndash;Freitag</dt><dd>09:00&ndash;19:00</dd></div>
      <div><dt>Samstag</dt><dd>09:00&ndash;16:00</dd></div>
      <div><dt>Sonntag</dt><dd>geschlossen</dd></div>
    </dl>
  </div>
</section>

</main>

''' + FUSS
open(f'{Z}/index.html', 'w', encoding='utf8').write(INDEX)

# ── Rechtsseiten: Inhalt aus der vorigen Fassung, Rahmen neu ─────────
import re
for seite, titel in (('impressum', 'Impressum'), ('datenschutz', 'Datenschutz')):
    alt = open(f'{Z}/../hell-3/{seite}.html', encoding='utf8').read()
    inhalt = re.search(r'<main class="recht">\s*<div class="mitte">(.*?)</div>\s*</main>', alt, re.S).group(1)
    inhalt = re.sub(r'<h1 class="riesen" id="titel">', '<h1 id="titel">', inhalt)
    seiten = kopf(f'{titel} &mdash; BaHaar&rsquo;s Styling Studio', f'{titel} von BaHaar&rsquo;s Styling Studio, M&uuml;nchen-Giesing.') \
        + f'<main id="inhalt" class="recht">{inhalt}</main>\n' + FUSS
    seiten = seiten.replace('href="#titel"', 'href="#inhalt"')
    open(f'{Z}/{seite}.html', 'w', encoding='utf8').write(seiten)
print('gebaut')
