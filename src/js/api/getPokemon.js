const API_URL = "https://pokeapi.co/api/v2";

export async function getPokemons(perPage = 20, page = 1) {
  try {
    const offset = (page - 1) * perPage;

    const response = await fetch(
      `${API_URL}/pokemon?limit=${perPage}&offset=${offset}`
    );

    if (!response.ok) {
      throw new Error("Помилка отримання покемонів");
    }

    const data = await response.json();

    const pokemonArray = await Promise.all(
      data.results.map(async pokemon => {
        const response = await fetch(pokemon.url);
        return await response.json();
      })
    );

    return {
      results: pokemonArray,
      count: data.count,
      next: data.next
    };

  } catch (error) {
    console.error("Помилка отримання покемонів:", error);
    return null;
  }
}

// Отримання покемона за ID
export async function getPokemonById(id) {
  try {
    const response = await fetch(`${API_URL}/pokemon/${id}`);

    if (!response.ok) {
      throw new Error("Помилка отримання покемона");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Сталася помилка при отриманні покемона:", error);
  }
}

// Отримання покемона за ім'ям
export async function getPokemonByName(name) {
  try {
    const response = await fetch(`${API_URL}/pokemon/${name.toLowerCase()}`);

    if (!response.ok) {
      throw new Error("Помилка отримання покемона");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Сталася помилка при отриманні покемона:", error);
  }
}

export async function searchPokemon(query) {
  try {
    return await getPokemonByName(query);
  } catch (error) {
    console.error("Помилка пошуку:", error);
  }
}