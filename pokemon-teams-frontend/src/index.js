const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`


fetch(TRAINERS_URL)
  .then(res => res.json())
  .then(trainers => trainers.forEach(renderTrainer))

function renderTrainer(trainer) {
    const main = document.querySelector("main")
    const div = document.createElement('div')
    div.className = "card"
    div.dataset.id = trainer.id
    div.innerText = trainer.name

    const button = document.createElement('button')
    button.dataset.trainerId = trainer.id
    button.innerText = "Add Pokemon"

    button.addEventListener("click", e => {addPokemon(trainer.id)})

    const ul = document.createElement("ul")
    ul.id = trainer.id
    trainer.pokemons.forEach(poke => renderPokemons(poke, ul))

    div.append(button, ul)
    main.append(div)
    
}

function renderPokemons(pokemon, ul) {
    const li = document.createElement('li')
    li.innerText = `${pokemon.nickname} (${pokemon.species})`

    const btn = document.createElement("button")
    btn.innerText = "Release"
    btn.className = "release"
    btn.dataset.pokemonId = pokemon.id

    btn.addEventListener("click", e => {deletePokemon(pokemon.id, e)})

    li.append(btn)
    ul.append(li)
}

function addPokemon(id) {
    fetch(POKEMONS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          'trainer_id': id
      })
    })
    .then(res => res.json())
    .then((pokemon) => {
        const ul = document.getElementById(id)
        renderPokemons(pokemon, ul)
    })
}

function deletePokemon(id, e) {
    fetch(POKEMONS_URL + `/${id}`, {method: 'DELETE'})
        .then(() => e.target.parentElement.remove())
}
// addPokemon(2)
// <div class="card" data-id="1"><p>Prince</p>
  // <button data-trainer-id="1">Add Pokemon</button>
  // <ul>
    // <li>Jacey (Kakuna) <button class="release" data-pokemon-id="140">Release</button></li>
    // <li>Zachariah (Ditto) <button class="release" data-pokemon-id="141">Release</button></li>
    // <li>Mittie (Farfetch'd) <button class="release" data-pokemon-id="149">Release</button></li>
    // <li>Rosetta (Eevee) <button class="release" data-pokemon-id="150">Release</button></li>
    // <li>Rod (Beedrill) <button class="release" data-pokemon-id="151">Release</button></li>
  // </ul>
// </div>