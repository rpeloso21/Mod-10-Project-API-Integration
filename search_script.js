async function fetchPokemonData(pokemonName) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    const pokemonData = await response.json();
    return pokemonData;
}

async function fetchData(pokemonName, elementName) {
    const data = await fetchPokemonData(`${pokemonName}`);
    const pokemonInfoElement = document.getElementById(`${elementName}`);
    const statsInfo = data.stats.map(stat => {
        return `<li>${stat.stat.name}: ${stat.base_stat}</li>`;
    }).join('');

    const abilitiesInfo = data.abilities.map(ability => {
        return `<li>${ability.ability.name}</li>`;
    }).join('');

    const typesInfo = data.types.map(type => {
        return `<li>${type.type.name}</li>`;
    }).join('');

    pokemonInfoElement.innerHTML = `
                <img src="${data.sprites.front_default}" class="card-img-top" alt="dashboard image">
                <div class="card-body">
                    <h5 class="card-title">${data.name}</h5>
                    <p class="card-text">Stats: ${statsInfo}</p>
                    <p class="card-text">Abilities: ${abilitiesInfo}</p>
                    <p class="card-text">Types: ${typesInfo}</p>
                    <a href="#" class="btn btn-primary">Details Sheet</a>
                </div>
                `
}

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('searchForm');
    
    form.addEventListener('submit', function() {
        const inputValue = document.getElementById('search').value;
        fetchData(inputValue, 'card1')
        return inputValue;
    });
});


