import asyncio, json, subprocess, time, os
from playwright.async_api import async_playwright
ROOT="/home/claude/p4"
srv=subprocess.Popen(["python3","-m","http.server","8792","--directory",ROOT],stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL); time.sleep(1)
URL="http://localhost:8792/stocksense-inventory-analytics/"
def lum(h):
    h=h.lstrip('#'); c=[int(h[i:i+2],16)/255 for i in (0,2,4)]
    f=lambda x: x/12.92 if x<=0.03928 else ((x+0.055)/1.055)**2.4
    return 0.2126*f(c[0])+0.7152*f(c[1])+0.0722*f(c[2])
def cr(a,b):
    x,y=sorted([lum(a),lum(b)],reverse=True); return (x+0.05)/(y+0.05)
pairs={"text on bg":("#eaf0f7","#0b1220"),"muted on surface":("#a3b3c8","#111c2e"),"muted on bg":("#a3b3c8","#0b1220"),"accent on surface":("#34d399","#111c2e"),"on-accent on accent":("#06241a","#34d399"),"warning on surface":("#fbbf24","#111c2e"),"danger on surface":("#f87171","#111c2e"),"danger on bg":("#f87171","#0b1220"),"white on danger button":("#ffffff","#ef4444"),"muted on raised (table head)":("#a3b3c8","#172740")}
out={"contrast":{k:round(cr(*v),2) for k,v in pairs.items()}}
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(); ctx=await b.new_context(viewport={'width':375,'height':812}); pg=await ctx.new_page()
        sizes=[]; 
        pg.on('response',lambda r: sizes.append(r))
        await pg.goto(URL); await pg.wait_for_selector('#product-body tr')
        body=[]
        for r in sizes:
            try: body.append((r.url.split('/')[-1] or 'index.html',len(await r.body())))
            except: pass
        out["requests"]=len(body); out["bytes"]=sum(x[1] for x in body); out["files"]=body
        t=await pg.evaluate("(()=>{const n=performance.getEntriesByType('navigation')[0];return {domContentLoaded:Math.round(n.domContentLoadedEventEnd),load:Math.round(n.loadEventEnd)}})()")
        out["timing_ms"]=t
        out["fcp_ms"]=await pg.evaluate("Math.round((performance.getEntriesByName('first-contentful-paint')[0]||{}).startTime||0)")
        a=await pg.evaluate("""()=>{
          const ids=[...document.querySelectorAll('[id]')].map(e=>e.id); const dup=ids.filter((x,i)=>ids.indexOf(x)!==i);
          const unlabeled=[...document.querySelectorAll('input,select,textarea')].filter(e=>!(e.labels&&e.labels.length)&&!e.getAttribute('aria-label')).map(e=>e.id);
          const noName=[...document.querySelectorAll('button,a[href]')].filter(e=>!(e.textContent.trim()||e.getAttribute('aria-label'))).map(e=>e.id||e.className);
          const heads=[...document.querySelectorAll('h1,h2,h3')].map(h=>h.tagName[1]).join('');
          const imgsNoAlt=[...document.querySelectorAll('img:not([alt])')].length;
          return {duplicateIds:dup,unlabeledControls:unlabeled,unnamedButtonsLinks:noName,headingOrder:heads,imgsNoAlt,lang:document.documentElement.lang,landmarks:['header','nav','main','aside','footer'].map(t=>t+':'+document.querySelectorAll(t).length).join(' '),h1count:document.querySelectorAll('h1').length,viewport:!!document.querySelector('meta[name=viewport]'),scripts:[...document.scripts].map(s=>s.getAttribute('src')+(s.defer?' (defer)':'')),externalRefs:[...document.querySelectorAll('[src],[href]')].map(e=>e.getAttribute('src')||e.getAttribute('href')).filter(u=>/^(https?:)?\\/\\//.test(u)||u.startsWith('/'))}}""")
        out["a11y"]=a
        await b.close()
    srv.terminate()
    json.dump(out,open(ROOT+"/tests/audit.json","w"),indent=1); print(json.dumps(out,indent=1))
asyncio.run(main())
