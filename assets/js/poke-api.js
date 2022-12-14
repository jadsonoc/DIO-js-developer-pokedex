const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon();
    pokemon.number = pokeDetail.id;
    pokemon.name = pokeDetail.name;
    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
    //Metodo destructor - para 1a posicao array - se fossem as demais, seria [type1, type2, type3 ...]
    const [type] = types;
    pokemon.type = type;
    pokemon.types = types;
    pokemon.abilities = pokeDetail.abilities.map((abilitySlot) => abilitySlot.ability.name);
    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;

    return pokemon;
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
    return fetch(url)
        .then((responseUrl) => responseUrl.json())
        .then((responseBody) => responseBody.results)
        .then((resPokemons) => resPokemons.map((resPokemon) => fetch(resPokemon.url) //COM A IMPLEMENTACAO DA CLASSE, BASTA passar a funcao de conversao 
                                                                    .then((responseUrlDetail) => responseUrlDetail.json())
                                                                    .then(convertPokeApiDetailToPokemon)))
        .then((resDetails) => Promise.all(resDetails))
        .then((resPokemonDetails) => {
            return resPokemonDetails;
        })
        .catch((error) => console.error(error))
}