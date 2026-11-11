const backLink = document.querySelector('.details__link');

if (backLink) {
  backLink.addEventListener('click', (event) => {
    event.preventDefault(); 
    if (window.history.length > 1 && document.referrer.includes(window.location.host)) {
      window.history.back();
    } else {
      window.location.href = './index.html';
    }
  });
}





// Якщо в папці api всередині js:
import { getPokemonById } from "./api/getPokemon.js";



const params = new URLSearchParams(window.location.search);
const pokemonId = Number(params.get("id")) || 25;

const typesUa = {
  electric: "Електричний", fire: "Вогняний", water: "Водяний", grass: "Травʼяний",
  normal: "Звичайний", poison: "Отруйний", flying: "Літаючий", bug: "Комаха",
  ground: "Земляний", fairy: "Чарівний", psychic: "Психічний", rock: "Камʼяний",
  ice: "Крижаний", dragon: "Драконячий", ghost: "Примарний", steel: "Сталевий",
  fighting: "Бойовий", dark: "Темний"
};

const gensUa = {
  "generation-i": "Покоління I", "generation-ii": "Покоління II",
  "generation-iii": "Покоління III", "generation-iv": "Покоління IV",
  "generation-v": "Покоління V", "generation-vi": "Покоління VI",
  "generation-vii": "Покоління VII", "generation-viii": "Покоління VIII",
  "generation-ix": "Покоління IX"
};

const fmtId = (id) => "#" + String(id).padStart(3, "0");
const cap = (str) => (str ? str.charAt(0).toUpperCase() + str.slice(1) : "");

async function renderPokemonDetails(id) {
  // Використовуємо вашу функцію з getPokemon.js
  const pokemon = await getPokemonById(id);
  if (!pokemon) return;

  // Завантажуємо дані виду (опис, покоління, еволюція)
  const speciesRes = await fetch(pokemon.species.url);
  const species = await speciesRes.json();

  // Заповнюємо ID та покоління
  const idText = fmtId(pokemon.id);
  const genText = gensUa[species.generation.name] || species.generation.name;
  const idEls = document.querySelectorAll(".details__pokemonid");
  if (idEls.item(0)) idEls.item(0).textContent = idText;
  if (idEls.item(1)) idEls.item(1).textContent = `${idText} · ${genText}`;

  // Головне фото та ім'я
  const imgEl = document.querySelector(".details__img");
  if (imgEl) {
    imgEl.src = pokemon.sprites.other["official-artwork"].front_default || pokemon.sprites.front_default;
    imgEl.alt = pokemon.name;
  }
  const nameEl = document.querySelector(".details__name");
  if (nameEl) nameEl.textContent = pokemon.name;

  // Категорія та опис
  const genusObj = species.genera.find((g) => g.language.name === "en");
  const genusEl = document.querySelector(".details__genus");
  if (genusEl) genusEl.textContent = genusObj ? genusObj.genus : "";

  const flavorObj = species.flavor_text_entries.find((f) => f.language.name === "en");
  const descEl = document.querySelector(".details__description");
  if (descEl) {
    descEl.textContent = flavorObj ? flavorObj.flavor_text.replace(/[\f\n\r]+/g, " ") : "";
  }

  // Типи
  const filtrEl = document.querySelector(".details__filtr");
  if (filtrEl) {
    filtrEl.innerHTML = pokemon.types
      .map((t) => `<span class="type-badge">${typesUa[t.type.name] || t.type.name}</span>`)
      .join("");
  }

  // Зріст, вага, здібність
  const hEl = document.querySelector(".details__height .details__text");
  const wEl = document.querySelector(".details__weight .details__text");
  const aEl = document.querySelector(".details__capability .details__text");
  if (hEl) hEl.textContent = `${(pokemon.height / 10).toFixed(1).replace(".", ",")} м`;
  if (wEl) wEl.textContent = `${(pokemon.weight / 10).toFixed(1).replace(".", ",")} кг`;
  const abName = pokemon.abilities.at(0)?.ability?.name || "—";
  if (aEl) aEl.textContent = cap(abName.replace("-", " "));

  // Характеристики
  const statRows = document.querySelectorAll(".stat-row");
  let total = 0;
  pokemon.stats.forEach((st, idx) => {
    total += st.base_stat;
    const row = statRows.item(idx);
    if (row) {
      const valEl = row.querySelector(".stat-value");
      const barEl = row.querySelector(".progress-bar");
      if (valEl) valEl.textContent = st.base_stat;
      if (barEl) barEl.style.width = `${Math.min(Math.round((st.base_stat / 200) * 100), 100)}%`;
    }
  });
  const totalEl = document.querySelector(".details__total");
  if (totalEl) totalEl.textContent = `Разом: ${total}`;

  // Еволюція
  const evoRes = await fetch(species.evolution_chain.url);
  const evoData = await evoRes.json();
  renderEvolution(evoData.chain, pokemon.species.name);

  // Нижня навігація, обране і кнопка назад
  await renderFooterNav(pokemon.id);
  setupFavorites(pokemon.id);
  setupBackButton();
}

function renderEvolution(chainNode, currentName) {
  const container = document.querySelector(".evolution-chain");
  if (!container || !chainNode) return;

  const stages = [];
  let current = chainNode;

  while (current) {
    const parts = current.species.url.split("/").filter(Boolean);
    const evoId = parts[parts.length - 1];
    const det = current.evolution_details && current.evolution_details[0];
    let trigger = "";

    if (det) {
      if (det.min_level) trigger = "Рівень " + det.min_level;
      else if (det.item) trigger = det.item.name.replace("-", " ");
      else if (det.min_happiness) trigger = "Висока дружба";
      else if (det.trigger && det.trigger.name === "trade") trigger = "Обмін";
      else if (det.trigger && det.trigger.name) trigger = det.trigger.name.replace("-", " ");
    }

    stages.push({ id: evoId, name: current.species.name, trigger: trigger });
    current = current.evolves_to && current.evolves_to.length > 0 ? current.evolves_to[0] : null;
  }

  container.innerHTML = stages
    .map((st, idx) => {
      const active = st.name === currentName;
      const imgUrl = "https://githubusercontent.com" + st.id + ".png";
      const arrow = idx > 0
        ? '<div class="evo-arrow-container"><div class="arrow-graphic">→</div><div>' + st.trigger + '</div></div>'
        : "";

      return arrow +
        '<div class="evo-pokemon" onclick="window.location.search=\'?id=' + st.id + '\'">' +
          '<div class="evo-img-container ' + (active ? "bg-yellow" : "bg-blue") + '">' +
            '<img class="evo-img" src="' + imgUrl + '" alt="' + st.name + '">' +
          '</div>' +
          '<div class="evo-name" style="' + (active ? "color:#2563eb;" : "") + '">' + cap(st.name) + '</div>' +
          '<div class="evo-id">' + fmtId(st.id) + '</div>' +
        '</div>';
    })
    .join("");
}

async function renderFooterNav(id) {
  const links = document.querySelectorAll(".pokedex-footer .nav-link");
  const prevLink = links.item(0);
  const nextLink = links.item(1);
  if (!prevLink || !nextLink) return;

  if (id > 1) {
    const prevPoke = await getPokemonById(id - 1);
    if (prevPoke) {
      prevLink.textContent = `← ${fmtId(id - 1)} ${cap(prevPoke.name)}`;
      prevLink.href = `?id=${id - 1}`;
    }
  } else {
    prevLink.style.visibility = "hidden";
  }

  const nextPoke = await getPokemonById(id + 1);
  if (nextPoke) {
    nextLink.textContent = `${fmtId(id + 1)} ${cap(nextPoke.name)} →`;
    nextLink.href = `?id=${id + 1}`;
  } else {
    nextLink.style.visibility = "hidden";
  }
}

function setupFavorites(id) {
  const topBtn = document.querySelector(".details__fav");
  const bottomBtn = document.querySelector(".favorite-action-btn");
  if (!topBtn || !bottomBtn) return;

  const getFavs = () => JSON.parse(localStorage.getItem("pokedex_favs") || "[]");
  const sync = () => {
    const isFav = getFavs().includes(id);
    topBtn.classList.toggle("active", isFav);
    bottomBtn.classList.toggle("is-fav", isFav);
    bottomBtn.innerHTML = isFav
      ? '<span class="heart-icon">♥</span> В обраному'
      : '<span class="heart-icon">♡</span> Додати до обраного';
  };

  const toggle = () => {
    const favs = getFavs();
    const updated = favs.includes(id) ? favs.filter((x) => x !== id) : [...favs, id];
    localStorage.setItem("pokedex_favs", JSON.stringify(updated));
    sync();
  };

  topBtn.onclick = toggle;
  bottomBtn.onclick = toggle;
  sync();
}

function setupBackButton() {
  const link = document.querySelector(".details__link");
  if (!link) return;

  link.addEventListener("click", (e) => {
    e.preventDefault();
    if (window.history.length > 1 && document.referrer.includes(window.location.host)) {
      window.history.back();
    } else {
      window.location.href = "./index.html";
    }
  });
}

renderPokemonDetails(pokemonId);

