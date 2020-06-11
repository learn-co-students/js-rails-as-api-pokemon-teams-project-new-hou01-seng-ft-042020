const BASE_URL = "http://localhost:3000";
const TRAINERS_URL = `${BASE_URL}/trainers`;
const POKEMONS_URL = `${BASE_URL}/pokemons`;

fetch(TRAINERS_URL)
  .then((res) => res.json())
  .then((trainers) => {
    for (const trainer of trainers) {
      renderTrainer(trainer);
      addPokemon();
    }
  });

function renderTrainer(trainer) {
  //   console.log(trainer);
  const div = document.createElement("div");
  div.classList.add("card");
  div.dataset.id = trainer.id;

  const p = document.createElement("p");
  p.textContent = trainer.name;
  //   console.log(trainer.name);

  const btn = document.createElement("button");
  btn.classList.add("add-pokemon");
  btn.textContent = "Add Pokemon";

  const ul = document.createElement("ul");

  trainer.pokemons.map((pokemon) => pokemonList(pokemon, ul));
  const main = document.querySelector("main");

  div.append(p, btn, ul);
  main.append(div);
}

function pokemonList(pokemon, ul) {
  const li = document.createElement("li");
  const releaseBtn = document.createElement("button");
  releaseBtn.className = "release";
  releaseBtn.textContent = "Release";
  li.textContent = pokemon.nickname;
  li.dataset.id = pokemon.id;
  li.append(releaseBtn);
  ul.append(li);
}

function createPokemon(pokemon){
    const pokemonName = pokemon.name
    const pokemonSpecies = pokemon.species
    const pokemonNickname = pokemon.nickname
    
}

function addPokemon() {
  const addBtn = document.querySelector(".add-pokemon");
  //   console.log(addBtn);
  addBtn.addEventListener("click", () => {
    const postOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        trainer_id: pokemon.trainer_id,
        name: pokemon.species,
        nickname: pokemon.nickname,
      }),
    };

    fetch(POKEMONS_URL, postOptions)
      .then((res) => res.json())
      .then((pokemon) => {
        const ul = document.createElement("ul");
        // for (const pokemon of pokemons) {
        //   btn.dataset.id = pokemon.trainer_id;
        //   const li = document.createElement("li");
        //   li.textContent = `${pokemon.nickname} (${pokemon.name})`;
        //   ul.append(li);
        pokemonList(pokemon,ul)
        // }
      });
  });
}

function deletePokemon() {
const deleteBtn = document.querySelector('.release')
deleteBtn.addEventListener("click", ()=> {

const options = {
  method: 'DELETE',
  headers: {
    "Content-Type": "application/json",
  },
}
event.target.remove()
  
});