const fastifyPlugin = require('fastify-plugin')

const favoritesRoute = async (fastify, options) => {
  const { User } = fastify.mongo

  fastify.post('/api/user/register', async (request, reply) => {
    const { id, name, email, picture } = request.body
    const user = await User.create({ gid: id, name, email, picture })

    reply.send({ gid: id, id: user._id, status: 'Successful' })
  })

  fastify.post('/api/user/login', async (request, reply) => {
    const { id } = request.body
    const search = await User.findOne({ gid: id })

    if (!search) {
      reply.send({ code: 'NOEXIST', status: 'User is no register, redirect...' })
    }

    reply.send({ code: 'EXIST', status: 'User already exist.' })
  })

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
