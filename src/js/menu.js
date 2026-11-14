import symbolDefsUrl from '../img/symbol-defs.svg?url';
const openModal = document.querySelector(".open-modal");
const modal = document.querySelector(".modal");
const closeModal = document.querySelector(".modal__close");
const randomBtn = document.querySelector(".pokemon__random");

const pokemonImg = document.querySelector(".pokemonimg");
const pokemonName = document.querySelector(".pokemon__name");
const pokemonNumber = document.querySelector(".pokemon__number");
const pokemonTypes = document.querySelector(".pokemon__types");
const pokemonHeight = document.querySelector(".pokemon__height");
const pokemonWeight = document.querySelector(".pokemon__weight");
const pokemonStats = document.querySelector(".pokemon__stats");

// Відкрити модальне вікно
openModal.addEventListener("click", () => {
  modal.classList.add("active");
  getRandomPokemon();
});

// Закрити модальне вікно
closeModal.addEventListener("click", () => {
  modal.classList.remove("active");
});

// Закрити при натисканні на фон
modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.classList.remove("active");
  }
});

// Закрити клавішею Escape
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    modal.classList.remove("active");
  }
});

// Отримати випадкового покемона
async function getRandomPokemon() {
  try {
    randomBtn.textContent = "Завантаження...";

    const randomId = Math.floor(Math.random() * 1025) + 1;

    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${randomId}`
    );

    if (!response.ok) {
      throw new Error("Помилка завантаження покемона");
    }

    const pokemon = await response.json();

    // Зображення
    pokemonImg.src =
      pokemon.sprites.other["official-artwork"].front_default ||
      pokemon.sprites.front_default;

    pokemonImg.alt = pokemon.name;

    // Ім'я та номер
    pokemonName.textContent = pokemon.name;
    pokemonNumber.textContent = `#${String(pokemon.id).padStart(3, "0")}`;

    // Типи покемона
    pokemonTypes.innerHTML = "";

    pokemon.types.forEach((type) => {
      const span = document.createElement("span");

      span.classList.add(
  "pokemon__type",
  `type-badge--${type.type.name}`
);
      span.textContent = type.type.name;

      pokemonTypes.appendChild(span);
    });

    // Зріст та вага
    pokemonHeight.textContent = `${pokemon.height / 10} м`;
    pokemonWeight.textContent = `${pokemon.weight / 10} кг`;

    // Характеристики
    pokemonStats.innerHTML = "";

    pokemon.stats.forEach((stat) => {
      const statElement = document.createElement("div");

      statElement.classList.add("pokemon__stat");

      statElement.innerHTML = `
        <span>${stat.stat.name}</span>

        <div class="pokemon__bar">
          <div style="width: ${Math.min(stat.base_stat / 255 * 100, 100)}%"></div>
        </div>

        <span>${stat.base_stat}</span>
      `;

      pokemonStats.appendChild(statElement);
    });

    randomBtn.innerHTML = `
      <svg class="menu__icon">
    <use href="./img/symbol-defs.svg#dice-five"></use>
  </svg>
  Дослідити ще

`;

  } catch (error) {
    console.error(error);
    randomBtn.textContent = "Помилка завантаження. Спробувати ще раз";
  }
}

// Інший випадковий покемон
randomBtn.addEventListener("click", getRandomPokemon);