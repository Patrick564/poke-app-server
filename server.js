const fastify = require('fastify')({ logger: true })
const fastifyFormbody = require('fastify-formbody')
const fastifyCors = require('fastify-cors')

const connector = require('./database/db.js')

const route = require('./routes/register.routes.js')
const loginRoute = require('./routes/login.routes.js')
const pokemonRoute = require('./routes/pokemon.routes.js')
const favoritesRoute = require('./routes/favorites.routes.js')

const PORT = process.env.PORT || 3000
const HOST = process.env.HOST || '127.0.0.1'

// Plugins
fastify.register(fastifyCors, {
  origin: ['*'],
  methods: ['GET', 'POST']
})
fastify.register(fastifyFormbody)
fastify.register(connector)

// Routes
fastify.register(favoritesRoute)
fastify.register(pokemonRoute)

fastify.route(route)
fastify.route(loginRoute)

// Start function
const start = async () => {
  try {
    await fastify.listen(PORT, HOST)
  } catch (error) {
    fastify.log.error(error)
    process.exit(1)
  }
}

start()
