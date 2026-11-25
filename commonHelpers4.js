import"./assets/modulepreload-polyfill-3cfb730f.js";/* empty css                    */const l=[{id:1,name:"Артем Калиушко",role:"Teamlead",image:"./img/cat_artem.png",color:"#e8f2ff",accent:"#2b6cb0",description:"Координація команди та загальний напрям роботи.",tasks:[{title:'Верстка сторінки "Обране"',done:!0},{title:"Верстка хедеру",done:!0},{title:"Темна тема",done:!1}]},{id:2,name:"Софія Бондаренко",role:"Sram-master",image:"./img/cat_sofia.png",color:"#fff0e4",accent:"#c56c20",description:"Організація командної взаємодії та робочого процесу.",tasks:[{title:"Верстка головної сторінки (html, css, js)",done:!0},{title:"Фільтрування покемонів",done:!0},{title:"Рендеринг",done:!0}]},{id:3,name:"Поліна Миргородська",role:"Frontend-розробник",image:"./img/cat_polina.png",color:"#e6f8ee",accent:"#19865a",description:"Реалізація функціоналу та робота над кодом.",tasks:[{title:'Сторінка "Деталі" (html, css, js)',done:!0},{title:'"Нічого не знайдено"',done:!0},{title:"Сторінка про команду (html, css, js)",done:!0}]},{id:4,name:"Павло Пасічник",role:"Frontend-розробник",image:"./img/cat_pavlo.png",color:"#f2eaff",accent:"#8551bd",description:"Реалізація функціоналу та робота над кодом.",tasks:[{title:"Модальне вікно (html, css, js)",done:!0},{title:"Функція Випадковий покемон",done:!0},{title:"Пошук покемона по імені",done:!0}]}],a=t=>document.querySelector(t),s=t=>String(t).replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e]);let r="all",d="all",i=null;const c=a("#team-modal");function u(){a("#team-members").innerHTML=l.map(t=>`
    <article class="team-person">

     <div class="team-person__picture"
     style="background:${t.color}">
  ${t.image?`<img src="${t.image}" alt="${s(t.name)}">`:"👤"}
</div>

      <h3>${s(t.name)}</h3>

      <span class="team-person__role"
            style="
              color:${t.accent};
              background:${t.color}
            ">
        ${s(t.role)}
      </span>

      <p>${s(t.description)}</p>

      <button type="button"
              class="team-person__button"
              data-person-id="${t.id}"
              aria-label="Переглянути внесок: ${s(t.name)}">
        Переглянути внесок →
      </button>

    </article>
  `).join(""),a("#team-person-filter").innerHTML=`
    <option value="all">Уся команда</option>
    ${l.map(t=>`
      <option value="${t.id}">
        ${s(t.name)}
      </option>
    `).join("")}
  `,a("#team-members-count").textContent=l.length}function m(){const t=l.filter(e=>d==="all"||String(e.id)===d).flatMap(e=>e.tasks.map(n=>({...n,author:e.name}))).filter(e=>r==="all"||(r==="done"?e.done:!e.done));a("#team-task-list").innerHTML=t.map(e=>`
    <li class="team-task">

      <span class="team-task__mark ${e.done?"is-done":"is-pending"}" aria-hidden="true">
        ${e.done?"✓":"◷"}
      </span>

      <span class="team-task__title">
        ${s(e.title)}
      </span>

      <span class="team-task__author">
        ${s(e.author)}
      </span>


    </li>
  `).join(""),a("#team-tasks-empty").hidden=t.length>0}function g(){const t=l.flatMap(o=>o.tasks),e=t.filter(o=>o.done).length,n=t.length?Math.round(e/t.length*100):0;a("#team-done-count").textContent=e,a("#team-percent").textContent=`${n}%`,a("#team-progress-fill").style.width=`${n}%`,a("#team-progress-track").setAttribute("aria-valuenow",String(n)),a("#team-progress-text").textContent=`${e} із ${t.length} завдань виконано`}function f(t){i=document.activeElement;const e=t.tasks.filter(n=>n.done).length;a("#team-modal-content").innerHTML=`
   <div class="team-modal__avatar"
     style="background:${t.color}">
  ${t.image?`<img src="${t.image}" alt="${s(t.name)}">`:"👤"}
</div>

    <h2 id="team-modal-name">
      ${s(t.name)}
    </h2>

    <p class="team-modal__role">
      ${s(t.role)}
    </p>

    <p class="team-modal__description">
      ${s(t.description)}
    </p>

    <h3>Мій внесок у проєкт</h3>

    <p class="team-modal__count">
      Виконано ${e} із ${t.tasks.length} завдань
    </p>

    <ul class="team-modal__tasks">
      ${t.tasks.map(n=>`
        <li>
          <span aria-hidden="true">
            ${n.done?"✅":"⏳"}
          </span>
          ${s(n.title)}
        </li>
      `).join("")}
    </ul>
  `,c.hidden=!1,document.body.classList.add("team-modal-open"),a("#team-modal-close").focus()}function p(){c.hidden=!0,document.body.classList.remove("team-modal-open"),i==null||i.focus()}a("#team-members").addEventListener("click",t=>{const e=t.target.closest("[data-person-id]");if(!e)return;const n=l.find(o=>o.id===Number(e.dataset.personId));n&&f(n)});a(".team-filters").addEventListener("click",t=>{const e=t.target.closest("[data-status]");e&&(r=e.dataset.status,document.querySelectorAll(".team-filter").forEach(n=>{const o=n===e;n.classList.toggle("is-active",o),n.setAttribute("aria-pressed",String(o))}),m())});a("#team-person-filter").addEventListener("change",t=>{d=t.target.value,m()});a("#team-modal-close").addEventListener("click",p);c.addEventListener("click",t=>{t.target.closest("[data-modal-close]")&&p()});document.addEventListener("keydown",t=>{c.hidden||(t.key==="Escape"&&p(),t.key==="Tab"&&(t.preventDefault(),a("#team-modal-close").focus()))});u();m();g();
//# sourceMappingURL=commonHelpers4.js.map
