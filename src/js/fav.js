import symbolDefsUrl from '../img/symbol-defs.svg?url';

const FAVORITES_KEY = 'favorites';

const favoritesList = document.querySelector('#favorites-list');
const favoritesCount = document.querySelector('.fav__count');
const clearButton = document.querySelector('.fav__btn');
const emptyMessage = document.querySelector('.fav__empty');


// Отримання обраних покемонів
function getFavorites() {
  return JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];
}

// Збереження
function saveFavorites(favorites) {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}

// Відображення карток
function renderFavorites() {
  const favorites = getFavorites();

  favoritesCount.textContent = `У вас ${favorites.length} улюблених покемонів`;

  emptyMessage.hidden = favorites.length > 0;

  favoritesList.innerHTML = favorites
    .map(pokemon => {
      const { id, name, types, sprites } = pokemon;

      const image =
        sprites.other?.['official-artwork']?.front_default ||
        sprites.front_default ||
        '';

      const formattedId = `#${String(id).padStart(3, '0')}`;

      const pokemonTypes = types
        .map(
          ({ type }) => `
      <span class="type-badge type-badge--${type.name}">
        ${type.name}
      </span>
    `
        )
        .join('');

      return `
      <li class="search__item">

        <a href="./details.html?id=${id}" class="search__link">

          <img src="${image}" alt="${name}" loading="lazy">

          <p class="search__id">${formattedId}</p>

          <h3 class="search__name">${name}</h3>

          <div class="search__tag">
            ${pokemonTypes}
          </div>

        </a>

        <label class="search__fav">
          <input
            type="checkbox"
            class="search__checkbox"
            data-id="${id}"
            checked
          >

          <svg class="search__icon search__icon--fav">
            <use href="${symbolDefsUrl}#heart"></use>
          </svg>
        </label>

      </li>
    `;
    })
    .join('');
}

// Видалення через сердечко
favoritesList.addEventListener('change', event => {
  const checkbox = event.target.closest('.search__checkbox');

  if (!checkbox) return;

  const id = Number(checkbox.dataset.id);

  const favorites = getFavorites().filter(pokemon => pokemon.id !== id);

  saveFavorites(favorites);

  renderFavorites();
});

// Очистити все
clearButton.addEventListener('click', () => {
  saveFavorites([]);
  renderFavorites();
});

// Запуск
renderFavorites();
