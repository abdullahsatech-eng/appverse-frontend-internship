import asyncio, subprocess, time, html, re, os
from playwright.async_api import async_playwright
ROOT="/home/claude/p4"; PROJ=ROOT+"/stocksense-inventory-analytics"; S=PROJ+"/screenshots"
srv=subprocess.Popen(["python3","-m","http.server","8793","--directory",ROOT],stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL); time.sleep(1)
URL="http://localhost:8793/stocksense-inventory-analytics/"

def excerpt(path,marker,n):
    lines=open(PROJ+"/"+path,encoding="utf-8").read().split("\n")
    i=next(k for k,l in enumerate(lines) if marker in l)
    return "\n".join(lines[i:i+n])
def code_page(title,blocks):
    body="".join(f"<h2>{html.escape(t)}</h2><pre>{html.escape(c)}</pre>" for t,c in blocks)
    return f"""<!doctype html><meta charset=utf-8><style>body{{margin:0;padding:22px;background:#0b1220;color:#eaf0f7;font:15px/1.5 system-ui;width:1000px}}h1{{font-size:20px;margin:0 0 4px}}p{{color:#a3b3c8;margin:0 0 14px;font-size:13px}}h2{{font:600 13px system-ui;color:#34d399;margin:14px 0 4px}}pre{{margin:0;padding:12px 16px;background:#111c2e;border:1px solid #263650;border-radius:8px;font:13.5px/1.5 ui-monospace,Consolas,monospace;white-space:pre;overflow:hidden}}</style><h1>{html.escape(title)}</h1><p>Rendered from the real project files; not an editor screenshot.</p>{body}"""

async def main():
    tree=subprocess.run("cd %s && find . -path ./screenshots -prune -o -path ./docs -prune -o -type f -print | sort | sed 's|^\\./||' && echo && wc -l index.html css/*.css js/*.js | tail -1"%PROJ,shell=True,capture_output=True,text=True).stdout
    pages={
     "01-project-structure":("Project files (output of find and wc in the project folder)",[("$ find . -type f | sort",tree)]),
     "02-dataset-and-schema":("Product dataset (js/data.js), 24 sample products",[("js/data.js (first lines)",excerpt("js/data.js","const CATEGORIES",9)+"\n    ...")]),
     "03-summary-reduce-destructuring":("Summary object, reduce(), destructuring and spread (js/analytics.js)",[("computeSummary()",excerpt("js/analytics.js","function computeSummary",24)),("per-product helpers (destructuring in parameters)",excerpt("js/analytics.js","const costValue",2))]),
     "04-filter-find-sort-map":("filter(), find(), sort with spread, map() (js/analytics.js)",[("findProduct() and filterProducts()",excerpt("js/analytics.js","const findProduct",13)),("sortProducts() and toRows()",excerpt("js/analytics.js","function sortProducts",9)+"\n...\n"+excerpt("js/analytics.js","const toRows",1))]),
     "05-some-every-validation":("some() and every() (js/analytics.js)",[("every(): all records valid, some(): needs restock",excerpt("js/analytics.js","/* every(): all records valid",9))]),
    }
    async with async_playwright() as p:
        b=await p.chromium.launch()
        ctx=await b.new_context(viewport={'width':1050,'height':600},device_scale_factor=1.5); pg=await ctx.new_page()
        for name,(t,blocks) in pages.items():
            await pg.set_content(code_page(t,blocks)); await pg.screenshot(path=f"{S}/{name}.png",full_page=True)
        await ctx.close()
        # Desktop
        ctx=await b.new_context(viewport={'width':1366,'height':768},device_scale_factor=1.5,accept_downloads=True); pg=await ctx.new_page()
        await pg.goto(URL); await pg.wait_for_selector('#product-body tr')
        await pg.screenshot(path=f"{S}/06-dashboard-kpis.png")
        await pg.evaluate("document.getElementById('insights').scrollIntoView({behavior:'instant'})"); await pg.wait_for_timeout(400)
        await pg.screenshot(path=f"{S}/07-category-and-restock-analytics.png")
        await pg.evaluate("document.getElementById('products').scrollIntoView({behavior:'instant'})"); await pg.wait_for_timeout(400)
        await pg.screenshot(path=f"{S}/08-product-table.png")
        await pg.select_option('#filter-category','Electronics'); await pg.fill('#search','e'); await pg.select_option('#filter-stock','low'); await pg.wait_for_timeout(300)
        await pg.screenshot(path=f"{S}/09-search-and-filters.png")
        await pg.click('#clear-filters'); await pg.select_option('#filter-stock','out'); await pg.wait_for_timeout(200)
        await pg.screenshot(path=f"{S}/10-out-of-stock-filter.png")
        await pg.click('#clear-filters')
        await pg.click('#add-button'); await pg.fill('#f-sku','ELE-001'); await pg.fill('#f-cost','500'); await pg.fill('#f-price','400'); await pg.fill('#f-stock','2.5'); await pg.click('#dialog-save'); await pg.wait_for_timeout(200)
        await pg.screenshot(path=f"{S}/11-add-form-validation-errors.png")
        await pg.fill('#f-sku','ELE-007'); await pg.fill('#f-name','Gaming Keyboard'); await pg.select_option('#f-category','Electronics'); await pg.fill('#f-supplier','Tech Supplies'); await pg.fill('#f-cost','3000'); await pg.fill('#f-price','4200'); await pg.fill('#f-stock','4'); await pg.fill('#f-reorder','6')
        await pg.click('#dialog-save'); await pg.wait_for_timeout(300)
        await pg.evaluate("window.scrollTo(0,0)"); await pg.wait_for_timeout(100)
        await pg.screenshot(path=f"{S}/12-after-add-dashboard-updated.png")
        await pg.reload(); await pg.wait_for_selector('#product-body tr'); await pg.fill('#search','keyboard'); await pg.wait_for_timeout(300)
        await pg.evaluate("document.getElementById('products').scrollIntoView({behavior:'instant'})"); await pg.wait_for_timeout(400)
        await pg.screenshot(path=f"{S}/13-persistence-after-refresh.png")
        await pg.click('tr [data-action="delete"]'); await pg.wait_for_timeout(200)
        await pg.screenshot(path=f"{S}/14-delete-confirmation.png")
        await pg.click('#confirm-cancel')
        await ctx.close()
        # Mobile
        ctx=await b.new_context(viewport={'width':375,'height':812},device_scale_factor=2,has_touch=True,is_mobile=True); pg=await ctx.new_page()
        await pg.goto(URL); await pg.wait_for_selector('#product-body tr')
        await pg.screenshot(path=f"{S}/15-mobile-dashboard-375.png")
        await pg.tap('#menu-button'); await pg.wait_for_timeout(300); await pg.screenshot(path=f"{S}/16-mobile-menu-open.png")
        await pg.tap('#backdrop',position={'x':360,'y':500}); await pg.wait_for_timeout(300)
        await pg.evaluate("document.getElementById('products').scrollIntoView({behavior:'instant'})"); await pg.wait_for_timeout(600)
        await pg.screenshot(path=f"{S}/17-mobile-product-cards.png")
        await pg.tap('#add-button'); await pg.wait_for_timeout(300); await pg.screenshot(path=f"{S}/18-mobile-add-form.png")
        await ctx.close()
        ctx=await b.new_context(viewport={'width':320,'height':568},device_scale_factor=2,has_touch=True,is_mobile=True); pg=await ctx.new_page()
        await pg.goto(URL); await pg.wait_for_selector('#product-body tr'); await pg.screenshot(path=f"{S}/19-small-mobile-320.png")
        await ctx.close()
        ctx=await b.new_context(viewport={'width':768,'height':1024},device_scale_factor=1.5); pg=await ctx.new_page()
        await pg.goto(URL); await pg.wait_for_selector('#product-body tr'); await pg.screenshot(path=f"{S}/20-tablet-768.png")
        await ctx.close()
        await b.close()
    srv.terminate()
asyncio.run(main())
