const getPokemonInfo = require('./api/pokemonInfo.js')

const pokemon = {
  url: '/api/pokemon:name',
  method: 'GET',
  handler: async (req, rep) => {
    const name = req.params.name ? req.params : {}
    const pokemon = await getPokemonInfo(name)

    return { ...pokemon }
  }
}

module.exports = pokemon
