import{b as k}from"./getPokemon-5ec11052.js";const j=new URLSearchParams(window.location.search),b=Number(j.get("id")),D=Number.isInteger(b)&&b>0?b:25,h=i=>"#"+String(i).padStart(3,"0"),y=i=>i?i.charAt(0).toUpperCase()+i.slice(1):"",T=i=>`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${i}.png`;async function F(i){const s=await fetch(i);if(!s.ok)throw new Error(`HTTP ${s.status}`);return s.json()}async function J(i){var s,n,r,c,d,t,o;try{const e=await k(i);if(!e)throw new Error("Покемона не знайдено");const a=await F(e.species.url),u=h(e.id),f=a.generation.name.replace("generation-","Generation ").replace(/\b(i|ii|iii|iv|v|vi|vii|viii|ix)\b/i,l=>l.toUpperCase()),m=document.querySelectorAll(".details__pokemonid");m[0]&&(m[0].textContent=u),m[1]&&(m[1].textContent=`${u} · ${f}`);const v=document.querySelector(".details__img");v&&(v.src=((n=(s=e.sprites.other)==null?void 0:s["official-artwork"])==null?void 0:n.front_default)||e.sprites.front_default||T(e.id),v.alt=e.name);const g=document.querySelector(".details__name");g&&(g.textContent=y(e.name));const p=(r=a.genera)==null?void 0:r.find(l=>l.language.name==="en"),_=document.querySelector(".details__genus");_&&(_.textContent=(p==null?void 0:p.genus)||"");const S=(c=a.flavor_text_entries)==null?void 0:c.find(l=>l.language.name==="en"),$=document.querySelector(".details__description");$&&($.textContent=S?S.flavor_text.replace(/[\f\n\r]+/g," "):"");const x=document.querySelector(".details__filtr");x&&(x.innerHTML=e.types.map(({type:l})=>`
      <span class="type-badge type-badge--${l.name}">
        ${l.name}
      </span>
    `).join(""));const E=document.querySelector(".details__height .details__text");E&&(E.textContent=`${(e.height/10).toFixed(1)} m`);const q=document.querySelector(".details__weight .details__text");q&&(q.textContent=`${(e.weight/10).toFixed(1)} kg`);const C=document.querySelector(".details__capability .details__text"),N=((t=(d=e.abilities[0])==null?void 0:d.ability)==null?void 0:t.name)||"—";C&&(C.textContent=y(N.replaceAll("-"," ")));const B=document.querySelectorAll(".stat-row");let A=0;e.stats.forEach((l,H)=>{A+=l.base_stat;const w=B[H];if(!w)return;const L=w.querySelector(".stat-value"),P=w.querySelector(".progress-bar");if(L&&(L.textContent=l.base_stat),P){const M=Math.min(l.base_stat/200*100,100);P.style.width=`${M}%`}});const I=document.querySelector(".details__total");if(I&&(I.textContent=`Разом: ${A}`),(o=a.evolution_chain)!=null&&o.url){const l=await F(a.evolution_chain.url);O(l.chain,e.species.name)}await R(e.id),U(e)}catch(e){console.error("Помилка завантаження Pokémon:",e);const a=document.querySelector(".details__name");a&&(a.textContent="Не вдалося завантажити Pokémon")}}function O(i,s){const n=document.querySelector(".evolution-chain");if(!n||!i)return;const r=[];function c(t,o=null){var m,v,g,p;const e=t.species.url.split("/").filter(Boolean),a=Number(e.at(-1)),u=(m=t.evolution_details)==null?void 0:m[0];let f="";u&&(u.min_level?f=`Рівень ${u.min_level}`:u.item?f=u.item.name.replaceAll("-"," "):u.min_happiness?f="Висока дружба":((v=u.trigger)==null?void 0:v.name)==="trade"?f="Обмін":(g=u.trigger)!=null&&g.name&&(f=u.trigger.name.replaceAll("-"," "))),r.push({id:a,name:t.species.name,trigger:f,parentId:o}),(p=t.evolves_to)==null||p.forEach(_=>{c(_,a)})}c(i),n.innerHTML=r.map(t=>{const o=t.name===s;return`
        ${t.parentId!==null?`
          <div class="evo-arrow-container">
            <div class="arrow-graphic">→</div>
            <div>${t.trigger}</div>
          </div>
        `:""}

        <div class="evo-pokemon"
             data-id="${t.id}"
             role="link"
             tabindex="0">

          <div class="evo-img-container ${o?"bg-yellow":"bg-blue"}">
            <img
              class="evo-img"
              src="${T(t.id)}"
              alt="${t.name}"
              loading="lazy"
            >
          </div>

          <div class="evo-name"
               ${o?'style="color:#2563eb;"':""}>
            ${y(t.name)}
          </div>

          <div class="evo-id">
            ${h(t.id)}
          </div>

        </div>
      `}).join("");function d(t){const o=t.target.closest(".evo-pokemon");o&&(window.location.search=`?id=${o.dataset.id}`)}n.addEventListener("click",d),n.addEventListener("keydown",t=>{if(t.key!=="Enter"&&t.key!==" ")return;const o=t.target.closest(".evo-pokemon");o&&(t.preventDefault(),window.location.search=`?id=${o.dataset.id}`)})}async function R(i){const s=document.querySelectorAll(".pokedex-footer .nav-link"),n=s[0],r=s[1];if(!n||!r)return;if(i>1){const d=await k(i-1);d?(n.textContent=`← ${h(d.id)} ${y(d.name)}`,n.href=`?id=${d.id}`,n.style.visibility="visible"):n.style.visibility="hidden"}else n.style.visibility="hidden";const c=await k(i+1);c?(r.textContent=`${h(c.id)} ${y(c.name)} →`,r.href=`?id=${c.id}`,r.style.visibility="visible"):r.style.visibility="hidden"}function U(i){const s=document.querySelector(".details__fav"),n=document.querySelector(".favorite-action-btn");if(!s&&!n)return;const r="favorites";function c(){try{return JSON.parse(localStorage.getItem(r))||[]}catch{return[]}}function d(){const e=c().some(a=>a.id===i.id);s&&(s.classList.toggle("active",e),s.setAttribute("aria-pressed",String(e))),n&&(n.classList.toggle("is-fav",e),n.innerHTML=e?'<span class="heart-icon">♥</span> В обраному':'<span class="heart-icon">♡</span> Додати до обраного')}function t(){let o=c();o.some(a=>a.id===i.id)?o=o.filter(a=>a.id!==i.id):o.push(i),localStorage.setItem(r,JSON.stringify(o)),d()}s&&(s.onclick=t),n&&(n.onclick=t),d()}J(D);
//# sourceMappingURL=details-9bf31528.js.map
