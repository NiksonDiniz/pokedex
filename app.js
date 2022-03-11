// https://cdn.traction.one/pokedex/pokemon/
// https://pokeapi.co/api/v2/pokemon/

const getPokemonUrl = (id) => `https://pokeapi.co/api/v2/pokemon/${id}`;

const generatePokemonPromises = () =>
  Array(150)
    .fill()
    .map((_, index) =>
      fetch(getPokemonUrl(index + 1)).then((response) => response.json())
    );

const generateHTML = (pokemons) =>
  pokemons.reduce((acc, { id, name, types, abilities }) => {
    const elementTypes = types.map((typeInfo) => typeInfo.type.name);
    const skills = abilities.map((abilityInfo) => abilityInfo.ability.name);

    acc += `
    <li class="card  ${elementTypes[0]}">
    <img class="card-image" alt="${name}" src="https://cdn.traction.one/pokedex/pokemon/${id}.png"/>
      <h2 class="card-title">${id}. ${name}</h2>
      <p class="card-subtitle">${elementTypes.join(" | ")}</p>
      <h3>Skills</h3>
      <p >${skills.join(" | ")}</p>
    </li>
  `;
    return acc;
  }, "");

const insertPokemonsIntoPage = (pokemons) => {
  const ul = document.querySelector("[data-js='pokedex']");
  ul.innerHTML = pokemons;
};

const pokemonPromises = generatePokemonPromises();

Promise.all(pokemonPromises).then(generateHTML).then(insertPokemonsIntoPage);
