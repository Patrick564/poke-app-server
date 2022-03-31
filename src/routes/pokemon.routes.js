const fastifyPlugin = require('fastify-plugin')

const getPokemonData = require('../api/getPokemonData.js')
const getPokemonList = require('../api/getPokemonList.js')

const pokemonRoutes = async (fastify, options) => {
  fastify.get('/api/pokemon/:name', async (request, reply) => {
    const name = request.params.name ? request.params.name : {}
    const pokemon = await getPokemonData({ pokemon: name })

    reply.send({ ...pokemon })
  })

  fastify.get('/api/pokemon/list', async (request, reply) => {
    const next = request.query.next ? request.query : {}
    const pokemonList = await getPokemonList(next)

    reply.send({ ...pokemonList })
  })
}

module.exports = fastifyPlugin(pokemonRoutes)
