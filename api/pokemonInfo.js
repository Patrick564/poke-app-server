const axios = require('axios').default

const getPokemonInfo = async ({ pokemon = 'ditto' }) => {
  const info = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)

  // Get specific sprites
  const {
    front_default: frontDefault,
    front_female: frontFemale,
    front_shiny: frontShiny
  } = info.data.sprites

  // Get an object with stats and names
  const stats = info.data.stats.map((stat) => ({ baseStat: stat.base_stat, name: stat.stat.name }))

  // Get an array of types
  const types = [...info.data.types.map((type) => type.type.name)]

  const id = info.data.id
  const name = info.data.name

  return { frontDefault, frontFemale, frontShiny, stats, types, id, name }
}

module.exports = getPokemonInfo
