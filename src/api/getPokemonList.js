const axios = require('axios').default

const getPokemonInfo = require('./getPokemonData.js')

const getPokemonList = async ({ next = 0 }) => {
  const info = await axios.get(`https://pokeapi.co/api/v2/pokemon/?offset=${next}&limit=20`)

  // Get next url for pokemons list and retrive main info of every pokemon
  const nextUrl = new URL(info.data.next).searchParams.get('offset')
  const pokemonsInfo = await Promise.all(info.data.results.map(async (pokemon) => {
    const { name, frontDefault, id, types } = await getPokemonInfo({ pokemon: pokemon.name })

    return { name, frontDefault, id, types }
  }))

  return { nextUrl, pokemonsInfo }
}

module.exports = getPokemonList
