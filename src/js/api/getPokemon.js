const API_URL = "https://pokeapi.co/api/v2";


// Отримання списку покемонів
export async function getPokemons() {
  try {
    const response = await fetch(`${API_URL}/pokemon`);

    if (!response.ok) {
      throw new Error("Помилка отримання покемонів");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Сталася помилка при отриманні покемонів:", error);
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