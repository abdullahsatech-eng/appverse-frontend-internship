import asyncio, json, subprocess, time, sys, os
from playwright.async_api import async_playwright
ROOT="/home/claude/p4"
srv=subprocess.Popen(["python3","-m","http.server","8791","--directory",ROOT],stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL)
time.sleep(1)
URL="http://localhost:8791/stocksense-inventory-analytics/"
FILE="file://"+ROOT+"/stocksense-inventory-analytics/index.html"
R=[]
def rec(name,ok,detail=""): R.append({"name":name,"ok":bool(ok),"detail":str(detail)}); print(("PASS " if ok else "FAIL ")+name,detail)
VIEWS=[("Small mobile",320,568),("Typical mobile",375,812),("Large mobile",430,932),("Tablet",768,1024),("Laptop",1366,768),("Desktop",1920,1080),("Landscape phone",812,375),("Landscape tablet",1024,768)]

async def fresh(b,url=URL,w=1366,h=768,init=None,**kw):
    ctx=await b.new_context(viewport={'width':w,'height':h},accept_downloads=True,**kw)
    pg=await ctx.new_page(); errs=[]
    pg.on('console',lambda m: errs.append(m.text) if m.type in('error','warning') else None)
    pg.on('pageerror',lambda e: errs.append("PAGEERROR "+str(e)))
    if init: await pg.add_init_script(init)
    await pg.goto(url); await pg.wait_for_selector('#product-body tr')
    return ctx,pg,errs
async def rows(pg): return await pg.locator('#product-body tr').count()
async def kpi(pg,label): return await pg.evaluate("l=>[...document.querySelectorAll('.kpi')].find(k=>k.querySelector('.kpi__label').textContent===l).querySelector('.kpi__value').textContent",label)
async def fill_form(pg,**v):
    m={'sku':'f-sku','name':'f-name','supplier':'f-supplier','cost':'f-cost','price':'f-price','stock':'f-stock','reorder':'f-reorder'}
    for k,val in v.items():
        if k=='category': await pg.select_option('#f-category',val)
        elif k=='status': await pg.select_option('#f-status',val)
        else: await pg.fill('#'+m[k],str(val))

async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch()
        # --- A. Subpath hosting: every resource loads (GitHub Pages style) ---
        ctx=await b.new_context(); pg=await ctx.new_page(); bad=[]; urls=[]
        pg.on('response',lambda r: (urls.append(r.url), bad.append((r.status,r.url)) if r.status>=400 else None))
        errs=[]; pg.on('console',lambda m: errs.append(m.text) if m.type=='error' else None); pg.on('pageerror',lambda e: errs.append(str(e)))
        await pg.goto(URL); await pg.wait_for_selector('#product-body tr')
        rec("Subpath hosting: all resources load (HTTP, no 4xx/5xx)",not bad and len(urls)>=9,f"{len(urls)} responses, bad={bad}")
        rec("Subpath hosting: no external requests",all(u.startswith("http://localhost:8791/") for u in urls))
        rec("Subpath hosting: no console errors",not errs,errs)
        await ctx.close()
        # --- B. Direct file:// opening ---
        ctx,pg,errs=await fresh(b,FILE)
        rec("Opens directly from file:// with 24 rows",await rows(pg)==24 and not errs,errs)
        await ctx.close()
        # --- C. Initial dashboard values ---
        ctx,pg,errs=await fresh(b)
        rec("KPI: active products = 23",await kpi(pg,"Active products")=="23",await kpi(pg,"Active products"))
        rec("KPI: total units = 605",await kpi(pg,"Total units in stock")=="605")
        v=await kpi(pg,"Inventory cost value"); rec("KPI: cost value = Rs 367,220",v.replace("\xa0"," ").endswith("367,220"),v)
        v=await kpi(pg,"Potential retail value"); rec("KPI: retail value = Rs 578,250",v.endswith("578,250"),v)
        v=await kpi(pg,"Est. gross profit potential"); rec("KPI: gross profit = Rs 211,030",v.endswith("211,030"),v)
        rec("KPI: low = 4, out = 3",await kpi(pg,"Low-stock products")=="4" and await kpi(pg,"Out-of-stock products")=="3")
        rec("Badge says Sample data",(await pg.inner_text('#data-badge'))=="Sample data")
        rec("Category list shows 5 categories",await pg.locator('.cat').count()==5)
        rec("Restock alerts list 7 items",await pg.locator('.alert-item').count()==7)
        rec("Data quality says all records valid","All records valid" in await pg.inner_text('#quality-box'))
        # --- D. Search / filters / sort ---
        await pg.fill('#search','mouse'); await pg.wait_for_timeout(300)
        rec("Search by name 'mouse' -> 1 row",await rows(pg)==1)
        await pg.fill('#search','acc-00'); await pg.wait_for_timeout(300)
        rec("Search by SKU 'acc-00' -> 5 rows",await rows(pg)==5)
        await pg.fill('#search',''); await pg.wait_for_timeout(300)
        await pg.select_option('#filter-category','Electronics'); await pg.select_option('#filter-stock','low')
        rec("Category + status filters combine (Electronics + low = Bluetooth Speaker)",await rows(pg)==1 and "Bluetooth Speaker" in await pg.inner_text('#product-body'))
        await pg.select_option('#filter-stock','out'); rec("Electronics + out -> Power Bank",await rows(pg)==1 and "Power Bank" in await pg.inner_text('#product-body'))
        await pg.fill('#search','zzzz'); await pg.wait_for_timeout(300)
        rec("No match shows empty state",await pg.is_visible('#empty-state') and await rows(pg)==0)
        await pg.click('#clear-filters')
        rec("Clear filters restores 24 rows",await rows(pg)==24 and await pg.input_value('#search')=="")
        await pg.select_option('#sort-key','value'); await pg.click('#sort-dir')
        first=await pg.inner_text('#product-body tr:first-child .cell-name')
        rec("Sort by inventory value descending -> A4 Paper first",first.startswith("A4 Paper"),first.split("\n")[0])
        await pg.select_option('#sort-key','stock'); first=await pg.inner_text('#product-body tr:first-child .cell-name')
        rec("Sort by stock descending -> Gel Pen Pack first",first.startswith("Gel Pen"),first.split("\n")[0])
        rec("Sort direction button label updates",(await pg.inner_text('#sort-dir'))=="Descending")
        await pg.select_option('#filter-stock','inactive'); rec("Inactive filter -> 1 row (Wall Clock)",await rows(pg)==1)
        await pg.select_option('#filter-stock','all'); await pg.select_option('#sort-key','name')
        # --- E. Add: validation ---
        await pg.click('#add-button'); rec("Add dialog opens with next ID PRD-025",await pg.input_value('#f-id')=="PRD-025")
        await pg.click('#dialog-save')
        rec("Empty form shows errors and summary",await pg.is_visible('#form-summary') and "Enter a product name" in await pg.inner_text('#e-name'))
        rec("Focus moves to first invalid field",await pg.evaluate("document.activeElement.id")=="f-sku" or await pg.evaluate("document.activeElement.id")=="f-name")
        await fill_form(pg,sku="ELE-001",name="Test Item",supplier="S",cost=500,price=400,stock=2.5,reorder=-1)
        await pg.click('#dialog-save')
        rec("Duplicate SKU rejected",("already used" in await pg.inner_text('#e-sku')))
        rec("Selling below cost rejected","lower than the cost" in await pg.inner_text('#e-sellingPrice'))
        rec("Fractional stock rejected","whole number" in await pg.inner_text('#e-stockQuantity'))
        rec("Negative reorder level rejected","whole number" in await pg.inner_text('#e-reorderLevel'))
        rec("Invalid fields flagged aria-invalid",await pg.get_attribute('#f-sku','aria-invalid')=="true")
        # --- F. Add valid ---
        await fill_form(pg,sku="ELE-007",name="Gaming Keyboard",category="Electronics",supplier="Tech Supplies",cost=3000,price=4200,stock=4,reorder=6)
        await pg.click('#dialog-save'); await pg.wait_for_timeout(200)
        rec("Valid product added (25 rows)",await rows(pg)==25)
        rec("KPI active products updates to 24",await kpi(pg,"Active products")=="24")
        rec("KPI low-stock rises to 5 (qty 4 <= reorder 6)",await kpi(pg,"Low-stock products")=="5")
        v=await kpi(pg,"Inventory cost value"); rec("KPI cost value rises by 12,000",v.endswith("379,220"),v)
        rec("Badge changes to Your data",(await pg.inner_text('#data-badge'))=="Your data")
        rec("Restock list includes new product","Gaming Keyboard" in await pg.inner_text('#restock-list'))
        # --- G. Edit ---
        await pg.click('tr[data-id="PRD-001"] [data-action="edit"]')
        rec("Edit dialog is prefilled",await pg.input_value('#f-name')=="Wireless Mouse" and await pg.input_value('#f-stock')=="25")
        await pg.fill('#f-stock','0'); await pg.click('#dialog-save'); await pg.wait_for_timeout(200)
        rec("Edit stock to 0 -> out-of-stock count 4",await kpi(pg,"Out-of-stock products")=="4")
        await pg.click('tr[data-id="PRD-001"] [data-action="edit"]'); await pg.fill('#f-sku','ELE-002'); await pg.click('#dialog-save')
        rec("Edit cannot reuse another product's SKU","already used" in await pg.inner_text('#e-sku'))
        await pg.fill('#f-sku','ELE-001'); await pg.click('#dialog-save'); await pg.wait_for_timeout(200)
        rec("Edit keeping own SKU is allowed",not await pg.is_visible('#product-dialog'))
        # --- H. Delete with confirmation ---
        await pg.click('tr[data-id="PRD-007"] [data-action="delete"]')
        rec("Delete asks for confirmation",await pg.is_visible('#confirm-dialog'))
        await pg.click('#confirm-cancel'); rec("Cancel keeps product",await rows(pg)==25)
        await pg.click('tr[data-id="PRD-007"] [data-action="delete"]'); await pg.click('#confirm-ok'); await pg.wait_for_timeout(200)
        rec("Confirm deletes product (24 rows)",await rows(pg)==24 and "PRD-007" not in await pg.inner_html('#product-body'))
        # --- I. Persistence ---
        await pg.reload(); await pg.wait_for_selector('#product-body tr')
        rec("Data persists after refresh (24 rows incl. Gaming Keyboard)",await rows(pg)==24 and "Gaming Keyboard" in await pg.inner_text('#product-body'))
        rec("Edited stock persists (Wireless Mouse out of stock)","Out of stock" in await pg.inner_text('tr[data-id="PRD-001"]'))
        rec("Badge still Your data after refresh",(await pg.inner_text('#data-badge'))=="Your data")
        # --- J. CSV export ---
        await pg.select_option('#filter-category','Electronics')
        async with pg.expect_download() as dl: await pg.click('#export-button')
        d=await dl.value; path=await d.path(); txt=open(path,encoding='utf-8-sig').read().strip().splitlines()
        rec("CSV export downloads filtered rows (Electronics: header + 7)",d.suggested_filename=="stocksense-products.csv" and len(txt)==8,f"{len(txt)} lines; {txt[0][:40]}")
        await pg.click('#clear-filters')
        # --- K. Reset ---
        await pg.click('#reset-button'); rec("Reset asks for confirmation",await pg.is_visible('#confirm-dialog'))
        await pg.click('#confirm-cancel'); rec("Cancelling reset keeps user data","Gaming Keyboard" in await pg.inner_text('#product-body'))
        await pg.click('#reset-button'); await pg.click('#confirm-ok'); await pg.wait_for_timeout(200)
        rec("Confirmed reset restores 24 sample products",await rows(pg)==24 and "Gaming Keyboard" not in await pg.inner_text('#product-body') and (await pg.inner_text('#data-badge'))=="Sample data")
        bk=await pg.evaluate("localStorage.getItem('stocksense.backup.v1')")
        rec("Reset stored a backup of the previous data first",bk is not None and "Gaming Keyboard" in bk)
        rec("No console errors during full workflow",not errs,errs)
        await ctx.close()
        # --- L. Keyboard ---
        ctx,pg,errs=await fresh(b,w=1366,h=768)
        await pg.focus('#add-button'); await pg.keyboard.press('Enter')
        rec("Keyboard: Enter on Add opens dialog",await pg.is_visible('#product-dialog'))
        await pg.keyboard.press('Escape'); rec("Keyboard: Escape closes dialog",not await pg.is_visible('#product-dialog'))
        rec("Focus returns to Add button after closing",await pg.evaluate("document.activeElement.id")=="add-button")
        await pg.keyboard.press('Tab')
        rec("Skip link is first tab stop",True) if False else None
        await ctx.close()
        ctx,pg,errs=await fresh(b)
        await pg.keyboard.press('Tab'); rec("Skip link is first tab stop",await pg.evaluate("document.activeElement.className")=="skip-link")
        ol=await pg.evaluate("(()=>{document.querySelector('#search').focus();const s=getComputedStyle(document.querySelector('#search'));return s.outlineStyle+' '+s.outlineWidth})()")
        rec("Visible focus outline on inputs",ol.startswith("solid"),ol)
        await ctx.close()
        # --- M. Storage failures ---
        ctx,pg,errs=await fresh(b,init="Storage.prototype.setItem=function(){throw new Error('blocked')};")
        rec("Storage blocked: app still renders 24 rows",await rows(pg)==24)
        rec("Storage blocked: notice is shown","not be kept" in (await pg.inner_text('#notice')))
        await pg.click('#add-button'); await fill_form(pg,sku="NEW-1",name="X",supplier="S",cost=1,price=2,stock=1,reorder=1); await pg.click('#dialog-save')
        rec("Storage blocked: add still works in memory",await rows(pg)==25 and "not be kept" in (await pg.inner_text('#notice')))
        await ctx.close()
        ctx,pg,errs=await fresh(b,init="localStorage.setItem('stocksense.inventory.v1','{not json');")
        rec("Malformed saved data: falls back to sample data with notice",await rows(pg)==24 and "could not be read" in await pg.inner_text('#notice'))
        rec("Malformed saved data: raw value not silently overwritten",await pg.evaluate("localStorage.getItem('stocksense.inventory.v1')")=="{not json")
        await ctx.close()
        ctx,pg,errs=await fresh(b,init="localStorage.setItem('stocksense.inventory.v1',JSON.stringify({version:1,mode:'custom',products:[{id:'A',sku:'A',name:'',category:'x'}]}));")
        rec("Invalid record shape in storage: rejected with notice",await rows(pg)==24 and "could not be read" in await pg.inner_text('#notice'))
        await ctx.close()
        # --- N. Reduced motion ---
        ctx,pg,errs=await fresh(b,reduced_motion='reduce')
        rec("Reduced motion: smooth scrolling off",await pg.evaluate("getComputedStyle(document.documentElement).scrollBehavior")=="auto")
        rec("Reduced motion: transition duration token is 0s",await pg.evaluate("getComputedStyle(document.documentElement).getPropertyValue('--duration').trim()")=="0s")
        await ctx.close()
        # --- N2. Touch (tap events) ---
        ctx,pg,errs=await fresh(b,w=375,h=812,has_touch=True,is_mobile=True)
        await pg.tap('#add-button'); a=await pg.is_visible('#product-dialog')
        await pg.tap('#dialog-cancel'); c=not await pg.is_visible('#product-dialog')
        await pg.tap('#menu-button'); m=await pg.is_visible('#sidebar')
        await pg.tap('#backdrop',position={'x':360,'y':400}); await pg.wait_for_timeout(350); mc=not await pg.is_visible('#sidebar')
        await pg.tap('tr[data-id="PRD-002"] [data-action="delete"]'); d=await pg.is_visible('#confirm-dialog'); await pg.tap('#confirm-cancel')
        rec("Touch (375x812, tap events): add dialog, menu, backdrop close and delete confirm work",a and c and m and mc and d,[a,c,m,mc,d])
        await ctx.close()
        # --- O. Viewports ---
        for label,w,h in VIEWS:
            mob=w<1024
            ctx,pg,errs=await fresh(b,w=w,h=h,has_touch=mob,is_mobile=mob and w<800)
            ov=await pg.evaluate("[document.documentElement.scrollWidth,document.documentElement.clientWidth]")
            rec(f"{label} {w}x{h}: no horizontal overflow",ov[0]<=ov[1],ov)
            clipped=await pg.evaluate("""()=>[...document.querySelectorAll('body *')].filter(e=>{const r=e.getBoundingClientRect();return r.width>0&&r.height>0&&(r.right>document.documentElement.clientWidth+1||r.left<-1)&&!e.closest('.table-wrap')&&!e.closest('.sidebar')&&!e.closest('dialog')&&getComputedStyle(e).position!=='fixed'}).map(e=>e.className||e.tagName).slice(0,5)""")
            rec(f"{label}: no element clipped outside viewport",not clipped,clipped)
            small=await pg.evaluate("""()=>[...document.querySelectorAll('button,a.nav-link,select,input:not([type=hidden])')].filter(e=>{const r=e.getBoundingClientRect();const cs=getComputedStyle(e);return r.width>0&&cs.visibility!=='hidden'&&!e.closest('.sidebar:not(.is-open)')&&!e.closest('dialog')&&!e.classList.contains('skip-link')&&r.height<40}).map(e=>(e.id||e.textContent.trim().slice(0,20))+':'+Math.round(e.getBoundingClientRect().height)).slice(0,6)""")
            rec(f"{label}: touch targets >= 40px tall",not small,small)
            # nav
            if w<1024:
                rec(f"{label}: sidebar hidden until menu opened",not await pg.is_visible('#sidebar'))
                await pg.click('#menu-button'); opened=await pg.is_visible('#sidebar') and (await pg.get_attribute('#menu-button','aria-expanded'))=="true"
                await pg.keyboard.press('Escape'); await pg.wait_for_timeout(350); closed=not await pg.is_visible('#sidebar')
                rec(f"{label}: menu opens and Escape closes it",opened and closed)
            else:
                rec(f"{label}: sidebar visible, menu button hidden",await pg.is_visible('#sidebar') and not await pg.is_visible('#menu-button'))
            # table layout
            if w<768: mode=await pg.evaluate("getComputedStyle(document.querySelector('#product-body tr')).display")
            else: mode=await pg.evaluate("getComputedStyle(document.querySelector('#product-body tr')).display")
            rec(f"{label}: table layout = {'stacked cards' if w<768 else 'table'}",(mode=="block") if w<768 else (mode=="table-row"),mode)
            # dialog fit
            await pg.click('#add-button'); await pg.wait_for_timeout(150)
            box=await pg.evaluate("(()=>{const r=document.querySelector('#product-dialog').getBoundingClientRect();return [Math.round(r.left),Math.round(r.top),Math.round(r.right),Math.round(r.bottom)]})()")
            rec(f"{label}: add dialog fits viewport",box[0]>=0 and box[1]>=0 and box[2]<=w and box[3]<=h,box)
            reach=await pg.evaluate("(()=>{const b=document.querySelector('#dialog-save');b.scrollIntoView();const r=b.getBoundingClientRect();return r.bottom<=innerHeight&&r.top>=0})()")
            rec(f"{label}: Save button reachable inside dialog",reach)
            # simulate keyboard open: shrink height
            await pg.set_viewport_size({'width':w,'height':min(h,300)}); await pg.wait_for_timeout(100)
            sc=await pg.evaluate("(()=>{const body=document.querySelector('.dialog__body');const d=document.querySelector('#product-dialog').getBoundingClientRect();const f=document.querySelector('.dialog__foot').getBoundingClientRect();return {fits:d.bottom<=innerHeight+1,footVisible:f.bottom<=innerHeight+1,scrolls:body.scrollHeight>body.clientHeight}})()")
            rec(f"{label}: dialog stays usable with short viewport (keyboard-open simulation, height {min(h,300)})",sc['fits'] and sc['footVisible'],sc)
            await pg.keyboard.press('Escape')
            rec(f"{label}: no console errors",not errs,errs)
            await ctx.close()
        await b.close()
    srv.terminate()
    json.dump(R,open(ROOT+"/tests/e2e.json","w"),indent=1)
    print("\nTOTAL",len(R),"passed",sum(r['ok'] for r in R),"failed",[r['name'] for r in R if not r['ok']])
asyncio.run(main())
