(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))a(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const e of r.addedNodes)e.tagName==="LINK"&&e.rel==="modulepreload"&&a(e)}).observe(document,{childList:!0,subtree:!0});function i(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerPolicy&&(r.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?r.credentials="include":o.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(o){if(o.ep)return;o.ep=!0;const r=i(o);fetch(o.href,r)}})();const $="https://pokeapi.co/api/v2";async function G(n=20,t=1){try{const i=(t-1)*n,a=await fetch(`${$}/pokemon?limit=${n}&offset=${i}`);if(!a.ok)throw new Error("Помилка отримання покемонів");const o=await a.json();return{results:await Promise.all(o.results.map(async e=>await(await fetch(e.url)).json())),count:o.count,next:o.next}}catch(i){return console.error("Помилка отримання покемонів:",i),null}}async function b(n){try{const t=await fetch(`${$}/pokemon/${n}`);if(!t.ok)throw new Error("Помилка отримання покемона");return await t.json()}catch(t){console.error("Сталася помилка при отриманні покемона:",t)}}async function K(n){try{const t=await fetch(`${$}/pokemon/${n.toLowerCase()}`);if(!t.ok)throw new Error("Помилка отримання покемона");return await t.json()}catch(t){console.error("Сталася помилка при отриманні покемона:",t)}}const H=new URLSearchParams(window.location.search),k=Number(H.get("id")),U=Number.isInteger(k)&&k>0?k:25,w=n=>"#"+String(n).padStart(3,"0"),g=n=>n?n.charAt(0).toUpperCase()+n.slice(1):"",j=n=>`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${n}.png`;async function O(n){const t=await fetch(n);if(!t.ok)throw new Error(`HTTP ${t.status}`);return t.json()}async function D(n){var t,i,a,o,r,e,c;try{const s=await b(n);if(!s)throw new Error("Покемона не знайдено");const u=await O(s.species.url),d=w(s.id),f=u.generation.name.replace("generation-","Generation ").replace(/\b(i|ii|iii|iv|v|vi|vii|viii|ix)\b/i,l=>l.toUpperCase()),m=document.querySelectorAll(".details__pokemonid");m[0]&&(m[0].textContent=d),m[1]&&(m[1].textContent=`${d} · ${f}`);const p=document.querySelector(".details__img");p&&(p.src=((i=(t=s.sprites.other)==null?void 0:t["official-artwork"])==null?void 0:i.front_default)||s.sprites.front_default||j(s.id),p.alt=s.name);const v=document.querySelector(".details__name");v&&(v.textContent=g(s.name));const y=(a=u.genera)==null?void 0:a.find(l=>l.language.name==="en"),h=document.querySelector(".details__genus");h&&(h.textContent=(y==null?void 0:y.genus)||"");const x=(o=u.flavor_text_entries)==null?void 0:o.find(l=>l.language.name==="en"),S=document.querySelector(".details__description");S&&(S.textContent=x?x.flavor_text.replace(/[\f\n\r]+/g," "):"");const E=document.querySelector(".details__filtr");E&&(E.innerHTML=s.types.map(({type:l})=>`
      <span class="type-badge type-badge--${l.name}">
        ${l.name}
      </span>
    `).join(""));const q=document.querySelector(".details__height .details__text");q&&(q.textContent=`${(s.height/10).toFixed(1)} m`);const L=document.querySelector(".details__weight .details__text");L&&(L.textContent=`${(s.weight/10).toFixed(1)} kg`);const P=document.querySelector(".details__capability .details__text"),F=((e=(r=s.abilities[0])==null?void 0:r.ability)==null?void 0:e.name)||"—";P&&(P.textContent=g(F.replaceAll("-"," ")));const T=document.querySelectorAll(".stat-row");let A=0;s.stats.forEach((l,B)=>{A+=l.base_stat;const _=T[B];if(!_)return;const I=_.querySelector(".stat-value"),N=_.querySelector(".progress-bar");if(I&&(I.textContent=l.base_stat),N){const M=Math.min(l.base_stat/200*100,100);N.style.width=`${M}%`}});const C=document.querySelector(".details__total");if(C&&(C.textContent=`Разом: ${A}`),(c=u.evolution_chain)!=null&&c.url){const l=await O(u.evolution_chain.url);J(l.chain,s.species.name)}await R(s.id),z(s.id)}catch(s){console.error("Помилка завантаження Pokémon:",s);const u=document.querySelector(".details__name");u&&(u.textContent="Не вдалося завантажити Pokémon")}}function J(n,t){const i=document.querySelector(".evolution-chain");if(!i||!n)return;const a=[];function o(e,c=null){var m,p,v,y;const s=e.species.url.split("/").filter(Boolean),u=Number(s.at(-1)),d=(m=e.evolution_details)==null?void 0:m[0];let f="";d&&(d.min_level?f=`Рівень ${d.min_level}`:d.item?f=d.item.name.replaceAll("-"," "):d.min_happiness?f="Висока дружба":((p=d.trigger)==null?void 0:p.name)==="trade"?f="Обмін":(v=d.trigger)!=null&&v.name&&(f=d.trigger.name.replaceAll("-"," "))),a.push({id:u,name:e.species.name,trigger:f,parentId:c}),(y=e.evolves_to)==null||y.forEach(h=>{o(h,u)})}o(n),i.innerHTML=a.map(e=>{const c=e.name===t;return`
        ${e.parentId!==null?`
          <div class="evo-arrow-container">
            <div class="arrow-graphic">→</div>
            <div>${e.trigger}</div>
          </div>
        `:""}

        <div class="evo-pokemon"
             data-id="${e.id}"
             role="link"
             tabindex="0">

          <div class="evo-img-container ${c?"bg-yellow":"bg-blue"}">
            <img
              class="evo-img"
              src="${j(e.id)}"
              alt="${e.name}"
              loading="lazy"
            >
          </div>

          <div class="evo-name"
               ${c?'style="color:#2563eb;"':""}>
            ${g(e.name)}
          </div>

          <div class="evo-id">
            ${w(e.id)}
          </div>

        </div>
      `}).join("");function r(e){const c=e.target.closest(".evo-pokemon");c&&(window.location.search=`?id=${c.dataset.id}`)}i.addEventListener("click",r),i.addEventListener("keydown",e=>{if(e.key!=="Enter"&&e.key!==" ")return;const c=e.target.closest(".evo-pokemon");c&&(e.preventDefault(),window.location.search=`?id=${c.dataset.id}`)})}async function R(n){const t=document.querySelectorAll(".pokedex-footer .nav-link"),i=t[0],a=t[1];if(!i||!a)return;if(n>1){const r=await b(n-1);r?(i.textContent=`← ${w(r.id)} ${g(r.name)}`,i.href=`?id=${r.id}`,i.style.visibility="visible"):i.style.visibility="hidden"}else i.style.visibility="hidden";const o=await b(n+1);o?(a.textContent=`${w(o.id)} ${g(o.name)} →`,a.href=`?id=${o.id}`,a.style.visibility="visible"):a.style.visibility="hidden"}function z(n){const t=document.querySelector(".details__fav"),i=document.querySelector(".favorite-action-btn");if(!t&&!i)return;const a=()=>{try{const e=JSON.parse(localStorage.getItem("pokedex_favs")||"[]");return Array.isArray(e)?e:[]}catch{return[]}};function o(){const e=a().includes(n);t&&(t.classList.toggle("active",e),t.setAttribute("aria-pressed",String(e))),i&&(i.classList.toggle("is-fav",e),i.innerHTML=e?'<span class="heart-icon">♥</span> В обраному':'<span class="heart-icon">♡</span> Додати до обраного')}function r(){const e=a(),c=e.includes(n)?e.filter(s=>s!==n):[...e,n];localStorage.setItem("pokedex_favs",JSON.stringify(c)),o()}t&&(t.onclick=r),i&&(i.onclick=r),o()}D(U);export{K as a,b,G as g};
//# sourceMappingURL=details-cc1a4a0c.js.map
