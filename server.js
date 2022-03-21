const fastify = require('fastify')({ logger: true })

const getPokemonInfo = require('./api/pokemonInfo.js')
const pokemonsList = require('./api/pokemonsList.js')

const PORT = process.env.PORT || 3000
// const HOST = process.env.HOST || 'localhost'

fastify.register(require('fastify-cors'), {
  origin: ['*'],
  methods: ['GET', 'POST']
})

// Endpoint for all pokemons
fastify.get('/api/pokemons', async (req, res) => {
  const pokemons = await pokemonsList({})

  return { pokemons }
})

// Endpoint for general pokemon info
fastify.get('/api/pokemon/:pokemon', async (req, res) => {
  const pokemon = req.params.pokemon ? req.params : {}
  const pokemonInfo = await getPokemonInfo(pokemon)

  return { pokemonInfo }
})

const start = async () => {
  try {
    await fastify.listen(PORT, '0.0.0.0')
  } catch (error) {
    fastify.log.error(error)
    process.exit(1)
  }
}

start()
