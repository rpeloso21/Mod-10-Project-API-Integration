async function fetchPokemonData(pokemonName) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    const pokemonData = await response.json();
    return pokemonData;
}

function fetchData(pokemonName, elementName) {
    document.addEventListener('DOMContentLoaded', async () => {
        const data = await fetchPokemonData(`${pokemonName}`);
        const pokemonInfoElement = document.getElementById(`${elementName}`);
        const statsInfo = data.stats.map(stat => {
            return `<li>${stat.stat.name}: ${stat.base_stat}</li>`;
        }).join('');

        pokemonInfoElement.innerHTML = `
                    <img src="${data.sprites.front_default}" class="card-img-top" alt="dashboard image">
                    <div class="card-body">
                      <h5 class="card-title">${data.name}</h5>
                      <p class="card-text">Stats: ${statsInfo}</p>
                      <a href="#" class="btn btn-primary">Details Sheet</a>
                    </div>
                    `
    })
}


fetchData('pikachu', 'card1')
fetchData('charizard', 'card2')
fetchData('gyarados', 'card3')