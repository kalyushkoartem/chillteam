import{s as g}from"./symbol-defs-64727322.js";const d="favorites",_=document.querySelector("#favorites-list"),p=document.querySelector(".fav__count"),y=document.querySelector(".fav__btn"),$=document.querySelector(".fav__empty");function f(){return JSON.parse(localStorage.getItem(d))||[]}function h(e){localStorage.setItem(d,JSON.stringify(e))}function o(){const e=f();p.textContent=`У вас ${e.length} улюблених покемонів`,$.hidden=e.length>0,_.innerHTML=e.map(s=>{var n,i;const{id:t,name:a,types:c,sprites:r}=s,m=((i=(n=r.other)==null?void 0:n["official-artwork"])==null?void 0:i.front_default)||r.front_default||"",u=`#${String(t).padStart(3,"0")}`,v=c.map(({type:l})=>`
      <span class="type-badge type-badge--${l.name}">
        ${l.name}
      </span>
    `).join("");return`
      <li class="search__item">

        <a href="./details.html?id=${t}" class="search__link">

          <img src="${m}" alt="${a}" loading="lazy">

          <p class="search__id">${u}</p>

          <h3 class="search__name">${a}</h3>

          <div class="search__tag">
            ${v}
          </div>

        </a>

        <label class="search__fav">
          <input
            type="checkbox"
            class="search__checkbox"
            data-id="${t}"
            checked
          >

          <svg class="search__icon search__icon--fav">
            <use href="${g}#heart"></use>
          </svg>
        </label>

      </li>
    `}).join("")}_.addEventListener("change",e=>{const s=e.target.closest(".search__checkbox");if(!s)return;const t=Number(s.dataset.id),a=f().filter(c=>c.id!==t);h(a),o()});y.addEventListener("click",()=>{h([]),o()});o();
//# sourceMappingURL=fav-c0351be0.js.map
