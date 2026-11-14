import{g as B,a as H,b as j}from"./assets/details-cc1a4a0c.js";const P="/chillteam/assets/symbol-defs-9e525b8f.svg",N=document.querySelector(".open-modal"),c=document.querySelector(".modal"),F=document.querySelector(".modal__close"),u=document.querySelector(".pokemon__random"),L=document.querySelector(".pokemonimg"),D=document.querySelector(".pokemon__name"),U=document.querySelector(".pokemon__number"),$=document.querySelector(".pokemon__types"),z=document.querySelector(".pokemon__height"),O=document.querySelector(".pokemon__weight"),q=document.querySelector(".pokemon__stats");N.addEventListener("click",()=>{c.classList.add("active"),C()});F.addEventListener("click",()=>{c.classList.remove("active")});c.addEventListener("click",e=>{e.target===c&&c.classList.remove("active")});document.addEventListener("keydown",e=>{e.key==="Escape"&&c.classList.remove("active")});async function C(){try{u.textContent="Завантаження...";const e=Math.floor(Math.random()*1025)+1,n=await fetch(`https://pokeapi.co/api/v2/pokemon/${e}`);if(!n.ok)throw new Error("Помилка завантаження покемона");const o=await n.json();L.src=o.sprites.other["official-artwork"].front_default||o.sprites.front_default,L.alt=o.name,D.textContent=o.name,U.textContent=`#${String(o.id).padStart(3,"0")}`,$.innerHTML="",o.types.forEach(t=>{const s=document.createElement("span");s.classList.add("pokemon__type",`type-badge--${t.type.name}`),s.textContent=t.type.name,$.appendChild(s)}),z.textContent=`${o.height/10} м`,O.textContent=`${o.weight/10} кг`,q.innerHTML="",o.stats.forEach(t=>{const s=document.createElement("div");s.classList.add("pokemon__stat"),s.innerHTML=`
        <span>${t.stat.name}</span>

        <div class="pokemon__bar">
          <div style="width: ${Math.min(t.base_stat/255*100,100)}%"></div>
        </div>

        <span>${t.base_stat}</span>
      `,q.appendChild(s)}),u.innerHTML=`
      <svg class="menu__icon">
    <use href="${P}#dice-five"></use>
  </svg>
  Дослідити ще

`}catch(e){console.error(e),u.textContent="Помилка завантаження. Спробувати ще раз"}}u.addEventListener("click",C);const M="https://pokeapi.co/api/v2",Q=document.querySelector(".search__list"),d=document.querySelector(".load-more"),W=document.querySelector(".search__dropdown"),i=document.querySelector(".search__select"),G=document.querySelector(".search__select-label"),m=document.querySelector(".search__options"),R=document.querySelector(".search__active-filters"),J=document.querySelector(".search__text"),K=document.querySelector(".search__input");let l="",a=[],E=1;const V=20;let h=!1,g=[],x=0;const y=new Map,_=new Map;let k=[];function X(e){const n=e.map(({id:o,name:t,types:s,sprites:r})=>{var w,b;const f=((b=(w=r.other)==null?void 0:w["official-artwork"])==null?void 0:b.front_default)||r.front_default||"",I=s.map(({type:S})=>`
          <span class="type-badge type-badge--${S.name}">
            ${S.name}
          </span>
        `).join(""),A=`#${String(o).padStart(3,"0")}`;return`
      <li class="search__item">
        <a href="./details.html?id=${o}" class="search__link">
          <img
            src="${f}"
            alt="${t}"
            loading="lazy"
          >

          <p class="search__id">${A}</p>

          <h3 class="search__name">${t}</h3>

          <div class="search__tag">
            ${I}
          </div>
        </a>

        <label class="search__fav">
          <input
            type="checkbox"
            class="search__checkbox"
            data-id="${o}"
            aria-label="Додати ${t} до обраного"
          >

          <svg class="search__icon search__icon--fav">
            <use href="${P}#heart"></use>
          </svg>
        </label>
      </li>
    `}).join("");Q.innerHTML=n}async function T(){if(!h){h=!0,d.disabled=!0;try{const e=await B(V,E);if(!e)return;g=[...g,...e.results],E++,await p(),e.next||(d.style.display="none")}catch(e){console.error("Помилка завантаження:",e)}finally{h=!1,d.disabled=!1}}}async function Y(e){if(_.has(e))return _.get(e);const n=e.split("/").filter(Boolean).pop(),o=await j(n);return o&&_.set(e,o),o}async function Z(e){const n=await Promise.all(e.map(async t=>{if(!y.has(t)){const s=await fetch(`${M}/type/${t}`);if(!s.ok)throw new Error(`Помилка отримання типу: ${t}`);const r=await s.json();y.set(t,r.pokemon.map(f=>f.pokemon))}return y.get(t)})),o=n[0].filter(t=>n.every(s=>s.some(r=>r.name===t.name)));return Promise.all(o.map(t=>Y(t.url)))}async function ee(e){try{const n=e.trim().toLowerCase();if(!n)return[];if(k.length===0){const t=await fetch(`${M}/pokemon?limit=2000`);if(!t.ok)throw new Error("Помилка отримання списку покемонів");k=(await t.json()).results}const o=k.filter(t=>t.name.includes(n)).slice(0,20);return await Promise.all(o.map(t=>H(t.name)))}catch(n){return console.error("Помилка пошуку покемона:",n),[]}}async function p(){const e=++x;te();try{let n;if(l?n=await ee(l):a.length>0?n=await Z(a):n=g,e!==x)return;l&&a.length>0&&(n=n.filter(o=>a.every(t=>o.types.some(s=>s.type.name===t)))),X(n),J.textContent=`Знайдено: ${n.length}`,d.style.display=l||a.length>0?"none":""}catch(n){console.error("Помилка фільтрації:",n)}}K.addEventListener("input",async e=>{l=e.target.value.trim().toLowerCase(),await p()});i.addEventListener("click",()=>{const e=i.getAttribute("aria-expanded")==="true";i.setAttribute("aria-expanded",String(!e)),m.hidden=e});m.addEventListener("click",async e=>{const n=e.target.closest(".search__option");if(!n)return;const o=n.dataset.type;o==="all"?a=[]:a.includes(o)?a=a.filter(t=>t!==o):a.push(o),v(),await p()});function v(){m.querySelectorAll(".search__option").forEach(n=>{const o=n.dataset.type,t=o==="all"?a.length===0:a.includes(o);n.classList.toggle("is-selected",t),n.setAttribute("aria-pressed",String(t))}),G.textContent=a.length===0?"Усі типи":`Обрано типів: ${a.length}`}document.addEventListener("click",e=>{W.contains(e.target)||(m.hidden=!0,i.setAttribute("aria-expanded","false"))});document.addEventListener("keydown",e=>{e.key==="Escape"&&(m.hidden=!0,i.setAttribute("aria-expanded","false"),i.focus())});function te(){R.innerHTML=a.map(e=>`
        <button
          class="search__active-filter"
          type="button"
          data-type="${e}"
        >
          ${e}
          <span>&times;</span>
        </button>
      `).join("")}R.addEventListener("click",async e=>{const n=e.target.closest(".search__active-filter");if(!n)return;const o=n.dataset.type;a=a.filter(t=>t!==o),v(),await p()});v();d.addEventListener("click",T);T();document.querySelector(".not-found");document.querySelector(".not-found__back-btn");document.querySelector(".not-found__clear-btn");
//# sourceMappingURL=commonHelpers3.js.map
