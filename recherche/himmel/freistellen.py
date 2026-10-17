# Freistellen mit rembg (birefnet), Alpha als PNG.
import sys, glob, os
from rembg import remove, new_session
from PIL import Image
s=new_session('birefnet-general')
src,dst=sys.argv[1],sys.argv[2]
for f in sorted(glob.glob(src+'/*.png')):
    im=Image.open(f).convert('RGB')
    m=remove(im,session=s,only_mask=True)
    o=im.copy(); o.putalpha(m); o.save(dst+'/'+os.path.basename(f)); print(f)
