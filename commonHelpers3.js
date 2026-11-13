import{g as T}from"./assets/details-6345fcfa.js";const A=document.querySelector(".open-modal"),r=document.querySelector(".modal"),I=document.querySelector(".modal__close"),m=document.querySelector(".pokemon__random"),v=document.querySelector(".pokemonimg"),j=document.querySelector(".pokemon__name"),H=document.querySelector(".pokemon__number"),w=document.querySelector(".pokemon__types"),B=document.querySelector(".pokemon__height"),F=document.querySelector(".pokemon__weight"),L=document.querySelector(".pokemon__stats");A.addEventListener("click",()=>{r.classList.add("active"),b()});I.addEventListener("click",()=>{r.classList.remove("active")});r.addEventListener("click",e=>{e.target===r&&r.classList.remove("active")});document.addEventListener("keydown",e=>{e.key==="Escape"&&r.classList.remove("active")});async function b(){try{m.textContent="Завантаження...";const e=Math.floor(Math.random()*1025)+1,o=await fetch(`https://pokeapi.co/api/v2/pokemon/${e}`);if(!o.ok)throw new Error("Помилка завантаження покемона");const t=await o.json();v.src=t.sprites.other["official-artwork"].front_default||t.sprites.front_default,v.alt=t.name,j.textContent=t.name,H.textContent=`#${String(t.id).padStart(3,"0")}`,w.innerHTML="",t.types.forEach(n=>{const s=document.createElement("span");s.classList.add("pokemon__type"),s.textContent=n.type.name,w.appendChild(s)}),B.textContent=`${t.height/10} м`,F.textContent=`${t.weight/10} кг`,L.innerHTML="",t.stats.forEach(n=>{const s=document.createElement("div");s.classList.add("pokemon__stat"),s.innerHTML=`
        <span>${n.stat.name}</span>

        <div class="pokemon__bar">
          <div style="width: ${Math.min(n.base_stat/255*100,100)}%"></div>
        </div>

        <span>${n.base_stat}</span>
      `,L.appendChild(s)}),m.textContent="🎲 Дослідити ще"}catch(e){console.error(e),m.textContent="Помилка завантаження. Спробувати ще раз"}}m.addEventListener("click",b);const N="https://pokeapi.co/api/v2",D=document.querySelector(".search__list"),l=document.querySelector(".load-more"),E=document.querySelector(".search__input"),O=document.querySelector(".search__dropdown"),i=document.querySelector(".search__select"),U=document.querySelector(".search__select-label"),d=document.querySelector(".search__options"),$=document.querySelector(".search__active-filters"),W=document.querySelector(".search__text");let C=0,a=[],S=1;const z=20;let f=!1,y=[],q=0;const h=new Map,_=new Map;function G(e){const o=e.map(({id:t,name:n,types:s,sprites:c})=>{var k,g;const p=((g=(k=c.other)==null?void 0:k["official-artwork"])==null?void 0:g.front_default)||c.front_default,P=s.map(R=>R.type.name).join(", ");return`
      <li class="search__item">
    <a href="" class="search__link">
        <img src="${p||""}" alt="${n}">
        <p class="search__id">${t}</p>
        <h3 class="search__name">${n}</h3>
        <h4 class="search__tag">${P}</h4>

        <label class="search__fav">
          <input
            type="checkbox"
            class="search__checkbox"
            data-id="${t}"
          >
          <svg class="search__icon search__icon--fav">
            <use href="./img/symbol-defs.svg#heart"></use>
          </svg>
        </label>
        </a>
      </li>`}).join("");D.innerHTML=o}async function x(){if(!f){f=!0,l.disabled=!0;try{const e=await T(z,S);if(!e)return;C=e.count,y=[...y,...e.results],S++,u(),e.next||(l.style.display="none")}catch(e){console.error("Помилка завантаження:",e)}finally{f=!1,l.disabled=!1}}}async function J(e){if(_.has(e))return _.get(e);const o=await fetch(e);if(!o.ok)throw new Error("Помилка отримання покемона");const t=await o.json();return _.set(e,t),t}async function K(e){const o=await Promise.all(e.map(async n=>{if(!h.has(n)){const s=await fetch(`${N}/type/${n}`);if(!s.ok)throw new Error(`Помилка отримання типу: ${n}`);const c=await s.json();h.set(n,c.pokemon.map(p=>p.pokemon))}return h.get(n)})),t=o[0].filter(n=>o.every(s=>s.some(c=>c.name===n.name)));return Promise.all(t.map(n=>J(n.url)))}async function u(){const e=++q,o=E.value.trim().toLowerCase();Q();try{let t;if(a.length>0?t=await K(a):t=y,e!==q)return;t=t.filter(s=>s.name.toLowerCase().includes(o)),G(t);const n=a.length===0&&o===""?C:t.length;W.textContent=`Знайдено: ${n}`,l.style.display=a.length>0?"none":""}catch(t){console.error("Помилка фільтрації:",t)}}i.addEventListener("click",()=>{const e=i.getAttribute("aria-expanded")==="true";i.setAttribute("aria-expanded",String(!e)),d.hidden=e});d.addEventListener("click",async e=>{const o=e.target.closest(".search__option");if(!o)return;const t=o.dataset.type;t==="all"?a=[]:a.includes(t)?a=a.filter(n=>n!==t):a.push(t),M(),await u()});function M(){d.querySelectorAll(".search__option").forEach(o=>{const t=o.dataset.type,n=t==="all"?a.length===0:a.includes(t);o.classList.toggle("is-selected",n),o.setAttribute("aria-pressed",String(n))}),U.textContent=a.length===0?"Усі типи":`Обрано типів: ${a.length}`}document.addEventListener("click",e=>{O.contains(e.target)||(d.hidden=!0,i.setAttribute("aria-expanded","false"))});document.addEventListener("keydown",e=>{e.key==="Escape"&&(d.hidden=!0,i.setAttribute("aria-expanded","false"),i.focus())});M();E.addEventListener("input",u);l.addEventListener("click",x);x();function Q(){$.innerHTML=a.map(e=>`
        <button
          class="search__active-filter"
          type="button"
          data-type="${e}"
        >
          ${e}
          <span>&times;</span>
        </button>
      `).join("")}$.addEventListener("click",async e=>{const o=e.target.closest(".search__active-filter");if(!o)return;const t=o.dataset.type;a=a.filter(n=>n!==t),await u()});
//# sourceMappingURL=commonHelpers3.js.map
