const FAVORITES_KEY = 'favorites';

function getFavorites() {
  return JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];
}

function saveFavorites(favorites) {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}

let renderedPokemons = [];

function renderImages(array) {
  renderedPokemons = array;

  const favorites = getFavorites();
  const favoriteIds = favorites.map(pokemon => pokemon.id);

  const images = array
    .map(({ id, name, types, sprites }) => {
      const image =
        sprites.other?.['official-artwork']?.front_default ||
        sprites.front_default ||
        '';

      const pokemonTypes = types
        .map(
          ({ type }) => `
          <span class="type-badge type-badge--${type.name}">
            ${type.name}
          </span>
        `
        )
        .join('');

      const formattedId = `#${String(id).padStart(3, '0')}`;

      const isFavorite = favoriteIds.includes(id);

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
            ${isFavorite ? 'checked' : ''}
            aria-label="Додати ${name} до обраного"
          >

          <svg class="search__icon search__icon--fav">
            <use href="${symbolDefsUrl}#heart"></use>
          </svg>
        </label>

      </li>
    `;
    })
    .join('');

  listRef.innerHTML = images;
}

listRef.addEventListener('change', event => {
  const checkbox = event.target.closest('.search__checkbox');

  if (!checkbox) return;

  const id = Number(checkbox.dataset.id);

  let favorites = getFavorites();

  if (checkbox.checked) {
    const pokemon = renderedPokemons.find(item => item.id === id);

    if (pokemon && !favorites.some(item => item.id === id)) {
      favorites.push(pokemon);
    }
  } else {
    favorites = favorites.filter(pokemon => pokemon.id !== id);
  }

  saveFavorites(favorites);
});

