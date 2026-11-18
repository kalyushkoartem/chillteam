import{s as p}from"./symbol-defs-64727322.js";const l=document.querySelector(".open-modal"),s=document.querySelector(".modal"),u=document.querySelector(".modal__close"),a=document.querySelector(".pokemon__random"),r=document.querySelector(".pokemonimg"),k=document.querySelector(".pokemon__name"),_=document.querySelector(".pokemon__number"),m=document.querySelector(".pokemon__types"),y=document.querySelector(".pokemon__height"),h=document.querySelector(".pokemon__weight"),d=document.querySelector(".pokemon__stats");l.addEventListener("click",()=>{s.classList.add("active"),i()});u.addEventListener("click",()=>{s.classList.remove("active")});s.addEventListener("click",t=>{t.target===s&&s.classList.remove("active")});document.addEventListener("keydown",t=>{t.key==="Escape"&&s.classList.remove("active")});async function i(){try{a.textContent="Завантаження...";const t=Math.floor(Math.random()*1025)+1,c=await fetch(`https://pokeapi.co/api/v2/pokemon/${t}`);if(!c.ok)throw new Error("Помилка завантаження покемона");const e=await c.json();r.src=e.sprites.other["official-artwork"].front_default||e.sprites.front_default,r.alt=e.name,k.textContent=e.name,_.textContent=`#${String(e.id).padStart(3,"0")}`,m.innerHTML="",e.types.forEach(n=>{const o=document.createElement("span");o.classList.add("pokemon__type",`type-badge--${n.type.name}`),o.textContent=n.type.name,m.appendChild(o)}),y.textContent=`${e.height/10} м`,h.textContent=`${e.weight/10} кг`,d.innerHTML="",e.stats.forEach(n=>{const o=document.createElement("div");o.classList.add("pokemon__stat"),o.innerHTML=`
        <span>${n.stat.name}</span>

        <div class="pokemon__bar">
          <div style="width: ${Math.min(n.base_stat/255*100,100)}%"></div>
        </div>

        <span>${n.base_stat}</span>
      `,d.appendChild(o)}),a.innerHTML=`
      <svg class="menu__icon">
    <use href="${p}#dice-five"></use>
  </svg>
  Дослідити ще

`}catch(t){console.error(t),a.textContent="Помилка завантаження. Спробувати ще раз"}}a.addEventListener("click",i);
//# sourceMappingURL=menu-1752278e.js.map
