(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const c of t.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&s(c)}).observe(document,{childList:!0,subtree:!0});function o(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function s(e){if(e.ep)return;e.ep=!0;const t=o(e);fetch(e.href,t)}})();const m="https://pokeapi.co/api/v2";async function p(r=20,n=1){try{const o=(n-1)*r,s=await fetch(`${m}/pokemon?limit=${r}&offset=${o}`);if(!s.ok)throw new Error("Помилка отримання покемонів");const e=await s.json();return{results:await Promise.all(e.results.map(async c=>await(await fetch(c.url)).json())),count:e.count,next:e.next}}catch(o){return console.error("Помилка отримання покемонів:",o),null}}const h=document.querySelector(".search__list"),a=document.querySelector(".load-more");let i=1;const y=20;let l=!1;function g(r){const n=r.map(({id:o,name:s,types:e,sprites:t})=>{const c=t.other["official-artwork"].front_default||t.front_default,f=e.map(d=>d.type.name).join(", ");return`
        <li class="search__item">
          <img src="${c}" alt="${s}">
          <p class="search__id">${o}</p>
          <h3 class="search__name">${s}</h3>
          <h4 class="search__tag">${f}</h4>
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
        </li>`}).join("");h.insertAdjacentHTML("beforeend",n)}async function u(){if(!l){l=!0,a.disabled=!0;try{const r=await p(y,i);if(!r)return;g(r.results),i++,r.next||(a.style.display="none"),console.log("Завантажена сторінка:",i-1)}catch(r){console.error("Помилка завантаження:",r)}finally{l=!1,a.disabled=!1}}}u();a.addEventListener("click",u);
//# sourceMappingURL=commonHelpers3.js.map
