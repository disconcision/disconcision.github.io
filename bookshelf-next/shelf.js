/* Drag the crates directly; no additional controls in the page. */
(() => {
  const shelf=document.getElementById('books');
  if(!shelf)return;
  const viewport=shelf.querySelector('.shelf-window');
  const crates=[...shelf.querySelectorAll('.book-crate')];
  const links=[...shelf.querySelectorAll('svg a')];
  const rows=Number(shelf.dataset.rows)||2;
  const columns=Math.ceil(crates.length/rows);
  // Zoom is the number of crate columns across the window: four by default, all of them zoomed
  // out, and a whole number whenever a drag is released.
  const BASE_COUNT=Math.min(4,columns);
  let width=viewport.clientWidth,count=BASE_COUNT,drag=null,settling=0,suppressClick=false;
  let imagesUpgraded=false,lastOpen=null;
  const clamp=(n,min,max)=>Math.max(min,Math.min(max,n));
  // Round toward the direction of travel once 30% of the way to the next whole number.
  const lean=(n,dir)=>dir>0?Math.floor(n+.7):dir<0?Math.ceil(n-.7):Math.round(n);
  const size=()=>width/count;
  const isOpen=()=>size()>=Math.max(300,width/BASE_COUNT*1.2);
  const reducedMotion=()=>matchMedia('(prefers-reduced-motion: reduce)').matches;
  function upgradeImages(){
    if(imagesUpgraded)return;imagesUpgraded=true;
    shelf.querySelectorAll('img[data-full]').forEach(img=>{
      const full=new Image();full.src=img.dataset.full;
      full.decode().then(()=>{img.src=full.src;},()=>{imagesUpgraded=false;});
    });
  }
  function update(){
    shelf.style.setProperty('--crate-size',size()+'px');
    const open=isOpen();
    shelf.classList.toggle('interactive',open&&!drag?.moved);
    shelf.classList.toggle('enlarged',Math.abs(count-BASE_COUNT)>.01);
    if(open!==lastOpen){links.forEach(a=>a.setAttribute('tabindex',open?'0':'-1'));lastOpen=open;}
    if(open)upgradeImages();
  }
  // Ease to a whole number of columns, starting on a whole crate, keeping the crate under
  // `anchor` (px from the window's left edge) roughly in place.
  function settle(target,anchor=width/2,dir=0){
    cancelAnimationFrame(settling);
    target=clamp(target,1,columns);
    const fromSize=size(),toSize=width/target;
    const fromLeft=viewport.scrollLeft/fromSize,at=fromLeft+anchor/fromSize;
    const toLeft=clamp(lean(at-anchor/toSize,dir),0,columns-target);
    const start=performance.now(),duration=reducedMotion()?0:220;
    shelf.classList.add('settling');
    const step=now=>{
      const t=duration?Math.min(1,(now-start)/duration):1,e=1-(1-t)**3;
      count=width/(fromSize+(toSize-fromSize)*e);update();
      viewport.scrollLeft=(fromLeft+(toLeft-fromLeft)*e)*size();
      if(t<1)settling=requestAnimationFrame(step);
      else{settling=0;count=target;update();shelf.classList.remove('settling');}
    };
    settling=requestAnimationFrame(step);
  }
  function hideTitles(){crates.forEach(crate=>crate.dataset.tooltip='');}
  function showTitle(link){
    if(!link||!isOpen()||drag?.moved)return;
    const crate=link.closest('.book-crate'),box=link.getBBox(),width=link.ownerSVGElement.viewBox.baseVal.width;
    crate.dataset.tooltip=link.getAttribute('aria-label');
    crate.style.setProperty('--tooltip-x',100*(box.x+box.width/2)/width+'%');
  }
  shelf.addEventListener('mouseover',e=>showTitle(e.target.closest('svg a')));
  shelf.addEventListener('mouseout',e=>{
    const link=e.target.closest('svg a');if(link&&!link.contains(e.relatedTarget))link.closest('.book-crate').dataset.tooltip='';
  });
  shelf.addEventListener('mouseleave',hideTitles);
  shelf.addEventListener('focusin',e=>{
    const link=e.target.closest('svg a');if(!link)return;
    showTitle(link);link.closest('.book-crate').scrollIntoView({block:'nearest',inline:'nearest'});
  });
  shelf.addEventListener('focusout',hideTitles);
  shelf.addEventListener('dragstart',e=>e.preventDefault());
  viewport.addEventListener('pointerdown',e=>{
    if(e.pointerType==='touch'||e.button!==0)return;
    cancelAnimationFrame(settling);settling=0;shelf.classList.remove('settling');
    drag={id:e.pointerId,x:e.clientX,y:e.clientY,size:size(),count,left:viewport.scrollLeft,moved:false,mode:null,anchor:viewport.scrollLeft+e.clientX-viewport.getBoundingClientRect().left};
  });
  window.addEventListener('pointermove',e=>{
    if(!drag||e.pointerId!==drag.id)return;
    if(e.buttons===0){finish();return;}
    const dx=e.clientX-drag.x,dy=e.clientY-drag.y;
    if(!drag.moved&&Math.max(Math.abs(dx),Math.abs(dy))>5){
      drag.moved=true;drag.mode=Math.abs(dy)>Math.abs(dx)*1.2?'resize':'scroll';
      viewport.setPointerCapture(e.pointerId);shelf.classList.add('dragging');hideTitles();update();
    }
    if(!drag.moved)return;
    e.preventDefault();
    if(drag.mode==='resize'){
      const next=clamp(drag.size+dy/rows,width/columns,width);
      count=width/next;update();
      viewport.scrollLeft=drag.anchor*(next/drag.size)-(drag.x-viewport.getBoundingClientRect().left);
    }else viewport.scrollLeft=drag.left-dx;
  });
  function finish(e){
    if(!drag||(e&&e.pointerId!==drag.id))return;
    const {moved,mode,x}=drag,started=drag.count,scrolled=viewport.scrollLeft-drag.left;
    suppressClick=moved;
    if(viewport.hasPointerCapture(drag.id))viewport.releasePointerCapture(drag.id);
    // Hand straight over to settling, before native scroll snapping can pull the shelf back.
    if(moved)shelf.classList.add('settling');
    drag=null;shelf.classList.remove('dragging');update();
    if(moved){
      if(mode==='resize')settle(lean(count,Math.sign(count-started)),x-viewport.getBoundingClientRect().left);
      else settle(Math.round(count),0,Math.sign(scrolled));
    }
    setTimeout(()=>suppressClick=false,0);
  }
  window.addEventListener('pointerup',finish);window.addEventListener('pointercancel',finish);
  window.addEventListener('blur',()=>finish());
  shelf.addEventListener('click',e=>{if(suppressClick||!isOpen()){e.preventDefault();e.stopPropagation();}},true);
  viewport.addEventListener('keydown',e=>{
    if(e.target!==viewport)return;
    const level=Math.round(count);
    if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();viewport.scrollBy({left:(e.key==='ArrowRight'?1:-1)*size(),behavior:'auto'});}
    else if(e.key==='+'||e.key==='='){e.preventDefault();settle(level-1);}
    else if(e.key==='-'){e.preventDefault();settle(level+1);}
    else if(e.key==='0'){e.preventDefault();settle(BASE_COUNT);}
  });
  new ResizeObserver(()=>{
    const next=viewport.clientWidth;if(Math.abs(next-width)<.5)return;
    // Keep the same first column; if the shelf had no width yet, center it as on load.
    const left=width?viewport.scrollLeft/size():(columns-count)/2;
    width=next;update();
    viewport.scrollLeft=left*size();
  }).observe(viewport);
  update();
  requestAnimationFrame(()=>{viewport.scrollLeft=(columns-count)/2*size();});
})();
