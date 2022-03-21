const axios = require('axios').default

const getPokemonInfo = require('./pokemonInfo.js')

const pokemonsList = async ({ url = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20' }) => {
  const info = await axios.get(url)

  // Get next url for pokemons list and retrive main info of every pokemon
  const next = info.data.next
  const pokemonsInfo = await Promise.all(info.data.results.map(async (pokemon) => {
    const { name, frontDefault, id, types } = await getPokemonInfo({ pokemon: pokemon.name })

    return { name, frontDefault, id, types }
  }))

  return { next, pokemonsInfo }
}

module.exports = pokemonsList
