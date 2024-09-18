async function fetchPokemonList() {
    try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=200'); // Adjust limit as needed
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data.results; // This contains the list of Pokémon
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}

async function fetchPokemonData(pokemonUrl) {
    try {
        const response = await fetch(pokemonUrl);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const pokemonData = await response.json();
        return pokemonData;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}

async function displayPokemonCards() {
    try {
        const pokemonList = await fetchPokemonList();
        const pokemonCardsContainer = document.getElementById('pokemon-cards');

        // Fetch data for each Pokémon and create a card
        const cardPromises = pokemonList.map(async (pokemon) => {
            const pokemonData = await fetchPokemonData(pokemon.url);
            return `
                <div class="col-md-4 mb-4">
                    <div class="card">
                        <img src="${pokemonData.sprites.front_default}" class="card-img-top" alt="${pokemonData.name}">
                        <div class="card-body">
                            <h5 class="card-title">${pokemonData.name}</h5>
                            <p class="card-text">
                                <ul>
                                    ${pokemonData.stats.map(stat => `<li>${stat.stat.name}: ${stat.base_stat}</li>`).join('')}
                                </ul>
                            </p>
                            <a href="#" class="btn btn-primary">Details Sheet</a>
                        </div>
                    </div>
                </div>
            `;
        });

        const cardsHtml = (await Promise.all(cardPromises)).join('');
        pokemonCardsContainer.innerHTML = cardsHtml;
    } catch (error) {
        console.error('There was a problem with displaying Pokémon cards:', error);
    }
}

document.addEventListener('DOMContentLoaded', displayPokemonCards);
