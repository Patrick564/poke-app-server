const fastifyPlugin = require('fastify-plugin')

const getPokemonInfo = require('../api/pokemonInfo.js')
const pokemonsList = require('../api/pokemonsList.js')

const pokemonRoutes = async (fastify, options) => {
  fastify.get('/api/pokemon/:name', async (request, reply) => {
    const name = request.params.name ? request.params.name : {}
    const pokemon = await getPokemonInfo({ pokemon: name })

    reply.send({ ...pokemon })
  })

  fastify.get('/api/pokemon/list', async (request, reply) => {
    const next = request.query.next ? request.query : {}
    const pokemonList = await pokemonsList(next)

    reply.send({ ...pokemonList })
  })
}

module.exports = fastifyPlugin(pokemonRoutes)
