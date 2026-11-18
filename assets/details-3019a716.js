const b="https://pokeapi.co/api/v2";async function G(e=20,t=1){try{const o=(t-1)*e,s=await fetch(`${b}/pokemon?limit=${e}&offset=${o}`);if(!s.ok)throw new Error("Помилка отримання покемонів");const a=await s.json();return{results:await Promise.all(a.results.map(async n=>await(await fetch(n.url)).json())),count:a.count,next:a.next}}catch(o){return console.error("Помилка отримання покемонів:",o),null}}async function $(e){try{const t=await fetch(`${b}/pokemon/${e}`);if(!t.ok)throw new Error("Помилка отримання покемона");return await t.json()}catch(t){console.error("Сталася помилка при отриманні покемона:",t)}}async function K(e){try{const t=await fetch(`${b}/pokemon/${e.toLowerCase()}`);if(!t.ok)throw new Error("Помилка отримання покемона");return await t.json()}catch(t){console.error("Сталася помилка при отриманні покемона:",t)}}const R=new URLSearchParams(window.location.search),k=Number(R.get("id")),U=Number.isInteger(k)&&k>0?k:25,w=e=>"#"+String(e).padStart(3,"0"),y=e=>e?e.charAt(0).toUpperCase()+e.slice(1):"",j=e=>`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${e}.png`;async function T(e){const t=await fetch(e);if(!t.ok)throw new Error(`HTTP ${t.status}`);return t.json()}async function D(e){var t,o,s,a,d,n,r;try{const i=await $(e);if(!i)throw new Error("Покемона не знайдено");const c=await T(i.species.url),u=w(i.id),f=c.generation.name.replace("generation-","Generation ").replace(/\b(i|ii|iii|iv|v|vi|vii|viii|ix)\b/i,l=>l.toUpperCase()),m=document.querySelectorAll(".details__pokemonid");m[0]&&(m[0].textContent=u),m[1]&&(m[1].textContent=`${u} · ${f}`);const p=document.querySelector(".details__img");p&&(p.src=((o=(t=i.sprites.other)==null?void 0:t["official-artwork"])==null?void 0:o.front_default)||i.sprites.front_default||j(i.id),p.alt=i.name);const g=document.querySelector(".details__name");g&&(g.textContent=y(i.name));const v=(s=c.genera)==null?void 0:s.find(l=>l.language.name==="en"),h=document.querySelector(".details__genus");h&&(h.textContent=(v==null?void 0:v.genus)||"");const x=(a=c.flavor_text_entries)==null?void 0:a.find(l=>l.language.name==="en"),S=document.querySelector(".details__description");S&&(S.textContent=x?x.flavor_text.replace(/[\f\n\r]+/g," "):"");const E=document.querySelector(".details__filtr");E&&(E.innerHTML=i.types.map(({type:l})=>`
      <span class="type-badge type-badge--${l.name}">
        ${l.name}
      </span>
    `).join(""));const q=document.querySelector(".details__height .details__text");q&&(q.textContent=`${(i.height/10).toFixed(1)} m`);const C=document.querySelector(".details__weight .details__text");C&&(C.textContent=`${(i.weight/10).toFixed(1)} kg`);const A=document.querySelector(".details__capability .details__text"),N=((n=(d=i.abilities[0])==null?void 0:d.ability)==null?void 0:n.name)||"—";A&&(A.textContent=y(N.replaceAll("-"," ")));const B=document.querySelectorAll(".stat-row");let P=0;i.stats.forEach((l,H)=>{P+=l.base_stat;const _=B[H];if(!_)return;const L=_.querySelector(".stat-value"),F=_.querySelector(".progress-bar");if(L&&(L.textContent=l.base_stat),F){const M=Math.min(l.base_stat/200*100,100);F.style.width=`${M}%`}});const I=document.querySelector(".details__total");if(I&&(I.textContent=`Разом: ${P}`),(r=c.evolution_chain)!=null&&r.url){const l=await T(c.evolution_chain.url);J(l.chain,i.species.name)}await O(i.id),z(i)}catch(i){console.error("Помилка завантаження Pokémon:",i);const c=document.querySelector(".details__name");c&&(c.textContent="Не вдалося завантажити Pokémon")}}function J(e,t){const o=document.querySelector(".evolution-chain");if(!o||!e)return;const s=[];function a(n,r=null){var m,p,g,v;const i=n.species.url.split("/").filter(Boolean),c=Number(i.at(-1)),u=(m=n.evolution_details)==null?void 0:m[0];let f="";u&&(u.min_level?f=`Рівень ${u.min_level}`:u.item?f=u.item.name.replaceAll("-"," "):u.min_happiness?f="Висока дружба":((p=u.trigger)==null?void 0:p.name)==="trade"?f="Обмін":(g=u.trigger)!=null&&g.name&&(f=u.trigger.name.replaceAll("-"," "))),s.push({id:c,name:n.species.name,trigger:f,parentId:r}),(v=n.evolves_to)==null||v.forEach(h=>{a(h,c)})}a(e),o.innerHTML=s.map(n=>{const r=n.name===t;return`
        ${n.parentId!==null?`
          <div class="evo-arrow-container">
            <div class="arrow-graphic">→</div>
            <div>${n.trigger}</div>
          </div>
        `:""}

        <div class="evo-pokemon"
             data-id="${n.id}"
             role="link"
             tabindex="0">

          <div class="evo-img-container ${r?"bg-yellow":"bg-blue"}">
            <img
              class="evo-img"
              src="${j(n.id)}"
              alt="${n.name}"
              loading="lazy"
            >
          </div>

          <div class="evo-name"
               ${r?'style="color:#2563eb;"':""}>
            ${y(n.name)}
          </div>

          <div class="evo-id">
            ${w(n.id)}
          </div>

        </div>
      `}).join("");function d(n){const r=n.target.closest(".evo-pokemon");r&&(window.location.search=`?id=${r.dataset.id}`)}o.addEventListener("click",d),o.addEventListener("keydown",n=>{if(n.key!=="Enter"&&n.key!==" ")return;const r=n.target.closest(".evo-pokemon");r&&(n.preventDefault(),window.location.search=`?id=${r.dataset.id}`)})}async function O(e){const t=document.querySelectorAll(".pokedex-footer .nav-link"),o=t[0],s=t[1];if(!o||!s)return;if(e>1){const d=await $(e-1);d?(o.textContent=`← ${w(d.id)} ${y(d.name)}`,o.href=`?id=${d.id}`,o.style.visibility="visible"):o.style.visibility="hidden"}else o.style.visibility="hidden";const a=await $(e+1);a?(s.textContent=`${w(a.id)} ${y(a.name)} →`,s.href=`?id=${a.id}`,s.style.visibility="visible"):s.style.visibility="hidden"}function z(e){const t=document.querySelector(".details__fav"),o=document.querySelector(".favorite-action-btn");if(!t&&!o)return;const s="favorites";function a(){try{return JSON.parse(localStorage.getItem(s))||[]}catch{return[]}}function d(){const i=a().some(c=>c.id===e.id);t&&(t.classList.toggle("active",i),t.setAttribute("aria-pressed",String(i))),o&&(o.classList.toggle("is-fav",i),o.innerHTML=i?'<span class="heart-icon">♥</span> В обраному':'<span class="heart-icon">♡</span> Додати до обраного')}function n(){let r=a();r.some(c=>c.id===e.id)?r=r.filter(c=>c.id!==e.id):r.push(e),localStorage.setItem(s,JSON.stringify(r)),d()}t&&(t.onclick=n),o&&(o.onclick=n),d()}D(U);export{K as a,$ as b,G as g};
//# sourceMappingURL=details-3019a716.js.map
