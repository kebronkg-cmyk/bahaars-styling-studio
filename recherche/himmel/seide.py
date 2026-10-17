import numpy as np, sys
from scipy.ndimage import gaussian_filter
from PIL import Image
from ok import oklab2rgb
from straehne import lic
def seide(w,h,seed,L0=.88,Lspan=.05,C0=.07,H0=235,Hspan=55,glanz=.07):
    """Wie straehne, aber der Farbton wandert über das Bild: Aqua → Blau → Flieder, wie Licht in Glas."""
    r=np.random.default_rng(seed)
    yy,xx=np.mgrid[0:h,0:w].astype(np.float32); u=xx/w; v=yy/h; s=max(w,h)
    t1=gaussian_filter(r.standard_normal((h//8+1,w//8+1)),s/8/7); t1=np.kron(t1,np.ones((8,8)))[:h,:w]; t1/=t1.std()
    th=.65*np.sin(2*np.pi*(u*.8*w/s+v*.4*h/s)+.7)+.35*t1
    vx,vy=np.cos(th).astype(np.float32),np.sin(th).astype(np.float32)
    noise=gaussian_filter(r.standard_normal((h,w)).astype(np.float32),.7)
    z=lic(noise,vx,vy,56); z=(z-z.mean())/z.std()
    # Farbband: folgt der Wellenform, nicht dem Bildrand
    band=np.sin(2*np.pi*(u*.55*w/s - v*.35*h/s)+th*.8)
    H=np.radians(H0+Hspan*band)
    kurve=.5+.16*np.sin(2*np.pi*u*.8+1.2)
    gl=np.exp(-((v-kurve)/.16)**2)
    L=L0+Lspan*np.tanh(z/2)+glanz*gl
    C=C0*(.75+.35*(band*.5+.5))-.015*np.tanh(z/2)
    lab=np.stack([L,C*np.cos(H),C*np.sin(H)],-1).reshape(-1,3)
    return Image.fromarray(np.clip(oklab2rgb(lab),0,255).round().astype('uint8').reshape(h,w,3))
m=48
im=seide(1800+2*m,1100+2*m,7).crop((m,m,m+1800,m+1100)); im.save(sys.argv[1]+'/seide-quer.webp',quality=80,method=6)
im=seide(900+2*m,1600+2*m,8).crop((m,m,m+900,m+1600)); im.save(sys.argv[1]+'/seide-hoch.webp',quality=80,method=6)
print('ok')
