(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))a(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const e of r.addedNodes)e.tagName==="LINK"&&e.rel==="modulepreload"&&a(e)}).observe(document,{childList:!0,subtree:!0});function i(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(t){if(t.ep)return;t.ep=!0;const r=i(t);fetch(t.href,r)}})();const O="https://pokeapi.co/api/v2";async function G(o=20,n=1){try{const i=(n-1)*o,a=await fetch(`${O}/pokemon?limit=${o}&offset=${i}`);if(!a.ok)throw new Error("Помилка отримання покемонів");const t=await a.json();return{results:await Promise.all(t.results.map(async e=>await(await fetch(e.url)).json())),count:t.count,next:t.next}}catch(i){return console.error("Помилка отримання покемонів:",i),null}}async function b(o){try{const n=await fetch(`${O}/pokemon/${o}`);if(!n.ok)throw new Error("Помилка отримання покемона");return await n.json()}catch(n){console.error("Сталася помилка при отриманні покемона:",n)}}const H=new URLSearchParams(window.location.search),k=Number(H.get("id")),U=Number.isInteger(k)&&k>0?k:25,_=o=>"#"+String(o).padStart(3,"0"),g=o=>o?o.charAt(0).toUpperCase()+o.slice(1):"",F=o=>`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${o}.png`;async function N(o){const n=await fetch(o);if(!n.ok)throw new Error(`HTTP ${n.status}`);return n.json()}async function D(o){var n,i,a,t,r,e,c;try{const s=await b(o);if(!s)throw new Error("Покемона не знайдено");const u=await N(s.species.url),d=_(s.id),f=u.generation.name.replace("generation-","Generation ").replace(/\b(i|ii|iii|iv|v|vi|vii|viii|ix)\b/i,l=>l.toUpperCase()),m=document.querySelectorAll(".details__pokemonid");m[0]&&(m[0].textContent=d),m[1]&&(m[1].textContent=`${d} · ${f}`);const p=document.querySelector(".details__img");p&&(p.src=((i=(n=s.sprites.other)==null?void 0:n["official-artwork"])==null?void 0:i.front_default)||s.sprites.front_default||F(s.id),p.alt=s.name);const y=document.querySelector(".details__name");y&&(y.textContent=g(s.name));const v=(a=u.genera)==null?void 0:a.find(l=>l.language.name==="en"),h=document.querySelector(".details__genus");h&&(h.textContent=(v==null?void 0:v.genus)||"");const $=(t=u.flavor_text_entries)==null?void 0:t.find(l=>l.language.name==="en"),x=document.querySelector(".details__description");x&&(x.textContent=$?$.flavor_text.replace(/[\f\n\r]+/g," "):"");const S=document.querySelector(".details__filtr");S&&(S.innerHTML=s.types.map(({type:l})=>`
      <span class="type-badge type-badge--${l.name}">
        ${l.name}
      </span>
    `).join(""));const E=document.querySelector(".details__height .details__text");E&&(E.textContent=`${(s.height/10).toFixed(1)} m`);const q=document.querySelector(".details__weight .details__text");q&&(q.textContent=`${(s.weight/10).toFixed(1)} kg`);const A=document.querySelector(".details__capability .details__text"),T=((e=(r=s.abilities[0])==null?void 0:r.ability)==null?void 0:e.name)||"—";A&&(A.textContent=g(T.replaceAll("-"," ")));const j=document.querySelectorAll(".stat-row");let L=0;s.stats.forEach((l,M)=>{L+=l.base_stat;const w=j[M];if(!w)return;const C=w.querySelector(".stat-value"),I=w.querySelector(".progress-bar");if(C&&(C.textContent=l.base_stat),I){const B=Math.min(l.base_stat/200*100,100);I.style.width=`${B}%`}});const P=document.querySelector(".details__total");if(P&&(P.textContent=`Разом: ${L}`),(c=u.evolution_chain)!=null&&c.url){const l=await N(u.evolution_chain.url);J(l.chain,s.species.name)}await R(s.id),z(s.id)}catch(s){console.error("Помилка завантаження Pokémon:",s);const u=document.querySelector(".details__name");u&&(u.textContent="Не вдалося завантажити Pokémon")}}function J(o,n){const i=document.querySelector(".evolution-chain");if(!i||!o)return;const a=[];function t(e,c=null){var m,p,y,v;const s=e.species.url.split("/").filter(Boolean),u=Number(s.at(-1)),d=(m=e.evolution_details)==null?void 0:m[0];let f="";d&&(d.min_level?f=`Рівень ${d.min_level}`:d.item?f=d.item.name.replaceAll("-"," "):d.min_happiness?f="Висока дружба":((p=d.trigger)==null?void 0:p.name)==="trade"?f="Обмін":(y=d.trigger)!=null&&y.name&&(f=d.trigger.name.replaceAll("-"," "))),a.push({id:u,name:e.species.name,trigger:f,parentId:c}),(v=e.evolves_to)==null||v.forEach(h=>{t(h,u)})}t(o),i.innerHTML=a.map(e=>{const c=e.name===n;return`
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
              src="${F(e.id)}"
              alt="${e.name}"
              loading="lazy"
            >
          </div>

          <div class="evo-name"
               ${c?'style="color:#2563eb;"':""}>
            ${g(e.name)}
          </div>

          <div class="evo-id">
            ${_(e.id)}
          </div>

        </div>
      `}).join("");function r(e){const c=e.target.closest(".evo-pokemon");c&&(window.location.search=`?id=${c.dataset.id}`)}i.addEventListener("click",r),i.addEventListener("keydown",e=>{if(e.key!=="Enter"&&e.key!==" ")return;const c=e.target.closest(".evo-pokemon");c&&(e.preventDefault(),window.location.search=`?id=${c.dataset.id}`)})}async function R(o){const n=document.querySelectorAll(".pokedex-footer .nav-link"),i=n[0],a=n[1];if(!i||!a)return;if(o>1){const r=await b(o-1);r?(i.textContent=`← ${_(r.id)} ${g(r.name)}`,i.href=`?id=${r.id}`,i.style.visibility="visible"):i.style.visibility="hidden"}else i.style.visibility="hidden";const t=await b(o+1);t?(a.textContent=`${_(t.id)} ${g(t.name)} →`,a.href=`?id=${t.id}`,a.style.visibility="visible"):a.style.visibility="hidden"}function z(o){const n=document.querySelector(".details__fav"),i=document.querySelector(".favorite-action-btn");if(!n&&!i)return;const a=()=>{try{const e=JSON.parse(localStorage.getItem("pokedex_favs")||"[]");return Array.isArray(e)?e:[]}catch{return[]}};function t(){const e=a().includes(o);n&&(n.classList.toggle("active",e),n.setAttribute("aria-pressed",String(e))),i&&(i.classList.toggle("is-fav",e),i.innerHTML=e?'<span class="heart-icon">♥</span> В обраному':'<span class="heart-icon">♡</span> Додати до обраного')}function r(){const e=a(),c=e.includes(o)?e.filter(s=>s!==o):[...e,o];localStorage.setItem("pokedex_favs",JSON.stringify(c)),t()}n&&(n.onclick=r),i&&(i.onclick=r),t()}D(U);export{G as g};
//# sourceMappingURL=details-a4e1ceed.js.map
