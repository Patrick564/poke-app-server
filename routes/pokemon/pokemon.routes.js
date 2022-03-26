const getPokemonInfo = require('../../api/pokemonInfo.js')

const pokemonRoute = {
  url: '/api/pokemon',
  method: 'GET',
  handler: async (req, rep) => {
    const name = req.query.name ? req.query.name : {}
    const pokemon = await getPokemonInfo({ pokemon: name })

    return { ...pokemon }
  }
}

module.exports = pokemonRoute
