const fastifyPlugin = require('fastify-plugin')

const favoritesRoute = async (fastify, options) => {
  const { User } = fastify.db

  fastify.get('/api/user/:id/favorites', async (request, reply) => {
    const { id } = request.params
    const { favorites } = await User.findOne({ gid: id })

    reply.send({ message: 'Successful', favorites })
  })

  fastify.post('/api/user/:id/favorites/add', async (request, reply) => {
    const { id } = request.params
    const { favorites } = request.body
    const query = await User.findOneAndUpdate({ gid: id }, { $push: { favorites } })

    reply.send({ message: 'Successful added', query })
  })
}

module.exports = fastifyPlugin(favoritesRoute)
