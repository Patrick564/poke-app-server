const fastify = require('fastify')
const fastifyFormbody = require('fastify-formbody')
const fastifyCors = require('fastify-cors')

const connector = require('./database/db.js')

const route = require('./routes/register.routes.js')
const loginRoute = require('./routes/login.routes.js')
const pokemonRoute = require('./routes/pokemon.routes.js')
const favoritesRoute = require('./routes/favorites.routes.js')

// Plugins
// fastify.register(fastifyCors, {
//   origin: ['*'],
//   methods: ['GET', 'POST']
// })
// fastify.register(fastifyFormbody)
// fastify.register(connector)

// Routes
// fastify.register(favoritesRoute)
// fastify.register(pokemonRoute)

// fastify.route(route)
// fastify.route(loginRoute)

const build = (opts = {}) => {
  const app = fastify(opts)

  app.register(fastifyCors, {
    origin: ['*'],
    methods: ['GET', 'POST']
  })
  app.register(fastifyFormbody)
  app.register(connector)

  app.register(favoritesRoute)
  app.register(pokemonRoute)

  app.route(route)
  app.route(loginRoute)
  app.get('/api', async (request, reply) => {
    return { hi: 'Puuuuu' }
  })

  return app
}

module.exports = build
