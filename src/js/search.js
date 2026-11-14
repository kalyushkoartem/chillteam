
import symbolDefsUrl from '../img/symbol-defs.svg?url';

import {
  getPokemons,
  getPokemonById,
  getPokemonByName,
} from './api/getPokemon';

// API URL для отримання покемонів за типами
const API_URL = 'https://pokeapi.co/api/v2';

// DOM елементи
const listRef = document.querySelector('.search__list');
const loadMoreBtn = document.querySelector('.load-more');
const dropdownRef = document.querySelector('.search__dropdown');
const selectButtonRef = document.querySelector('.search__select');
const selectLabelRef = document.querySelector('.search__select-label');
const optionsRef = document.querySelector('.search__options');
const activeFiltersRef = document.querySelector(
  '.search__active-filters'
);
const foundCountRef = document.querySelector('.search__text');
const searchInputRef = document.querySelector('.search__input');

// Змінні
let searchQuery = '';
let selectedTypes = [];
let currentPage = 1;
const perPage = 20;
let isLoading = false;
let loadedPokemons = [];
let filterRequestId = 0;

// Кешування
const typesCache = new Map();
const pokemonCache = new Map();

let allPokemonNames = [];

// Відображення покемонів
function renderImages(array) {
  const images = array.map(({ id, name, types, sprites }) => {
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

    return `
      <li class="search__item">
        <a href="./details.html?id=${id}" class="search__link">
          <img
            src="${image}"
            alt="${name}"
            loading="lazy"
          >

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
            aria-label="Додати ${name} до обраного"
          >

          <svg class="search__icon search__icon--fav">
            <use href="${symbolDefsUrl}#heart"></use>
          </svg>
        </label>
      </li>
    `;
  }).join('');

  listRef.innerHTML = images;
}

// Завантаження покемонів з пагінацією
async function loadPokemons() {
  if (isLoading) return;

  isLoading = true;
  loadMoreBtn.disabled = true;

  try {
    const data = await getPokemons(perPage, currentPage);

    if (!data) return;

    loadedPokemons = [
      ...loadedPokemons,
      ...data.results,
    ];

    currentPage++;

    await applyFilters();

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

  const id = url.split('/').filter(Boolean).pop();

  const pokemon = await getPokemonById(id);

  if (pokemon) {
    pokemonCache.set(url, pokemon);
  }

  return pokemon;
}

// Отримання покемонів за типами
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

  // Знаходимо покемонів, які мають усі вибрані типи
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

// Пошук покемонів за частиною імені
async function searchPokemonByName(name) {
  try {
    const query = name.trim().toLowerCase();

    if (!query) return [];

    // Завантажуємо список імен один раз
    if (allPokemonNames.length === 0) {
      const response = await fetch(
        `${API_URL}/pokemon?limit=2000`
      );

      if (!response.ok) {
        throw new Error('Помилка отримання списку покемонів');
      }

      const data = await response.json();

      allPokemonNames = data.results;
    }

    // Шукаємо збіги за частиною імені
    const matches = allPokemonNames
      .filter(pokemon => pokemon.name.includes(query))
      .slice(0, 20);

    // Отримуємо повну інформацію через API-функцію
    return await Promise.all(
      matches.map(pokemon =>
        getPokemonByName(pokemon.name)
      )
    );

  } catch (error) {
    console.error('Помилка пошуку покемона:', error);
    return [];
  }
}

// Застосування фільтрів
async function applyFilters() {
  const requestId = ++filterRequestId;

  renderActiveFilters();

  try {
    let pokemons;

    if (searchQuery) {
      pokemons = await searchPokemonByName(searchQuery);
    } else if (selectedTypes.length > 0) {
      pokemons = await getPokemonByTypes(selectedTypes);
    } else {
      pokemons = loadedPokemons;
    }

    // Перевірка актуальності запиту
    if (requestId !== filterRequestId) return;

    // Поєднання пошуку та фільтрації за типами
    if (searchQuery && selectedTypes.length > 0) {
      pokemons = pokemons.filter(pokemon =>
        selectedTypes.every(type =>
          pokemon.types.some(
            item => item.type.name === type
          )
        )
      );
    }

    renderImages(pokemons);

    foundCountRef.textContent = `Знайдено: ${pokemons.length}`;

    loadMoreBtn.style.display =
      searchQuery || selectedTypes.length > 0
        ? 'none'
        : '';

  } catch (error) {
    console.error('Помилка фільтрації:', error);
  }
}

// Пошук при введенні тексту
searchInputRef.addEventListener('input', async event => {
  searchQuery = event.target.value.trim().toLowerCase();

  await applyFilters();
});

// Відкриття меню вибору типу
selectButtonRef.addEventListener('click', () => {
  const isOpen =
    selectButtonRef.getAttribute('aria-expanded') === 'true';

  selectButtonRef.setAttribute(
    'aria-expanded',
    String(!isOpen)
  );

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
    selectedTypes = selectedTypes.filter(
      item => item !== type
    );
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

    option.setAttribute(
      'aria-pressed',
      String(isSelected)
    );
  });

  selectLabelRef.textContent =
    selectedTypes.length === 0
      ? 'Усі типи'
      : `Обрано типів: ${selectedTypes.length}`;
}

// Закриття меню при кліку поза ним
document.addEventListener('click', event => {
  if (!dropdownRef.contains(event.target)) {
    optionsRef.hidden = true;

    selectButtonRef.setAttribute(
      'aria-expanded',
      'false'
    );
  }
});

// Закриття меню клавішею Escape
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    optionsRef.hidden = true;

    selectButtonRef.setAttribute(
      'aria-expanded',
      'false'
    );

    selectButtonRef.focus();
  }
});

// Відображення активних фільтрів
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

// Видалення активного фільтра
activeFiltersRef.addEventListener('click', async event => {
  const button = event.target.closest(
    '.search__active-filter'
  );

  if (!button) return;

  const type = button.dataset.type;

  selectedTypes = selectedTypes.filter(
    selectedType => selectedType !== type
  );

  updateDropdown();

  await applyFilters();
});

// Початкове налаштування
updateDropdown();

// Кнопка завантаження наступної сторінки
loadMoreBtn.addEventListener('click', loadPokemons);

// Перше завантаження
loadPokemons();
