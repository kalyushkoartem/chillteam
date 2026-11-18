import"./assets/modulepreload-polyfill-3cfb730f.js";import{g as J,a as U,b as z}from"./assets/details-3019a716.js";import{s as C}from"./assets/fav-55e07a46.js";const K=document.querySelector(".open-modal"),c=document.querySelector(".modal"),Q=document.querySelector(".modal__close"),u=document.querySelector(".pokemon__random"),$=document.querySelector(".pokemonimg"),V=document.querySelector(".pokemon__name"),W=document.querySelector(".pokemon__number"),q=document.querySelector(".pokemon__types"),Y=document.querySelector(".pokemon__height"),G=document.querySelector(".pokemon__weight"),E=document.querySelector(".pokemon__stats");K.addEventListener("click",()=>{c.classList.add("active"),M()});Q.addEventListener("click",()=>{c.classList.remove("active")});c.addEventListener("click",e=>{e.target===c&&c.classList.remove("active")});document.addEventListener("keydown",e=>{e.key==="Escape"&&c.classList.remove("active")});async function M(){try{u.textContent="Завантаження...";const e=Math.floor(Math.random()*1025)+1,o=await fetch(`https://pokeapi.co/api/v2/pokemon/${e}`);if(!o.ok)throw new Error("Помилка завантаження покемона");const n=await o.json();$.src=n.sprites.other["official-artwork"].front_default||n.sprites.front_default,$.alt=n.name,V.textContent=n.name,W.textContent=`#${String(n.id).padStart(3,"0")}`,q.innerHTML="",n.types.forEach(t=>{const s=document.createElement("span");s.classList.add("pokemon__type",`type-badge--${t.type.name}`),s.textContent=t.type.name,q.appendChild(s)}),Y.textContent=`${n.height/10} м`,G.textContent=`${n.weight/10} кг`,E.innerHTML="",n.stats.forEach(t=>{const s=document.createElement("div");s.classList.add("pokemon__stat"),s.innerHTML=`
        <span>${t.stat.name}</span>

        <div class="pokemon__bar">
          <div style="width: ${Math.min(t.base_stat/255*100,100)}%"></div>
        </div>

        <span>${t.base_stat}</span>
      `,E.appendChild(s)}),u.innerHTML=`
      <svg class="menu__icon">
    <use href="${C}#dice-five"></use>
  </svg>
  Дослідити ще

`}catch(e){console.error(e),u.textContent="Помилка завантаження. Спробувати ще раз"}}u.addEventListener("click",M);const I="favorites";function R(){return JSON.parse(localStorage.getItem(I))||[]}function X(e){localStorage.setItem(I,JSON.stringify(e))}const T="https://pokeapi.co/api/v2",A=document.querySelector(".search__list"),d=document.querySelector(".load-more"),Z=document.querySelector(".search__dropdown"),i=document.querySelector(".search__select"),ee=document.querySelector(".search__select-label"),m=document.querySelector(".search__options"),B=document.querySelector(".search__active-filters"),te=document.querySelector(".search__text"),oe=document.querySelector(".search__input");let l="",a=[],x=1;const ne=20;let h=!1,g=[],P=0,N=[];const _=new Map,y=new Map;let k=[];A.addEventListener("change",e=>{const o=e.target.closest(".search__checkbox");if(!o)return;const n=Number(o.dataset.id);let t=R();if(o.checked){const s=N.find(r=>r.id===n);s&&!t.some(r=>r.id===n)&&t.push(s)}else t=t.filter(s=>s.id!==n);X(t)});function se(e){N=e;const n=R().map(s=>s.id),t=e.map(({id:s,name:r,types:f,sprites:S})=>{var w,b;const H=((b=(w=S.other)==null?void 0:w["official-artwork"])==null?void 0:b.front_default)||S.front_default||"",j=f.map(({type:L})=>`
          <span class="type-badge type-badge--${L.name}">
            ${L.name}
          </span>
        `).join(""),O=`#${String(s).padStart(3,"0")}`,D=n.includes(s);return`
      <li class="search__item">

        <a href="./details.html?id=${s}" class="search__link">
          <img src="${H}" alt="${r}" loading="lazy">

          <p class="search__id">${O}</p>

          <h3 class="search__name">${r}</h3>

          <div class="search__tag">
            ${j}
          </div>
        </a>

        <label class="search__fav">
          <input
            type="checkbox"
            class="search__checkbox"
            data-id="${s}"
            ${D?"checked":""}
            aria-label="Додати ${r} до обраного"
          >

          <svg class="search__icon search__icon--fav">
            <use href="${C}#heart"></use>
          </svg>
        </label>

      </li>
    `}).join("");A.innerHTML=t}async function F(){if(!h){h=!0,d.disabled=!0;try{const e=await J(ne,x);if(!e)return;g=[...g,...e.results],x++,await p(),e.next||(d.style.display="none")}catch(e){console.error("Помилка завантаження:",e)}finally{h=!1,d.disabled=!1}}}async function ae(e){if(y.has(e))return y.get(e);const o=e.split("/").filter(Boolean).pop(),n=await z(o);return n&&y.set(e,n),n}async function re(e){const o=await Promise.all(e.map(async t=>{if(!_.has(t)){const s=await fetch(`${T}/type/${t}`);if(!s.ok)throw new Error(`Помилка отримання типу: ${t}`);const r=await s.json();_.set(t,r.pokemon.map(f=>f.pokemon))}return _.get(t)})),n=o[0].filter(t=>o.every(s=>s.some(r=>r.name===t.name)));return Promise.all(n.map(t=>ae(t.url)))}async function ce(e){try{const o=e.trim().toLowerCase();if(!o)return[];if(k.length===0){const t=await fetch(`${T}/pokemon?limit=2000`);if(!t.ok)throw new Error("Помилка отримання списку покемонів");k=(await t.json()).results}const n=k.filter(t=>t.name.includes(o)).slice(0,20);return await Promise.all(n.map(t=>U(t.name)))}catch(o){return console.error("Помилка пошуку покемона:",o),[]}}async function p(){const e=++P;ie();try{let o;if(l?o=await ce(l):a.length>0?o=await re(a):o=g,e!==P)return;l&&a.length>0&&(o=o.filter(n=>a.every(t=>n.types.some(s=>s.type.name===t)))),se(o),te.textContent=`Знайдено: ${o.length}`,d.style.display=l||a.length>0?"none":""}catch(o){console.error("Помилка фільтрації:",o)}}oe.addEventListener("input",async e=>{l=e.target.value.trim().toLowerCase(),await p()});i.addEventListener("click",()=>{const e=i.getAttribute("aria-expanded")==="true";i.setAttribute("aria-expanded",String(!e)),m.hidden=e});m.addEventListener("click",async e=>{const o=e.target.closest(".search__option");if(!o)return;const n=o.dataset.type;n==="all"?a=[]:a.includes(n)?a=a.filter(t=>t!==n):a.push(n),v(),await p()});function v(){m.querySelectorAll(".search__option").forEach(o=>{const n=o.dataset.type,t=n==="all"?a.length===0:a.includes(n);o.classList.toggle("is-selected",t),o.setAttribute("aria-pressed",String(t))}),ee.textContent=a.length===0?"Усі типи":`Обрано типів: ${a.length}`}document.addEventListener("click",e=>{Z.contains(e.target)||(m.hidden=!0,i.setAttribute("aria-expanded","false"))});document.addEventListener("keydown",e=>{e.key==="Escape"&&(m.hidden=!0,i.setAttribute("aria-expanded","false"),i.focus())});function ie(){B.innerHTML=a.map(e=>`
        <button
          class="search__active-filter"
          type="button"
          data-type="${e}"
        >
          ${e}
          <span>&times;</span>
        </button>
      `).join("")}B.addEventListener("click",async e=>{const o=e.target.closest(".search__active-filter");if(!o)return;const n=o.dataset.type;a=a.filter(t=>t!==n),v(),await p()});v();d.addEventListener("click",F);F();document.querySelector(".not-found");document.querySelector(".not-found__back-btn");document.querySelector(".not-found__clear-btn");
//# sourceMappingURL=commonHelpers3.js.map
