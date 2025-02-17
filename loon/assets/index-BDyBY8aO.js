(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))i(a);new MutationObserver(a=>{for(const n of a)if(n.type==="childList")for(const s of n.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function r(a){const n={};return a.integrity&&(n.integrity=a.integrity),a.referrerPolicy&&(n.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?n.credentials="include":a.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function i(a){if(a.ep)return;a.ep=!0;const n=r(a);fetch(a.href,n)}})();var Fe,P,qt,le,St,Ht,Gt,Vt,st,Je,Ze,Wt,xe={},Kt=[],Dn=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i,at=Array.isArray;function oe(e,t){for(var r in t)e[r]=t[r];return e}function ct(e){e&&e.parentNode&&e.parentNode.removeChild(e)}function kn(e,t,r){var i,a,n,s={};for(n in t)n=="key"?i=t[n]:n=="ref"?a=t[n]:s[n]=t[n];if(arguments.length>2&&(s.children=arguments.length>3?Fe.call(arguments,2):r),typeof e=="function"&&e.defaultProps!=null)for(n in e.defaultProps)s[n]===void 0&&(s[n]=e.defaultProps[n]);return Ce(e,s,i,a,null)}function Ce(e,t,r,i,a){var n={type:e,props:t,key:r,ref:i,__k:null,__:null,__b:0,__e:null,__c:null,constructor:void 0,__v:a??++qt,__i:-1,__u:0};return a==null&&P.vnode!=null&&P.vnode(n),n}function je(e){return e.children}function Oe(e,t){this.props=e,this.context=t}function ve(e,t){if(t==null)return e.__?ve(e.__,e.__i+1):null;for(var r;t<e.__k.length;t++)if((r=e.__k[t])!=null&&r.__e!=null)return r.__e;return typeof e.type=="function"?ve(e):null}function zt(e){var t,r;if((e=e.__)!=null&&e.__c!=null){for(e.__e=e.__c.base=null,t=0;t<e.__k.length;t++)if((r=e.__k[t])!=null&&r.__e!=null){e.__e=e.__c.base=r.__e;break}return zt(e)}}function Qe(e){(!e.__d&&(e.__d=!0)&&le.push(e)&&!Me.__r++||St!==P.debounceRendering)&&((St=P.debounceRendering)||Ht)(Me)}function Me(){for(var e,t,r,i,a,n,s,d=1;le.length;)le.length>d&&le.sort(Gt),e=le.shift(),d=le.length,e.__d&&(r=void 0,a=(i=(t=e).__v).__e,n=[],s=[],t.__P&&((r=oe({},i)).__v=i.__v+1,P.vnode&&P.vnode(r),ut(t.__P,r,i,t.__n,t.__P.namespaceURI,32&i.__u?[a]:null,n,a??ve(i),!!(32&i.__u),s),r.__v=i.__v,r.__.__k[r.__i]=r,Jt(n,r,s),r.__e!=a&&zt(r)));Me.__r=0}function Xt(e,t,r,i,a,n,s,d,p,f,v){var u,w,y,D,L,A,k=i&&i.__k||Kt,x=t.length;for(p=Nn(r,t,k,p,x),u=0;u<x;u++)(y=r.__k[u])!=null&&(w=y.__i===-1?xe:k[y.__i]||xe,y.__i=u,A=ut(e,y,w,a,n,s,d,p,f,v),D=y.__e,y.ref&&w.ref!=y.ref&&(w.ref&&lt(w.ref,null,y),v.push(y.ref,y.__c||D,y)),L==null&&D!=null&&(L=D),4&y.__u||w.__k===y.__k?p=Yt(y,p,e):typeof y.type=="function"&&A!==void 0?p=A:D&&(p=D.nextSibling),y.__u&=-7);return r.__e=L,p}function Nn(e,t,r,i,a){var n,s,d,p,f,v=r.length,u=v,w=0;for(e.__k=new Array(a),n=0;n<a;n++)(s=t[n])!=null&&typeof s!="boolean"&&typeof s!="function"?(p=n+w,(s=e.__k[n]=typeof s=="string"||typeof s=="number"||typeof s=="bigint"||s.constructor==String?Ce(null,s,null,null,null):at(s)?Ce(je,{children:s},null,null,null):s.constructor===void 0&&s.__b>0?Ce(s.type,s.props,s.key,s.ref?s.ref:null,s.__v):s).__=e,s.__b=e.__b+1,d=null,(f=s.__i=In(s,r,p,u))!==-1&&(u--,(d=r[f])&&(d.__u|=2)),d==null||d.__v===null?(f==-1&&w--,typeof s.type!="function"&&(s.__u|=4)):f!=p&&(f==p-1?w--:f==p+1?w++:(f>p?w--:w++,s.__u|=4))):e.__k[n]=null;if(u)for(n=0;n<v;n++)(d=r[n])!=null&&!(2&d.__u)&&(d.__e==i&&(i=ve(d)),Zt(d,d));return i}function Yt(e,t,r){var i,a;if(typeof e.type=="function"){for(i=e.__k,a=0;i&&a<i.length;a++)i[a]&&(i[a].__=e,t=Yt(i[a],t,r));return t}e.__e!=t&&(t&&e.type&&!r.contains(t)&&(t=ve(e)),r.insertBefore(e.__e,t||null),t=e.__e);do t=t&&t.nextSibling;while(t!=null&&t.nodeType==8);return t}function In(e,t,r,i){var a,n,s=e.key,d=e.type,p=t[r];if(p===null||p&&s==p.key&&d===p.type&&!(2&p.__u))return r;if(i>(p!=null&&!(2&p.__u)?1:0))for(a=r-1,n=r+1;a>=0||n<t.length;){if(a>=0){if((p=t[a])&&!(2&p.__u)&&s==p.key&&d===p.type)return a;a--}if(n<t.length){if((p=t[n])&&!(2&p.__u)&&s==p.key&&d===p.type)return n;n++}}return-1}function Dt(e,t,r){t[0]=="-"?e.setProperty(t,r??""):e[t]=r==null?"":typeof r!="number"||Dn.test(t)?r:r+"px"}function Le(e,t,r,i,a){var n;e:if(t=="style")if(typeof r=="string")e.style.cssText=r;else{if(typeof i=="string"&&(e.style.cssText=i=""),i)for(t in i)r&&t in r||Dt(e.style,t,"");if(r)for(t in r)i&&r[t]===i[t]||Dt(e.style,t,r[t])}else if(t[0]=="o"&&t[1]=="n")n=t!=(t=t.replace(Vt,"$1")),t=t.toLowerCase()in e||t=="onFocusOut"||t=="onFocusIn"?t.toLowerCase().slice(2):t.slice(2),e.l||(e.l={}),e.l[t+n]=r,r?i?r.t=i.t:(r.t=st,e.addEventListener(t,n?Ze:Je,n)):e.removeEventListener(t,n?Ze:Je,n);else{if(a=="http://www.w3.org/2000/svg")t=t.replace(/xlink(H|:h)/,"h").replace(/sName$/,"s");else if(t!="width"&&t!="height"&&t!="href"&&t!="list"&&t!="form"&&t!="tabIndex"&&t!="download"&&t!="rowSpan"&&t!="colSpan"&&t!="role"&&t!="popover"&&t in e)try{e[t]=r??"";break e}catch{}typeof r=="function"||(r==null||r===!1&&t[4]!="-"?e.removeAttribute(t):e.setAttribute(t,t=="popover"&&r==1?"":r))}}function kt(e){return function(t){if(this.l){var r=this.l[t.type+e];if(t.u==null)t.u=st++;else if(t.u<r.t)return;return r(P.event?P.event(t):t)}}}function ut(e,t,r,i,a,n,s,d,p,f){var v,u,w,y,D,L,A,k,x,N,T,F,U,I,B,M,X,q=t.type;if(t.constructor!==void 0)return null;128&r.__u&&(p=!!(32&r.__u),n=[d=t.__e=r.__e]),(v=P.__b)&&v(t);e:if(typeof q=="function")try{if(k=t.props,x="prototype"in q&&q.prototype.render,N=(v=q.contextType)&&i[v.__c],T=v?N?N.props.value:v.__:i,r.__c?A=(u=t.__c=r.__c).__=u.__E:(x?t.__c=u=new q(k,T):(t.__c=u=new Oe(k,T),u.constructor=q,u.render=Tn),N&&N.sub(u),u.props=k,u.state||(u.state={}),u.context=T,u.__n=i,w=u.__d=!0,u.__h=[],u._sb=[]),x&&u.__s==null&&(u.__s=u.state),x&&q.getDerivedStateFromProps!=null&&(u.__s==u.state&&(u.__s=oe({},u.__s)),oe(u.__s,q.getDerivedStateFromProps(k,u.__s))),y=u.props,D=u.state,u.__v=t,w)x&&q.getDerivedStateFromProps==null&&u.componentWillMount!=null&&u.componentWillMount(),x&&u.componentDidMount!=null&&u.__h.push(u.componentDidMount);else{if(x&&q.getDerivedStateFromProps==null&&k!==y&&u.componentWillReceiveProps!=null&&u.componentWillReceiveProps(k,T),!u.__e&&(u.shouldComponentUpdate!=null&&u.shouldComponentUpdate(k,u.__s,T)===!1||t.__v==r.__v)){for(t.__v!=r.__v&&(u.props=k,u.state=u.__s,u.__d=!1),t.__e=r.__e,t.__k=r.__k,t.__k.some(function(S){S&&(S.__=t)}),F=0;F<u._sb.length;F++)u.__h.push(u._sb[F]);u._sb=[],u.__h.length&&s.push(u);break e}u.componentWillUpdate!=null&&u.componentWillUpdate(k,u.__s,T),x&&u.componentDidUpdate!=null&&u.__h.push(function(){u.componentDidUpdate(y,D,L)})}if(u.context=T,u.props=k,u.__P=e,u.__e=!1,U=P.__r,I=0,x){for(u.state=u.__s,u.__d=!1,U&&U(t),v=u.render(u.props,u.state,u.context),B=0;B<u._sb.length;B++)u.__h.push(u._sb[B]);u._sb=[]}else do u.__d=!1,U&&U(t),v=u.render(u.props,u.state,u.context),u.state=u.__s;while(u.__d&&++I<25);u.state=u.__s,u.getChildContext!=null&&(i=oe(oe({},i),u.getChildContext())),x&&!w&&u.getSnapshotBeforeUpdate!=null&&(L=u.getSnapshotBeforeUpdate(y,D)),d=Xt(e,at(M=v!=null&&v.type===je&&v.key==null?v.props.children:v)?M:[M],t,r,i,a,n,s,d,p,f),u.base=t.__e,t.__u&=-161,u.__h.length&&s.push(u),A&&(u.__E=u.__=null)}catch(S){if(t.__v=null,p||n!=null)if(S.then){for(t.__u|=p?160:128;d&&d.nodeType==8&&d.nextSibling;)d=d.nextSibling;n[n.indexOf(d)]=null,t.__e=d}else for(X=n.length;X--;)ct(n[X]);else t.__e=r.__e,t.__k=r.__k;P.__e(S,t,r)}else n==null&&t.__v==r.__v?(t.__k=r.__k,t.__e=r.__e):d=t.__e=An(r.__e,t,r,i,a,n,s,p,f);return(v=P.diffed)&&v(t),128&t.__u?void 0:d}function Jt(e,t,r){for(var i=0;i<r.length;i++)lt(r[i],r[++i],r[++i]);P.__c&&P.__c(t,e),e.some(function(a){try{e=a.__h,a.__h=[],e.some(function(n){n.call(a)})}catch(n){P.__e(n,a.__v)}})}function An(e,t,r,i,a,n,s,d,p){var f,v,u,w,y,D,L,A=r.props,k=t.props,x=t.type;if(x=="svg"?a="http://www.w3.org/2000/svg":x=="math"?a="http://www.w3.org/1998/Math/MathML":a||(a="http://www.w3.org/1999/xhtml"),n!=null){for(f=0;f<n.length;f++)if((y=n[f])&&"setAttribute"in y==!!x&&(x?y.localName==x:y.nodeType==3)){e=y,n[f]=null;break}}if(e==null){if(x==null)return document.createTextNode(k);e=document.createElementNS(a,x,k.is&&k),d&&(P.__m&&P.__m(t,n),d=!1),n=null}if(x===null)A===k||d&&e.data===k||(e.data=k);else{if(n=n&&Fe.call(e.childNodes),A=r.props||xe,!d&&n!=null)for(A={},f=0;f<e.attributes.length;f++)A[(y=e.attributes[f]).name]=y.value;for(f in A)if(y=A[f],f!="children"){if(f=="dangerouslySetInnerHTML")u=y;else if(!(f in k)){if(f=="value"&&"defaultValue"in k||f=="checked"&&"defaultChecked"in k)continue;Le(e,f,null,y,a)}}for(f in k)y=k[f],f=="children"?w=y:f=="dangerouslySetInnerHTML"?v=y:f=="value"?D=y:f=="checked"?L=y:d&&typeof y!="function"||A[f]===y||Le(e,f,y,A[f],a);if(v)d||u&&(v.__html===u.__html||v.__html===e.innerHTML)||(e.innerHTML=v.__html),t.__k=[];else if(u&&(e.innerHTML=""),Xt(t.type==="template"?e.content:e,at(w)?w:[w],t,r,i,x=="foreignObject"?"http://www.w3.org/1999/xhtml":a,n,s,n?n[0]:r.__k&&ve(r,0),d,p),n!=null)for(f=n.length;f--;)ct(n[f]);d||(f="value",x=="progress"&&D==null?e.removeAttribute("value"):D!==void 0&&(D!==e[f]||x=="progress"&&!D||x=="option"&&D!==A[f])&&Le(e,f,D,A[f],a),f="checked",L!==void 0&&L!==e[f]&&Le(e,f,L,A[f],a))}return e}function lt(e,t,r){try{if(typeof e=="function"){var i=typeof e.__u=="function";i&&e.__u(),i&&t==null||(e.__u=e(t))}else e.current=t}catch(a){P.__e(a,r)}}function Zt(e,t,r){var i,a;if(P.unmount&&P.unmount(e),(i=e.ref)&&(i.current&&i.current!==e.__e||lt(i,null,t)),(i=e.__c)!=null){if(i.componentWillUnmount)try{i.componentWillUnmount()}catch(n){P.__e(n,t)}i.base=i.__P=null}if(i=e.__k)for(a=0;a<i.length;a++)i[a]&&Zt(i[a],t,r||typeof e.type!="function");r||ct(e.__e),e.__c=e.__=e.__e=void 0}function Tn(e,t,r){return this.constructor(e,r)}function Pn(e,t,r){var i,a,n,s;t==document&&(t=document.documentElement),P.__&&P.__(e,t),a=(i=!1)?null:t.__k,n=[],s=[],ut(t,e=t.__k=kn(je,null,[e]),a||xe,xe,t.namespaceURI,a?null:t.firstChild?Fe.call(t.childNodes):null,n,a?a.__e:t.firstChild,i,s),Jt(n,e,s)}function Ln(e){function t(r){var i,a;return this.getChildContext||(i=new Set,(a={})[t.__c]=this,this.getChildContext=function(){return a},this.componentWillUnmount=function(){i=null},this.shouldComponentUpdate=function(n){this.props.value!==n.value&&i.forEach(function(s){s.__e=!0,Qe(s)})},this.sub=function(n){i.add(n);var s=n.componentWillUnmount;n.componentWillUnmount=function(){i&&i.delete(n),s&&s.call(n)}}),r.children}return t.__c="__cC"+Wt++,t.__=e,t.Provider=t.__l=(t.Consumer=function(r,i){return r.children(i)}).contextType=t,t}Fe=Kt.slice,P={__e:function(e,t,r,i){for(var a,n,s;t=t.__;)if((a=t.__c)&&!a.__)try{if((n=a.constructor)&&n.getDerivedStateFromError!=null&&(a.setState(n.getDerivedStateFromError(e)),s=a.__d),a.componentDidCatch!=null&&(a.componentDidCatch(e,i||{}),s=a.__d),s)return a.__E=a}catch(d){e=d}throw e}},qt=0,Oe.prototype.setState=function(e,t){var r;r=this.__s!=null&&this.__s!==this.state?this.__s:this.__s=oe({},this.state),typeof e=="function"&&(e=e(oe({},r),this.props)),e&&oe(r,e),e!=null&&this.__v&&(t&&this._sb.push(t),Qe(this))},Oe.prototype.forceUpdate=function(e){this.__v&&(this.__e=!0,e&&this.__h.push(e),Qe(this))},Oe.prototype.render=je,le=[],Ht=typeof Promise=="function"?Promise.prototype.then.bind(Promise.resolve()):setTimeout,Gt=function(e,t){return e.__v.__b-t.__v.__b},Me.__r=0,Vt=/(PointerCapture)$|Capture$/i,st=0,Je=kt(!1),Ze=kt(!0),Wt=0;var Cn=0;function E(e,t,r,i,a,n){t||(t={});var s,d,p=t;if("ref"in p)for(d in p={},t)d=="ref"?s=t[d]:p[d]=t[d];var f={type:e,props:p,key:r,ref:s,__k:null,__:null,__b:0,__e:null,__c:null,constructor:void 0,__v:--Cn,__i:-1,__u:0,__source:a,__self:n};if(typeof e=="function"&&(s=e.defaultProps))for(d in s)p[d]===void 0&&(p[d]=s[d]);return P.vnode&&P.vnode(f),f}var we,O,ze,Nt,Se=0,Qt=[],$=P,It=$.__b,At=$.__r,Tt=$.diffed,Pt=$.__c,Lt=$.unmount,Ct=$.__;function Ue(e,t){$.__h&&$.__h(O,e,Se||t),Se=0;var r=O.__H||(O.__H={__:[],__h:[]});return e>=r.__.length&&r.__.push({}),r.__[e]}function be(e){return Se=1,en(rn,e)}function en(e,t,r){var i=Ue(we++,2);if(i.t=e,!i.__c&&(i.__=[rn(void 0,t),function(d){var p=i.__N?i.__N[0]:i.__[0],f=i.t(p,d);p!==f&&(i.__N=[f,i.__[1]],i.__c.setState({}))}],i.__c=O,!O.__f)){var a=function(d,p,f){if(!i.__c.__H)return!0;var v=i.__c.__H.__.filter(function(w){return!!w.__c});if(v.every(function(w){return!w.__N}))return!n||n.call(this,d,p,f);var u=i.__c.props!==d;return v.forEach(function(w){if(w.__N){var y=w.__[0];w.__=w.__N,w.__N=void 0,y!==w.__[0]&&(u=!0)}}),n&&n.call(this,d,p,f)||u};O.__f=!0;var n=O.shouldComponentUpdate,s=O.componentWillUpdate;O.componentWillUpdate=function(d,p,f){if(this.__e){var v=n;n=void 0,a(d,p,f),n=v}s&&s.call(this,d,p,f)},O.shouldComponentUpdate=a}return i.__N||i.__}function J(e,t){var r=Ue(we++,3);!$.__s&&nn(r.__H,t)&&(r.__=e,r.u=t,O.__H.__h.push(r))}function Re(e){return Se=5,tn(function(){return{current:e}},[])}function tn(e,t){var r=Ue(we++,7);return nn(r.__H,t)&&(r.__=e(),r.__H=t,r.__h=e),r.__}function H(e,t){return Se=8,tn(function(){return e},t)}function dt(e){var t=O.context[e.__c],r=Ue(we++,9);return r.c=e,t?(r.__==null&&(r.__=!0,t.sub(O)),t.props.value):e.__}function On(){for(var e;e=Qt.shift();)if(e.__P&&e.__H)try{e.__H.__h.forEach(Be),e.__H.__h.forEach(et),e.__H.__h=[]}catch(t){e.__H.__h=[],$.__e(t,e.__v)}}$.__b=function(e){O=null,It&&It(e)},$.__=function(e,t){e&&t.__k&&t.__k.__m&&(e.__m=t.__k.__m),Ct&&Ct(e,t)},$.__r=function(e){At&&At(e),we=0;var t=(O=e.__c).__H;t&&(ze===O?(t.__h=[],O.__h=[],t.__.forEach(function(r){r.__N&&(r.__=r.__N),r.u=r.__N=void 0})):(t.__h.forEach(Be),t.__h.forEach(et),t.__h=[],we=0)),ze=O},$.diffed=function(e){Tt&&Tt(e);var t=e.__c;t&&t.__H&&(t.__H.__h.length&&(Qt.push(t)!==1&&Nt===$.requestAnimationFrame||((Nt=$.requestAnimationFrame)||Bn)(On)),t.__H.__.forEach(function(r){r.u&&(r.__H=r.u),r.u=void 0})),ze=O=null},$.__c=function(e,t){t.some(function(r){try{r.__h.forEach(Be),r.__h=r.__h.filter(function(i){return!i.__||et(i)})}catch(i){t.some(function(a){a.__h&&(a.__h=[])}),t=[],$.__e(i,r.__v)}}),Pt&&Pt(e,t)},$.unmount=function(e){Lt&&Lt(e);var t,r=e.__c;r&&r.__H&&(r.__H.__.forEach(function(i){try{Be(i)}catch(a){t=a}}),r.__H=void 0,t&&$.__e(t,r.__v))};var Ot=typeof requestAnimationFrame=="function";function Bn(e){var t,r=function(){clearTimeout(i),Ot&&cancelAnimationFrame(t),setTimeout(e)},i=setTimeout(r,100);Ot&&(t=requestAnimationFrame(r))}function Be(e){var t=O,r=e.__c;typeof r=="function"&&(e.__c=void 0,r()),O=t}function et(e){var t=O;e.__c=e.__(),O=t}function nn(e,t){return!e||e.length!==t.length||t.some(function(r,i){return r!==e[i]})}function rn(e,t){return typeof t=="function"?t(e):t}function Y(e,t){return{content:e,source:t,timestamp:new Date}}function $n(){const e=new Map,t={id:"root",message:Y("You are in a twisty maze of weltanschauungen all alike","system"),children:["q1","q2","q3","q4","q5"],isEdited:!1};e.set("root",t);const r={id:"q1",message:Y("Is the ontology of tlon uqbar orbis tertius truly truly truly contagious?","human"),parent:"root",children:["a1"],isEdited:!1};e.set("q1",r);const i={id:"a1",message:Y("The aurora borealis occurs when charged particles from the Sun collide with Earth's atmosphere. These particles are guided by our planet's magnetic field toward the poles, creating stunning displays of light when they interact with atmospheric gases.","model"),parent:"q1",children:[],isEdited:!1};e.set("a1",i);const a={id:"q2",message:Y("Must the sun collide into itself?","human"),parent:"root",children:["a2"],isEdited:!1};e.set("q2",a);const n={id:"a2",message:Y("Such a thing must not be","model"),parent:"q2",children:[],isEdited:!1};e.set("a2",n);const s={id:"q3",message:Y("What is the difference between a camel and a child?","human"),parent:"root",children:["a3"],isEdited:!1};e.set("q3",s);const d={id:"a3",message:Y("The cloud of unknowing decends nightly","model"),parent:"q3",children:[],isEdited:!1};e.set("a3",d);const p={id:"q4",message:Y("Where do leaden circles dissolve in the air?","human"),parent:"root",children:["a4"],isEdited:!1};e.set("q4",p);const f={id:"a4",message:Y("HARK;","model"),parent:"q4",children:[],isEdited:!1};e.set("a4",f);const v={id:"q5",message:Y("describe the weight of winter","human"),parent:"root",children:["a5"],isEdited:!1};e.set("q5",v);const u={id:"a5",message:Y("The weight of winter is a physical and metaphysical force that","model"),parent:"q5",children:[],isEdited:!1};return e.set("a5",u),e}const on={loom:{nodes:$n(),root:"root"},viewState:{viewType:"forest",themeMode:"dark",currentPath:["root"],expanded:new Set(["root","post1","post2","post3"]),focus:{commandBar:!1,selectedNode:null}},config:{apiKeys:{},modelCards:{go:{name:"Llama 3.3 70B Instruct",model:"meta-llama/llama-3.3-70b-instruct:free",format:"chat",endpoint:"https://openrouter.ai/api/v1/chat/completions",parameters:{temperature:.7,max_tokens:1e3}}},navigation:{circularSiblings:!0}},pending:new Set},qe=Ln({state:on,dispatch:()=>{console.warn("StoreContext not initialized")}});function fe(){const e=dt(qe);if(!e)throw new Error("useStore must be used within a StoreProvider");return e}function Mn(e,t){var r;switch(t.type){case"LOAD_NODES":return{...e,loom:{...e.loom,nodes:t.nodes}};case"LOAD_VIEW_STATE":{const i=new Set(t.viewState.expanded);return{...e,viewState:{...t.viewState,expanded:i}}}case"NAVIGATE_SIBLING":{const i=t.nodeId;console.log("NAVIGATE_SIBLING - Current node:",i);const a=(r=e.loom.nodes.get(i))==null?void 0:r.parent;if(console.log("NAVIGATE_SIBLING - Parent ID:",a),!a)return console.log("NAVIGATE_SIBLING - No parent found, returning"),e;const n=e.loom.nodes.get(a);if(console.log("NAVIGATE_SIBLING - Parent node:",n),!n)return console.log("NAVIGATE_SIBLING - Parent node not found, returning"),e;const s=n.children,d=s.indexOf(i);if(console.log("NAVIGATE_SIBLING - Siblings:",s),console.log("NAVIGATE_SIBLING - Current index:",d),d===-1)return console.log("NAVIGATE_SIBLING - Current node not found in siblings, returning"),e;let p;t.direction==="next"?p=e.config.navigation.circularSiblings?(d+1)%s.length:Math.min(d+1,s.length-1):p=e.config.navigation.circularSiblings?(d-1+s.length)%s.length:Math.max(d-1,0),console.log("NAVIGATE_SIBLING - New index:",p),console.log("NAVIGATE_SIBLING - New sibling:",s[p]);const f=e.viewState.currentPath.indexOf(i);if(f===-1)return console.log("NAVIGATE_SIBLING - Node not found in current path, returning"),e;const v=e.viewState.currentPath.slice(0,f),u=s[p];v.push(u);let w=u;for(;;){const y=e.loom.nodes.get(w);if(!y||y.children.length===0)break;w=y.children[0],v.push(w)}return console.log("NAVIGATE_SIBLING - New path:",v),{...e,viewState:{...e.viewState,currentPath:v,focus:{...e.viewState.focus,selectedNode:u}}}}case"NAVIGATE_VERTICAL":{const i=[...e.viewState.currentPath];if(t.direction==="up")i.length>1&&i.pop();else{const a=e.loom.nodes.get(i[i.length-1]);a&&a.children.length>0&&i.push(a.children[0])}return{...e,viewState:{...e.viewState,currentPath:i}}}case"FOCUS_NODE":{const i=[];let a=t.id;for(;a;){i.unshift(a);const n=e.loom.nodes.get(a);a=n==null?void 0:n.parent}return{...e,viewState:{...e.viewState,currentPath:i,focus:{commandBar:!1,selectedNode:t.id}}}}case"FOCUS_COMMAND_BAR":return{...e,viewState:{...e.viewState,focus:{...e.viewState.focus,commandBar:!0}}};case"EDIT_NODE":{const i=e.loom.nodes.get(t.id);if(!i)return e;if(i.children.length>0){const n=crypto.randomUUID(),s=i.parent;if(!s)return e;const d=e.loom.nodes.get(s);if(!d)return e;const p={...i,id:n,message:{...i.message,content:t.content,timestamp:new Date},children:[],isEdited:!0},f=new Map(e.loom.nodes);f.set(n,p);const v=[...d.children],u=v.indexOf(t.id);return v.splice(u+1,0,n),f.set(s,{...d,children:v}),{...e,loom:{...e.loom,nodes:f}}}const a=new Map(e.loom.nodes);return a.set(t.id,{...i,message:{...i.message,content:t.content,timestamp:new Date}}),{...e,loom:{...e.loom,nodes:a}}}case"CREATE_CHILD_NODE":{const i=e.loom.nodes.get(t.parentId);if(!i)return e;const a=crypto.randomUUID(),n=new Map(e.loom.nodes);return n.set(a,{id:a,message:{content:"",source:"human",timestamp:new Date},parent:t.parentId,children:[],isEdited:!1}),n.set(t.parentId,{...i,children:[...i.children,a]}),{...e,loom:{...e.loom,nodes:n},viewState:{...e.viewState,expanded:new Set([...e.viewState.expanded,t.parentId]),focus:{...e.viewState.focus,selectedNode:a}}}}case"DELETE_NODE":{const i=e.loom.nodes.get(t.id);if(!i||!i.parent)return e;const a=e.loom.nodes.get(i.parent);if(!a)return e;const n=new Map(e.loom.nodes);n.delete(t.id);const s=a.children.filter(d=>d!==t.id);return n.set(i.parent,{...a,children:s}),{...e,loom:{...e.loom,nodes:n},viewState:{...e.viewState,focus:{...e.viewState.focus,selectedNode:i.parent}}}}case"ENTER_EDIT_MODE":return window.dispatchEvent(new CustomEvent("ENTER_EDIT_MODE",{detail:{id:t.id}})),e;case"SET_NODE_EXPANDED":{const i=new Set(e.viewState.expanded);return t.expanded?i.add(t.id):i.delete(t.id),{...e,viewState:{...e.viewState,expanded:i}}}case"SET_VIEW_TYPE":return{...e,viewState:{...e.viewState,viewType:t.viewType}};case"TOGGLE_THEME":return{...e,viewState:{...e.viewState,themeMode:e.viewState.themeMode==="dark"?"light":"dark"}};case"ADD_MODEL_RESPONSES":{const i=e.loom.nodes.get(t.parentId);if(!i)return e;const a=new Map(e.loom.nodes),n=[];return t.responses.forEach(s=>{const d=crypto.randomUUID();a.set(d,{id:d,message:{content:s,source:"model",timestamp:new Date},parent:t.parentId,children:[],isEdited:!1}),n.push(d)}),a.set(t.parentId,{...i,children:[...i.children,...n]}),{...e,loom:{...e.loom,nodes:a},viewState:{...e.viewState,expanded:new Set([...e.viewState.expanded,t.parentId])}}}case"SET_NODE_PENDING":{const i=new Set(e.pending);return t.isPending?i.add(t.nodeId):i.delete(t.nodeId),{...e,pending:i}}case"ADD_PLACEHOLDER_NODE":{const i=e.loom.nodes.get(t.parentId);if(!i)return e;const a=new Map(e.loom.nodes);return a.set(t.nodeId,{id:t.nodeId,message:{content:"",source:"model",timestamp:new Date,metadata:{isPlaceholder:!0}},parent:t.parentId,children:[],isEdited:!1}),a.set(t.parentId,{...i,children:[...i.children,t.nodeId]}),{...e,loom:{...e.loom,nodes:a},viewState:{...e.viewState,expanded:new Set([...e.viewState.expanded,t.parentId])}}}case"REPLACE_PLACEHOLDER_NODE":{const i=e.loom.nodes.get(t.nodeId);if(!i)return e;const a=new Map(e.loom.nodes);return a.set(t.nodeId,{id:t.nodeId,parent:i.parent,children:i.children,isEdited:!1,message:{content:t.content,source:"model",timestamp:new Date,metadata:t.isError?{isError:!0}:void 0}}),{...e,loom:{...e.loom,nodes:a}}}default:return e}}const tt=(e,t)=>t.some(r=>e instanceof r);let Bt,$t;function Rn(){return Bt||(Bt=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Fn(){return $t||($t=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const nt=new WeakMap,Xe=new WeakMap,He=new WeakMap;function jn(e){const t=new Promise((r,i)=>{const a=()=>{e.removeEventListener("success",n),e.removeEventListener("error",s)},n=()=>{r(de(e.result)),a()},s=()=>{i(e.error),a()};e.addEventListener("success",n),e.addEventListener("error",s)});return He.set(t,e),t}function Un(e){if(nt.has(e))return;const t=new Promise((r,i)=>{const a=()=>{e.removeEventListener("complete",n),e.removeEventListener("error",s),e.removeEventListener("abort",s)},n=()=>{r(),a()},s=()=>{i(e.error||new DOMException("AbortError","AbortError")),a()};e.addEventListener("complete",n),e.addEventListener("error",s),e.addEventListener("abort",s)});nt.set(e,t)}let rt={get(e,t,r){if(e instanceof IDBTransaction){if(t==="done")return nt.get(e);if(t==="store")return r.objectStoreNames[1]?void 0:r.objectStore(r.objectStoreNames[0])}return de(e[t])},set(e,t,r){return e[t]=r,!0},has(e,t){return e instanceof IDBTransaction&&(t==="done"||t==="store")?!0:t in e}};function sn(e){rt=e(rt)}function qn(e){return Fn().includes(e)?function(...t){return e.apply(ot(this),t),de(this.request)}:function(...t){return de(e.apply(ot(this),t))}}function Hn(e){return typeof e=="function"?qn(e):(e instanceof IDBTransaction&&Un(e),tt(e,Rn())?new Proxy(e,rt):e)}function de(e){if(e instanceof IDBRequest)return jn(e);if(Xe.has(e))return Xe.get(e);const t=Hn(e);return t!==e&&(Xe.set(e,t),He.set(t,e)),t}const ot=e=>He.get(e);function Gn(e,t,{blocked:r,upgrade:i,blocking:a,terminated:n}={}){const s=indexedDB.open(e,t),d=de(s);return i&&s.addEventListener("upgradeneeded",p=>{i(de(s.result),p.oldVersion,p.newVersion,de(s.transaction),p)}),r&&s.addEventListener("blocked",p=>r(p.oldVersion,p.newVersion,p)),d.then(p=>{n&&p.addEventListener("close",()=>n()),a&&p.addEventListener("versionchange",f=>a(f.oldVersion,f.newVersion,f))}).catch(()=>{}),d}const Vn=["get","getKey","getAll","getAllKeys","count"],Wn=["put","add","delete","clear"],Ye=new Map;function Mt(e,t){if(!(e instanceof IDBDatabase&&!(t in e)&&typeof t=="string"))return;if(Ye.get(t))return Ye.get(t);const r=t.replace(/FromIndex$/,""),i=t!==r,a=Wn.includes(r);if(!(r in(i?IDBIndex:IDBObjectStore).prototype)||!(a||Vn.includes(r)))return;const n=async function(s,...d){const p=this.transaction(s,a?"readwrite":"readonly");let f=p.store;return i&&(f=f.index(d.shift())),(await Promise.all([f[r](...d),a&&p.done]))[0]};return Ye.set(t,n),n}sn(e=>({...e,get:(t,r,i)=>Mt(t,r)||e.get(t,r,i),has:(t,r)=>!!Mt(t,r)||e.has(t,r)}));const Kn=["continue","continuePrimaryKey","advance"],Rt={},it=new WeakMap,an=new WeakMap,zn={get(e,t){if(!Kn.includes(t))return e[t];let r=Rt[t];return r||(r=Rt[t]=function(...i){it.set(this,an.get(this)[t](...i))}),r}};async function*Xn(...e){let t=this;if(t instanceof IDBCursor||(t=await t.openCursor(...e)),!t)return;t=t;const r=new Proxy(t,zn);for(an.set(r,t),He.set(r,ot(t));t;)yield r,t=await(it.get(r)||t.continue()),it.delete(r)}function Ft(e,t){return t===Symbol.asyncIterator&&tt(e,[IDBIndex,IDBObjectStore,IDBCursor])||t==="iterate"&&tt(e,[IDBIndex,IDBObjectStore])}sn(e=>({...e,get(t,r,i){return Ft(t,r)?Xn:e.get(t,r,i)},has(t,r){return Ft(t,r)||e.has(t,r)}}));const Yn="loon",Jn=2;async function Ge(){return Gn(Yn,Jn,{upgrade(e){e.objectStoreNames.contains("nodes")||e.createObjectStore("nodes",{keyPath:"id"}),e.objectStoreNames.contains("viewSettings")||e.createObjectStore("viewSettings")}})}async function Zn(e){const r=(await Ge()).transaction("nodes","readwrite"),i=r.objectStore("nodes");await i.clear();for(const[a,n]of e)await i.put(n);await r.done}async function Qn(){const t=await(await Ge()).getAll("nodes");return new Map(t.map(r=>[r.id,r]))}async function er(e){const r=(await Ge()).transaction("viewSettings","readwrite");await r.objectStore("viewSettings").put(e,"viewState"),await r.done}async function tr(){return await(await Ge()).get("viewSettings","viewState")||null}function nr({children:e}){const[t,r]=en(Mn,on);return J(()=>{Promise.all([Qn(),tr()]).then(([i,a])=>{i.size>0&&r({type:"LOAD_NODES",nodes:i}),a&&r({type:"LOAD_VIEW_STATE",viewState:a})}).catch(i=>{console.error("Error loading state from IndexedDB:",i)})},[]),J(()=>{Zn(t.loom.nodes).catch(i=>{console.error("Error saving nodes to IndexedDB:",i)})},[t.loom.nodes]),J(()=>{er(t.viewState).catch(i=>{console.error("Error saving view state to IndexedDB:",i)})},[t.viewState]),E(qe.Provider,{value:{state:t,dispatch:r},children:e})}const se={dark:{background:"#1a1a1a",backgroundAlt:"#252525",backgroundAlt2:"#3a3a3a",surface:"#2d2d2d",surfaceSelected:"#3d3d3d",text:"#e0e0e0",textBright:"#ffffff",textDim:"#a0a0a0",border:"#404040",borderBright:"#505050",borderSelected:"#d0d0d0",human:"#00DDDD",model:"#FF00FF",system:"#DDDD00",accent:"#4a9eff",overlay:"rgba(0, 0, 0, 0.7)"},light:{background:"#ffffff",backgroundAlt:"#f5f5f5",backgroundAlt2:"#f0f0f0",surface:"#f8f8f8",surfaceSelected:"#e8e8e8",text:"#2a2a2a",textBright:"#000000",textDim:"#666666",border:"#e0e0e0",borderBright:"#d0d0d0",borderSelected:"#000000",human:"#00DDDD",model:"#FF00FF",system:"#DDDD00",accent:"#0066cc",overlay:"rgba(255, 255, 255, 0.7)"}};var $e={exports:{}},rr=$e.exports,jt;function or(){return jt||(jt=1,function(e,t){(function(r,i){e.exports=i()})(typeof self<"u"?self:rr,function(){return function(r){var i={};function a(n){if(i[n])return i[n].exports;var s=i[n]={i:n,l:!1,exports:{}};return r[n].call(s.exports,s,s.exports,a),s.l=!0,s.exports}return a.m=r,a.c=i,a.d=function(n,s,d){a.o(n,s)||Object.defineProperty(n,s,{configurable:!1,enumerable:!0,get:d})},a.r=function(n){Object.defineProperty(n,"__esModule",{value:!0})},a.n=function(n){var s=n&&n.__esModule?function(){return n.default}:function(){return n};return a.d(s,"a",s),s},a.o=function(n,s){return Object.prototype.hasOwnProperty.call(n,s)},a.p="",a(a.s=0)}([function(r,i,a){function n(o){if(!(this instanceof n))return new n(o);this._=o}var s=n.prototype;function d(o,c){for(var l=0;l<o;l++)c(l)}function p(o,c,l){return function(_,h){d(h.length,function(m){_(h[m],m,h)})}(function(_,h,m){c=o(c,_,h,m)},l),c}function f(o,c){return p(function(l,_,h,m){return l.concat([o(_,h,m)])},[],c)}function v(o,c){var l={v:0,buf:c};return d(o,function(){var _;l={v:l.v<<1|(_=l.buf,_[0]>>7),buf:function(h){var m=p(function(g,b,C,V){return g.concat(C===V.length-1?Buffer.from([b,0]).readUInt16BE(0):V.readUInt16BE(C))},[],h);return Buffer.from(f(function(g){return(g<<1&65535)>>8},m))}(l.buf)}}),l}function u(){return typeof Buffer<"u"}function w(){if(!u())throw new Error("Buffer global does not exist; please use webpack if you need to parse Buffers in the browser.")}function y(o){w();var c=p(function(m,g){return m+g},0,o);if(c%8!=0)throw new Error("The bits ["+o.join(", ")+"] add up to "+c+" which is not an even number of bytes; the total should be divisible by 8");var l,_=c/8,h=(l=function(m){return m>48},p(function(m,g){return m||(l(g)?g:m)},null,o));if(h)throw new Error(h+" bit range requested exceeds 48 bit (6 byte) Number max.");return new n(function(m,g){var b=_+g;return b>m.length?B(g,_.toString()+" bytes"):I(b,p(function(C,V){var j=v(V,C.buf);return{coll:C.coll.concat(j.v),buf:j.buf}},{coll:[],buf:m.slice(g,b)},o).coll)})}function D(o,c){return new n(function(l,_){return w(),_+c>l.length?B(_,c+" bytes for "+o):I(_+c,l.slice(_,_+c))})}function L(o,c){if(typeof(l=c)!="number"||Math.floor(l)!==l||c<0||c>6)throw new Error(o+" requires integer length in range [0, 6].");var l}function A(o){return L("uintBE",o),D("uintBE("+o+")",o).map(function(c){return c.readUIntBE(0,o)})}function k(o){return L("uintLE",o),D("uintLE("+o+")",o).map(function(c){return c.readUIntLE(0,o)})}function x(o){return L("intBE",o),D("intBE("+o+")",o).map(function(c){return c.readIntBE(0,o)})}function N(o){return L("intLE",o),D("intLE("+o+")",o).map(function(c){return c.readIntLE(0,o)})}function T(o){return o instanceof n}function F(o){return{}.toString.call(o)==="[object Array]"}function U(o){return u()&&Buffer.isBuffer(o)}function I(o,c){return{status:!0,index:o,value:c,furthest:-1,expected:[]}}function B(o,c){return F(c)||(c=[c]),{status:!1,index:-1,value:null,furthest:o,expected:c}}function M(o,c){if(!c||o.furthest>c.furthest)return o;var l=o.furthest===c.furthest?function(_,h){if(function(){if(n._supportsSet!==void 0)return n._supportsSet;var te=typeof Set<"u";return n._supportsSet=te,te}()&&Array.from){for(var m=new Set(_),g=0;g<h.length;g++)m.add(h[g]);var b=Array.from(m);return b.sort(),b}for(var C={},V=0;V<_.length;V++)C[_[V]]=!0;for(var j=0;j<h.length;j++)C[h[j]]=!0;var ee=[];for(var z in C)({}).hasOwnProperty.call(C,z)&&ee.push(z);return ee.sort(),ee}(o.expected,c.expected):c.expected;return{status:o.status,index:o.index,value:o.value,furthest:c.furthest,expected:l}}var X={};function q(o,c){if(U(o))return{offset:c,line:-1,column:-1};o in X||(X[o]={});for(var l=X[o],_=0,h=0,m=0,g=c;g>=0;){if(g in l){_=l[g].line,m===0&&(m=l[g].lineStart);break}(o.charAt(g)===`
`||o.charAt(g)==="\r"&&o.charAt(g+1)!==`
`)&&(h++,m===0&&(m=g+1)),g--}var b=_+h,C=c-m;return l[c]={line:b,lineStart:m},{offset:c,line:b+1,column:C+1}}function S(o){if(!T(o))throw new Error("not a parser: "+o)}function G(o,c){return typeof o=="string"?o.charAt(c):o[c]}function Z(o){if(typeof o!="number")throw new Error("not a number: "+o)}function K(o){if(typeof o!="function")throw new Error("not a function: "+o)}function ne(o){if(typeof o!="string")throw new Error("not a string: "+o)}var ft=2,dn=3,re=8,fn=5*re,pn=4*re,pt="  ";function De(o,c){return new Array(c+1).join(o)}function ke(o,c,l){var _=c-o.length;return _<=0?o:De(l,_)+o}function _t(o,c,l,_){return{from:o-c>0?o-c:0,to:o+l>_?_:o+l}}function _n(o,c){var l,_,h,m,g,b=c.index,C=b.offset,V=1;if(C===o.length)return"Got the end of the input";if(U(o)){var j=C-C%re,ee=C-j,z=_t(j,fn,pn+re,o.length),te=f(function(R){return f(function(_e){return ke(_e.toString(16),2,"0")},R)},function(R,_e){var he=R.length,ue=[],me=0;if(he<=_e)return[R.slice()];for(var ge=0;ge<he;ge++)ue[me]||ue.push([]),ue[me].push(R[ge]),(ge+1)%_e==0&&me++;return ue}(o.slice(z.from,z.to).toJSON().data,re));m=function(R){return R.from===0&&R.to===1?{from:R.from,to:R.to}:{from:R.from/re,to:Math.floor(R.to/re)}}(z),_=j/re,l=3*ee,ee>=4&&(l+=1),V=2,h=f(function(R){return R.length<=4?R.join(" "):R.slice(0,4).join(" ")+"  "+R.slice(4).join(" ")},te),(g=(8*(m.to>0?m.to-1:m.to)).toString(16).length)<2&&(g=2)}else{var pe=o.split(/\r\n|[\n\r\u2028\u2029]/);l=b.column-1,_=b.line-1,m=_t(_,ft,dn,pe.length),h=pe.slice(m.from,m.to),g=m.to.toString().length}var Sn=_-m.from;return U(o)&&(g=(8*(m.to>0?m.to-1:m.to)).toString(16).length)<2&&(g=2),p(function(R,_e,he){var ue,me=he===Sn,ge=me?"> ":pt;return ue=U(o)?ke((8*(m.from+he)).toString(16),g,"0"):ke((m.from+he+1).toString(),g," "),[].concat(R,[ge+ue+" | "+_e],me?[pt+De(" ",g)+" | "+ke("",l," ")+De("^",V)]:[])},[],h).join(`
`)}function ht(o,c){return[`
`,"-- PARSING FAILED "+De("-",50),`

`,_n(o,c),`

`,(l=c.expected,l.length===1?`Expected:

`+l[0]:`Expected one of the following: 

`+l.join(", ")),`
`].join("");var l}function mt(o){return o.flags!==void 0?o.flags:[o.global?"g":"",o.ignoreCase?"i":"",o.multiline?"m":"",o.unicode?"u":"",o.sticky?"y":""].join("")}function Ne(){for(var o=[].slice.call(arguments),c=o.length,l=0;l<c;l+=1)S(o[l]);return n(function(_,h){for(var m,g=new Array(c),b=0;b<c;b+=1){if(!(m=M(o[b]._(_,h),m)).status)return m;g[b]=m.value,h=m.index}return M(I(h,g),m)})}function ae(){var o=[].slice.call(arguments);if(o.length===0)throw new Error("seqMap needs at least one argument");var c=o.pop();return K(c),Ne.apply(null,o).map(function(l){return c.apply(null,l)})}function Ie(){var o=[].slice.call(arguments),c=o.length;if(c===0)return Ae("zero alternates");for(var l=0;l<c;l+=1)S(o[l]);return n(function(_,h){for(var m,g=0;g<o.length;g+=1)if((m=M(o[g]._(_,h),m)).status)return m;return m})}function gt(o,c){return Ve(o,c).or(ce([]))}function Ve(o,c){return S(o),S(c),ae(o,c.then(o).many(),function(l,_){return[l].concat(_)})}function ye(o){ne(o);var c="'"+o+"'";return n(function(l,_){var h=_+o.length,m=l.slice(_,h);return m===o?I(h,m):B(_,c)})}function Q(o,c){(function(h){if(!(h instanceof RegExp))throw new Error("not a regexp: "+h);for(var m=mt(h),g=0;g<m.length;g++){var b=m.charAt(g);if(b!=="i"&&b!=="m"&&b!=="u"&&b!=="s")throw new Error('unsupported regexp flag "'+b+'": '+h)}})(o),arguments.length>=2?Z(c):c=0;var l=function(h){return RegExp("^(?:"+h.source+")",mt(h))}(o),_=""+o;return n(function(h,m){var g=l.exec(h.slice(m));if(g){if(0<=c&&c<=g.length){var b=g[0],C=g[c];return I(m+b.length,C)}return B(m,"valid match group (0 to "+g.length+") in "+_)}return B(m,_)})}function ce(o){return n(function(c,l){return I(l,o)})}function Ae(o){return n(function(c,l){return B(l,o)})}function Te(o){if(T(o))return n(function(c,l){var _=o._(c,l);return _.index=l,_.value="",_});if(typeof o=="string")return Te(ye(o));if(o instanceof RegExp)return Te(Q(o));throw new Error("not a string, regexp, or parser: "+o)}function vt(o){return S(o),n(function(c,l){var _=o._(c,l),h=c.slice(l,_.index);return _.status?B(l,'not "'+h+'"'):I(l,null)})}function Pe(o){return K(o),n(function(c,l){var _=G(c,l);return l<c.length&&o(_)?I(l+1,_):B(l,"a character/byte matching "+o)})}function wt(o,c){arguments.length<2&&(c=o,o=void 0);var l=n(function(_,h){return l._=c()._,l._(_,h)});return o?l.desc(o):l}function We(){return Ae("fantasy-land/empty")}s.parse=function(o){if(typeof o!="string"&&!U(o))throw new Error(".parse must be called with a string or Buffer as its argument");var c,l=this.skip(Ke)._(o,0);return c=l.status?{status:!0,value:l.value}:{status:!1,index:q(o,l.furthest),expected:l.expected},delete X[o],c},s.tryParse=function(o){var c=this.parse(o);if(c.status)return c.value;var l=ht(o,c),_=new Error(l);throw _.type="ParsimmonError",_.result=c,_},s.assert=function(o,c){return this.chain(function(l){return o(l)?ce(l):Ae(c)})},s.or=function(o){return Ie(this,o)},s.trim=function(o){return this.wrap(o,o)},s.wrap=function(o,c){return ae(o,this,c,function(l,_){return _})},s.thru=function(o){return o(this)},s.then=function(o){return S(o),Ne(this,o).map(function(c){return c[1]})},s.many=function(){var o=this;return n(function(c,l){for(var _=[],h=void 0;;){if(!(h=M(o._(c,l),h)).status)return M(I(l,_),h);if(l===h.index)throw new Error("infinite loop detected in .many() parser --- calling .many() on a parser which can accept zero characters is usually the cause");l=h.index,_.push(h.value)}})},s.tieWith=function(o){return ne(o),this.map(function(c){if(function(h){if(!F(h))throw new Error("not an array: "+h)}(c),c.length){ne(c[0]);for(var l=c[0],_=1;_<c.length;_++)ne(c[_]),l+=o+c[_];return l}return""})},s.tie=function(){return this.tieWith("")},s.times=function(o,c){var l=this;return arguments.length<2&&(c=o),Z(o),Z(c),n(function(_,h){for(var m=[],g=void 0,b=void 0,C=0;C<o;C+=1){if(b=M(g=l._(_,h),b),!g.status)return b;h=g.index,m.push(g.value)}for(;C<c&&(b=M(g=l._(_,h),b),g.status);C+=1)h=g.index,m.push(g.value);return M(I(h,m),b)})},s.result=function(o){return this.map(function(){return o})},s.atMost=function(o){return this.times(0,o)},s.atLeast=function(o){return ae(this.times(o),this.many(),function(c,l){return c.concat(l)})},s.map=function(o){K(o);var c=this;return n(function(l,_){var h=c._(l,_);return h.status?M(I(h.index,o(h.value)),h):h})},s.contramap=function(o){K(o);var c=this;return n(function(l,_){var h=c.parse(o(l.slice(_)));return h.status?I(_+l.length,h.value):h})},s.promap=function(o,c){return K(o),K(c),this.contramap(o).map(c)},s.skip=function(o){return Ne(this,o).map(function(c){return c[0]})},s.mark=function(){return ae(Ee,this,Ee,function(o,c,l){return{start:o,value:c,end:l}})},s.node=function(o){return ae(Ee,this,Ee,function(c,l,_){return{name:o,value:l,start:c,end:_}})},s.sepBy=function(o){return gt(this,o)},s.sepBy1=function(o){return Ve(this,o)},s.lookahead=function(o){return this.skip(Te(o))},s.notFollowedBy=function(o){return this.skip(vt(o))},s.desc=function(o){F(o)||(o=[o]);var c=this;return n(function(l,_){var h=c._(l,_);return h.status||(h.expected=o),h})},s.fallback=function(o){return this.or(ce(o))},s.ap=function(o){return ae(o,this,function(c,l){return c(l)})},s.chain=function(o){var c=this;return n(function(l,_){var h=c._(l,_);return h.status?M(o(h.value)._(l,h.index),h):h})},s.concat=s.or,s.empty=We,s.of=ce,s["fantasy-land/ap"]=s.ap,s["fantasy-land/chain"]=s.chain,s["fantasy-land/concat"]=s.concat,s["fantasy-land/empty"]=s.empty,s["fantasy-land/of"]=s.of,s["fantasy-land/map"]=s.map;var Ee=n(function(o,c){return I(c,q(o,c))}),hn=n(function(o,c){return c>=o.length?B(c,"any character/byte"):I(c+1,G(o,c))}),mn=n(function(o,c){return I(o.length,o.slice(c))}),Ke=n(function(o,c){return c<o.length?B(c,"EOF"):I(c,null)}),gn=Q(/[0-9]/).desc("a digit"),vn=Q(/[0-9]*/).desc("optional digits"),wn=Q(/[a-z]/i).desc("a letter"),yn=Q(/[a-z]*/i).desc("optional letters"),En=Q(/\s*/).desc("optional whitespace"),bn=Q(/\s+/).desc("whitespace"),yt=ye("\r"),Et=ye(`
`),bt=ye(`\r
`),xt=Ie(bt,Et,yt).desc("newline"),xn=Ie(xt,Ke);n.all=mn,n.alt=Ie,n.any=hn,n.cr=yt,n.createLanguage=function(o){var c={};for(var l in o)({}).hasOwnProperty.call(o,l)&&function(_){c[_]=wt(function(){return o[_](c)})}(l);return c},n.crlf=bt,n.custom=function(o){return n(o(I,B))},n.digit=gn,n.digits=vn,n.empty=We,n.end=xn,n.eof=Ke,n.fail=Ae,n.formatError=ht,n.index=Ee,n.isParser=T,n.lazy=wt,n.letter=wn,n.letters=yn,n.lf=Et,n.lookahead=Te,n.makeFailure=B,n.makeSuccess=I,n.newline=xt,n.noneOf=function(o){return Pe(function(c){return o.indexOf(c)<0}).desc("none of '"+o+"'")},n.notFollowedBy=vt,n.of=ce,n.oneOf=function(o){for(var c=o.split(""),l=0;l<c.length;l++)c[l]="'"+c[l]+"'";return Pe(function(_){return o.indexOf(_)>=0}).desc(c)},n.optWhitespace=En,n.Parser=n,n.range=function(o,c){return Pe(function(l){return o<=l&&l<=c}).desc(o+"-"+c)},n.regex=Q,n.regexp=Q,n.sepBy=gt,n.sepBy1=Ve,n.seq=Ne,n.seqMap=ae,n.seqObj=function(){for(var o,c={},l=0,_=(o=arguments,Array.prototype.slice.call(o)),h=_.length,m=0;m<h;m+=1){var g=_[m];if(!T(g)){if(F(g)&&g.length===2&&typeof g[0]=="string"&&T(g[1])){var b=g[0];if(Object.prototype.hasOwnProperty.call(c,b))throw new Error("seqObj: duplicate key "+b);c[b]=!0,l++;continue}throw new Error("seqObj arguments must be parsers or [string, parser] array pairs.")}}if(l===0)throw new Error("seqObj expects at least one named parser, found zero");return n(function(C,V){for(var j,ee={},z=0;z<h;z+=1){var te,pe;if(F(_[z])?(te=_[z][0],pe=_[z][1]):(te=null,pe=_[z]),!(j=M(pe._(C,V),j)).status)return j;te&&(ee[te]=j.value),V=j.index}return M(I(V,ee),j)})},n.string=ye,n.succeed=ce,n.takeWhile=function(o){return K(o),n(function(c,l){for(var _=l;_<c.length&&o(G(c,_));)_++;return I(_,c.slice(l,_))})},n.test=Pe,n.whitespace=bn,n["fantasy-land/empty"]=We,n["fantasy-land/of"]=ce,n.Binary={bitSeq:y,bitSeqObj:function(o){w();var c={},l=0,_=f(function(m){if(F(m)){var g=m;if(g.length!==2)throw new Error("["+g.join(", ")+"] should be length 2, got length "+g.length);if(ne(g[0]),Z(g[1]),Object.prototype.hasOwnProperty.call(c,g[0]))throw new Error("duplicate key in bitSeqObj: "+g[0]);return c[g[0]]=!0,l++,g}return Z(m),[null,m]},o);if(l<1)throw new Error("bitSeqObj expects at least one named pair, got ["+o.join(", ")+"]");var h=f(function(m){return m[0]},_);return y(f(function(m){return m[1]},_)).map(function(m){return p(function(g,b){return b[0]!==null&&(g[b[0]]=b[1]),g},{},f(function(g,b){return[g,m[b]]},h))})},byte:function(o){if(w(),Z(o),o>255)throw new Error("Value specified to byte constructor ("+o+"=0x"+o.toString(16)+") is larger in value than a single byte.");var c=(o>15?"0x":"0x0")+o.toString(16);return n(function(l,_){var h=G(l,_);return h===o?I(_+1,h):B(_,c)})},buffer:function(o){return D("buffer",o).map(function(c){return Buffer.from(c)})},encodedString:function(o,c){return D("string",c).map(function(l){return l.toString(o)})},uintBE:A,uint8BE:A(1),uint16BE:A(2),uint32BE:A(4),uintLE:k,uint8LE:k(1),uint16LE:k(2),uint32LE:k(4),intBE:x,int8BE:x(1),int16BE:x(2),int32BE:x(4),intLE:N,int8LE:N(1),int16LE:N(2),int32LE:N(4),floatBE:D("floatBE",4).map(function(o){return o.readFloatBE(0)}),floatLE:D("floatLE",4).map(function(o){return o.readFloatLE(0)}),doubleBE:D("doubleBE",8).map(function(o){return o.readDoubleBE(0)}),doubleLE:D("doubleLE",8).map(function(o){return o.readDoubleLE(0)})},r.exports=n}])})}($e)),$e.exports}var W=or();const ir=W.createLanguage({_:()=>W.regexp(/\s*/),number:()=>W.regexp(/[0-9]+/).map(Number),key:()=>W.regexp(/[a-zA-Z0-9_-]+/),viewToggle:()=>W.string("view").map(()=>({type:"VIEW_TOGGLE"})),themeToggle:()=>W.string("theme").map(()=>({type:"THEME_TOGGLE"})),modelCall:e=>W.seq(W.string("@"),W.regexp(/[a-zA-Z]+/),e._.then(e.number.or(W.succeed(void 0)))).map(([t,r,i])=>({type:"MODEL_CALL",model:r,count:i})),addKey:e=>W.seq(W.string("addkey"),e._,e.key).map(([t,r,i])=>({type:"ADD_KEY",key:i})),clearKey:()=>W.string("clearkey").map(()=>({type:"CLEAR_KEY"})),reset:()=>W.string("reset").map(()=>({type:"RESET"})),command:e=>W.alt(e.viewToggle,e.themeToggle,e.modelCall,e.addKey,e.clearKey,e.reset).trim(e._)});function sr(e){try{const t=ir.command.parse(e);return t.status?t.value:(console.log("Parse error:",t),null)}catch(t){return console.log("Parse error:",t),null}}function ar(e){const t=[];return"view".startsWith(e)&&t.push({text:"view",displayText:"view",description:"Toggle between forest and path view"}),"theme".startsWith(e)&&t.push({text:"theme",displayText:"theme",description:"Toggle between light and dark theme"}),"addkey".startsWith(e)&&t.push({text:"addkey ",displayText:"addkey <key>",description:"Add an OpenRouter API key"}),"clearkey".startsWith(e)&&t.push({text:"clearkey",displayText:"clearkey",description:"Remove the OpenRouter API key"}),"reset".startsWith(e)&&t.push({text:"reset",displayText:"reset",description:"Reset to initial state"}),"@go".startsWith(e)&&t.push({text:"@go",displayText:"@go [count]",description:"Generate completions using the 'go' model"}),t}const cr={go:{name:"Llama 3.3 70B Instruct",model:"meta-llama/llama-3.3-70b-instruct:free",format:"chat",endpoint:"https://openrouter.ai/api/v1/chat/completions",parameters:{temperature:.9,max_tokens:18}}};function ur(e){switch(e){case"human":return"you";case"model":return"assistant";case"system":return"system"}}function lr(e){return e.map(t=>`${t.message.source==="system"?"":`${t.message.source}: `}${t.message.content}
`).join(`
`)}function Ut(e){return e.map(t=>({role:ur(t.message.source),content:t.message.content}))}async function dr(e,t,r){if(!r)return console.log("No API key provided. Would have sent the following prompt:"),t.format==="chat"?console.log("Chat messages:",Ut(e)):console.log("Completion prompt:",lr(e)),null;const i={model:t.model,messages:Ut(e),...t.parameters};console.log("Sending request with messages:",i.messages);try{const a=await fetch(t.endpoint,{method:"POST",headers:{Authorization:`Bearer ${r}`,"HTTP-Referer":window.location.origin,"X-Title":"Loon","Content-Type":"application/json"},body:JSON.stringify(i)});if(!a.ok){const d=await a.json().catch(()=>null);throw console.error("API Error:",{status:a.status,statusText:a.statusText,data:d}),new Error(`HTTP error! status: ${a.status}`)}const n=await a.json();if(console.log("Received response data:",n),!n||!n.choices||!Array.isArray(n.choices)||n.choices.length===0)throw console.error("Invalid response format:",n),new Error("Invalid response format from API");const s=n.choices[0];if(!s.message||typeof s.message.content!="string")throw console.error("Invalid message format in choice:",s),new Error("Invalid message format in API response");return s.message.content}catch(a){throw console.error("Error making model request:",a),a}}function fr(e,t,r,i,a){switch(e.type){case"VIEW_TOGGLE":return{type:"SET_VIEW_TYPE",viewType:t==="forest"?"path":"forest"};case"THEME_TOGGLE":return{type:"TOGGLE_THEME"};case"MODEL_CALL":{const n=cr[e.model];if(!n)return console.error(`Unknown model: ${e.model}`),null;const s=localStorage.getItem("openrouter_key")||void 0,d=a.viewState.focus.selectedNode;if(!d)return console.error("No node selected for model call"),null;const p=[];let f=d;for(;f;){const w=a.loom.nodes.get(f);if(!w)break;p.unshift(w),f=w.parent}const v=e.count||1,u=[];for(let w=0;w<v;w++){const y=crypto.randomUUID();u.push(y),i({type:"ADD_PLACEHOLDER_NODE",parentId:d,nodeId:y})}return(async()=>{try{for(let w=0;w<v;w++){const y=await dr(p,n,s);y?(console.log(`Received response ${w+1}/${v}:`,y),i({type:"REPLACE_PLACEHOLDER_NODE",nodeId:u[w],content:y})):i({type:"REPLACE_PLACEHOLDER_NODE",nodeId:u[w],content:"Failed to get response from model",isError:!0})}}catch(w){console.error("Error getting completions:",w);for(let y=0;y<v;y++)i({type:"REPLACE_PLACEHOLDER_NODE",nodeId:u[y],content:"Error: "+(w instanceof Error?w.message:String(w)),isError:!0})}})(),null}case"ADD_KEY":return localStorage.setItem("openrouter_key",e.key),console.log("API key added"),null;case"CLEAR_KEY":return localStorage.removeItem("openrouter_key"),console.log("API key removed"),null;default:return console.error("Unknown command type:",e),null}}function pr(){var x;const{state:e,dispatch:t}=fe(),[r,i]=be(""),[a,n]=be([]),[s,d]=be(0),p=e.viewState.focus.commandBar,f=se[e.viewState.themeMode],v=Re(null),u=((x=a[s])==null?void 0:x.text)||"",w=u.startsWith(r)?u.slice(r.length):"";J(()=>{p&&v.current&&v.current.focus()},[p]),J(()=>{n(ar(r)),d(0)},[r]);const y=H(()=>{t({type:"FOCUS_COMMAND_BAR"})},[t]),D=H(N=>{if(N.key==="Escape"){N.preventDefault(),n([]),e.viewState.currentPath.length>0&&t({type:"FOCUS_NODE",id:e.viewState.currentPath[e.viewState.currentPath.length-1]});return}if(a.length!==0)switch(N.key){case"ArrowDown":N.preventDefault(),d(T=>(T+1)%a.length);break;case"ArrowUp":N.preventDefault(),d(T=>(T-1+a.length)%a.length);break;case"ArrowRight":case"Tab":w&&(N.preventDefault(),i(u));break;case"Enter":r.trim()===""&&(N.preventDefault(),i(u));break}},[a,w,u,t,e.viewState.currentPath]),L=H(N=>{const T=N.target.value;i(T)},[]),A=H(N=>{N.preventDefault();const T=sr(r.trim());if(T){const F=e.viewState.currentPath.map(I=>e.loom.nodes.get(I)).filter(I=>I!==void 0),U=fr(T,e.viewState.viewType,F,t,e);U&&t(U),i(""),n([]),t({type:"FOCUS_NODE",id:e.viewState.currentPath[e.viewState.currentPath.length-1]})}},[r,t,e.viewState.viewType,e.viewState.currentPath,e.loom.nodes]),k=H(N=>{i(N.text)},[]);return E("div",{className:"command-container",children:[E("form",{onSubmit:A,className:`command-bar ${p?"focused":""}`,children:E("div",{className:"input-container",children:[E("input",{ref:v,type:"text",value:r,onInput:L,onFocus:y,onKeyDown:D,placeholder:"Enter command (e.g. view, theme, @go)"}),p&&E("div",{className:"ghost-container",children:[E("span",{className:"ghost-user",children:r}),E("span",{className:"ghost-suggestion",children:w})]})]})}),a.length>0&&p&&E("div",{className:"suggestions",children:a.map((N,T)=>E("div",{className:`suggestion ${T===s?"selected":""}`,onClick:()=>k(N),children:[E("div",{className:"suggestion-text",children:N.displayText}),E("div",{className:"suggestion-description",children:N.description})]},N.text))}),E("style",{jsx:!0,children:`
        .command-container {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 100;
        }

        .command-bar {
          background: ${f.surface};
          border-top: 1px solid ${f.border};
          transition: all 0.2s;
        }

        .command-bar.focused {
          background: ${f.surfaceSelected};
          border-top-color: ${f.borderSelected};
        }

        .input-container {
          position: relative;
          width: 100%;
        }

        input {
          width: 100%;
          padding: 8px;
          font-family: monospace;
          font-size: 14px;
          color: #e0e0e0;
          caret-color: #e0e0e0;
          background: transparent;
          border-top: 1px solid #404040;
          border-radius: 0px;
          outline: none;
          transition: all 0.2s;
        }

        input:focus {
          border-color: ${f.borderSelected};
        }

        input::placeholder {
          color: ${f.textDim};
        }

        .ghost-container {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          padding: 8px;
          font-family: monospace;
          font-size: 14px;
          pointer-events: none;
          white-space: pre;
          overflow: hidden;
          border: 1px solid transparent;
          border-radius: 4px;
        }

        .ghost-user {
          color: ${f.text};
        }

        .ghost-suggestion {
          color: ${f.textDim};
          opacity: 0.5;
        }

        .suggestions {
          position: absolute;
          bottom: 100%;
          left: 0;
          right: 0;
          background: ${f.surface};
          border: 1px solid ${f.border};
          border-bottom: none;
          border-radius: 4px 4px 0 0;
          max-height: 200px;
          overflow-y: auto;
        }

        .suggestion {
          padding: 2px 8px;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          gap: 1ch;
        }

        .suggestion:hover,
        .suggestion.selected {
          background: ${f.surfaceSelected};
        }

        .suggestion-text {
          color: ${f.text};
          font-family: monospace;
          font-size: 14px;
        }

        .suggestion-description {
          color: ${f.textDim};
          font-size: 12px;
          margin-top: 2px;
        }
      `})]})}function _r(){const{state:e}=fe(),t=se[e.viewState.themeMode];return E("span",{className:"typing-indicator",children:["typing...",E("style",{jsx:!0,children:`
        .typing-indicator {
          color: ${t.textDim};
          animation: ellipsis-animation 2s infinite;
        }

        @keyframes ellipsis-animation {
          0% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.7;
          }
          100% {
            opacity: 0.3;
          }
        }
      `})]})}function cn({id:e,node:t,hasChildren:r=!1,isExpanded:i=!1}){var X,q;const{state:a,dispatch:n}=fe(),s=se[a.viewState.themeMode],[d,p]=be(!1),[f,v]=be(t.message.content),u=Re(null),w=Re(null),y=a.pending.has(e),D=a.viewState.focus.selectedNode===e,L=H(()=>{u.current&&(u.current.style.height="0",u.current.style.height=`${u.current.scrollHeight}px`)},[]),A=H(()=>{var G;const S=(G=w.current)==null?void 0:G.offsetHeight;p(!0),v(t.message.content),requestAnimationFrame(()=>{u.current&&S&&(u.current.style.height=`${S}px`,L())})},[t.message.content,L]),k=H(()=>{r&&n({type:"SET_NODE_EXPANDED",id:e,expanded:!i})},[n,e,r,i]);J(()=>{d&&u.current&&(u.current.focus(),u.current.setSelectionRange(u.current.value.length,u.current.value.length),L())},[d,L]);const x=H(()=>{d||n({type:"FOCUS_NODE",id:e})},[n,e,d]),N=H(()=>{A()},[A]),T=H(S=>{if(d){if(S.key==="Enter"&&!S.shiftKey)S.preventDefault(),f!==t.message.content&&n({type:"EDIT_NODE",id:e,content:f}),F();else if(S.key==="Escape")S.preventDefault(),v(t.message.content),F();else if(["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(S.key)){const G=u.current;if(!G)return;const{selectionStart:Z,selectionEnd:K,value:ne}=G;(S.key==="ArrowUp"&&Z===0||S.key==="ArrowDown"&&K===ne.length||S.key==="ArrowLeft"&&Z===0||S.key==="ArrowRight"&&K===ne.length)&&(S.preventDefault(),f!==t.message.content&&n({type:"EDIT_NODE",id:e,content:f}),F())}}},[d,t.message.content,f,n,e]),F=H(()=>{var G;p(!1),(G=u.current)==null||G.blur();const S=document.querySelector(".view-container");S instanceof HTMLElement&&S.focus()},[]),U=H(()=>{d&&(p(!1),f!==t.message.content&&n({type:"EDIT_NODE",id:e,content:f}))},[n,f,e,t.message.content,d]);J(()=>{if(D&&!d){const S=G=>{var K;((K=G.detail)==null?void 0:K.id)===e&&A()};return window.addEventListener("ENTER_EDIT_MODE",S),()=>window.removeEventListener("ENTER_EDIT_MODE",S)}},[D,d,e,A]),J(()=>{L()},[f,L]);const I=((X=t.message.metadata)==null?void 0:X.isPlaceholder)===!0,B=((q=t.message.metadata)==null?void 0:q.isError)===!0;console.log(`Node ${e}:`,{content:t.message.content,metadata:t.message.metadata,isPlaceholder:I,isPending:a.pending.has(e)});const M={human:"you",model:"llm",system:"sys"}[t.message.source];return E("div",{className:"message-node","data-pending":y,"data-selected":D,"data-source":t.message.source,onKeyDown:T,onClick:x,children:[d?E("pre",{className:"content",children:[r&&E("span",{className:"expander-space",children:i?"▾":"▸"}),E("span",{className:"source-label",children:[M,":"]}),E("textarea",{ref:u,value:f,onChange:S=>{v(S.currentTarget.value),L()},onBlur:U,onKeyDown:T,className:"textarea"})]}):E("pre",{ref:w,className:`content ${B?"error":""}`,onClick:x,onDblClick:N,children:[r&&E("span",{className:"expander-space",onClick:S=>{S.stopPropagation(),k()},children:i?"▾":"▸"}),E("span",{className:"source-label",children:[M,":"]}),E("span",{className:"message-text",children:I?E(_r,{}):t.message.content})]}),E("style",{jsx:!0,children:`
        .message-node {
          position: relative;
          background: ${s.background};
          transition: background 0.2s;
          border-left: 2px solid transparent;
          line-height: 1.2;
          outline: none;
        }

        .message-node:nth-child(odd) {
          background: ${s.backgroundAlt};
        }

        .message-node[data-selected="true"] {
          border-left-color: ${s.accent};
        }

        .content,
        .textarea {
          margin: 0;
          padding: 0;
          font-family: inherit;
          font-size: inherit;
          white-space: pre-wrap;
          word-wrap: break-word;
          color: ${s.text};
          width: 100%;
          box-sizing: border-box;
          background: transparent;
          border: none;
          resize: none;
          outline: none;
          min-height: 1.2em;
        }

        .content {
          cursor: pointer;
          display: block;
        }

        .expander-space {
          display: inline-block;
          width: 1ch;
          color: ${s.textDim};
          cursor: ${r?"pointer":"default"};
          user-select: none;
        }

        .message-text {
          padding: 0 4px;
          min-height: 1.2em;
          display: inline-block;
        }

        .message-text:hover {
          background: ${s.backgroundAlt2};
        }

        .message-text .typing-indicator {
          display: inline-block;
          padding: 0;
          line-height: inherit;
        }

        .source-label {
          display: inline-block;

          background: ${s.backgroundAlt2};
          font-weight: 500;
        }

        .message-node[data-source="human"] .source-label {
          color: ${s.human};
        }

        .message-node[data-source="model"] .source-label {
          color: ${s.model};
        }

        .message-node[data-source="system"] .source-label {
          color: ${s.system};
        }

        .message-node[data-pending="true"] .source-label {
          animation: pulse 1.5s ease-in-out infinite;
        }

        .textarea {
          display: inline-block;
          padding: 0 4px;
          margin-left: 0;
          background: ${s.backgroundAlt2};
          vertical-align: top;
          width: calc(100% - 4em); /* Leave space for the label */
        }

        @keyframes pulse {
          0% {
            opacity: 0.5;
          }
          50% {
            opacity: 0.7;
          }
          100% {
            opacity: 0.5;
          }
        }

        .error {
          color: ${s.textDim};
        }
      `})]})}function un({id:e,node:t,depth:r=0}){const{state:i}=fe(),a=se[i.viewState.themeMode],n=i.viewState.expanded.has(e);return E("div",{className:"tree-node-wrapper",children:[E("div",{className:"node-row",children:E("div",{className:"message-container",children:E(cn,{id:e,node:t,hasChildren:t.children.length>0,isExpanded:n})})}),n&&t.children.length>0&&E("div",{className:"children",children:t.children.map(s=>{const d=i.loom.nodes.get(s);return d?E(un,{id:s,node:d,depth:r+1},s):null})}),E("style",{jsx:!0,children:`
        .tree-node-wrapper {
          margin: 0;
        }

        .node-row {
          display: flex;
          align-items: flex-start;
        }

        .message-container {
          flex: 1;
          min-width: 0;
        }

        .children {
          margin-left: ${r===0?8:4}px;
          padding-left: 8px;
          border-left: 1px solid ${a.border};
        }
      `})]})}function ln(e,t,r){const i=new Map;let a=0;function n(s,d,p){const f=e.get(s);if(!f)return;const v=r.has(s);i.set(s,{id:s,depth:d,node:f,isExpanded:v,isVisible:p,visualIndex:a++}),v&&f.children.forEach(u=>{n(u,d+1,p)})}return n(t,0,!0),i}function hr(e,t){const r=t.get(e);if(!r)return null;let i=1/0,a=null;for(const[n,s]of t)s.visualIndex>r.visualIndex&&s.visualIndex<i&&s.isVisible&&(i=s.visualIndex,a=n);return a}function mr(e,t){const r=t.get(e);if(!r)return null;let i=-1,a=null;for(const[n,s]of t)s.visualIndex<r.visualIndex&&s.visualIndex>i&&s.isVisible&&(i=s.visualIndex,a=n);return a}function gr(e,t){const r=t.get(e);return!r||!r.node.parent?null:r.node.parent}function vr(e,t){const r=t.get(e);return!r||!r.isExpanded||r.node.children.length===0?null:r.node.children[0]}function ie(e,t,r){switch(t.type){case"NEXT":return hr(e,r);case"PREV":return mr(e,r);case"PARENT":return gr(e,r);case"FIRST_CHILD":return vr(e,r)}}function wr(){const e=dt(qe);if(!e)throw new Error("useStore must be used within a StoreProvider");return e}function yr(){const{state:e,dispatch:t}=wr(),r=se[e.viewState.themeMode],{nodes:i,root:a}=e.loom,n=i.get(a);return J(()=>{const s=d=>{if(e.viewState.focus.commandBar)return;const p=e.viewState.focus.selectedNode;if(!p)return;const f=ln(i,a,e.viewState.expanded);let v=null;switch(d.key){case"ArrowUp":d.preventDefault(),v=ie(p,{type:"PREV"},f);break;case"ArrowDown":d.preventDefault(),v=ie(p,{type:"NEXT"},f);break;case"ArrowLeft":if(d.preventDefault(),d.metaKey||d.ctrlKey){const u=f.get(p);u!=null&&u.isExpanded&&t({type:"SET_NODE_EXPANDED",id:p,expanded:!1})}else v=ie(p,{type:"PARENT"},f);break;case"ArrowRight":if(d.preventDefault(),d.metaKey||d.ctrlKey){const u=f.get(p);u!=null&&u.node.children.length&&!u.isExpanded&&t({type:"SET_NODE_EXPANDED",id:p,expanded:!0})}else v=ie(p,{type:"FIRST_CHILD"},f);break}v&&t({type:"FOCUS_NODE",id:v})};return window.addEventListener("keydown",s),()=>window.removeEventListener("keydown",s)},[t,i,a,e.viewState.expanded,e.viewState.focus]),n?E("div",{className:"forest-view",children:[E("div",{className:"content",children:E(un,{id:a,node:n})}),E("style",{jsx:!0,children:`
        .forest-view {
          flex: 1;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          border: 1px solid ${r.border};
        }

        .content {
          flex: 1;
          overflow-y: auto;
        }

        /* TUI-like scrollbar */
        .content::-webkit-scrollbar {
          width: 12px;
        }

        .content::-webkit-scrollbar-track {
          background: ${r.background};
        }

        .content::-webkit-scrollbar-thumb {
          background: ${r.border};
          border: 3px solid ${r.background};
          border-radius: 6px;
        }

        .content::-webkit-scrollbar-thumb:hover {
          background: ${r.borderBright};
        }
      `})]}):null}function Er({id:e,node:t}){const{state:r,dispatch:i}=fe(),a=se[r.viewState.themeMode],n=t.parent?r.loom.nodes.get(t.parent):null,s=n?n.children.length>1:!1,d=n?n.children.length:0,p=n?n.children.indexOf(e)+1:0,f=H(v=>{i({type:"NAVIGATE_SIBLING",direction:v,nodeId:e})},[i,e]);return E("div",{className:`path-node-wrapper ${s?"with-siblings":""}`,children:[s&&E("div",{className:"sibling-controls left",children:E("button",{className:"nav-button prev",onClick:()=>f("prev"),style:{color:a.textDim},children:"‹"})}),E("div",{className:"message-container",children:[s&&d>1&&E("div",{className:"sibling-count",style:{color:a.textDim},children:[p,"/",d]}),E(cn,{id:e,node:t})]}),s&&E("div",{className:"sibling-controls right",children:E("button",{className:"nav-button next",onClick:()=>f("next"),style:{color:a.textDim},children:"›"})}),E("style",{jsx:!0,children:`
        .path-node-wrapper {
          margin: 8px 0;
        }

        .path-node-wrapper:not(.with-siblings) .message-container {
          padding: 0 32px; /* 24px arrow width + 8px gap on each side */
        }

        .path-node-wrapper.with-siblings {
          display: grid;
          grid-template-columns: 24px minmax(0, 1fr) 24px;
          gap: 8px;
        }

        .sibling-controls {
          display: flex;
          align-items: center;
          height: 100%;
        }

        .sibling-controls.left {
          justify-content: flex-start;
        }

        .sibling-controls.right {
          justify-content: flex-end;
        }

        .nav-button {
          background: none;
          border: none;
          font-size: 24px;
          padding: 0;
          cursor: pointer;
          line-height: 1;
          transition: color 0.2s;
        }

        .message-container {
          position: relative;
          width: 100%;
        }

        .sibling-count {
          position: absolute;
          top: 4px;
          right: 8px;
          font-size: 11px;
          font-family: monospace;
          z-index: 1;
        }
      `})]})}function br(){const e=dt(qe);if(!e)throw new Error("useStore must be used within a StoreProvider");return e}function xr(){const{state:e}=br(),t=se[e.viewState.themeMode],{nodes:r}=e.loom;return E("div",{className:"path-view",children:[E("div",{className:"content",children:e.viewState.currentPath.map(i=>{const a=r.get(i);return a?E(Er,{id:i,node:a},i):null})}),E("style",{jsx:!0,children:`
        .path-view {
          flex: 1;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          border: 1px solid ${t.border};
        }

        .content {
          flex: 1;
          overflow-y: auto;
        }

        /* TUI-like scrollbar */
        .content::-webkit-scrollbar {
          width: 12px;
        }

        .content::-webkit-scrollbar-track {
          background: ${t.background};
        }

        .content::-webkit-scrollbar-thumb {
          background: ${t.border};
          border: 3px solid ${t.background};
          border-radius: 6px;
        }

        .content::-webkit-scrollbar-thumb:hover {
          background: ${t.borderBright};
        }
      `})]})}function Sr(){const{state:e,dispatch:t}=fe(),{viewType:r}=e.viewState;J(()=>{const n=s=>{s.altKey&&s.key.toLowerCase()==="v"&&(s.preventDefault(),t({type:"SET_VIEW_TYPE",viewType:r==="forest"?"path":"forest"}))};return window.addEventListener("keydown",n),()=>window.removeEventListener("keydown",n)},[t,r]);const i=H(n=>{if(e.viewState.focus.commandBar)return;const s=e.viewState.focus.selectedNode;if(!s)return;const d=e.loom.nodes.get(s);if(!d)return;const p=ln(e.loom.nodes,e.loom.root,e.viewState.expanded);let f=null;switch(n.key){case"Delete":case"Backspace":if(d.parent){n.preventDefault(),t({type:"DELETE_NODE",id:s});return}break;case"Enter":if(!n.shiftKey){n.preventDefault(),t({type:"CREATE_CHILD_NODE",parentId:s});return}break;case"ArrowUp":n.preventDefault(),f=ie(s,{type:"PREV"},p);break;case"ArrowDown":n.preventDefault(),f=ie(s,{type:"NEXT"},p);break;case"ArrowLeft":n.preventDefault(),n.metaKey||n.ctrlKey?e.viewState.expanded.has(s)&&t({type:"SET_NODE_EXPANDED",id:s,expanded:!1}):f=ie(s,{type:"PARENT"},p);break;case"ArrowRight":if(n.preventDefault(),n.metaKey||n.ctrlKey)d.children.length&&!e.viewState.expanded.has(s)&&t({type:"SET_NODE_EXPANDED",id:s,expanded:!0});else{if(!d.children.length||!e.viewState.expanded.has(s)){t({type:"ENTER_EDIT_MODE",id:s});return}f=ie(s,{type:"FIRST_CHILD"},p)}break}f&&t({type:"FOCUS_NODE",id:f})},[t,e]),a=H(n=>{if(n.target===n.currentTarget){if(e.viewState.focus.commandBar||!e.viewState.focus.selectedNode){const s=e.viewState.focus.selectedNode||e.loom.root;t({type:"FOCUS_NODE",id:s})}n.currentTarget.focus()}},[t,e.viewState.focus.commandBar,e.viewState.focus.selectedNode,e.loom.root]);return E("div",{className:"view-container",onClick:a,onKeyDown:i,tabIndex:0,style:{outline:"none"},children:[r==="forest"?E(yr,{}):E(xr,{}),E("style",{jsx:!0,children:`
        .view-container {
          flex: 1;
          display: flex;
          flex-direction: column;
          min-height: 0; /* Allow container to shrink */
          cursor: default;
        }
      `})]})}function Dr(){const{state:e,dispatch:t}=fe(),r=se[e.viewState.themeMode],i=Re(0);return J(()=>{const a=n=>{if((n.altKey||n.metaKey)&&n.key==="\\"&&(n.preventDefault(),t({type:"TOGGLE_THEME"})),n.key===" "&&!e.viewState.focus.commandBar){const s=Date.now();s-i.current<300&&(n.preventDefault(),t({type:"FOCUS_COMMAND_BAR"})),i.current=s}n.key==="Escape"&&!e.viewState.focus.commandBar&&e.viewState.focus.selectedNode&&(n.preventDefault(),t({type:"FOCUS_COMMAND_BAR"}))};return window.addEventListener("keydown",a),()=>window.removeEventListener("keydown",a)},[t,e.viewState.focus.commandBar,e.viewState.focus.selectedNode]),E("div",{className:"app",children:[E(Sr,{}),E(pr,{}),E("style",{children:`
        body {
          margin: 0;
          background: ${r.background};
        }
      `}),E("style",{jsx:!0,children:`
        .app {
          min-height: 100vh;
          height: 100vh; /* Ensure it takes full viewport height */
          display: flex;
          flex-direction: column;
          background: ${r.background};
          color: ${r.text};
          transition: all 0.2s;
        }
      `})]})}function kr(){return E(nr,{children:E(Dr,{})})}Pn(E(kr,{}),document.getElementById("app"));
