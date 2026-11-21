import"./assets/modulepreload-polyfill-3cfb730f.js";/* empty css                    */const l=[{id:1,name:"Артем Калиушко",role:"Teamlid",emoji:"🎨",color:"#e8f2ff",accent:"#2b6cb0",description:"Продумує оформлення сторінок і зручність інтерфейсу.",tasks:[{title:"Макет головної сторінки",done:!0},{title:"Дизайн карток покемонів",done:!0},{title:"Підбір кольорів",done:!0}]},{id:2,name:"Софія Бондаренко",role:"Sram-master",emoji:"💻",color:"#fff0e4",accent:"#c56c20",description:"Створює HTML, CSS та інтерактивні елементи.",tasks:[{title:"Верстка головної сторінки",done:!0},{title:"Реалізація пошуку",done:!0},{title:"Адаптація для телефона",done:!1}]},{id:3,name:"Поліна Миргородська",role:"Frontend-розробник",emoji:"📚",color:"#e6f8ee",accent:"#19865a",description:"Допомагає з інформацією про покемонів і наповненням.",tasks:[{title:"Структура даних покемонів",done:!0},{title:"Опис характеристик",done:!0},{title:"Перевірка контенту",done:!0}]},{id:4,name:"Павло Пасічник",role:"Frontend-розробник",emoji:"🔍",color:"#f2eaff",accent:"#8551bd",description:"Перевіряє роботу функцій і шукає помилки.",tasks:[{title:"Перевірка переходів",done:!0},{title:"Тестування обраного",done:!0},{title:"Перевірка на мобільних",done:!1}]}],a=t=>document.querySelector(t),o=t=>String(t).replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e]);let d="all",c="all",i=null;const r=a("#team-modal");function u(){a("#team-members").innerHTML=l.map(t=>`
    <article class="team-person">

      <div class="team-person__picture"
           style="background:${t.color}"
           aria-hidden="true">
        ${t.emoji}
      </div>

      <h3>${o(t.name)}</h3>

      <span class="team-person__role"
            style="
              color:${t.accent};
              background:${t.color}
            ">
        ${o(t.role)}
      </span>

      <p>${o(t.description)}</p>

      <button type="button"
              class="team-person__button"
              data-person-id="${t.id}"
              aria-label="Переглянути внесок: ${o(t.name)}">
        Переглянути внесок →
      </button>

    </article>
  `).join(""),a("#team-person-filter").innerHTML=`
    <option value="all">Уся команда</option>
    ${l.map(t=>`
      <option value="${t.id}">
        ${o(t.name)}
      </option>
    `).join("")}
  `,a("#team-members-count").textContent=l.length}function m(){const t=l.filter(e=>c==="all"||String(e.id)===c).flatMap(e=>e.tasks.map(n=>({...n,author:e.name}))).filter(e=>d==="all"||(d==="done"?e.done:!e.done));a("#team-task-list").innerHTML=t.map(e=>`
    <li class="team-task">

      <span class="team-task__mark ${e.done?"is-done":"is-pending"}" aria-hidden="true">
        ${e.done?"✓":"◷"}
      </span>

      <span class="team-task__title">
        ${o(e.title)}
      </span>

      <span class="team-task__author">
        ${o(e.author)}
      </span>


    </li>
  `).join(""),a("#team-tasks-empty").hidden=t.length>0}function f(){const t=l.flatMap(s=>s.tasks),e=t.filter(s=>s.done).length,n=t.length?Math.round(e/t.length*100):0;a("#team-done-count").textContent=e,a("#team-all-count").textContent=t.length,a("#team-percent").textContent=`${n}%`,a("#team-progress-fill").style.width=`${n}%`,a("#team-progress-track").setAttribute("aria-valuenow",String(n)),a("#team-progress-text").textContent=`${e} із ${t.length} завдань виконано`}function g(t){i=document.activeElement;const e=t.tasks.filter(n=>n.done).length;a("#team-modal-content").innerHTML=`
    <div class="team-modal__avatar"
         style="background:${t.color}"
         aria-hidden="true">
      ${t.emoji}
    </div>

    <h2 id="team-modal-name">
      ${o(t.name)}
    </h2>

    <p class="team-modal__role">
      ${o(t.role)}
    </p>

    <p class="team-modal__description">
      ${o(t.description)}
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
          ${o(n.title)}
        </li>
      `).join("")}
    </ul>
  `,r.hidden=!1,document.body.classList.add("team-modal-open"),a("#team-modal-close").focus()}function p(){r.hidden=!0,document.body.classList.remove("team-modal-open"),i==null||i.focus()}a("#team-members").addEventListener("click",t=>{const e=t.target.closest("[data-person-id]");if(!e)return;const n=l.find(s=>s.id===Number(e.dataset.personId));n&&g(n)});a(".team-filters").addEventListener("click",t=>{const e=t.target.closest("[data-status]");e&&(d=e.dataset.status,document.querySelectorAll(".team-filter").forEach(n=>{const s=n===e;n.classList.toggle("is-active",s),n.setAttribute("aria-pressed",String(s))}),m())});a("#team-person-filter").addEventListener("change",t=>{c=t.target.value,m()});a("#team-modal-close").addEventListener("click",p);r.addEventListener("click",t=>{t.target.closest("[data-modal-close]")&&p()});document.addEventListener("keydown",t=>{r.hidden||(t.key==="Escape"&&p(),t.key==="Tab"&&(t.preventDefault(),a("#team-modal-close").focus()))});u();m();f();
//# sourceMappingURL=commonHelpers4.js.map
