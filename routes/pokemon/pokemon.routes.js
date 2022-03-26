const getPokemonInfo = require('../../api/pokemonInfo.js')

const pokemonRoute = {
  url: '/api/pokemon',
  method: 'GET',
  handler: async (request, reply) => {
    const name = request.query.name ? request.query.name : {}
    const pokemon = getPokemonInfo({ pokemon: name })

    reply.send({ ...pokemon })
  }
}

module.exports = pokemonRoute
