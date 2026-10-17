# Bringt die freigestellten Orchideen auf einen gemeinsamen Blauton,
# säubert die hellen Säume vom alten Hintergrund und läuft die geraden
# Schnittkanten weich aus. Nichts wird vergrössert.
import sys
import numpy as np
from PIL import Image, ImageFilter
from scipy.ndimage import gaussian_filter
import os; sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from ok import rgb2oklab, oklab2rgb, lch

ZIEL_H, STAUCH, ZIEL_C = 261.0, .6, .148
src, dst = sys.argv[1], sys.argv[2]

def weich(a, k):
    return gaussian_filter(a.astype(np.float32), k)

def saum(rgb, al):
    """Randfarben aus dem Inneren nachziehen statt vom hellen Grund."""
    innen = (al > .97).astype(np.float32)
    out = rgb.copy()
    for k in (2, 5, 12):
        w = weich(innen, k)
        c = np.stack([weich(rgb[..., i] * innen, k) for i in range(3)], -1) / np.maximum(w, 1e-4)[..., None]
        rand = (al <= .97) & (w > .02)
        out[rand] = c[rand]
        innen = np.maximum(innen, (w > .02).astype(np.float32))
    return out

def blau(rgb, al):
    lab = rgb2oklab(rgb)
    L, C, H = lch(lab)
    m = (al > .5) & (C > .05) & (H > 205) & (H < 305)
    hm = np.median(H[m]); cm = np.median(C[m])
    # Gewicht: voll im Blau, weich auslaufend zu Grün und Violett, und bei wenig Farbe
    dh = np.minimum(np.clip((H - 195) / 25, 0, 1), np.clip((315 - H) / 25, 0, 1))
    w = dh * np.clip((C - .02) / .05, 0, 1)
    Hn = ZIEL_H + (H - hm) * STAUCH
    Cn = C * np.clip(ZIEL_C / cm, .85, 1.35)
    H2 = H + (Hn - H) * w; C2 = C + (Cn - C) * w
    lab2 = np.stack([L, C2 * np.cos(np.radians(H2)), C2 * np.sin(np.radians(H2))], -1)
    return oklab2rgb(lab2), hm, cm

def auslauf(al, seite, px):
    h, w = al.shape
    r = np.linspace(0, 1, px)
    if seite == 'unten': al[h - px:, :] *= (1 - r)[:, None] ** 1.5
    if seite == 'links': al[:, :px] *= (r[None, :]) ** 1.5
    if seite == 'oben': al[:px, :] *= (r[:, None]) ** 1.5
    if seite == 'rechts': al[:, w - px:] *= (1 - r)[None, :] ** 1.5
    return al

AUFTRAG = {
    # name: (quelle, zuschnitt, ausläufe, radierer)
    'orchidee-rispe':   ('portrait', None, [('unten', 140)], []),
    'orchidee-strauss': ('strauss', None, [('unten', 70)], []),
    'orchidee-bogen':   ('bogen', (0, 60, 1068, 540), [('links', 90), ('unten', 60)], [(0, 440, 280, 480)]),
    'orchidee-zweig':   ('zweig', (200, 125, 790, 543), [('unten', 90)], []),
    # Für den Kontakt: die offene Blüte und die Knospe vom selben Zweig
    'orchidee-bluete':  ('portrait', None, [], []),
    'orchidee-knospe':  ('zweig', (218, 146, 310, 232), [('rechts', 20)], []),
}
def rund(pts, n=4):
    """Chaikin: aus dem Vieleck wird eine runde Kante."""
    for _ in range(n):
        q = []
        for i in range(len(pts)):
            (x0, y0), (x1, y1) = pts[i], pts[(i + 1) % len(pts)]
            q += [(.75 * x0 + .25 * x1, .75 * y0 + .25 * y1), (.25 * x0 + .75 * x1, .25 * y0 + .75 * y1)]
        pts = q
    return pts

# Die linke Blüte der grossen Rispe, frei: Umriss von Hand nachgezogen,
# nur dort massgeblich, wo sie an andere Blüten stösst.
UMRISS = {'orchidee-bluete': [(-20, 480), (50, 452), (100, 428), (150, 426), (166, 402), (178, 374), (245, 366), (302, 388),
    (362, 424), (394, 456), (406, 490), (409, 540), (404, 590), (394, 640), (374, 690), (340, 735), (310, 762), (282, 798),
    (266, 842), (236, 862), (198, 856), (170, 806), (158, 758), (100, 754), (14, 726), (-20, 640)]}
for name, (q, box, aus, rad) in AUFTRAG.items():
    im = Image.open(f'{src}/{q}.png').convert('RGBA')
    if box: im = im.crop(box)
    a = np.array(im).astype(float)
    rgb, al = a[..., :3], a[..., 3] / 255
    for x0, y0, x1, y1 in rad: al[y0:y1, x0:x1] = 0
    if name in UMRISS:
        from PIL import ImageDraw
        m = Image.new('L', (al.shape[1], al.shape[0]), 0)
        ImageDraw.Draw(m).polygon(rund(UMRISS[name]), fill=255)
        al = al * gaussian_filter(np.array(m) / 255, .9)
    # Saum: Alpha um ein Pixel zurücknehmen, dann Randfarben ersetzen
    al = np.array(Image.fromarray((al * 255).astype(np.uint8)).filter(ImageFilter.MinFilter(3)).filter(ImageFilter.GaussianBlur(.6))) / 255
    rgb = saum(rgb, al)
    rgb, hm, cm = blau(rgb, al)
    for s, px in aus: al = auslauf(al, s, px)
    out = np.dstack([np.clip(rgb, 0, 255), al * 255]).astype(np.uint8)
    o = Image.fromarray(out, 'RGBA'); bb = o.getbbox(); o = o.crop(bb)
    o.save(f'{dst}/{name}.webp', quality=88, method=6)
    o.save(f'{dst}/{name}.png')
    print(name, o.size, 'H %.0f→%.0f' % (hm, ZIEL_H), 'C %.3f' % cm)
