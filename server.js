const fastify = require('fastify')({ logger: true })
const fastifyFormbody = require('fastify-formbody')
const fastifyCors = require('fastify-cors')
const mongoose = require('mongoose')

const connector = require('./database/db.js')
const userModel = require('./schemas/userSchema.js')

const route = require('./routes/register.routes.js')

const getPokemonInfo = require('./api/pokemonInfo.js')
const pokemonsList = require('./api/pokemonsList.js')

const PORT = process.env.PORT || 3000
const HOST = process.env.HOST || '127.0.0.1'

fastify.register(fastifyCors, {
  origin: ['*'],
  methods: ['GET', 'POST']
})
fastify.register(fastifyFormbody)
fastify.register(connector)

fastify.route(route)

fastify.get('/api/user/register', async (req, rep) => {
  // const a = await userModel.create({ name: 'Ejemplo2', id: 'ioio', email: 'a@bailo.com', picture: 'Iooo' })
  const b = await userModel.findByIdAndUpdate(mongoose.Types.ObjectId('623d2d43766a6a69623f7c35'), { $push: { favorites: 134 } })

  console.log(b)
  // console.log(b)
  return { res: 'hi' }
})

// Endpoint for all pokemons
fastify.get('/api/pokemons', async (req, res) => {
  const next = req.query.next ? req.query : {}
  const pokemons = await pokemonsList(next)

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
    await fastify.listen(PORT, HOST)
  } catch (error) {
    fastify.log.error(error)
    process.exit(1)
  }
}

start()
