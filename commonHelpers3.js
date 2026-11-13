import{g as A}from"./assets/details-6345fcfa.js";const I=document.querySelector(".open-modal"),r=document.querySelector(".modal"),j=document.querySelector(".modal__close"),m=document.querySelector(".pokemon__random"),w=document.querySelector(".pokemonimg"),H=document.querySelector(".pokemon__name"),B=document.querySelector(".pokemon__number"),L=document.querySelector(".pokemon__types"),F=document.querySelector(".pokemon__height"),D=document.querySelector(".pokemon__weight"),S=document.querySelector(".pokemon__stats");I.addEventListener("click",()=>{r.classList.add("active"),q()});j.addEventListener("click",()=>{r.classList.remove("active")});r.addEventListener("click",e=>{e.target===r&&r.classList.remove("active")});document.addEventListener("keydown",e=>{e.key==="Escape"&&r.classList.remove("active")});async function q(){try{m.textContent="Завантаження...";const e=Math.floor(Math.random()*1025)+1,o=await fetch(`https://pokeapi.co/api/v2/pokemon/${e}`);if(!o.ok)throw new Error("Помилка завантаження покемона");const t=await o.json();w.src=t.sprites.other["official-artwork"].front_default||t.sprites.front_default,w.alt=t.name,H.textContent=t.name,B.textContent=`#${String(t.id).padStart(3,"0")}`,L.innerHTML="",t.types.forEach(n=>{const s=document.createElement("span");s.classList.add("pokemon__type"),s.textContent=n.type.name,L.appendChild(s)}),F.textContent=`${t.height/10} м`,D.textContent=`${t.weight/10} кг`,S.innerHTML="",t.stats.forEach(n=>{const s=document.createElement("div");s.classList.add("pokemon__stat"),s.innerHTML=`
        <span>${n.stat.name}</span>

        <div class="pokemon__bar">
          <div style="width: ${Math.min(n.base_stat/255*100,100)}%"></div>
        </div>

        <span>${n.base_stat}</span>
      `,S.appendChild(s)}),m.textContent="🎲 Дослідити ще"}catch(e){console.error(e),m.textContent="Помилка завантаження. Спробувати ще раз"}}m.addEventListener("click",q);const N="/chillteam/assets/symbol-defs-e27a9455.svg",U="https://pokeapi.co/api/v2",z=document.querySelector(".search__list"),l=document.querySelector(".load-more"),E=document.querySelector(".search__input"),O=document.querySelector(".search__dropdown"),i=document.querySelector(".search__select"),W=document.querySelector(".search__select-label"),d=document.querySelector(".search__options"),C=document.querySelector(".search__active-filters"),G=document.querySelector(".search__text");let x=0,a=[],b=1;const J=20;let f=!1,y=[],$=0;const h=new Map,_=new Map;function K(e){const o=e.map(({id:t,name:n,types:s,sprites:c})=>{var k,g;const u=((g=(k=c.other)==null?void 0:k["official-artwork"])==null?void 0:g.front_default)||c.front_default||"",R=s.map(({type:v})=>`
      <span class="type-badge type-badge--${v.name}">
        ${v.name}
      </span>
    `).join(""),T=`#${String(t).padStart(3,"0")}`;return`
      <li class="search__item">

        <a
          href="./details.html?id=${t}"
          class="search__link"
        >
          <img
            src="${u}"
            alt="${n}"
            loading="lazy"
          >

          <p class="search__id">${T}</p>

          <h3 class="search__name">${n}</h3>

          <div class="search__tag">
            ${R}
          </div>
        </a>

        <label class="search__fav">
          <input
            type="checkbox"
            class="search__checkbox"
            data-id="${t}"
            aria-label="Додати ${n} до обраного"
          >

          <svg class="search__icon search__icon--fav">
            <use href="${N}#heart"></use>
          </svg>
        </label>

      </li>
    `}).join("");z.innerHTML=o}async function M(){if(!f){f=!0,l.disabled=!0;try{const e=await A(J,b);if(!e)return;x=e.count,y=[...y,...e.results],b++,p(),e.next||(l.style.display="none")}catch(e){console.error("Помилка завантаження:",e)}finally{f=!1,l.disabled=!1}}}async function Q(e){if(_.has(e))return _.get(e);const o=await fetch(e);if(!o.ok)throw new Error("Помилка отримання покемона");const t=await o.json();return _.set(e,t),t}async function V(e){const o=await Promise.all(e.map(async n=>{if(!h.has(n)){const s=await fetch(`${U}/type/${n}`);if(!s.ok)throw new Error(`Помилка отримання типу: ${n}`);const c=await s.json();h.set(n,c.pokemon.map(u=>u.pokemon))}return h.get(n)})),t=o[0].filter(n=>o.every(s=>s.some(c=>c.name===n.name)));return Promise.all(t.map(n=>Q(n.url)))}async function p(){const e=++$,o=E.value.trim().toLowerCase();X();try{let t;if(a.length>0?t=await V(a):t=y,e!==$)return;t=t.filter(s=>s.name.toLowerCase().includes(o)),K(t);const n=a.length===0&&o===""?x:t.length;G.textContent=`Знайдено: ${n}`,l.style.display=a.length>0?"none":""}catch(t){console.error("Помилка фільтрації:",t)}}i.addEventListener("click",()=>{const e=i.getAttribute("aria-expanded")==="true";i.setAttribute("aria-expanded",String(!e)),d.hidden=e});d.addEventListener("click",async e=>{const o=e.target.closest(".search__option");if(!o)return;const t=o.dataset.type;t==="all"?a=[]:a.includes(t)?a=a.filter(n=>n!==t):a.push(t),P(),await p()});function P(){d.querySelectorAll(".search__option").forEach(o=>{const t=o.dataset.type,n=t==="all"?a.length===0:a.includes(t);o.classList.toggle("is-selected",n),o.setAttribute("aria-pressed",String(n))}),W.textContent=a.length===0?"Усі типи":`Обрано типів: ${a.length}`}document.addEventListener("click",e=>{O.contains(e.target)||(d.hidden=!0,i.setAttribute("aria-expanded","false"))});document.addEventListener("keydown",e=>{e.key==="Escape"&&(d.hidden=!0,i.setAttribute("aria-expanded","false"),i.focus())});P();E.addEventListener("input",p);l.addEventListener("click",M);M();function X(){C.innerHTML=a.map(e=>`
        <button
          class="search__active-filter"
          type="button"
          data-type="${e}"
        >
          ${e}
          <span>&times;</span>
        </button>
      `).join("")}C.addEventListener("click",async e=>{const o=e.target.closest(".search__active-filter");if(!o)return;const t=o.dataset.type;a=a.filter(n=>n!==t),await p()});
//# sourceMappingURL=commonHelpers3.js.map
