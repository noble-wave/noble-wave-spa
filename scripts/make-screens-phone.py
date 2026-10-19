"""Straighten each tilted phone cut-out in public/images/story into one flat screen image in
public/images/screens, so the product showcase can swap only the screen inside a fixed phone.

Run from anywhere: `python scripts/make-screens-phone.py` (needs Pillow). Add a product's story file names to
`names`. Corner detection is automatic; if a screen's header is nearly black the top-left corner can be missed,
so override it by name below (see the salah-qibla line).
"""
from pathlib import Path
from PIL import Image
ROOT=Path(__file__).resolve().parent.parent
SRC=str(ROOT/'public/images/story')+'/'
OUT=str(ROOT/'public/images/screens')+'/'
Path(OUT).mkdir(parents=True,exist_ok=True)
W,H=480,1040
names=['rent-portfolio','rent-units','rent-add-property','rent-payments','salah-prayer-times','salah-tools','salah-quran','salah-qibla','salah-calendar']

def solve(a,b):
    n=len(b); m=[row[:]+[b[i]] for i,row in enumerate(a)]
    for c in range(n):
        p=max(range(c,n),key=lambda r:abs(m[r][c])); m[c],m[p]=m[p],m[c]
        for r in range(n):
            if r!=c:
                f=m[r][c]/m[c][c]; m[r]=[x-f*y for x,y in zip(m[r],m[c])]
    return [m[i][n]/m[i][i] for i in range(n)]

def corners(im):
    # Screen = the connected, not-near-black region around the centre (the bezel is near black).
    f=2; w,h=im.size; sw,sh=w//f,h//f
    small=im.resize((sw,sh),Image.BILINEAR)
    px=small.load()
    def ok(x,y):
        r,g,b,a=px[x,y]; return a>200 and max(r,g,b)>40
    seen=bytearray(sw*sh); stack=[(sw//2,sh//2)]
    while stack and not ok(*stack[-1]): stack=[(stack[-1][0]+1,stack[-1][1])]
    pts=[]
    while stack:
        x,y=stack.pop()
        if x<0 or y<0 or x>=sw or y>=sh or seen[y*sw+x] or not ok(x,y): continue
        seen[y*sw+x]=1; pts.append((x,y))
        stack+= [(x+1,y),(x-1,y),(x,y+1),(x,y-1)]
    tl=min(pts,key=lambda p:p[0]+p[1]); br=max(pts,key=lambda p:p[0]+p[1])
    tr=max(pts,key=lambda p:p[0]-p[1]); bl=min(pts,key=lambda p:p[0]-p[1])
    return [(x*f,y*f) for x,y in (tl,tr,br,bl)]

for n in names:
    im=Image.open(SRC+n+'.webp').convert('RGBA')
    q=corners(im)
    if n=='salah-qibla': q[0]=(50,56)  # header is near-black here, so detection missed the top-left corner
    cx=sum(x for x,_ in q)/4; cy=sum(y for _,y in q)/4
    q=[(cx+(x-cx)*1.03,cy+(y-cy)*1.025) for x,y in q]  # step slightly outward: extreme points sit just inside the rounded corners
    # output corners -> source corners
    dst=[(0,0),(W,0),(W,H),(0,H)]
    A=[];B=[]
    for (X,Y),(x,y) in zip(dst,q):
        A.append([X,Y,1,0,0,0,-x*X,-x*Y]);B.append(x)
        A.append([0,0,0,X,Y,1,-y*X,-y*Y]);B.append(y)
    co=solve(A,B)
    bg=Image.new('RGBA',im.size,(11,37,48,255)); bg.alpha_composite(im)
    flat=bg.convert('RGB').transform((W,H),Image.PERSPECTIVE,co,Image.BICUBIC)
    flat.save(OUT+n+'.webp','WEBP',quality=82,method=6)
    print(n,q)
