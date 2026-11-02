#!/usr/bin/env python3
"""Build two complete homepage variants and portable, embedded downloads."""
from pathlib import Path
import argparse,base64,html,json,mimetypes,re

ROOT=Path(__file__).resolve().parent
SITE=ROOT.parent
IDS=[f'bs{i}' for i in range(10)]+[f'IMG_{i}' for i in [5022,5023,5024,5025,5026,5029]]
# The middle four columns contain the eight crates requested for the opening view.
LAYOUT=[
    'bs0','bs1','bs3','bs4','bs5','bs7','bs2','bs8',
    'bs9','IMG_5022','bs6','IMG_5023','IMG_5026','IMG_5029','IMG_5024','IMG_5025',
]
LABELS=json.loads((ROOT/'data/crate-labels.json').read_text())
SHELF_PATTERN=r'<section id=[\"\']?books[\"\']?(?:\s[^>]*)?>.*?</section>'

def data():
    old=json.loads((ROOT/'data/old-books.json').read_text())
    updates=ROOT/'data/existing-link-updates.json'
    if updates.exists():
        for update in json.loads(updates.read_text()):
            for books in old.values():
                for book in books:
                    if book['title'].split(' · ')[0].casefold()==update['title'].split(' · ')[0].casefold():
                        book['href']=update['href'];book['verification']=update['verification']
    result=[]
    for ident in IDS:
        if ident.startswith('bs'):
            result.append({'id':ident,'width':1440,'height':1440,'books':old[ident]})
        else:
            path=ROOT/'data'/f'{ident}.json'
            if not path.exists():
                if not ARGS.draft:raise FileNotFoundError(path)
                result.append({'id':ident,'width':2880,'height':2880,'books':[]})
            else:result.append(json.loads(path.read_text()))
    # Destination checks are separate from the image geometry. Require an exact
    # title match so a future rearrangement cannot silently attach the wrong URL.
    audit_path=ROOT/'data/link-audit.json'
    if audit_path.exists():
        by_id={row['id']:row for row in result}
        for checked in json.loads(audit_path.read_text()):
            book=by_id[checked['crate']]['books'][checked['index']]
            if book['title']!=checked['title']:
                raise ValueError(f"Audit/title mismatch: {checked['crate']} #{checked['index']}")
            if not checked.get('href') or checked['status']=='unresolved':
                raise ValueError(f"Unresolved book destination: {book['title']}")
            book['href']=checked['href']
            book['verification']=checked['verification']
    return result

def label(book):
    return book['title']+((' · '+book['author']) if book.get('author') else '')

def display_stem(ident):
    cleaned=ident+'-cleaned'
    return cleaned if (ROOT/f'assets/{cleaned}.webp').exists() else ident

def crate(row):
    ident=row['id'];stem=display_stem(ident);links=[]
    for n,book in enumerate(row['books'],1):
        if not book.get('href'):
            if ARGS.draft:continue
            raise ValueError(f"Missing destination: {ident}: {book['title']}")
        points=' '.join(f'{x:g},{y:g}' for x,y in book['points'])
        title=html.escape(label(book),quote=True)
        href=html.escape(book['href'],quote=True)
        links.append(f'<a href="{href}" target="_blank" rel="noopener" aria-label="{title}" data-book="{n}"><title>{title}</title><polygon points="{points}"/></a>')
    return f'''<div class="book-crate" data-crate="{ident}" data-tooltip="">
      <img src="bookshelf-next/assets/small/{stem}.webp" data-full="bookshelf-next/assets/{stem}.webp" width="{row['width']}" height="{row['height']}" alt="{html.escape(LABELS[ident])}" draggable="false" decoding="async">
      <svg viewBox="0 0 {row['width']} {row['height']}" aria-label="Books in {html.escape(LABELS[ident])}">{''.join(links)}</svg>
    </div>'''

def shelf(rows,records):
    count=sum(len(row['books']) for row in records)
    by_id={row['id']:row for row in records}
    return f'''<section id="books" data-rows="{rows}" style="--shelf-rows:{rows};--shelf-columns:{16//rows}">
      <div class="shelf-window" tabindex="0" role="region" aria-label="Bookshelf with {count} linked books and software packages. Drag down to enlarge, sideways to browse. Keyboard: plus or minus to resize, left or right to browse."><div class="crates-container">{''.join(crate(by_id[ident]) for ident in LAYOUT)}</div></div>
      <div class="shelf-gesture-hint" aria-hidden="true"><span class="hint-pointer">↓ Drag down to unlock books</span><span class="hint-keyboard">Press + to unlock books</span></div>
    </section>'''

def uri(path):
    mime=mimetypes.guess_type(str(path))[0] or 'application/octet-stream'
    return 'data:'+mime+';base64,'+base64.b64encode(path.read_bytes()).decode()

def embedded_css(css):
    def replace(m):
        value=m.group(1).strip().strip('\"\'')
        if value.startswith(('data:','http:','https:','#')):return m.group(0)
        path=SITE/value
        if not path.exists():raise FileNotFoundError(path)
        return 'url("'+uri(path)+'")'
    # Remove comments first: old CSS has inactive paths not present in this tree.
    return re.sub(r'url\(([^)]+)\)',replace,re.sub(r'/\*.*?\*/','',css,flags=re.S))

def portable(page):
    page=page.replace('<base href="../">','<base href="https://andrewblinn.com/">')
    for filename in ['style.css','bookshelf-next/shelf.css']:
        page=page.replace(f'<link rel="stylesheet" href="{filename}">','<style>'+embedded_css((SITE/filename).read_text())+'</style>')
    for filename in ['bookshelf-next/page.js','bookshelf-next/shelf.js']:
        page=page.replace(f'<script src="{filename}"></script>','<script>'+(SITE/filename).read_text().replace('</script','<\\/script')+'</script>')
    # For the portable file use the full image once, with no separate small copy.
    page=re.sub(r'<img\b[^>]*data-full="([^"]+)"[^>]*>',lambda m:re.sub(r' src="[^"]+"',' src="'+uri(SITE/m.group(1))+'"',re.sub(r' data-full="[^"]+"','',m.group(0))),page)
    def asset(m):
        path=m.group(2)
        if path.startswith(('data:','http:','https:','#')):return m.group(0)
        return m.group(1)+'="'+uri(SITE/path)+'"'
    page=re.sub(r'(src|poster)="([^"]+)"',asset,page)
    page=re.sub(r'(<link\b[^>]*rel="icon"[^>]*href=")([^"]+)(")',lambda m:m[1]+uri(SITE/m[2])+m[3],page)
    return page

def outline_review(records):
    sections=[]
    for row in records:
        ident=row['id'];listing=[]
        for n,book in enumerate(row['books'],1):
            v=book.get('verification')
            evidence=html.escape(v['evidence']) if v else 'Existing website link retained; not reverified in this pass.'
            href=html.escape(book['href'],quote=True)
            listing.append(f'<li><a href="{href}" target="_blank" rel="noopener">{html.escape(label(book))}</a><small>{evidence}</small></li>')
        content=crate(row)
        content=re.sub(r'src="[^"]+"',f'src="{uri(ROOT/f"assets/{display_stem(ident)}.webp")}"',content,count=1)
        content=re.sub(r' data-full="[^"]+"','',content)
        sections.append(f'<section id="{ident}"><h2>{ident} · {html.escape(LABELS[ident])}</h2><div class="pair">{content}<ol>{"".join(listing)}</ol></div></section>')
    return '''<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Bookshelf outlines and destinations</title><style>
    *{box-sizing:border-box}body{margin:24px auto;max-width:1500px;padding:0 24px;background:#e5e7df;color:#173429;font:15px/1.45 system-ui}h1{font-weight:550}h2{font-size:19px;font-weight:550}section{padding:20px 0;border-top:1px solid #b4c4b8}.pair{display:grid;grid-template-columns:minmax(350px,1.2fr) minmax(320px,1fr);gap:24px}.book-crate{position:relative;align-self:start}.book-crate img{width:100%;height:auto;display:block}.book-crate svg{position:absolute;inset:0;width:100%;height:100%}polygon{fill:#ffc65b14;stroke:#ffb12d;stroke-width:1.2;vector-effect:non-scaling-stroke}svg a:hover polygon{fill:#ffdb7680;stroke:#fff}a{color:#17613e}li{padding:0 0 12px}small{display:block;color:#4d6255;margin-top:3px;font-size:12px}header{position:sticky;top:0;background:#e5e7dff5;z-index:5;padding:8px 0}label{font-size:13px}body:has(#hide:checked) polygon{stroke:transparent;fill:transparent}@media(max-width:800px){.pair{grid-template-columns:1fr}body{padding:0 12px}}
    </style><header><h1>Book outlines & verified destinations</h1><p>Hover each outlined face to see its title; click to open the page. The list records the evidence used for every new destination.</p><label><input type="checkbox" id="hide"> Hide outlines</label></header>'''+''.join(sections)+'</html>'

def image_review():
    parts=['''<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Bookshelf image comparisons</title><style>
    *{box-sizing:border-box}body{max-width:2000px;margin:28px auto;padding:0 20px;background:#e1e2df;color:#173429;font:16px/1.5 system-ui}h1,h2{font-weight:550}h1{font-size:28px}h2{font-size:21px}section{padding:22px 0;border-top:1px solid #adb8ae}img{width:100%;height:auto;display:block}a{color:#17613e}p{max-width:980px}small{display:block;margin-top:8px}</style>
    <h1>Bookshelf image comparisons</h1><p>The two black crates remain in the site preview. These green alternatives use an existing green crate with your repaired books placed at their original coordinates. The book interiors are pixel-identical; only the mask boundaries are feathered. The reconstructed floor is a little smoother than a photographed one.</p>''']
    for ident,title in [('IMG_5024','Scott Pilgrim, design & computing'),('IMG_5025','Programming language foundations')]:
        preview=ROOT/f'work/green-crates/{ident}-comparison.jpg'
        result=ROOT/f'assets/{ident}-green-composite.png'
        if not preview.exists() or not result.exists():return None
        parts.append(f'<section><h2>{title}</h2><img alt="Original black crate at left; green crate with the same books at right" src="{uri(preview)}"><p><a download="{result.name}" href="{uri(result)}">Download transparent green version (PNG)</a></p></section>')
    preview=ROOT/'work/knuth-cleanup-comparison.jpg';result=ROOT/'assets/IMG_5022-cleaned.png'
    if preview.exists() and result.exists():
        parts.append(f'<section><h2>Knuth & O’Reilly: background cleanup</h2><p>Small pale remnants above the book tops were replaced with nearby background pixels. The books and transparency are preserved.</p><img alt="Before and after the local background cleanup above the books" src="{uri(preview)}"><p><a download="{result.name}" href="{uri(result)}">Download cleaned crate (PNG)</a></p></section>')
    return ''.join(parts)+'</html>'

def main():
    records=data()
    original=(SITE/'index.html').read_text()
    # Keep the generator independent of whether the new shelf is installed yet.
    page=original.replace('\n<link rel="stylesheet" href="bookshelf-next/shelf.css">','')
    page=page.replace('\n<script src="bookshelf-next/shelf.js"></script>','')
    page=re.sub(r'<script async src="https://www.googletagmanager.com/.*?</script>\s*<script>.*?</script>','',page,count=1,flags=re.S)
    page=page.replace('<head>','<head>\n<base href="../">\n<meta name="robots" content="noindex,nofollow">')
    page=page.replace('<link rel="stylesheet" href="style.css">','<link rel="stylesheet" href="style.css">\n<link rel="stylesheet" href="bookshelf-next/shelf.css">')
    page=page.replace('<script src="script.js"></script>','<script src="bookshelf-next/page.js"></script>\n<script src="bookshelf-next/shelf.js"></script>')
    existing=(SITE/'script.js').read_text()
    remainder='// Newsfeed dates:'+existing.split('// Newsfeed dates:',1)[1]
    (ROOT/'page.js').write_text(remainder)
    for rows,name in [(1,'one-row'),(2,'two-rows')]:
        result, count=re.subn(SHELF_PATTERN,lambda _:shelf(rows,records),page,count=1,flags=re.S)
        if count!=1:raise ValueError('Expected one homepage bookshelf section')
        result=result.replace('<title>andrew blinn</title>',f'<title>andrew blinn · bookshelf {name.replace("-"," ")}</title>')
        (ROOT/f'index-{name}.html').write_text(result)
        if not ARGS.draft:
            output=portable(result)
            (ROOT/f'bookshelf-{name}.html').write_text(output)
            print(name,round(len(output.encode())/1048576,1),'MiB standalone')
    if not ARGS.draft:
        (ROOT/'outline-review.html').write_text(outline_review(records))
        (ROOT/'data/catalog.json').write_text(json.dumps(records,ensure_ascii=False,indent=2)+'\n')
        review=image_review()
        if review:(ROOT/'image-comparisons.html').write_text(review)
    if ARGS.install:
        production,count=re.subn(SHELF_PATTERN,lambda _:shelf(2,records),original,count=1,flags=re.S)
        if count!=1:raise ValueError('Expected one homepage bookshelf section')
        if 'href="bookshelf-next/shelf.css"' not in production:
            production=production.replace('<link rel="stylesheet" href="style.css">','<link rel="stylesheet" href="style.css">\n<link rel="stylesheet" href="bookshelf-next/shelf.css">')
        if 'src="bookshelf-next/shelf.js"' not in production:
            production=production.replace('<script src="script.js"></script>','<script src="script.js"></script>\n<script src="bookshelf-next/shelf.js"></script>')
        (SITE/'index.html').write_text(production)
        # The new shelf script replaces only the old bookshelf interaction.
        # Preserve news, intro, footer, and all other homepage behavior.
        script_path=SITE/'script.js'
        raw_script=script_path.read_bytes()
        script_path.write_bytes(raw_script[raw_script.index(b'// Newsfeed dates:'):])
        print('Installed the two-row shelf in the homepage')
    print('Built',len(records),'crates;',sum(len(row['books']) for row in records),'linked faces')

if __name__=='__main__':
    parser=argparse.ArgumentParser()
    parser.add_argument('--draft',action='store_true',help='Skip portable downloads and review outputs')
    parser.add_argument('--install',action='store_true',help='Update the root homepage with the accepted two-row shelf')
    ARGS=parser.parse_args();main()
