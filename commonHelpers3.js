import{g}from"./assets/details-6345fcfa.js";const v=document.querySelector(".open-modal"),a=document.querySelector(".modal"),L=document.querySelector(".modal__close"),c=document.querySelector(".pokemon__random"),d=document.querySelector(".pokemonimg"),S=document.querySelector(".pokemon__name"),b=document.querySelector(".pokemon__number"),p=document.querySelector(".pokemon__types"),q=document.querySelector(".pokemon__height"),E=document.querySelector(".pokemon__weight"),u=document.querySelector(".pokemon__stats");v.addEventListener("click",()=>{a.classList.add("active"),_()});L.addEventListener("click",()=>{a.classList.remove("active")});a.addEventListener("click",e=>{e.target===a&&a.classList.remove("active")});document.addEventListener("keydown",e=>{e.key==="Escape"&&a.classList.remove("active")});async function _(){try{c.textContent="Завантаження...";const e=Math.floor(Math.random()*1025)+1,s=await fetch(`https://pokeapi.co/api/v2/pokemon/${e}`);if(!s.ok)throw new Error("Помилка завантаження покемона");const t=await s.json();d.src=t.sprites.other["official-artwork"].front_default||t.sprites.front_default,d.alt=t.name,S.textContent=t.name,b.textContent=`#${String(t.id).padStart(3,"0")}`,p.innerHTML="",t.types.forEach(n=>{const o=document.createElement("span");o.classList.add("pokemon__type"),o.textContent=n.type.name,p.appendChild(o)}),q.textContent=`${t.height/10} м`,E.textContent=`${t.weight/10} кг`,u.innerHTML="",t.stats.forEach(n=>{const o=document.createElement("div");o.classList.add("pokemon__stat"),o.innerHTML=`
        <span>${n.stat.name}</span>

        <div class="pokemon__bar">
          <div style="width: ${Math.min(n.base_stat/255*100,100)}%"></div>
        </div>

        <span>${n.base_stat}</span>
      `,u.appendChild(o)}),c.textContent="🎲 Дослідити ще"}catch(e){console.error(e),c.textContent="Помилка завантаження. Спробувати ще раз"}}c.addEventListener("click",_);const $=document.querySelector(".search__list"),r=document.querySelector(".load-more");let i=1;const w=20;let l=!1;function x(e){const s=e.map(({id:t,name:n,types:o,sprites:m})=>{const k=m.other["official-artwork"].front_default||m.front_default,f=o.map(y=>y.type.name).join(", ");return`
        <li class="search__item">
          <img src="${k}" alt="${n}">
          <p class="search__id">${t}</p>
          <h3 class="search__name">${n}</h3>
          <h4 class="search__tag">${f}</h4>
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
        </li>`}).join("");$.insertAdjacentHTML("beforeend",s)}async function h(){if(!l){l=!0,r.disabled=!0;try{const e=await g(w,i);if(!e)return;x(e.results),i++,e.next||(r.style.display="none"),console.log("Завантажена сторінка:",i-1)}catch(e){console.error("Помилка завантаження:",e)}finally{l=!1,r.disabled=!1}}}h();r.addEventListener("click",h);
//# sourceMappingURL=commonHelpers3.js.map
