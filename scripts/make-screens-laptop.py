"""Straighten the laptop screens of PDF Workshop's scenes (public/images/products) into flat screen images in
public/images/screens, and crop Noble Qaida's already front-on screens, so the showcase can swap only the screen
inside a fixed laptop.

Run: `python scripts/make-screens-laptop.py` (needs Pillow). The PDF scenes share one laptop, so one averaged
corner quad is used for all of them; the nudges at the bottom (shift of the first scene, painted-out camera notch)
were set by eye for those four images and will need redoing for new scenes.
"""
from pathlib import Path
from PIL import Image
ROOT=Path(__file__).resolve().parent.parent
SRC=str(ROOT/'public/images/products')+'/'
OUT=str(ROOT/'public/images/screens')+'/'
Path(OUT).mkdir(parents=True,exist_ok=True)
W,H=1120,700

def solve(a,b):
    n=len(b); m=[row[:]+[b[i]] for i,row in enumerate(a)]
    for c in range(n):
        p=max(range(c,n),key=lambda r:abs(m[r][c])); m[c],m[p]=m[p],m[c]
        for r in range(n):
            if r!=c:
                f=m[r][c]/m[c][c]; m[r]=[x-f*y for x,y in zip(m[r],m[c])]
    return [m[i][n]/m[i][i] for i in range(n)]

def quad(im):
    f=2; w,h=im.size; sw,sh=w//f,h//f
    px=im.resize((sw,sh),Image.BILINEAR).load()
    def ok(x,y):
        r,g,b=px[x,y]; return r-b>6 and (r+g+b)/3>200
    # start from the middle of the screen
    seen=bytearray(sw*sh); start=None
    for x in range(sw//2-60,sw//2+60):
        for y in range(sh//2-80,sh//2+20):
            if ok(x,y): start=(x,y); break
        if start: break
    stack=[start]; pts=[]
    while stack:
        x,y=stack.pop()
        if x<0 or y<0 or x>=sw or y>=sh or seen[y*sw+x] or not ok(x,y): continue
        seen[y*sw+x]=1; pts.append((x,y)); stack+=[(x+1,y),(x-1,y),(x,y+1),(x,y-1)]
    tl=min(pts,key=lambda p:p[0]+p[1]); br=max(pts,key=lambda p:p[0]+p[1])
    tr=max(pts,key=lambda p:p[0]-p[1]); bl=min(pts,key=lambda p:p[0]-p[1])
    return [(x*f,y*f) for x,y in (tl,tr,br,bl)]

def warp(im,q,name):
    dst=[(0,0),(W,0),(W,H),(0,H)]; A=[];B=[]
    for (X,Y),(x,y) in zip(dst,q):
        A.append([X,Y,1,0,0,0,-x*X,-x*Y]);B.append(x)
        A.append([0,0,0,X,Y,1,-y*X,-y*Y]);B.append(y)
    co=solve(A,B)
    im.transform((W,H),Image.PERSPECTIVE,co,Image.BICUBIC).save(OUT+name+'.webp','WEBP',quality=82,method=6)

names=['pdf-1','pdf-2','pdf-3','pdf-4']
ims={n:Image.open(SRC+n+'.webp').convert('RGB') for n in names}
qs=[quad(im) for im in ims.values()]
# The four scenes share one laptop, so use one averaged quad for all: the frame cannot shift between steps.
avg=[(sum(q[i][0] for q in qs)/4, sum(q[i][1] for q in qs)/4) for i in range(4)]
avg[0]=(avg[0][0],avg[0][1]+8); avg[1]=(avg[1][0],avg[1][1]+8)
print(avg)
flats={}
for n,im in ims.items():
    warp(im,avg,n+'-screen'); flats[n]=Image.open(OUT+n+'-screen.webp').convert('RGB')
# The scenes are AI-generated, so one is a few pixels off. Measured by eye on the header strip:
# the first scene sits 4px lower than the other three, so lift it to match.
im=flats['pdf-1']; out=Image.new('RGB',im.size); out.paste(im,(0,-4))
out.paste(im.crop((0,H-1,W,H)).resize((W,4)),(0,H-4))
out.save(OUT+'pdf-1-screen.webp','WEBP',quality=82,method=6)
# Paint out the laptop's camera notch (a dark line along the top edge, centre).
for n in names:
    im=Image.open(OUT+n+'-screen.webp').convert('RGB')
    strip=im.crop((470,16,650,17)).resize((180,16))
    im.paste(strip,(470,0)); im.save(OUT+n+'-screen.webp','WEBP',quality=82,method=6)

# Noble Qaida: the posters are front-on, so crop the app screen (below the browser bar) at a fixed box.
for n in ('qaida-1','qaida-2','qaida-3'):
    im=Image.open(SRC+n+'.webp').convert('RGB').crop((414,238,1190,692))
    im.resize((1120,round(1120*im.height/im.width)),Image.LANCZOS).save(OUT+n+'-screen.webp','WEBP',quality=82,method=6)

# Noble Relay: two scenes, each with a bright app window inside a dark bezel. Find the window as the connected
# bright region around a seed point inside it, then straighten it like the PDF screens.
def quad_bright(im, seed):
    f=2; w,h=im.size; sw,sh=w//f,h//f
    px=im.resize((sw,sh),Image.BILINEAR).load()
    ok=lambda x,y: min(px[x,y])>=232
    seen=bytearray(sw*sh); stack=[(seed[0]//f,seed[1]//f)]; pts=[]
    while stack:
        x,y=stack.pop()
        if x<0 or y<0 or x>=sw or y>=sh or seen[y*sw+x] or not ok(x,y): continue
        seen[y*sw+x]=1; pts.append((x,y)); stack+=[(x+1,y),(x-1,y),(x,y+1),(x,y-1)]
    tl=min(pts,key=lambda p:p[0]+p[1]); br=max(pts,key=lambda p:p[0]+p[1])
    tr=max(pts,key=lambda p:p[0]-p[1]); bl=min(pts,key=lambda p:p[0]-p[1])
    return [(x*f,y*f) for x,y in (tl,tr,br,bl)]

for n,seed in (('relay-1',(1042,475)),('relay-2',(1139,332))):
    im=Image.open(SRC+n+'.webp').convert('RGB'); q=quad_bright(im,seed); print(n,q); warp(im,q,n+'-screen')
