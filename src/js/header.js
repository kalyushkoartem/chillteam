import symbolDefsUrl from '../img/symbol-defs.svg?url';
const themeBtn = document.querySelector('.header__btn');

const savedTheme = localStorage.getItem('theme');

if (savedTheme === 'dark') {
  document.body.classList.add('dark-theme');
}

function updateButton() {
  const isDark = document.body.classList.contains('dark-theme');

  themeBtn.innerHTML = `
    <svg class="header__theme-icon">
      <use href="${symbolDefsUrl}#${isDark ? 'sun' : 'moon'}"></use>
    </svg>
  `;
}

updateButton();

themeBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-theme');

  const isDark = document.body.classList.contains('dark-theme');

  localStorage.setItem('theme', isDark ? 'dark' : 'light');

  updateButton();
});