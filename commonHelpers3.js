(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const n of e)if(n.type==="childList")for(const c of n.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&r(c)}).observe(document,{childList:!0,subtree:!0});function o(e){const n={};return e.integrity&&(n.integrity=e.integrity),e.referrerPolicy&&(n.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?n.credentials="include":e.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function r(e){if(e.ep)return;e.ep=!0;const n=o(e);fetch(e.href,n)}})();const g=document.querySelector(".open-modal"),a=document.querySelector(".modal"),v=document.querySelector(".modal__close"),i=document.querySelector(".pokemon__random"),p=document.querySelector(".pokemonimg"),L=document.querySelector(".pokemon__name"),w=document.querySelector(".pokemon__number"),f=document.querySelector(".pokemon__types"),S=document.querySelector(".pokemon__height"),b=document.querySelector(".pokemon__weight"),h=document.querySelector(".pokemon__stats");g.addEventListener("click",()=>{a.classList.add("active"),y()});v.addEventListener("click",()=>{a.classList.remove("active")});a.addEventListener("click",t=>{t.target===a&&a.classList.remove("active")});document.addEventListener("keydown",t=>{t.key==="Escape"&&a.classList.remove("active")});async function y(){try{i.textContent="Завантаження...";const t=Math.floor(Math.random()*1025)+1,s=await fetch(`https://pokeapi.co/api/v2/pokemon/${t}`);if(!s.ok)throw new Error("Помилка завантаження покемона");const o=await s.json();p.src=o.sprites.other["official-artwork"].front_default||o.sprites.front_default,p.alt=o.name,L.textContent=o.name,w.textContent=`#${String(o.id).padStart(3,"0")}`,f.innerHTML="",o.types.forEach(r=>{const e=document.createElement("span");e.classList.add("pokemon__type"),e.textContent=r.type.name,f.appendChild(e)}),S.textContent=`${o.height/10} м`,b.textContent=`${o.weight/10} кг`,h.innerHTML="",o.stats.forEach(r=>{const e=document.createElement("div");e.classList.add("pokemon__stat"),e.innerHTML=`
        <span>${r.stat.name}</span>

        <div class="pokemon__bar">
          <div style="width: ${Math.min(r.base_stat/255*100,100)}%"></div>
        </div>

        <span>${r.base_stat}</span>
      `,h.appendChild(e)}),i.textContent="🎲 Дослідити ще"}catch(t){console.error(t),i.textContent="Помилка завантаження. Спробувати ще раз"}}i.addEventListener("click",y);const $="https://pokeapi.co/api/v2";async function E(t=20,s=1){try{const o=(s-1)*t,r=await fetch(`${$}/pokemon?limit=${t}&offset=${o}`);if(!r.ok)throw new Error("Помилка отримання покемонів");const e=await r.json();return{results:await Promise.all(e.results.map(async c=>await(await fetch(c.url)).json())),count:e.count,next:e.next}}catch(o){return console.error("Помилка отримання покемонів:",o),null}}const q=document.querySelector(".search__list"),l=document.querySelector(".load-more");let d=1;const x=20;let m=!1;function M(t){const s=t.map(({id:o,name:r,types:e,sprites:n})=>{const c=n.other["official-artwork"].front_default||n.front_default,u=e.map(k=>k.type.name).join(", ");return`
        <li class="search__item">
          <img src="${c}" alt="${r}">
          <p class="search__id">${o}</p>
          <h3 class="search__name">${r}</h3>
          <h4 class="search__tag">${u}</h4>
          <label class="search__fav">
  <input
    type="checkbox"
    class="search__checkbox"
    data-id="${o}"
  >

  <svg class="search__icon search__icon--fav">
    <use href="./img/symbol-defs.svg#heart"></use>
  </svg>
</label>
        </li>`}).join("");q.insertAdjacentHTML("beforeend",s)}async function _(){if(!m){m=!0,l.disabled=!0;try{const t=await E(x,d);if(!t)return;M(t.results),d++,t.next||(l.style.display="none"),console.log("Завантажена сторінка:",d-1)}catch(t){console.error("Помилка завантаження:",t)}finally{m=!1,l.disabled=!1}}}_();l.addEventListener("click",_);
//# sourceMappingURL=commonHelpers3.js.map
