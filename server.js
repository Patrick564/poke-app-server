const fastify = require('fastify')({ logger: true })
const fastifyFormbody = require('fastify-formbody')
const fastifyCors = require('fastify-cors')
// const mongoose = require('mongoose')

const connector = require('./database/db.js')
// const userModel = require('./schemas/userSchema.js')

const route = require('./routes/register.routes.js')
const pokemonRoute = require('./routes/pokemon/pokemon.routes.js')
const pokemons = require('./routes/pokemon/pokemons.routes.js')

// const PORT = process.env.PORT || 3000
// const HOST = process.env.HOST || '127.0.0.1'

// fastify.get('/api/user/register', async (req, rep) => {
// const a = await userModel.create({ name: 'Ejemplo2', id: 'ioio', email: 'a@bailo.com', picture: 'Iooo' })
// const b = await userModel.findByIdAndUpdate(mongoose.Types.ObjectId('623d2d43766a6a69623f7c35'), { $push: { favorites: 134 } })

// console.log(b)
// console.log(b)
// return { res: 'hi' }
// })

const init = () => {
  const app = fastify()

  app.register(fastifyCors, {
    origin: ['*'],
    methods: ['GET', 'POST']
  })
  app.register(fastifyFormbody)
  app.register(connector)

  app.route(route)
  app.route(pokemonRoute)
  app.route(pokemons)
}

if (require.main === module) {
  init().listen(3000, (err) => {
    if (err) console.error(err)

    console.log('server listening on 3000')
  })
} else {
  module.exports = init
}

// const start = async () => {
//   try {
//     await fastify.listen(PORT, HOST)
//   } catch (error) {
//     fastify.log.error(error)
//     process.exit(1)
//   }
// }

// start()
