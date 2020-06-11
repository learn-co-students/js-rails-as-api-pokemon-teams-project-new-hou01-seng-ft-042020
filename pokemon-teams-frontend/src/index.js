const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

const main = document.querySelector('main')

fetch(TRAINERS_URL)
.then(res => res.json())
.then(trainers => {
  trainers.forEach(trainer => createTrainerCard(trainer))
})

// <div class="card" data-id="1"><p>Prince</p>
//   <button data-trainer-id="1">Add Pokemon</button>
//   <ul>
//     <li>Jacey (Kakuna) <button class="release" data-pokemon-id="140">Release</button></li>
//     <li>Zachariah (Ditto) <button class="release" data-pokemon-id="141">Release</button></li>
//     <li>Mittie (Farfetch'd) <button class="release" data-pokemon-id="149">Release</button></li>
//     <li>Rosetta (Eevee) <button class="release" data-pokemon-id="150">Release</button></li>
//     <li>Rod (Beedrill) <button class="release" data-pokemon-id="151">Release</button></li>
//   </ul>
// </div>

function createTrainerCard(trainer){
  const div = document.createElement('div')
  div.className = 'card'
  div.setAttribute("data-id", trainer.id)

  const p = document.createElement('p')
  p.innerText = trainer.name
  
  makeAddPokemonButton(trainer)

  const ul = document.createElement('ul')
  trainer.pokemons.forEach(pokemon => makePokemon(pokemon, ul))
  
  div.append(p,btn,ul)
  main.append(div)
}

// function to add new pokemon to trainer card
function makePokemon(newPokemon, ul){
  const li = document.createElement('li')
  li.innerText = `${newPokemon.nickname} (${newPokemon.species})`
  ul.append(li)
}

// button to make a POST request, adding a Pokemon to the trainer's team

function makeAddPokemonButton(trainer){
    const pokeButton = document.createElement('button')
    pokeButton.setAttribute('data-trainer-id', trainer.id)
    pokeButton.innerText = "Add Pokemon"
    const ul = document.querySelector('ul')
    
    pokeButton.addEventListener('click', () => {
      
        const options = {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'appliction.json'
          },
          body: JSON.stringify({
            trainer_id: trainer.id
          })
        }
      
      if(trainer.pokemons.length < 6){
        fetch(POKEMONS_URL, options)
        .then(res => res.json())
        .then(newPokemon => {makePokemon(newPokemon, ul)
          
        })
      }  
      
      
    })
}