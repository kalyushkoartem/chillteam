import{g as T}from"./assets/details-a4e1ceed.js";const A=document.querySelector(".open-modal"),r=document.querySelector(".modal"),I=document.querySelector(".modal__close"),m=document.querySelector(".pokemon__random"),S=document.querySelector(".pokemonimg"),j=document.querySelector(".pokemon__name"),H=document.querySelector(".pokemon__number"),w=document.querySelector(".pokemon__types"),B=document.querySelector(".pokemon__height"),F=document.querySelector(".pokemon__weight"),L=document.querySelector(".pokemon__stats");A.addEventListener("click",()=>{r.classList.add("active"),E()});I.addEventListener("click",()=>{r.classList.remove("active")});r.addEventListener("click",e=>{e.target===r&&r.classList.remove("active")});document.addEventListener("keydown",e=>{e.key==="Escape"&&r.classList.remove("active")});async function E(){try{m.textContent="Завантаження...";const e=Math.floor(Math.random()*1025)+1,n=await fetch(`https://pokeapi.co/api/v2/pokemon/${e}`);if(!n.ok)throw new Error("Помилка завантаження покемона");const t=await n.json();S.src=t.sprites.other["official-artwork"].front_default||t.sprites.front_default,S.alt=t.name,j.textContent=t.name,H.textContent=`#${String(t.id).padStart(3,"0")}`,w.innerHTML="",t.types.forEach(o=>{const a=document.createElement("span");a.classList.add("pokemon__type"),a.textContent=o.type.name,w.appendChild(a)}),B.textContent=`${t.height/10} м`,F.textContent=`${t.weight/10} кг`,L.innerHTML="",t.stats.forEach(o=>{const a=document.createElement("div");a.classList.add("pokemon__stat"),a.innerHTML=`
        <span>${o.stat.name}</span>

        <div class="pokemon__bar">
          <div style="width: ${Math.min(o.base_stat/255*100,100)}%"></div>
        </div>

        <span>${o.base_stat}</span>
      `,L.appendChild(a)}),m.textContent="🎲 Дослідити ще"}catch(e){console.error(e),m.textContent="Помилка завантаження. Спробувати ще раз"}}m.addEventListener("click",E);const D="/chillteam/assets/symbol-defs-9e525b8f.svg",N="https://pokeapi.co/api/v2",U=document.querySelector(".search__list"),l=document.querySelector(".load-more"),z=document.querySelector(".search__dropdown"),i=document.querySelector(".search__select"),O=document.querySelector(".search__select-label"),d=document.querySelector(".search__options"),x=document.querySelector(".search__active-filters"),W=document.querySelector(".search__text");let C=0,s=[],$=1;const G=20;let p=!1,_=[],q=0;const f=new Map,h=new Map;function J(e){const n=e.map(({id:t,name:o,types:a,sprites:c})=>{var g,v;const u=((v=(g=c.other)==null?void 0:g["official-artwork"])==null?void 0:v.front_default)||c.front_default||"",P=a.map(({type:b})=>`
          <span class="type-badge type-badge--${b.name}">
            ${b.name}
          </span>
        `).join(""),R=`#${String(t).padStart(3,"0")}`;return`
      <li class="search__item">

        <a
          href="./details.html?id=${t}"
          class="search__link"
        >
          <img
            src="${u}"
            alt="${o}"
            loading="lazy"
          >

          <p class="search__id">${R}</p>

          <h3 class="search__name">${o}</h3>

          <div class="search__tag">
            ${P}
          </div>
        </a>

        <label class="search__fav">
          <input
            type="checkbox"
            class="search__checkbox"
            data-id="${t}"
            aria-label="Додати ${o} до обраного"
          >

          <svg class="search__icon search__icon--fav">
            <use href="${D}#heart"></use>
          </svg>
        </label>

      </li>
    `}).join("");U.innerHTML=n}async function M(){if(!p){p=!0,l.disabled=!0;try{const e=await T(G,$);if(!e)return;C=e.count,_=[..._,...e.results],$++,y(),e.next||(l.style.display="none")}catch(e){console.error("Помилка завантаження:",e)}finally{p=!1,l.disabled=!1}}}async function K(e){if(h.has(e))return h.get(e);const n=await fetch(e);if(!n.ok)throw new Error("Помилка отримання покемона");const t=await n.json();return h.set(e,t),t}async function Q(e){const n=await Promise.all(e.map(async o=>{if(!f.has(o)){const a=await fetch(`${N}/type/${o}`);if(!a.ok)throw new Error(`Помилка отримання типу: ${o}`);const c=await a.json();f.set(o,c.pokemon.map(u=>u.pokemon))}return f.get(o)})),t=n[0].filter(o=>n.every(a=>a.some(c=>c.name===o.name)));return Promise.all(t.map(o=>K(o.url)))}async function y(){const e=++q;V();try{let n;if(s.length>0?n=await Q(s):n=_,e!==q)return;J(n);const t=s.length===0?C:n.length;W.textContent=`Знайдено: ${t}`,l.style.display=s.length>0?"none":""}catch(n){console.error("Помилка фільтрації:",n)}}i.addEventListener("click",()=>{const e=i.getAttribute("aria-expanded")==="true";i.setAttribute("aria-expanded",String(!e)),d.hidden=e});d.addEventListener("click",async e=>{const n=e.target.closest(".search__option");if(!n)return;const t=n.dataset.type;t==="all"?s=[]:s.includes(t)?s=s.filter(o=>o!==t):s.push(t),k(),await y()});function k(){d.querySelectorAll(".search__option").forEach(n=>{const t=n.dataset.type,o=t==="all"?s.length===0:s.includes(t);n.classList.toggle("is-selected",o),n.setAttribute("aria-pressed",String(o))}),O.textContent=s.length===0?"Усі типи":`Обрано типів: ${s.length}`}document.addEventListener("click",e=>{z.contains(e.target)||(d.hidden=!0,i.setAttribute("aria-expanded","false"))});document.addEventListener("keydown",e=>{e.key==="Escape"&&(d.hidden=!0,i.setAttribute("aria-expanded","false"),i.focus())});k();l.addEventListener("click",M);M();function V(){x.innerHTML=s.map(e=>`
        <button
          class="search__active-filter"
          type="button"
          data-type="${e}"
        >
          ${e}
          <span>&times;</span>
        </button>
      `).join("")}x.addEventListener("click",async e=>{const n=e.target.closest(".search__active-filter");if(!n)return;const t=n.dataset.type;s=s.filter(o=>o!==t),k(),await y()});document.querySelector(".not-found");document.querySelector(".not-found__back-btn");document.querySelector(".not-found__clear-btn");
//# sourceMappingURL=commonHelpers3.js.map
