
// ====================================
// ДАНІ УЧАСНИКІВ
// Змінюй імена, ролі, описи та завдання.
// done: true — виконано
// done: false — у процесі
// ====================================

const members = [
  {
    id: 1,
    name: 'Артем Калиушко',
    role: 'Teamlid',
    emoji: '🎨',
    color: '#e8f2ff',
    accent: '#2b6cb0',
    description:
      'Продумує оформлення сторінок і зручність інтерфейсу.',
    tasks: [
      { title: 'Макет головної сторінки', done: true },
      { title: 'Дизайн карток покемонів', done: true },
      { title: 'Підбір кольорів', done: true },
    ],
  },

  {
    id: 2,
    name: 'Софія Бондаренко',
    role: 'Sram-master',
    emoji: '💻',
    color: '#fff0e4',
    accent: '#c56c20',
    description:
      'Створює HTML, CSS та інтерактивні елементи.',
    tasks: [
      { title: 'Верстка головної сторінки', done: true },
      { title: 'Реалізація пошуку', done: true },
      { title: 'Адаптація для телефона', done: false },
    ],
  },

  {
    id: 3,
    name: 'Поліна Миргородська',
    role: 'Frontend-розробник',
    emoji: '📚',
    color: '#e6f8ee',
    accent: '#19865a',
    description:
      'Допомагає з інформацією про покемонів і наповненням.',
    tasks: [
      { title: 'Структура даних покемонів', done: true },
      { title: 'Опис характеристик', done: true },
      { title: 'Перевірка контенту', done: true },
    ],
  },

  {
    id: 4,
    name: 'Павло Пасічник',
    role: 'Frontend-розробник',
    emoji: '🔍',
    color: '#f2eaff',
    accent: '#8551bd',
    description:
      'Перевіряє роботу функцій і шукає помилки.',
    tasks: [
      { title: 'Перевірка переходів', done: true },
      { title: 'Тестування обраного', done: true },
      { title: 'Перевірка на мобільних', done: false },
    ],
  },
];

// ====================================
// ДОПОМІЖНІ ФУНКЦІЇ
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

let statusFilter = 'all';
let memberFilter = 'all';
let previouslyFocused = null;

const modal = $('#team-modal');

// ====================================
// КАРТКИ УЧАСНИКІВ
// ====================================

function renderMembers() {
  $('#team-members').innerHTML = members.map((member) => `
    <article class="team-person">

      <div class="team-person__picture"
           style="background:${member.color}"
           aria-hidden="true">
        ${member.emoji}
      </div>

      <h3>${escapeHtml(member.name)}</h3>

      <span class="team-person__role"
            style="
              color:${member.accent};
              background:${member.color}
            ">
        ${escapeHtml(member.role)}
      </span>

      <p>${escapeHtml(member.description)}</p>

      <button type="button"
              class="team-person__button"
              data-person-id="${member.id}"
              aria-label="Переглянути внесок: ${escapeHtml(member.name)}">
        Переглянути внесок →
      </button>

    </article>
  `).join('');

  // Заповнюємо список учасників у фільтрі
  $('#team-person-filter').innerHTML = `
    <option value="all">Уся команда</option>
    ${members.map((member) => `
      <option value="${member.id}">
        ${escapeHtml(member.name)}
      </option>
    `).join('')}
  `;

  $('#team-members-count').textContent = members.length;
}

// ====================================
// ПЕРЕГЛЯД ЗАВДАНЬ
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
    )
    .filter((task) =>
      statusFilter === 'all' ||
      (statusFilter === 'done' ? task.done : !task.done)
    );

  $('#team-task-list').innerHTML = tasks.map((task) => `
    <li class="team-task">

      <span class="team-task__mark ${
        task.done ? 'is-done' : 'is-pending'
      }" aria-hidden="true">
        ${task.done ? '✓' : '◷'}
      </span>

      <span class="team-task__title">
        ${escapeHtml(task.title)}
      </span>

      <span class="team-task__author">
        ${escapeHtml(task.author)}
      </span>


    </li>
  `).join('');

  $('#team-tasks-empty').hidden = tasks.length > 0;
}

// ====================================
// ПРОГРЕС ПРОЄКТУ
// ====================================

function renderProgress() {
  const tasks = members.flatMap((member) => member.tasks);

  const completed = tasks.filter((task) => task.done).length;

  const percentage = tasks.length
    ? Math.round(completed / tasks.length * 100)
    : 0;

  $('#team-done-count').textContent = completed;
  $('#team-all-count').textContent = tasks.length;

  $('#team-percent').textContent = `${percentage}%`;

  $('#team-progress-fill').style.width = `${percentage}%`;

  $('#team-progress-track').setAttribute(
    'aria-valuenow',
    String(percentage)
  );

  $('#team-progress-text').textContent =
    `${completed} із ${tasks.length} завдань виконано`;
}

// ====================================
// МОДАЛЬНЕ ВІКНО УЧАСНИКА
// ====================================

function openModal(member) {
  previouslyFocused = document.activeElement;

  const completed = member.tasks.filter(
    (task) => task.done
  ).length;

  $('#team-modal-content').innerHTML = `
    <div class="team-modal__avatar"
         style="background:${member.color}"
         aria-hidden="true">
      ${member.emoji}
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
          <span aria-hidden="true">
            ${task.done ? '✅' : '⏳'}
          </span>
          ${escapeHtml(task.title)}
        </li>
      `).join('')}
    </ul>
  `;

  modal.hidden = false;
  document.body.classList.add('team-modal-open');
  $('#team-modal-close').focus();
}

function closeModal() {
  modal.hidden = true;
  document.body.classList.remove('team-modal-open');
  previouslyFocused?.focus();
}

// ====================================
// ОБРОБНИКИ ПОДІЙ
// ====================================

// Кнопки «Переглянути внесок»
$('#team-members').addEventListener('click', (event) => {
  const button = event.target.closest('[data-person-id]');

  if (!button) return;

  const member = members.find(
    (person) => person.id === Number(button.dataset.personId)
  );

  if (member) openModal(member);
});

// Фільтри статусу завдань
$('.team-filters').addEventListener('click', (event) => {
  const button = event.target.closest('[data-status]');

  if (!button) return;

  statusFilter = button.dataset.status;

  document.querySelectorAll('.team-filter').forEach((element) => {
    const active = element === button;

    element.classList.toggle('is-active', active);
    element.setAttribute('aria-pressed', String(active));
  });

  renderTasks();
});

// Фільтр за учасником
$('#team-person-filter').addEventListener('change', (event) => {
  memberFilter = event.target.value;
  renderTasks();
});

// Закриття модального вікна
$('#team-modal-close').addEventListener('click', closeModal);

modal.addEventListener('click', (event) => {
  if (event.target.closest('[data-modal-close]')) {
    closeModal();
  }
});

// Закриття через Escape
document.addEventListener('keydown', (event) => {
  if (modal.hidden) return;

  if (event.key === 'Escape') {
    closeModal();
  }

  if (event.key === 'Tab') {
    event.preventDefault();
    $('#team-modal-close').focus();
  }
});

// ====================================
// ЗАПУСК СТОРІНКИ
// ====================================

renderMembers();
renderTasks();
renderProgress();
