const o=[{id:1,name:"Артем Калиушко",role:"Teamlead",image:"./img/cat_artem.png",color:"#e8f2ff",accent:"#2b6cb0",description:"Координація команди та загальний напрям роботи.",tasks:[{title:'Верстка сторінки "Обране"'},{title:"Верстка хедеру"},{title:"Темна тема"}]},{id:2,name:"Софія Бондаренко",role:"Sram-master",image:"./img/cat_sofia.png",color:"#fff0e4",accent:"#c56c20",description:"Організація командної взаємодії та робочого процесу.",tasks:[{title:"Верстка головної сторінки (html, css, js)"},{title:"Фільтрування покемонів"},{title:"Рендеринг"}]},{id:3,name:"Поліна Миргородська",role:"Frontend-розробник",image:"./img/cat_polina.png",color:"#e6f8ee",accent:"#19865a",description:"Реалізація функціоналу та робота над кодом.",tasks:[{title:'Сторінка "Деталі" (html, css, js)'},{title:'"Нічого не знайдено"'},{title:"Сторінка про команду (html, css, js)"}]},{id:4,name:"Павло Пасічник",role:"Frontend-розробник",image:"./img/cat_pavlo.png",color:"#f2eaff",accent:"#8551bd",description:"Реалізація функціоналу та робота над кодом.",tasks:[{title:"Модальне вікно (html, css, js)"},{title:"Функція Випадковий покемон"},{title:"Пошук покемона по імені"}]}],a=t=>document.querySelector(t),n=t=>String(t).replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e]);let d="all",l=null;const i=a("#team-modal");function p(){a("#team-members").innerHTML=o.map(t=>`
    <article class="team-person">

      <div
        class="team-person__picture"
        style="background:${t.color}"
      >
        ${t.image?`<img
              src="${t.image}"
              alt="${n(t.name)}"
            >`:"👤"}
      </div>

      <h3>${n(t.name)}</h3>

      <span
        class="team-person__role"
        style="
          color:${t.accent};
          background:${t.color};
        "
      >
        ${n(t.role)}
      </span>

      <p>${n(t.description)}</p>

      <button
        type="button"
        class="team-person__button"
        data-person-id="${t.id}"
        aria-label="Переглянути внесок: ${n(t.name)}"
      >
        Переглянути внесок →
      </button>

    </article>
  `).join(""),a("#team-person-filter").innerHTML=`
    <option value="all">Уся команда</option>

    ${o.map(t=>`
      <option value="${t.id}">
        ${n(t.name)}
      </option>
    `).join("")}
  `,a("#team-members-count").textContent=o.length}function m(){const t=o.filter(e=>d==="all"||String(e.id)===d).flatMap(e=>e.tasks.map(s=>({...s,author:e.name})));a("#team-task-list").innerHTML=t.map(e=>`
    <li class="team-task">

      <span
        class="team-task__mark"
        aria-hidden="true"
      >
        ✓
      </span>

      <span class="team-task__title">
        ${n(e.title)}
      </span>

      <span class="team-task__author">
        ${n(e.author)}
      </span>

    </li>
  `).join(""),a("#team-tasks-empty").hidden=t.length>0}function g(){const t=o.flatMap(c=>c.tasks),e=t.length,s=t.length?100:0;a("#team-done-count").textContent=e,a("#team-percent").textContent=`${s}%`,a("#team-progress-fill").style.width=`${s}%`,a("#team-progress-track").setAttribute("aria-valuenow",String(s)),a("#team-progress-text").textContent=`${e} із ${t.length} завдань виконано`}function u(t){l=document.activeElement;const e=t.tasks.length;a("#team-modal-content").innerHTML=`

    <div
      class="team-modal__avatar"
      style="background:${t.color}"
    >
      ${t.image?`<img
            src="${t.image}"
            alt="${n(t.name)}"
          >`:"👤"}
    </div>

    <h2 id="team-modal-name">
      ${n(t.name)}
    </h2>

    <p class="team-modal__role">
      ${n(t.role)}
    </p>

    <p class="team-modal__description">
      ${n(t.description)}
    </p>

    <h3>Мій внесок у проєкт</h3>

    <p class="team-modal__count">
      Виконано ${e} із ${t.tasks.length} завдань
    </p>

    <ul class="team-modal__tasks">

      ${t.tasks.map(s=>`
        <li>
          <span
            style="color:#178451; font-weight:800;"
            aria-hidden="true"
          >
            ✓
          </span>

          ${n(s.title)}
        </li>
      `).join("")}

    </ul>
  `,i.hidden=!1,document.body.classList.add("team-modal-open"),a("#team-modal-close").focus()}function r(){i.hidden=!0,document.body.classList.remove("team-modal-open"),l==null||l.focus()}a("#team-members").addEventListener("click",t=>{const e=t.target.closest("[data-person-id]");if(!e)return;const s=o.find(c=>c.id===Number(e.dataset.personId));s&&u(s)});a("#team-person-filter").addEventListener("change",t=>{d=t.target.value,m()});a("#team-modal-close").addEventListener("click",r);i.addEventListener("click",t=>{t.target.closest("[data-modal-close]")&&r()});document.addEventListener("keydown",t=>{i.hidden||t.key==="Escape"&&r()});p();m();g();
//# sourceMappingURL=team-c81d22e6.js.map
