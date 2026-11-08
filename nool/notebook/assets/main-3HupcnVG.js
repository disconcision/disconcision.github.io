import{c as Z,j as r,r as b,V as x,i as J,w as Q,D as ee,l as O,p as te}from"./wb-hCxxP-Ti.js";function se(e,t=()=>!0){ne(e);let o=!1;e.addEventListener("touchstart",s=>{o=t()&&!!s.target.closest?.('[style*="cursor: grab"]')},{passive:!0}),e.addEventListener("touchmove",s=>{o&&s.preventDefault()},{passive:!1})}function ne(e){let t=null,o=null;e.addEventListener("pointerdown",s=>(t=s.pointerId,o=s),!0),document.addEventListener("pointermove",s=>s.pointerId===t&&(o=s),!0),document.addEventListener("pointerup",s=>s.pointerId===t&&(t=null),!0),document.addEventListener("pointercancel",s=>{s.pointerId!==t||!o||(t=null,document.dispatchEvent(new PointerEvent("pointerup",{pointerId:s.pointerId,pointerType:s.pointerType,isPrimary:s.isPrimary,clientX:o.clientX,clientY:o.clientY,bubbles:!0})))},!0)}const oe="whiteboard-2023-06.webp",I=1400,v="#0a7d58",re=new URLSearchParams(location.search).get("wash")==="dark"?"dark":"light",z=[{src:"(+ A 0)",anchors:{p1:[135,420],A:[187,377],z1:[187,469]},ring:{at:[200,405],r:120},side:"left",out:[195,566],ribbonAt:-132},{src:"(+ C (+ B A))",anchors:{p2:[582,415],C:[629,375],p1:[625,466],B:[665,440],A:[664,510]},ring:{at:[655,458],r:118},side:"right",out:[1144,567],size:1.25,ribbonAt:-50,recenter:!0}],N={...z[1],ribbonAt:-140},ie=48,ae={arrows:"all",numbers:!0,ghosts:!0,idleArrows:!0};function ce(e){const t=O(te(e.src)),o=Object.entries(e.anchors).map(([l,[p,w]])=>({w:t.get(l),n:x(p,w)})),s=l=>l.reduce((p,w)=>p.add(w)).div(l.length),u=s(o.map(l=>l.w)),c=s(o.map(l=>l.n));let n=0,i=0;for(const{w:l,n:p}of o)n+=l.sub(u).dot(p.sub(c)),i+=l.sub(u).len2();const h=n/i;return{s:h,t:c.sub(u.mul(h))}}function le(e,t){const{s:o,t:s}=ce(e),u=x(...e.ring.at),c=t/(2*e.ring.r),n=c*o,i=s.sub(u).mul(c).add(x(t/2,t/2));return{zoom:n,root:i.div(n),k:c,c:u}}function G(e){const t=[...O(e).values()],o=t.map(u=>u.x),s=t.map(u=>u.y);return x((Math.min(...o)+Math.max(...o))/2,(Math.min(...s)+Math.max(...s))/2)}function de(e,t,o,s){const c=[...O(e).values()],n=G(e),i=h=>Math.max(...c.map(l=>l.sub(n).add(h).dist(o)))+24;return i(t)<=s?{at:t,mid:n,scale:1}:{at:o,mid:n,scale:Math.max(.5,Math.min(1,s/i(o)))}}function Y({sk:e,d:t,photoScale:o,at:s,phase:u,delay:c,run:n,finger:i,controls:h,onDragging:l}){const{zoom:p,root:w,k:g,c:$}=b.useMemo(()=>le(e,t),[e,t]),k=$.mul(o),f=u==="open",j=b.useMemo(()=>J(e.src),[e.src]),d=b.useMemo(()=>{const T=G(j.tree);return{at:T,mid:T,scale:1,animate:!1}},[j]),[a,m]=b.useState(d),[E,M]=b.useState(!1),[y,S]=b.useState(!1),[R,C]=b.useState(0);b.useEffect(()=>{M(!1),S(!1),m(d)},[n,d]);const A=i?Math.ceil(Math.min(40,Math.max(28,i/2/(p*a.scale)))):void 0,P=e.recenter?t/p/2:0,L=t/p+2*P,D=w.add(a.at).sub(w.add(a.mid).add(x(P,P)).mul(a.scale)),W=b.useMemo(()=>Q({...ae,root:w.add(x(P,P)),hitR:A}),[w,P,A]),U=T=>{const H=t/2/p,V=de(T.tree,d.mid,x(H,H).sub(w),H-10);m({...V,animate:!0})},F=k.sub(s),_=f?"translate(0px, 0px) scale(1)":`translate(${F.x}px, ${F.y}px) scale(${o/g})`,K={left:s.x-t/2,top:s.y-t/2,width:t,height:t,transform:_,transitionDelay:f?`${c}ms`:"0ms",pointerEvents:f?"auto":"none"};return r.jsxs("div",{className:`wb-bubble wb-${e.side}${f?" is-out":""}`,style:K,children:[r.jsxs("div",{className:"wb-disc",children:[r.jsx("div",{className:"wb-photo",style:{backgroundSize:`${I*g}px auto`,backgroundPosition:`${t/2-$.x*g}px ${t/2-$.y*g}px`,opacity:f?0:1,transitionDelay:f?`${c+180}ms`:"0ms"}}),r.jsx("div",{className:"wb-live",style:{opacity:f?1:0,transitionDelay:f?`${c+180}ms`:"0ms"},children:r.jsx("div",{style:{width:L,height:L,transform:`translate(${D.x*p}px, ${D.y*p}px) scale(${p*a.scale})`,transformOrigin:"0 0",transition:a.animate?"transform 450ms cubic-bezier(0.3, 0, 0.2, 1)":void 0},children:r.jsx(ee,{draggable:W,initialState:j,width:L,height:L,dragThreshold:0,onDragStatus:T=>{l(T.type==="dragging"),T.type==="dragging"&&(M(!0),S(!0))},onDropState:e.recenter?U:void 0},`${n}-${R}`)})})]}),r.jsx(X,{d:t,at:e.ribbonAt,text:"drag the A",shown:f&&!E,delay:c+380}),r.jsx("button",{className:"wb-reset",title:"Put it back","aria-label":"Reset this sketch",style:{opacity:f&&y?1:0,pointerEvents:f&&y?"auto":"none",...h&&{left:h.reset.x,top:h.reset.y}},onClick:()=>{C(T=>T+1),S(!1),m(d)},children:"↺"}),h&&r.jsx("button",{className:"wb-close",title:"Back to the photo","aria-label":"Put this sketch back",style:{left:h.close.x,top:h.close.y,opacity:f?1:0,pointerEvents:f?"auto":"none",transitionDelay:f?`${c+380}ms`:"0ms"},onClick:h.onClose,children:r.jsx("svg",{width:12,height:12,viewBox:"-6 -6 12 12","aria-hidden":"true",children:r.jsx("path",{d:"M -4.5 -4.5 L 4.5 4.5 M 4.5 -4.5 L -4.5 4.5",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round"})})})]})}function X({d:e,at:t,text:o,shown:s,delay:u}){const c=e/2,n=c-1,i=c+21,h=(n+i)/2+1,l=(o.length*8.4+26)/h*(180/Math.PI),p=t-l/2,w=t+l/2,g=(d,a)=>{const m=a*Math.PI/180;return`${(c+d*Math.cos(m)).toFixed(2)} ${(c+d*Math.sin(m)).toFixed(2)}`},$=2.2,k=.9,f=[`M ${g(n,p)}`,`A ${n} ${n} 0 0 1 ${g(n,w-k)}`,`L ${g(n+3,w)}`,`L ${g(i-2,w-$)}`,`L ${g(i,w-$-k*1.6)}`,`A ${i} ${i} 0 0 0 ${g(i,p-$+k)}`,`L ${g(i-4,p-$)}`,`L ${g(n+2,p-.3)}`,"Z"].join(" "),j=`wb-ribbon-${Math.round(t)}`;return r.jsxs("svg",{className:"wb-ribbon",width:e,height:e,style:{opacity:s?1:0,transform:s?"rotate(0deg) scale(1)":`rotate(${t>-90?6:-6}deg) scale(0.96)`,transitionDelay:s?`${u}ms`:"0ms"},"aria-hidden":"true",children:[r.jsx("defs",{children:r.jsx("path",{id:j,d:`M ${g(h,p-.6)} A ${h} ${h} 0 0 1 ${g(h,w-.6)}`})}),r.jsx("path",{d:f,fill:v}),r.jsx("text",{fontFamily:'"Cutive Mono", "Courier New", monospace',fontSize:14,fill:"white",dominantBaseline:"central",children:r.jsx("textPath",{href:`#${j}`,startOffset:"50%",textAnchor:"middle",children:o})})]})}function ue({img:e}){const[t,o]=b.useState({w:e.clientWidth,h:e.clientHeight}),[s,u]=b.useState("closed"),[c,n]=b.useState(0),i=b.useRef(new Set),h=b.useRef(s);h.current=s,b.useLayoutEffect(()=>{const d=new ResizeObserver(()=>o({w:e.clientWidth,h:e.clientHeight}));return d.observe(e),()=>d.disconnect()},[e]);const l=t.w/I,p=Math.round(Math.min(320,Math.max(220,t.w*.42))),[w,g]=b.useState(document.documentElement.clientWidth);b.useEffect(()=>{const d=()=>g(document.documentElement.clientWidth);return addEventListener("resize",d),()=>removeEventListener("resize",d)},[]);const $=e.getBoundingClientRect().left+scrollX,k=z.map(d=>Math.round(p*(d.size??1))),f=z.map((d,a)=>{const m=x(...d.out).mul(l),E=k[a]/2+10-$,M=w-k[a]/2-10-$;return x(Math.min(M,Math.max(E,m.x)),m.y)});b.useEffect(()=>{let d=0;const a=()=>{h.current!=="open"&&(clearTimeout(d),u("open"))},m=()=>{h.current!=="open"||i.current.size||(u("closing"),d=window.setTimeout(()=>{u("closed"),n(y=>y+1)},420))},E=y=>{if(i.current.size)return;const S=e.getBoundingClientRect(),R=y.clientX>=S.left&&y.clientX<=S.right&&y.clientY>=S.top&&y.clientY<=S.bottom,A=h.current==="open"&&[...document.querySelectorAll(".wb-bubble")].some(P=>{const L=P.getBoundingClientRect(),D=L.left+L.width/2,W=L.top+L.height/2;return Math.hypot(y.clientX-D,y.clientY-W)<L.width/2+26});R||A?a():m()},M=y=>{y.relatedTarget||m()};return document.addEventListener("pointermove",E),document.documentElement.addEventListener("pointerleave",M),()=>{document.removeEventListener("pointermove",E),document.documentElement.removeEventListener("pointerleave",M),clearTimeout(d)}},[e]);const j=s==="open";return b.useEffect(()=>{e.classList.toggle("wb-washed",j)},[e,j]),r.jsxs("div",{className:`wb-overlay${s==="closed"?" is-closed":""}`,style:{width:t.w,height:t.h},children:[r.jsx("svg",{className:"wb-marks",width:t.w,height:t.h,children:z.map((d,a)=>{const m=x(...d.ring.at).mul(l),E=d.ring.r*l,M=f[a],y=M.sub(m).norm(),S=m.add(y.mul(E+3)),R=M.sub(y.mul(k[a]/2+2)),C=M.dist(m)>E+k[a]/2+12;return r.jsxs("g",{children:[r.jsx("circle",{...m.cxy(),r:E,fill:"none",stroke:v,strokeWidth:1.75,strokeDasharray:"6 5",style:{opacity:s==="closed"?0:1}}),C&&r.jsx("line",{...S.xy1(),...R.xy2(),stroke:v,strokeWidth:1.5,style:{opacity:j?1:0,transitionDelay:j?`${240+a*60}ms`:"0ms"}})]},d.src)})}),z.map((d,a)=>r.jsx(Y,{sk:d,d:k[a],photoScale:l,at:f[a],phase:s,delay:a*60,run:c,onDragging:m=>{m?i.current.add(a):i.current.delete(a)}},d.src))]})}const B=(()=>{const e=Number(new URLSearchParams(location.search).get("wbtag"));return[1,2,3,4].includes(e)?e:1})();function he({c:e,r:t,photoScale:o,shown:s}){const u=(n,i)=>x(n,i).mul(o),c=(n,i)=>r.jsxs("span",{className:"wb-tag",style:{left:n.x,top:n.y,translate:i,opacity:s?1:0},children:["tap",r.jsx("br",{}),"me"]});if(B===1)return c(u(772,290),"-50% -50%");if(B===2){const n=e.add(x(1,0).rotateDeg(58).mul(t)),i=n.add(x(9,13));return r.jsxs(r.Fragment,{children:[r.jsxs("svg",{className:"wb-marks",width:1,height:1,style:{opacity:s?1:0},children:[r.jsx("line",{...n.xy1(),...i.xy2(),stroke:v,strokeWidth:1.5,strokeLinecap:"round"}),r.jsx("circle",{...n.cxy(),r:2,fill:v})]}),c(i,"-50% 0")]})}return B===3?r.jsx("div",{style:{position:"absolute",left:e.x-t,top:e.y-t},children:r.jsx(X,{d:2*t,at:-50,text:"tap me",shown:s,delay:0})}):c(u(1290,1008),"-100% -100%")}function pe({img:e}){const[t,o]=b.useState({w:e.clientWidth,h:e.clientHeight}),[s,u]=b.useState("closed"),[c,n]=b.useState(0),i=b.useRef(!1),h=b.useRef(s);h.current=s,b.useLayoutEffect(()=>{const a=new ResizeObserver(()=>o({w:e.clientWidth,h:e.clientHeight}));return a.observe(e),()=>a.disconnect()},[e]);const l=t.w/I,p=Math.round(Math.min(t.h-12,t.w-24)),w=x(t.w/2,t.h/2),g=24,$=a=>x(t.w-g,a).sub(w).add(x(p/2,p/2)),{open:k,close:f}=b.useMemo(()=>{let a=0;return{open:()=>{clearTimeout(a),u("open")},close:()=>{h.current!=="open"||i.current||(u("closing"),a=window.setTimeout(()=>{u("closed"),n(m=>m+1)},420))}}},[]);b.useEffect(()=>{const a=e.parentElement,m=E=>{E.target.closest(".wb-bubble")||(h.current==="open"?f():k())};return a.addEventListener("click",m),()=>a.removeEventListener("click",m)},[e,k,f]);const j=s==="open";b.useEffect(()=>{e.classList.toggle("wb-washed",j)},[e,j]);const d=x(...N.ring.at).mul(l);return r.jsxs("div",{className:"wb-overlay wb-tap",style:{width:t.w,height:t.h},children:[r.jsx("svg",{className:"wb-marks",width:t.w,height:t.h,children:r.jsx("circle",{...d.cxy(),r:N.ring.r*l,fill:"none",stroke:v,strokeWidth:1.75,strokeDasharray:"6 5"})}),r.jsx(he,{c:d,r:N.ring.r*l,photoScale:l,shown:s==="closed"}),r.jsx("div",{style:{visibility:s==="closed"?"hidden":"visible"},children:r.jsx(Y,{sk:N,d:p,photoScale:l,at:w,phase:s,delay:0,run:c,finger:ie,controls:{onClose:f,close:$(g),reset:$(t.h-g)},onDragging:a=>{i.current=a}})})]})}function be(e,t=60){const o=-Math.log(.01)/e,s=o*Math.sqrt(1-e*e),u=n=>1-Math.exp(-e*o*n)*(Math.cos(s*n)+e*o/s*Math.sin(s*n));return`linear(${Array.from({length:t+1},(n,i)=>(i===t?1:u(i/t)).toFixed(4)).join(", ")})`}const q=`
.wb-stage { position: relative; }
.wb-stage > img { display: block; transition: opacity 360ms ease, filter 360ms ease; }
.wb-stage > img.wb-washed { ${re==="dark"?"filter: brightness(0.6) saturate(0.85);":"opacity: 0.4;"} }
.wb-overlay { position: absolute; left: 0; top: 0; z-index: 6; pointer-events: none; }
.wb-overlay.is-closed { visibility: hidden; }
.wb-marks { position: absolute; left: 0; top: 0; overflow: visible; }
.wb-marks circle, .wb-marks line { transition: opacity 200ms ease; }
/* back smoothly; out on a spring (or, without linear(), one overshoot) */
.wb-bubble {
  position: absolute;
  transform-origin: 50% 50%;
  transition: transform 380ms cubic-bezier(0.5, 0, 0.3, 1);
  will-change: transform;
}
.wb-bubble.is-out {
  transition: transform 560ms cubic-bezier(0.34, 1.5, 0.64, 1);
  transition: transform 700ms ${be(.55)};
}
.wb-disc {
  position: absolute; inset: 0; border-radius: 50%; overflow: hidden;
  background: radial-gradient(ellipse at 30% 22%, #ffffff 0%, #f9f9f6 55%, #efeee8 100%);
  box-shadow: 0 0 0 2px ${v}, 0 18px 44px rgba(0, 0, 0, 0.2);
}
.wb-photo {
  position: absolute; inset: 0;
  background-image: url("${oe}");
  background-repeat: no-repeat;
  transition: opacity 300ms ease;
}
.wb-live { position: absolute; inset: 0; transition: opacity 300ms ease; }
.wb-live svg { display: block; filter: url(#wb-marker); }
.wb-ribbon {
  position: absolute; left: 0; top: 0; overflow: visible; pointer-events: none;
  transform-origin: 50% 50%;
  transition: opacity 280ms ease, transform 420ms cubic-bezier(0.3, 1.5, 0.5, 1);
}
.wb-reset {
  position: absolute; left: 50%; bottom: -13px; translate: -50% 0;
  width: 26px; height: 26px; padding: 0; border-radius: 50%;
  border: 1.5px solid ${v}; background: white; color: ${v};
  font-size: 15px; line-height: 1; cursor: pointer;
  transition: opacity 240ms ease, background 160ms ease, color 160ms ease;
}
.wb-reset:hover { background: ${v}; color: white; }
.wb-hint { white-space: nowrap; }
.ink-draw { stroke-dasharray: 1; stroke-dashoffset: 1; animation: ink-draw 300ms ease-out forwards; }
@keyframes ink-draw { to { stroke-dashoffset: 0; } }
@media (prefers-reduced-motion: reduce) {
  .wb-bubble, .wb-bubble.is-out { transition: opacity 220ms ease; }
}
`,me=`
.wb-tap-stage { cursor: pointer; -webkit-tap-highlight-color: transparent; }
.wb-tag {
  position: absolute;
  font: 0.8rem/1.1 "Cutive Mono", "Courier New", monospace; text-align: center;
  color: white; background: ${v}; border-radius: 4px; padding: 0.2em 0.45em;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.25);
  transition: opacity 200ms ease;
}
.wb-tap .wb-reset, .wb-close {
  position: absolute; bottom: auto; translate: -50% -50%;
  width: 36px; height: 36px; padding: 0; border-radius: 50%;
  border: 1.5px solid ${v}; background: white; color: ${v};
  font-size: 19px; line-height: 1; cursor: pointer;
  display: grid; place-items: center;
  transition: opacity 240ms ease, background 160ms ease, color 160ms ease;
}
.wb-tap .wb-reset::after, .wb-close::after { content: ""; position: absolute; inset: -6px; border-radius: 50%; }
.wb-tap .wb-reset:hover { background: white; color: ${v}; }
.wb-tap .wb-reset:active, .wb-close:active { background: ${v}; color: white; }
`,fe=e=>`
<svg width="0" height="0" style="position:absolute" aria-hidden="true">
  <filter id="wb-marker" ${e?'x="-5%" y="-5%" width="110%" height="110%"':'filterUnits="userSpaceOnUse" x="-500" y="-500" width="4000" height="4000"'}>
    <feTurbulence type="fractalNoise" baseFrequency="0.045" numOctaves="2" seed="7" result="n" />
    <feDisplacementMap in="SourceGraphic" in2="n" scale="3.2" xChannelSelector="R" yChannelSelector="G" />
  </filter>
</svg>`;async function we(e=document.querySelector("figure.whiteboard")){const o=!matchMedia("(hover: hover) and (pointer: fine)").matches,s=e?.querySelector("img");if(!s)return;const u=document.createElement("style");u.textContent=o?q+me:q,document.head.append(u);const c=document.createElement("link");c.rel="stylesheet",c.href="https://fonts.googleapis.com/css2?family=Gochi+Hand&display=swap",document.head.append(c),document.body.insertAdjacentHTML("beforeend",fe(o)),s.complete||await new Promise(w=>s.addEventListener("load",w,{once:!0})),await document.fonts.ready;const n=document.createElement("div");n.className=o?"wb-stage wb-tap-stage":"wb-stage",s.replaceWith(n),n.append(s);const i=document.createElement("div");if(n.append(i),Z.createRoot(i).render(o?r.jsx(pe,{img:s}):r.jsx(ue,{img:s})),o){se(n);return}const h=s.closest("figure").querySelector("figcaption"),l=' <span class="wb-hint">Hover over it to pick up two of its sketches.</span>',p=h?.querySelector(".wb-hint-before");p?p.insertAdjacentHTML("beforebegin",l):h?.insertAdjacentHTML("beforeend",l)}we(document.getElementById("whiteboard-figure"));
