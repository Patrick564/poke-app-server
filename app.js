// Fastify imports
const fastify = require('fastify')
const fastifyFormbody = require('fastify-formbody')
const fastifyCors = require('fastify-cors')

// Database imports
const connector = require('./src/database/db.js')

// Routes imports
const pokemonRoutes = require('./src/routes/pokemon.routes.js')
const userRoutes = require('./src/routes/user.routes')

const build = (opts = {}) => {
  const app = fastify(opts)

  // Pluggins
  app.register(fastifyCors, {
    origin: ['*'],
    methods: ['GET', 'POST']
  })
  app.register(fastifyFormbody)
  app.register(connector)

  // Routes
  app.register(userRoutes)
  app.register(pokemonRoutes)

  // app.get('/api', async (request, reply) => {
  //   return { hi: 'Plugins' }
  // })

  return app
}

module.exports = build
