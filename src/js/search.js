
import { getPokemons } from './api/getPokemon';

const API_URL = 'https://pokeapi.co/api/v2';

const listRef = document.querySelector('.search__list');
const loadMoreBtn = document.querySelector('.load-more');
const searchInput = document.querySelector('.search__input');
const dropdownRef = document.querySelector('.search__dropdown');
const selectButtonRef = document.querySelector('.search__select');
const selectLabelRef = document.querySelector('.search__select-label');
const optionsRef = document.querySelector('.search__options');
const activeFiltersRef = document.querySelector(
  '.search__active-filters'
);
const foundCountRef = document.querySelector('.search__text');

let totalPokemonCount = 0;

let selectedTypes = [];
let currentPage = 1;
const perPage = 20;
let isLoading = false;
let loadedPokemons = [];
let filterRequestId = 0;

const typesCache = new Map();
const pokemonCache = new Map();

// Відображення покемонів
function renderImages(array) {
  const images = array.map(({ id, name, types, sprites }) => {
    const image =
      sprites.other?.['official-artwork']?.front_default ||
      sprites.front_default;

    const pokemonTypes = types.map(type => type.type.name).join(', ');

    return `
      <li class="search__item">
    <a href="" class="search__link">
        <img src="${image || ''}" alt="${name}">
        <p class="search__id">${id}</p>
        <h3 class="search__name">${name}</h3>
        <h4 class="search__tag">${pokemonTypes}</h4>

        <label class="search__fav">
          <input
            type="checkbox"
            class="search__checkbox"
            data-id="${id}"
          >
          <svg class="search__icon search__icon--fav">
            <use href="./img/symbol-defs.svg#heart"></use>
          </svg>
        </label>
        </a>
      </li>`;
  }).join('');

  listRef.innerHTML = images;
}

// Звичайне завантаження покемонів з пагінацією
async function loadPokemons() {
  if (isLoading) return;

  isLoading = true;
  loadMoreBtn.disabled = true;

  try {
    const data = await getPokemons(perPage, currentPage);

    if (!data) return;
    totalPokemonCount = data.count;
    loadedPokemons = [...loadedPokemons, ...data.results];

    currentPage++;

    applyFilters();

    if (!data.next) {
      loadMoreBtn.style.display = 'none';
    }
  } catch (error) {
    console.error('Помилка завантаження:', error);
  } finally {
    isLoading = false;
    loadMoreBtn.disabled = false;
  }
}

// Отримання детальної інформації про покемона
async function fetchPokemon(url) {
  if (pokemonCache.has(url)) {
    return pokemonCache.get(url);
  }

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Помилка отримання покемона');
  }

  const pokemon = await response.json();

  pokemonCache.set(url, pokemon);

  return pokemon;
}

// Отримання покемонів за типами з API
async function getPokemonByTypes(types) {
  const typeResults = await Promise.all(
    types.map(async type => {
      if (!typesCache.has(type)) {
        const response = await fetch(`${API_URL}/type/${type}`);

        if (!response.ok) {
          throw new Error(`Помилка отримання типу: ${type}`);
        }

        const data = await response.json();

        typesCache.set(
          type,
          data.pokemon.map(item => item.pokemon)
        );
      }

      return typesCache.get(type);
    })
  );

  // Знаходимо спільних покемонів усіх вибраних типів
  const filteredPokemons = typeResults[0].filter(pokemon =>
    typeResults.every(typeList =>
      typeList.some(item => item.name === pokemon.name)
    )
  );

  // Отримуємо детальну інформацію
  return Promise.all(
    filteredPokemons.map(pokemon =>
      fetchPokemon(pokemon.url)
    )
  );
}

// Основна функція фільтрації
async function applyFilters() {
  const requestId = ++filterRequestId;

  const query = searchInput.value.trim().toLowerCase();

  renderActiveFilters();

  try {
    let pokemons;

    if (selectedTypes.length > 0) {
      pokemons = await getPokemonByTypes(selectedTypes);
    } else {
      pokemons = loadedPokemons;
    }

    if (requestId !== filterRequestId) return;

    pokemons = pokemons.filter(pokemon =>
      pokemon.name.toLowerCase().includes(query)
    );

    renderImages(pokemons);

    // Оновлюємо кількість знайдених покемонів
    const foundCount =
      selectedTypes.length === 0 && query === ''
        ? totalPokemonCount
        : pokemons.length;

    foundCountRef.textContent = `Знайдено: ${foundCount}`;

    loadMoreBtn.style.display =
      selectedTypes.length > 0 ? 'none' : '';

  } catch (error) {
    console.error('Помилка фільтрації:', error);
  }
}
// Вибір типу
selectButtonRef.addEventListener('click', () => {
  const isOpen = selectButtonRef.getAttribute('aria-expanded') === 'true';

  selectButtonRef.setAttribute('aria-expanded', String(!isOpen));
  optionsRef.hidden = isOpen;
});

// Вибір типу
optionsRef.addEventListener('click', async event => {
  const option = event.target.closest('.search__option');

  if (!option) return;

  const type = option.dataset.type;

  if (type === 'all') {
    selectedTypes = [];
  } else if (selectedTypes.includes(type)) {
    selectedTypes = selectedTypes.filter(item => item !== type);
  } else {
    selectedTypes.push(type);
  }

  updateDropdown();

  await applyFilters();
});

// Оновлення вигляду меню
function updateDropdown() {
  const options = optionsRef.querySelectorAll('.search__option');

  options.forEach(option => {
    const type = option.dataset.type;

    const isSelected =
      type === 'all'
        ? selectedTypes.length === 0
        : selectedTypes.includes(type);

    option.classList.toggle('is-selected', isSelected);
    option.setAttribute('aria-pressed', String(isSelected));
  });

  selectLabelRef.textContent =
    selectedTypes.length === 0
      ? 'Усі типи'
      : `Обрано типів: ${selectedTypes.length}`;
}

// Закриття при кліку поза меню
document.addEventListener('click', event => {
  if (!dropdownRef.contains(event.target)) {
    optionsRef.hidden = true;
    selectButtonRef.setAttribute('aria-expanded', 'false');
  }
});

// Закриття клавішею Escape
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    optionsRef.hidden = true;
    selectButtonRef.setAttribute('aria-expanded', 'false');
    selectButtonRef.focus();
  }
});

updateDropdown();

// Пошук за назвою
searchInput.addEventListener('input', applyFilters);

// Кнопка завантаження наступної сторінки
loadMoreBtn.addEventListener('click', loadPokemons);

// Перше завантаження
loadPokemons();

function renderActiveFilters() {
  activeFiltersRef.innerHTML = selectedTypes
    .map(
      type => `
        <button
          class="search__active-filter"
          type="button"
          data-type="${type}"
        >
          ${type}
          <span>&times;</span>
        </button>
      `
    )
    .join('');
}

activeFiltersRef.addEventListener('click', async event => {
  const button = event.target.closest('.search__active-filter');

  if (!button) return;

  const type = button.dataset.type;

  selectedTypes = selectedTypes.filter(
    selectedType => selectedType !== type
  );

  await applyFilters();
});