
// ====================================
// ДАНІ УЧАСНИКІВ
// ====================================

const members = [
  {
    id: 1,
    name: 'Артем Калиушко',
    role: 'Teamlead',
    image: '../img/cat_artem.png',
    color: '#e8f2ff',
    accent: '#2b6cb0',
    description:
      'Координація команди та загальний напрям роботи.',
    tasks: [
      { title: 'Верстка сторінки "Обране"' },
      { title: 'Верстка хедеру' },
      { title: 'Темна тема' },
    ],
  },

  {
    id: 2,
    name: 'Софія Бондаренко',
    role: 'Sram-master',
    image: '../img/cat_sofia.png',
    color: '#fff0e4',
    accent: '#c56c20',
    description:
      'Організація командної взаємодії та робочого процесу.',
    tasks: [
      { title: 'Верстка головної сторінки (html, css, js)' },
      { title: 'Фільтрування покемонів' },
      { title: 'Рендеринг' },
    ],
  },

  {
    id: 3,
    name: 'Поліна Миргородська',
    role: 'Frontend-розробник',
    image: '../img/cat_polina.png',
    color: '#e6f8ee',
    accent: '#19865a',
    description:
      'Реалізація функціоналу та робота над кодом.',
    tasks: [
      { title: 'Сторінка "Деталі" (html, css, js)' },
      { title: '"Нічого не знайдено"' },
      { title: 'Сторінка про команду (html, css, js)' },
    ],
  },

  {
    id: 4,
    name: 'Павло Пасічник',
    role: 'Frontend-розробник',
    image: '../img/cat_pavlo.png',
    color: '#f2eaff',
    accent: '#8551bd',
    description:
      'Реалізація функціоналу та робота над кодом.',
    tasks: [
      { title: 'Модальне вікно (html, css, js)' },
      { title: 'Функція Випадковий покемон' },
      { title: 'Пошук покемона по імені' },
    ],
  },
];


// ====================================
// ДОПОМІЖНІ ЗМІННІ ТА ФУНКЦІЇ
// ====================================

const $ = (selector) => document.querySelector(selector);

const escapeHtml = (value) =>
  String(value).replace(/[&<>"']/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  })[character]);

let memberFilter = 'all';
let previouslyFocused = null;

const modal = $('#team-modal');


// ====================================
// КАРТКИ УЧАСНИКІВ
// ====================================

function renderMembers() {
  $('#team-members').innerHTML = members.map((member) => `
    <article class="team-person">

      <div
        class="team-person__picture"
        style="background:${member.color}"
      >
        ${member.image
          ? `<img
              src="${member.image}"
              alt="${escapeHtml(member.name)}"
            >`
          : '👤'}
      </div>

      <h3>${escapeHtml(member.name)}</h3>

      <span
        class="team-person__role"
        style="
          color:${member.accent};
          background:${member.color};
        "
      >
        ${escapeHtml(member.role)}
      </span>

      <p>${escapeHtml(member.description)}</p>

      <button
        type="button"
        class="team-person__button"
        data-person-id="${member.id}"
        aria-label="Переглянути внесок: ${escapeHtml(member.name)}"
      >
        Переглянути внесок →
      </button>

    </article>
  `).join('');


  // Заповнення фільтра учасників

  $('#team-person-filter').innerHTML = `
    <option value="all">Уся команда</option>

    ${members.map((member) => `
      <option value="${member.id}">
        ${escapeHtml(member.name)}
      </option>
    `).join('')}
  `;


  // Кількість учасників

  $('#team-members-count').textContent = members.length;
}


// ====================================
// СПИСОК ЗАВДАНЬ
// ====================================

function renderTasks() {
  const tasks = members
    .filter((member) =>
      memberFilter === 'all' ||
      String(member.id) === memberFilter
    )
    .flatMap((member) =>
      member.tasks.map((task) => ({
        ...task,
        author: member.name,
      }))
    );


  // Відображення завдань із зеленими галочками

  $('#team-task-list').innerHTML = tasks.map((task) => `
    <li class="team-task">

      <span
        class="team-task__mark"
        aria-hidden="true"
      >
        ✓
      </span>

      <span class="team-task__title">
        ${escapeHtml(task.title)}
      </span>

      <span class="team-task__author">
        ${escapeHtml(task.author)}
      </span>

    </li>
  `).join('');


  // Повідомлення, якщо завдань немає

  $('#team-tasks-empty').hidden = tasks.length > 0;
}


// ====================================
// ПРОГРЕС ПРОЄКТУ
// ====================================

function renderProgress() {
  const tasks = members.flatMap((member) => member.tasks);

  const completed = tasks.length;

  const percentage = tasks.length ? 100 : 0;


  // Кількість виконаних завдань

  $('#team-done-count').textContent = completed;


  // Відсоток прогресу

  $('#team-percent').textContent = `${percentage}%`;


  // Заповнення прогрес-бара

  $('#team-progress-fill').style.width = `${percentage}%`;


  // Доступність progressbar

  $('#team-progress-track').setAttribute(
    'aria-valuenow',
    String(percentage)
  );


  // Текст прогресу

  $('#team-progress-text').textContent =
    `${completed} із ${tasks.length} завдань виконано`;
}


// ====================================
// МОДАЛЬНЕ ВІКНО УЧАСНИКА
// ====================================

function openModal(member) {
  previouslyFocused = document.activeElement;

  const completed = member.tasks.length;


  // Вміст модального вікна

  $('#team-modal-content').innerHTML = `

    <div
      class="team-modal__avatar"
      style="background:${member.color}"
    >
      ${member.image
        ? `<img
            src="${member.image}"
            alt="${escapeHtml(member.name)}"
          >`
        : '👤'}
    </div>

    <h2 id="team-modal-name">
      ${escapeHtml(member.name)}
    </h2>

    <p class="team-modal__role">
      ${escapeHtml(member.role)}
    </p>

    <p class="team-modal__description">
      ${escapeHtml(member.description)}
    </p>

    <h3>Мій внесок у проєкт</h3>

    <p class="team-modal__count">
      Виконано ${completed} із ${member.tasks.length} завдань
    </p>

    <ul class="team-modal__tasks">

      ${member.tasks.map((task) => `
        <li>
          <span
            style="color:#178451; font-weight:800;"
            aria-hidden="true"
          >
            ✓
          </span>

          ${escapeHtml(task.title)}
        </li>
      `).join('')}

    </ul>
  `;


  // Відкриття модального вікна

  modal.hidden = false;

  document.body.classList.add('team-modal-open');

  $('#team-modal-close').focus();
}


// ====================================
// ЗАКРИТТЯ МОДАЛЬНОГО ВІКНА
// ====================================

function closeModal() {
  modal.hidden = true;

  document.body.classList.remove('team-modal-open');

  previouslyFocused?.focus();
}


// ====================================
// ОБРОБНИКИ ПОДІЙ
// ====================================


// Перегляд внеску учасника

$('#team-members').addEventListener('click', (event) => {
  const button = event.target.closest('[data-person-id]');

  if (!button) return;

  const member = members.find(
    (person) => person.id === Number(button.dataset.personId)
  );

  if (member) {
    openModal(member);
  }
});


// Фільтр завдань за учасником

$('#team-person-filter').addEventListener('change', (event) => {
  memberFilter = event.target.value;

  renderTasks();
});


// Закриття кнопкою

$('#team-modal-close').addEventListener('click', closeModal);


// Закриття натисканням на фон

modal.addEventListener('click', (event) => {
  if (event.target.closest('[data-modal-close]')) {
    closeModal();
  }
});


// Закриття клавішею Escape

document.addEventListener('keydown', (event) => {
  if (modal.hidden) return;

  if (event.key === 'Escape') {
    closeModal();
  }
});


// ====================================
// ЗАПУСК СТОРІНКИ
// ====================================

renderMembers();

renderTasks();

renderProgress();
