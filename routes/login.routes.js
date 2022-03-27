const userModel = require('../schemas/userSchema.js')

const loginRoute = {
  url: '/api/user/login',
  method: 'POST',
  handler: async (request, reply) => {
    const { id } = request.body
    const search = await userModel.findOne({ gid: id })

    if (!search) {
      reply.send({ code: 'NOEXIST', status: 'User is no register, redirect...' })
    }

    reply.send({ code: 'EXIST', status: 'User already exist.' })
  }
}

module.exports = loginRoute
