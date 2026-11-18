import{s as T}from"./symbol-defs-64727322.js";import{initNotFound as j,showNotFound as M,hideNotFound as O}from"./notfound-afada034.js";import{g as D,a as H,b as J}from"./getPokemon-5ec11052.js";const P="favorites";function L(){return JSON.parse(localStorage.getItem(P))||[]}function U(e){localStorage.setItem(P,JSON.stringify(e))}const E="https://pokeapi.co/api/v2",q=document.querySelector(".search__list"),l=document.querySelector(".load-more"),z=document.querySelector(".search__dropdown"),i=document.querySelector(".search__select"),K=document.querySelector(".search__select-label"),d=document.querySelector(".search__options"),x=document.querySelector(".search__active-filters"),Q=document.querySelector(".search__text"),R=document.querySelector(".search__input");let c="",o=[],$=1;const V=20;let m=!1,g=[],S=0,I=[];const h=new Map,y=new Map;let _=[];q.addEventListener("change",e=>{const t=e.target.closest(".search__checkbox");if(!t)return;const n=Number(t.dataset.id);let s=L();if(t.checked){const a=I.find(r=>r.id===n);a&&!s.some(r=>r.id===n)&&s.push(a)}else s=s.filter(a=>a.id!==n);U(s)});function Y(e){I=e;const n=L().map(a=>a.id),s=e.map(({id:a,name:r,types:p,sprites:k})=>{var v,w;const A=((w=(v=k.other)==null?void 0:v["official-artwork"])==null?void 0:w.front_default)||k.front_default||"",N=p.map(({type:b})=>`
          <span class="type-badge type-badge--${b.name}">
            ${b.name}
          </span>
        `).join(""),B=`#${String(a).padStart(3,"0")}`,C=n.includes(a);return`
      <li class="search__item">

        <a href="./details.html?id=${a}" class="search__link">
          <img src="${A}" alt="${r}" loading="lazy">

          <p class="search__id">${B}</p>

          <h3 class="search__name">${r}</h3>

          <div class="search__tag">
            ${N}
          </div>
        </a>

        <label class="search__fav">
          <input
            type="checkbox"
            class="search__checkbox"
            data-id="${a}"
            ${C?"checked":""}
            aria-label="Додати ${r} до обраного"
          >

          <svg class="search__icon search__icon--fav">
            <use href="${T}#heart"></use>
          </svg>
        </label>

      </li>
    `}).join("");q.innerHTML=s}async function F(){if(!m){m=!0,l.disabled=!0;try{const e=await D(V,$);if(!e)return;g=[...g,...e.results],$++,await u(),e.next||(l.style.display="none")}catch(e){console.error("Помилка завантаження:",e)}finally{m=!1,l.disabled=!1}}}async function G(e){if(y.has(e))return y.get(e);const t=e.split("/").filter(Boolean).pop(),n=await J(t);return n&&y.set(e,n),n}async function W(e){const t=await Promise.all(e.map(async s=>{if(!h.has(s)){const a=await fetch(`${E}/type/${s}`);if(!a.ok)throw new Error(`Помилка отримання типу: ${s}`);const r=await a.json();h.set(s,r.pokemon.map(p=>p.pokemon))}return h.get(s)})),n=t[0].filter(s=>t.every(a=>a.some(r=>r.name===s.name)));return Promise.all(n.map(s=>G(s.url)))}async function X(e){try{const t=e.trim().toLowerCase();if(!t)return[];if(_.length===0){const s=await fetch(`${E}/pokemon?limit=2000`);if(!s.ok)throw new Error("Помилка отримання списку покемонів");_=(await s.json()).results}const n=_.filter(s=>s.name.includes(t)).slice(0,20);return await Promise.all(n.map(s=>H(s.name)))}catch(t){return console.error("Помилка пошуку покемона:",t),[]}}async function u(){const e=++S;Z();try{let t;if(c?t=await X(c):o.length>0?t=await W(o):t=g,e!==S)return;c&&o.length>0&&(t=t.filter(n=>o.every(s=>n.types.some(a=>a.type.name===s)))),Y(t),t.length===0?M():O(),Q.textContent=`Знайдено: ${t.length}`,l.style.display=c||o.length>0?"none":""}catch(t){console.error("Помилка фільтрації:",t)}}R.addEventListener("input",async e=>{c=e.target.value.trim().toLowerCase(),await u()});i.addEventListener("click",()=>{const e=i.getAttribute("aria-expanded")==="true";i.setAttribute("aria-expanded",String(!e)),d.hidden=e});d.addEventListener("click",async e=>{const t=e.target.closest(".search__option");if(!t)return;const n=t.dataset.type;n==="all"?o=[]:o.includes(n)?o=o.filter(s=>s!==n):o.push(n),f(),await u()});function f(){d.querySelectorAll(".search__option").forEach(t=>{const n=t.dataset.type,s=n==="all"?o.length===0:o.includes(n);t.classList.toggle("is-selected",s),t.setAttribute("aria-pressed",String(s))}),K.textContent=o.length===0?"Усі типи":`Обрано типів: ${o.length}`}document.addEventListener("click",e=>{z.contains(e.target)||(d.hidden=!0,i.setAttribute("aria-expanded","false"))});document.addEventListener("keydown",e=>{e.key==="Escape"&&(d.hidden=!0,i.setAttribute("aria-expanded","false"),i.focus())});function Z(){x.innerHTML=o.map(e=>`
        <button
          class="search__active-filter"
          type="button"
          data-type="${e}"
        >
          ${e}
          <span>&times;</span>
        </button>
      `).join("")}x.addEventListener("click",async e=>{const t=e.target.closest(".search__active-filter");if(!t)return;const n=t.dataset.type;o=o.filter(s=>s!==n),f(),await u()});f();l.addEventListener("click",F);j(()=>{c="",o=[],R.value="",f(),u()});F();
//# sourceMappingURL=search-ae4a15df.js.map
