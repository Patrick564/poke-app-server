const fastifyPlugin = require('fastify-plugin')

const getPokemonData = require('../api/getPokemonData.js')
const getPokemonList = require('../api/getPokemonList.js')

const pokemonRoutes = async (fastify, options) => {
  fastify.get('/api/pokemon/:name', async (request, reply) => {
    const name = request.params.name ? request.params.name : {}

    try {
      const pokemon = await getPokemonData({ pokemon: name })

      reply.send({ ...pokemon })
    } catch (error) {
      reply.send({ ...error })
    }
  })

  fastify.get('/api/pokemon/list', async (request, reply) => {
    const next = request.query.next ? request.query : {}

    try {
      const pokemonList = await getPokemonList(next)

      reply.send({ ...pokemonList })
    } catch (error) {
      reply.send({ ...error })
    }
  })
}

module.exports = fastifyPlugin(pokemonRoutes)
