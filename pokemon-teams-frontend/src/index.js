const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

fetch(TRAINERS_URL)
    .then(res => res.json())
    .then(trainers => {
        // Populate menu
        for (const trainer of trainers) {
            
          makeTrainer(trainer);
        }
    })

function makeTrainer(trainer){
    const div = document.createElement('div')
    div.setAttribute('class', 'card')
    const ul = document.createElement('ul')
    const p = document.createElement('p')
    p.innerText = trainer.name
    const addPokemonButton = document.createElement('button')
    addPokemonButton.innerText = 'Add Pokemon'
    addPokemonButton.dataset.trainerId = trainer.id;

    const main = document.querySelector('body main')
    div.append(p, addPokemonButton, ul)
    main.append(div)


    addPokemonButton.addEventListener('click', (e) => {
        const trainerId = e.target.dataset.trainerId;

        const options = { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'    
            },
            body: JSON.stringify({
                trainer_id: trainerId
            })
        }
        fetch(`${POKEMONS_URL}`, options)
            .then(res => res.json())
            .then(pokemon => {
                console.log(pokemon)
                const li = document.createElement('li')
                li.innerText = pokemon.nickname
                const releaseButton = document.createElement('button')
                releaseButton.innerText = 'Release'
                releaseButton.setAttribute('class', 'release')
                li.append(releaseButton)
                ul.append(li)
            })
    })      

    for (const pokemon of trainer.pokemons){
        const li = document.createElement('li')
        li.innerText = pokemon.nickname
        
        const releaseButton = document.createElement('button')
        releaseButton.innerText = 'Release'
        releaseButton.setAttribute('class', 'release')
        releaseButton.dataset.pokemonId = pokemon.id;
        li.append(releaseButton)
        ul.append(li)

        releaseButton.addEventListener('click', (e) => {
            const options = {
                method: 'DELETE'
            }
            const pokemonId = e.target.dataset.pokemonId;

            fetch(`${POKEMONS_URL}/${pokemonId}`, options)
            .then(res => res.json())
            .then(pokemon => {
                pokemon.parentNode.remove()
            })
        })
    }

}





// fetch(POKEMONS_URL)
//     .then(res => res.json())
//     .then(pokemons => {
//         // Populate menu
//         for (const pokemon of pokemons) {
//           listPokemon(pokemon);
//         }
//     })

// function listPokemon(pokemon){
//     const li = document.createElement('li')
//     li.innerText = pokemon.nickname
//     const releaseButton = document.createElement('button')
//     releaseButton.innerText = 'Release'
//     releaseButton.setAttribute('class', 'release')
//     li.append(releaseButton)
//     //need to append to the right trainer
//     // ul.append(li)    
// }
 


// const div = document.querySelector('div')
// const div = document.querySelector('div')
// const div = document.querySelector('div')

