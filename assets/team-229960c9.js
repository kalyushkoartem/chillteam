const p="/chillteam/assets/cat_artem-4f799c1a.png",u="/chillteam/assets/cat_sofia-c59cbd7f.png",g="/chillteam/assets/cat_polina-b79711c6.png",f="/chillteam/assets/cat_pavlo-5dc2f95f.png",o=[{id:1,name:"Артем Калиушко",role:"Teamlead",image:p,color:"#e8f2ff",accent:"#2b6cb0",description:"Координація команди та загальний напрям роботи.",tasks:[{title:'Верстка сторінки "Обране"'},{title:"Верстка хедеру"},{title:"Темна тема"}]},{id:2,name:"Софія Бондаренко",role:"Sram-master",image:u,color:"#fff0e4",accent:"#c56c20",description:"Організація командної взаємодії та робочого процесу.",tasks:[{title:"Верстка головної сторінки (html, css, js)"},{title:"Фільтрування покемонів"},{title:"Рендеринг"}]},{id:3,name:"Поліна Миргородська",role:"Frontend-розробник",image:g,color:"#e6f8ee",accent:"#19865a",description:"Реалізація функціоналу та робота над кодом.",tasks:[{title:'Сторінка "Деталі" (html, css, js)'},{title:'"Нічого не знайдено"'},{title:"Сторінка про команду (html, css, js)"}]},{id:4,name:"Павло Пасічник",role:"Frontend-розробник",image:f,color:"#f2eaff",accent:"#8551bd",description:"Реалізація функціоналу та робота над кодом.",tasks:[{title:"Модальне вікно (html, css, js)"},{title:"Функція Випадковий покемон"},{title:"Пошук покемона по імені"}]}],a=t=>document.querySelector(t),s=t=>String(t).replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e]);let d="all",l=null;const c=a("#team-modal");function h(){a("#team-members").innerHTML=o.map(t=>`
    <article class="team-person">

      <div
        class="team-person__picture"
        style="background:${t.color}"
      >
        ${t.image?`<img
              src="${t.image}"
              alt="${s(t.name)}"
            >`:"👤"}
      </div>

      <h3>${s(t.name)}</h3>

      <span
        class="team-person__role"
        style="
          color:${t.accent};
          background:${t.color};
        "
      >
        ${s(t.role)}
      </span>

      <p>${s(t.description)}</p>

      <button
        type="button"
        class="team-person__button"
        data-person-id="${t.id}"
        aria-label="Переглянути внесок: ${s(t.name)}"
      >
        Переглянути внесок →
      </button>

    </article>
  `).join(""),a("#team-person-filter").innerHTML=`
    <option value="all">Уся команда</option>

    ${o.map(t=>`
      <option value="${t.id}">
        ${s(t.name)}
      </option>
    `).join("")}
  `,a("#team-members-count").textContent=o.length}function m(){const t=o.filter(e=>d==="all"||String(e.id)===d).flatMap(e=>e.tasks.map(n=>({...n,author:e.name})));a("#team-task-list").innerHTML=t.map(e=>`
    <li class="team-task">

      <span
        class="team-task__mark"
        aria-hidden="true"
      >
        ✓
      </span>

      <span class="team-task__title">
        ${s(e.title)}
      </span>

      <span class="team-task__author">
        ${s(e.author)}
      </span>

    </li>
  `).join(""),a("#team-tasks-empty").hidden=t.length>0}function $(){const t=o.flatMap(i=>i.tasks),e=t.length,n=t.length?100:0;a("#team-done-count").textContent=e,a("#team-percent").textContent=`${n}%`,a("#team-progress-fill").style.width=`${n}%`,a("#team-progress-track").setAttribute("aria-valuenow",String(n)),a("#team-progress-text").textContent=`${e} із ${t.length} завдань виконано`}function k(t){l=document.activeElement;const e=t.tasks.length;a("#team-modal-content").innerHTML=`

    <div
      class="team-modal__avatar"
      style="background:${t.color}"
    >
      ${t.image?`<img
            src="${t.image}"
            alt="${s(t.name)}"
          >`:"👤"}
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
          <span
            style="color:#178451; font-weight:800;"
            aria-hidden="true"
          >
            ✓
          </span>

          ${s(n.title)}
        </li>
      `).join("")}

    </ul>
  `,c.hidden=!1,document.body.classList.add("team-modal-open"),a("#team-modal-close").focus()}function r(){c.hidden=!0,document.body.classList.remove("team-modal-open"),l==null||l.focus()}a("#team-members").addEventListener("click",t=>{const e=t.target.closest("[data-person-id]");if(!e)return;const n=o.find(i=>i.id===Number(e.dataset.personId));n&&k(n)});a("#team-person-filter").addEventListener("change",t=>{d=t.target.value,m()});a("#team-modal-close").addEventListener("click",r);c.addEventListener("click",t=>{t.target.closest("[data-modal-close]")&&r()});document.addEventListener("keydown",t=>{c.hidden||t.key==="Escape"&&r()});h();m();$();
//# sourceMappingURL=team-229960c9.js.map
