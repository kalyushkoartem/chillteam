import"./assets/modulepreload-polyfill-3cfb730f.js";import{g as V,a as W,b as Y}from"./assets/details-3019a716.js";import{s as R}from"./assets/fav-55e07a46.js";const G=document.querySelector(".open-modal"),i=document.querySelector(".modal"),X=document.querySelector(".modal__close"),p=document.querySelector(".pokemon__random"),E=document.querySelector(".pokemonimg"),Z=document.querySelector(".pokemon__name"),ee=document.querySelector(".pokemon__number"),q=document.querySelector(".pokemon__types"),te=document.querySelector(".pokemon__height"),ne=document.querySelector(".pokemon__weight"),x=document.querySelector(".pokemon__stats");G.addEventListener("click",()=>{i.classList.add("active"),F()});X.addEventListener("click",()=>{i.classList.remove("active")});i.addEventListener("click",e=>{e.target===i&&i.classList.remove("active")});document.addEventListener("keydown",e=>{e.key==="Escape"&&i.classList.remove("active")});async function F(){try{p.textContent="Завантаження...";const e=Math.floor(Math.random()*1025)+1,n=await fetch(`https://pokeapi.co/api/v2/pokemon/${e}`);if(!n.ok)throw new Error("Помилка завантаження покемона");const o=await n.json();E.src=o.sprites.other["official-artwork"].front_default||o.sprites.front_default,E.alt=o.name,Z.textContent=o.name,ee.textContent=`#${String(o.id).padStart(3,"0")}`,q.innerHTML="",o.types.forEach(t=>{const s=document.createElement("span");s.classList.add("pokemon__type",`type-badge--${t.type.name}`),s.textContent=t.type.name,q.appendChild(s)}),te.textContent=`${o.height/10} м`,ne.textContent=`${o.weight/10} кг`,x.innerHTML="",o.stats.forEach(t=>{const s=document.createElement("div");s.classList.add("pokemon__stat"),s.innerHTML=`
        <span>${t.stat.name}</span>

        <div class="pokemon__bar">
          <div style="width: ${Math.min(t.base_stat/255*100,100)}%"></div>
        </div>

        <span>${t.base_stat}</span>
      `,x.appendChild(s)}),p.innerHTML=`
      <svg class="menu__icon">
    <use href="${R}#dice-five"></use>
  </svg>
  Дослідити ще

`}catch(e){console.error(e),p.textContent="Помилка завантаження. Спробувати ще раз"}}p.addEventListener("click",F);const f=document.querySelector(".notfound[hidden]"),P=document.querySelector(".notfound__backbtn"),C=document.querySelector(".notfound__clearbtn");function oe(){f&&(f.hidden=!1)}function N(){f&&(f.hidden=!0)}function se(e){P&&P.addEventListener("click",()=>{window.location.href="./index.html"}),C&&C.addEventListener("click",()=>{e(),N()})}const T="favorites";function B(){return JSON.parse(localStorage.getItem(T))||[]}function ae(e){localStorage.setItem(T,JSON.stringify(e))}const A="https://pokeapi.co/api/v2",H=document.querySelector(".search__list"),d=document.querySelector(".load-more"),re=document.querySelector(".search__dropdown"),l=document.querySelector(".search__select"),ce=document.querySelector(".search__select-label"),m=document.querySelector(".search__options"),j=document.querySelector(".search__active-filters"),ie=document.querySelector(".search__text"),O=document.querySelector(".search__input");let c="",a=[],M=1;const le=20;let y=!1,w=[],I=0,D=[];const k=new Map,g=new Map;let v=[];H.addEventListener("change",e=>{const n=e.target.closest(".search__checkbox");if(!n)return;const o=Number(n.dataset.id);let t=B();if(n.checked){const s=D.find(r=>r.id===o);s&&!t.some(r=>r.id===o)&&t.push(s)}else t=t.filter(s=>s.id!==o);ae(t)});function de(e){D=e;const o=B().map(s=>s.id),t=e.map(({id:s,name:r,types:_,sprites:S})=>{var b,L;const U=((L=(b=S.other)==null?void 0:b["official-artwork"])==null?void 0:L.front_default)||S.front_default||"",z=_.map(({type:$})=>`
          <span class="type-badge type-badge--${$.name}">
            ${$.name}
          </span>
        `).join(""),K=`#${String(s).padStart(3,"0")}`,Q=o.includes(s);return`
      <li class="search__item">

        <a href="./details.html?id=${s}" class="search__link">
          <img src="${U}" alt="${r}" loading="lazy">

          <p class="search__id">${K}</p>

          <h3 class="search__name">${r}</h3>

          <div class="search__tag">
            ${z}
          </div>
        </a>

        <label class="search__fav">
          <input
            type="checkbox"
            class="search__checkbox"
            data-id="${s}"
            ${Q?"checked":""}
            aria-label="Додати ${r} до обраного"
          >

          <svg class="search__icon search__icon--fav">
            <use href="${R}#heart"></use>
          </svg>
        </label>

      </li>
    `}).join("");H.innerHTML=t}async function J(){if(!y){y=!0,d.disabled=!0;try{const e=await V(le,M);if(!e)return;w=[...w,...e.results],M++,await u(),e.next||(d.style.display="none")}catch(e){console.error("Помилка завантаження:",e)}finally{y=!1,d.disabled=!1}}}async function me(e){if(g.has(e))return g.get(e);const n=e.split("/").filter(Boolean).pop(),o=await Y(n);return o&&g.set(e,o),o}async function ue(e){const n=await Promise.all(e.map(async t=>{if(!k.has(t)){const s=await fetch(`${A}/type/${t}`);if(!s.ok)throw new Error(`Помилка отримання типу: ${t}`);const r=await s.json();k.set(t,r.pokemon.map(_=>_.pokemon))}return k.get(t)})),o=n[0].filter(t=>n.every(s=>s.some(r=>r.name===t.name)));return Promise.all(o.map(t=>me(t.url)))}async function pe(e){try{const n=e.trim().toLowerCase();if(!n)return[];if(v.length===0){const t=await fetch(`${A}/pokemon?limit=2000`);if(!t.ok)throw new Error("Помилка отримання списку покемонів");v=(await t.json()).results}const o=v.filter(t=>t.name.includes(n)).slice(0,20);return await Promise.all(o.map(t=>W(t.name)))}catch(n){return console.error("Помилка пошуку покемона:",n),[]}}async function u(){const e=++I;fe();try{let n;if(c?n=await pe(c):a.length>0?n=await ue(a):n=w,e!==I)return;c&&a.length>0&&(n=n.filter(o=>a.every(t=>o.types.some(s=>s.type.name===t)))),de(n),n.length===0?oe():N(),ie.textContent=`Знайдено: ${n.length}`,d.style.display=c||a.length>0?"none":""}catch(n){console.error("Помилка фільтрації:",n)}}O.addEventListener("input",async e=>{c=e.target.value.trim().toLowerCase(),await u()});l.addEventListener("click",()=>{const e=l.getAttribute("aria-expanded")==="true";l.setAttribute("aria-expanded",String(!e)),m.hidden=e});m.addEventListener("click",async e=>{const n=e.target.closest(".search__option");if(!n)return;const o=n.dataset.type;o==="all"?a=[]:a.includes(o)?a=a.filter(t=>t!==o):a.push(o),h(),await u()});function h(){m.querySelectorAll(".search__option").forEach(n=>{const o=n.dataset.type,t=o==="all"?a.length===0:a.includes(o);n.classList.toggle("is-selected",t),n.setAttribute("aria-pressed",String(t))}),ce.textContent=a.length===0?"Усі типи":`Обрано типів: ${a.length}`}document.addEventListener("click",e=>{re.contains(e.target)||(m.hidden=!0,l.setAttribute("aria-expanded","false"))});document.addEventListener("keydown",e=>{e.key==="Escape"&&(m.hidden=!0,l.setAttribute("aria-expanded","false"),l.focus())});function fe(){j.innerHTML=a.map(e=>`
        <button
          class="search__active-filter"
          type="button"
          data-type="${e}"
        >
          ${e}
          <span>&times;</span>
        </button>
      `).join("")}j.addEventListener("click",async e=>{const n=e.target.closest(".search__active-filter");if(!n)return;const o=n.dataset.type;a=a.filter(t=>t!==o),h(),await u()});h();d.addEventListener("click",J);se(()=>{c="",a=[],O.value="",h(),u()});J();
//# sourceMappingURL=commonHelpers3.js.map
