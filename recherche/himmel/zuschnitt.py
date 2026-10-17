# Schneidet die Orchideen-Bereiche aus den Bildschirmfotos, ohne App-Leisten.
import sys
from PIL import Image
u='/root/.claude/uploads/65dd1af7-6318-5906-bc4f-c83555580b6c/'
out=sys.argv[1]
def thumb2full(f,tw,box):
    im=Image.open(u+f).convert('RGB'); k=im.width/tw
    b=tuple(round(v*k) for v in box); c=im.crop(b); return c
Z={
 'strauss':  ('3c7ce4fd-image.jpg',500,(60,10,470,240)),
 'portrait': ('423654e2-image.png',416,(18,240,398,740)),
 'bogen':    ('9d86d643-image.png',416,(18,240,398,432)),
 'zweig':    ('9d86d643-image.png',416,(18,512,398,705)),
 'kunst':    ('3ae8c4c4-image.jpg',498,(0,80,498,700)),
 'rispe':    ('320731da-image.jpg',500,(40,0,480,540)),
}
for n,(f,tw,box) in Z.items():
    c=thumb2full(f,tw,box); c.save(f'{out}/{n}.png'); print(n,c.size)
