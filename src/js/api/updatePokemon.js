const API_URL = "https://pokeapi.co/api/v2";
export async function updatePokemon(id, updatedData) {
  try {
    const pokemon = await getPokemonById(id);

    if (!pokemon) {
      throw new Error("Покемона не знайдено");
    }

    const updatedPokemon = {
      ...pokemon,
      ...updatedData
    };

    return updatedPokemon;
  } catch (error) {
    console.error("Сталася помилка при оновленні покемона:", error);
  }
}