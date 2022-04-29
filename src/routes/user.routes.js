const fastifyPlugin = require('fastify-plugin')

const favoritesRoute = async (fastify, options) => {
  const { User } = fastify.mongo

  fastify.post('/api/user/register', async (request, reply) => {
    const { id, name, email, picture } = request.body

    try {
      const user = await User.create({ gid: id, name, email, picture })

      // gid: id, id: user._id
      reply.send({ status: true, user, message: 'successfull' })
    } catch (error) {
      reply.send({ status: false, message: 'error', error })
    }
  })

  fastify.post('/api/user/login', async (request, reply) => {
    const { id } = request.body

    try {
      const search = await User.findOne({ gid: id })

      if (!search) {
        reply.send({ status: true, exist: false, message: 'User is no register' })
      }

      reply.send({ status: true, exist: true, message: 'User already exist' })
    } catch (error) {
      reply.send({ status: false, message: 'error', error })
    }
  })

  fastify.get('/api/user/:id/favorites', async (request, reply) => {
    const { id } = request.params

    try {
      const { favorites } = await User.findOne({ gid: id })

      reply.send({ status: true, message: 'successfull', favorites })
    } catch (error) {
      reply.send({ status: false, message: 'error', error })
    }
  })

  fastify.post('/api/user/:id/favorites/add', async (request, reply) => {
    const { id } = request.params
    const { favorites } = request.body

    try {
      const added = await User.findOneAndUpdate(
        { gid: id },
        {
          $push:
            { favorites: { $each: favorites } }
        },
        { returnOriginal: false }
      )

      reply.send({ status: true, message: 'successfull favorite added', added })
    } catch (error) {
      reply.send({ status: false, message: 'error', error })
    }
  })

  fastify.post('/api/user/:id/favorites/delete', async (request, reply) => {
    const { id } = request.params
    const { favorites } = request.body

    try {
      const removed = await User.findOneAndUpdate(
        { gid: id },
        {
          $pull:
            { favorites: { $each: favorites } }
        },
        { returnOriginal: false }
      )

      reply.send({ status: true, message: 'successfull favorite removed', removed })
    } catch (error) {
      reply.send({ status: false, message: 'error', error })
    }
  })
}

module.exports = fastifyPlugin(favoritesRoute)
