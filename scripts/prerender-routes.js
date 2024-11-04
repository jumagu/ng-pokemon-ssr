const TOTAL_POKEMONS = 151;
const TOTAL_PAGES = 5;

(async () => {
  const fs = require("fs");

  // ? Pokemon pages by number id
  const pokemonIds = Array.from({ length: TOTAL_POKEMONS }, (_, i) => i + 1);
  // ? Pokemon pages by name
  const pokemonNames = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${TOTAL_POKEMONS}`
  )
    .then((res) => res.json())
    .then(({ results }) => results.map((r) => r.name));

  // ? Paginated pokemon pages
  const pages = Array.from({ length: TOTAL_PAGES }, (_, i) => i + 1);

  // ? file content
  let fileContent = pokemonIds.map((id) => `/pokemons/${id}`).join("\n");
  fileContent += pokemonNames.map((name) => `\n/pokemons/${name}`).join("");
  fileContent += pages.map((page) => `\n/pokemons/page/${page}`).join("");

  fs.writeFileSync("routes.txt", fileContent);
})();
