const pokemonsList = require('../../api/pokemonsList.js')

const pokemons = {
  url: '/api/pokemons',
  method: 'GET',
  handler: async (req, rep) => {
    const next = req.query.next ? req.query : {}
    const pokemonList = await pokemonsList(next)

    return { ...pokemonList }
  }
}

module.exports = pokemons
