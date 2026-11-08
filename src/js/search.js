import {
  getPokemonByName,
  getPokemonById,
  getPokemons,
} from './api/getPokemon';

const listRef = document.querySelector('.search__list');
const loadMoreBtn = document.querySelector('.load-more');

let currentPage = 1;
const perPage = 20;
let isLoading = false;

function renderImages(array) {
  const images = array
    .map(({ id, name, types, sprites }) => {
      const image =
        sprites.other['official-artwork'].front_default ||
        sprites.front_default;
      const pokemonTypes = types.map(type => type.type.name).join(', ');

      return `
        <li class="search__item">
          <img src="${image}" alt="${name}">
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
        </li>`;
    })
    .join('');

  listRef.insertAdjacentHTML('beforeend', images);
}

// Завантаження покемонів
async function loadPokemons() {
  if (isLoading) return;
  isLoading = true;
  loadMoreBtn.disabled = true;
  try {
    const data = await getPokemons(perPage, currentPage);
    if (!data) return;
    renderImages(data.results);
    currentPage++;
    if (!data.next) {
      loadMoreBtn.style.display = 'none';
    }
    console.log('Завантажена сторінка:', currentPage - 1);
  } catch (error) {
    console.error('Помилка завантаження:', error);
  } finally {
    isLoading = false;
    loadMoreBtn.disabled = false;
  }
}

// Перше завантаження
loadPokemons();

// Наступні сторінки
loadMoreBtn.addEventListener('click', loadPokemons);

// listRef.addEventListener('click', event => {
//   const button = event.target.closest('.search__fav');

//   if (!button) return;

//   button.classList.toggle('active');
// });