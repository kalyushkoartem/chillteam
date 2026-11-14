
import { getPokemonById } from "./api/getPokemon.js";

// Отримуємо ID покемона з URL
const params = new URLSearchParams(window.location.search);
const requestedId = Number(params.get("id"));
const pokemonId = Number.isInteger(requestedId) && requestedId > 0
  ? requestedId
  : 25;


// Допоміжні функції
const fmtId = (id) => "#" + String(id).padStart(3, "0");

const cap = (str) =>
  str ? str.charAt(0).toUpperCase() + str.slice(1) : "";

const getArtwork = (id) =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

// Завантаження JSON
async function fetchJson(url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  return response.json();
}

// Головна функція
async function renderPokemonDetails(id) {
  try {
    const pokemon = await getPokemonById(id);

    if (!pokemon) {
      throw new Error("Покемона не знайдено");
    }

    const species = await fetchJson(pokemon.species.url);

    // ID та покоління
    const idText = fmtId(pokemon.id);

    const genText = species.generation.name
    .replace("generation-", "Generation ")
     .replace(/\b(i|ii|iii|iv|v|vi|vii|viii|ix)\b/i, (match) =>
    match.toUpperCase()
  );
    const idEls = document.querySelectorAll(
      ".details__pokemonid"
    );

    if (idEls[0]) {
      idEls[0].textContent = idText;
    }

    if (idEls[1]) {
      idEls[1].textContent = `${idText} · ${genText}`;
    }

    // Фото
    const imgEl = document.querySelector(".details__img");

    if (imgEl) {
      imgEl.src =
        pokemon.sprites.other?.["official-artwork"]
          ?.front_default ||
        pokemon.sprites.front_default ||
        getArtwork(pokemon.id);

      imgEl.alt = pokemon.name;
    }

    // Ім'я
    const nameEl = document.querySelector(".details__name");

    if (nameEl) {
      nameEl.textContent = cap(pokemon.name);
    }

    // Категорія
    const genusObj = species.genera?.find(
      (g) => g.language.name === "en"
    );

    const genusEl = document.querySelector(".details__genus");

    if (genusEl) {
      genusEl.textContent = genusObj?.genus || "";
    }

    // Опис
    const flavorObj = species.flavor_text_entries?.find(
      (f) => f.language.name === "en"
    );

    const descEl = document.querySelector(
      ".details__description"
    );

    if (descEl) {
      descEl.textContent = flavorObj
        ? flavorObj.flavor_text.replace(/[\f\n\r]+/g, " ")
        : "";
    }

    // Типи
   const filtrEl = document.querySelector(".details__filtr");

if (filtrEl) {
  filtrEl.innerHTML = pokemon.types
    .map(({ type }) => `
      <span class="type-badge type-badge--${type.name}">
        ${type.name}
      </span>
    `)
    .join("");
}
    // Зріст
    const hEl = document.querySelector(
      ".details__height .details__text"
    );

   if (hEl) {
  hEl.textContent = `${(pokemon.height / 10).toFixed(1)} m`;
}

    // Вага
    const wEl = document.querySelector(
      ".details__weight .details__text"
    );

   if (wEl) {
  wEl.textContent = `${(pokemon.weight / 10).toFixed(1)} kg`;
}

    // Здібності
    const aEl = document.querySelector(
      ".details__capability .details__text"
    );

    const abilityName =
      pokemon.abilities[0]?.ability?.name || "—";

    if (aEl) {
      aEl.textContent = cap(
        abilityName.replaceAll("-", " ")
      );
    }

    // Характеристики
    const statRows = document.querySelectorAll(".stat-row");

    let total = 0;

    pokemon.stats.forEach((stat, index) => {
      total += stat.base_stat;

      const row = statRows[index];

      if (!row) return;

      const valEl = row.querySelector(".stat-value");
      const barEl = row.querySelector(".progress-bar");

      if (valEl) {
        valEl.textContent = stat.base_stat;
      }

      if (barEl) {
        const percent = Math.min(
          (stat.base_stat / 200) * 100,
          100
        );

        barEl.style.width = `${percent}%`;
      }
    });

    const totalEl = document.querySelector(".details__total");

    if (totalEl) {
      totalEl.textContent = `Разом: ${total}`;
    }

    // Еволюція
    if (species.evolution_chain?.url) {
      const evoData = await fetchJson(
        species.evolution_chain.url
      );

      renderEvolution(evoData.chain, pokemon.species.name);
    }

    // Нижня навігація
    await renderFooterNav(pokemon.id);

    // Обране
    setupFavorites(pokemon.id);

  } catch (error) {
    console.error("Помилка завантаження Pokémon:", error);

    const nameEl = document.querySelector(".details__name");

    if (nameEl) {
      nameEl.textContent = "Не вдалося завантажити Pokémon";
    }
  }
}

// Еволюція
function renderEvolution(chainNode, currentName) {
  const container = document.querySelector(".evolution-chain");

  if (!container || !chainNode) return;

  const stages = [];

  function collectStages(node, parentId = null) {
    const parts = node.species.url
      .split("/")
      .filter(Boolean);

    const evoId = Number(parts.at(-1));
    const details = node.evolution_details?.[0];

    let trigger = "";

    if (details) {
      if (details.min_level) {
        trigger = `Рівень ${details.min_level}`;
      } else if (details.item) {
        trigger = details.item.name.replaceAll("-", " ");
      } else if (details.min_happiness) {
        trigger = "Висока дружба";
      } else if (details.trigger?.name === "trade") {
        trigger = "Обмін";
      } else if (details.trigger?.name) {
        trigger = details.trigger.name.replaceAll("-", " ");
      }
    }

    stages.push({
      id: evoId,
      name: node.species.name,
      trigger,
      parentId
    });

    node.evolves_to?.forEach((next) => {
      collectStages(next, evoId);
    });
  }

  collectStages(chainNode);

  container.innerHTML = stages
    .map((stage) => {
      const active = stage.name === currentName;

      const arrow = stage.parentId !== null
        ? `
          <div class="evo-arrow-container">
            <div class="arrow-graphic">→</div>
            <div>${stage.trigger}</div>
          </div>
        `
        : "";

      return `
        ${arrow}

        <div class="evo-pokemon"
             data-id="${stage.id}"
             role="link"
             tabindex="0">

          <div class="evo-img-container ${
            active ? "bg-yellow" : "bg-blue"
          }">
            <img
              class="evo-img"
              src="${getArtwork(stage.id)}"
              alt="${stage.name}"
              loading="lazy"
            >
          </div>

          <div class="evo-name"
               ${active ? 'style="color:#2563eb;"' : ""}>
            ${cap(stage.name)}
          </div>

          <div class="evo-id">
            ${fmtId(stage.id)}
          </div>

        </div>
      `;
    })
    .join("");

  // Перехід до вибраного покемона
  function openEvolution(event) {
    const target = event.target.closest(".evo-pokemon");

    if (!target) return;

    window.location.search = `?id=${target.dataset.id}`;
  }

  container.addEventListener("click", openEvolution);

  container.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;

    const target = event.target.closest(".evo-pokemon");

    if (!target) return;

    event.preventDefault();
    window.location.search = `?id=${target.dataset.id}`;
  });
}

// Нижня навігація
async function renderFooterNav(id) {
  const links = document.querySelectorAll(
    ".pokedex-footer .nav-link"
  );

  const prevLink = links[0];
  const nextLink = links[1];

  if (!prevLink || !nextLink) return;

  if (id > 1) {
    const prevPoke = await getPokemonById(id - 1);

    if (prevPoke) {
      prevLink.textContent =
        `← ${fmtId(prevPoke.id)} ${cap(prevPoke.name)}`;

      prevLink.href = `?id=${prevPoke.id}`;
      prevLink.style.visibility = "visible";
    } else {
      prevLink.style.visibility = "hidden";
    }
  } else {
    prevLink.style.visibility = "hidden";
  }

  const nextPoke = await getPokemonById(id + 1);

  if (nextPoke) {
    nextLink.textContent =
      `${fmtId(nextPoke.id)} ${cap(nextPoke.name)} →`;

    nextLink.href = `?id=${nextPoke.id}`;
    nextLink.style.visibility = "visible";
  } else {
    nextLink.style.visibility = "hidden";
  }
}

// Обране
function setupFavorites(id) {
  const topBtn = document.querySelector(".details__fav");
  const bottomBtn = document.querySelector(
    ".favorite-action-btn"
  );

  if (!topBtn && !bottomBtn) return;

  const getFavs = () => {
    try {
      const stored = JSON.parse(
        localStorage.getItem("pokedex_favs") || "[]"
      );

      return Array.isArray(stored) ? stored : [];
    } catch {
      return [];
    }
  };

  function sync() {
    const isFav = getFavs().includes(id);

    if (topBtn) {
      topBtn.classList.toggle("active", isFav);
      topBtn.setAttribute("aria-pressed", String(isFav));
    }

    if (bottomBtn) {
      bottomBtn.classList.toggle("is-fav", isFav);

      bottomBtn.innerHTML = isFav
        ? '<span class="heart-icon">♥</span> В обраному'
        : '<span class="heart-icon">♡</span> Додати до обраного';
    }
  }

  function toggle() {
    const favs = getFavs();

    const updated = favs.includes(id)
      ? favs.filter((x) => x !== id)
      : [...favs, id];

    localStorage.setItem(
      "pokedex_favs",
      JSON.stringify(updated)
    );

    sync();
  }

  if (topBtn) topBtn.onclick = toggle;
  if (bottomBtn) bottomBtn.onclick = toggle;

  sync();
}


// Запуск
renderPokemonDetails(pokemonId);
